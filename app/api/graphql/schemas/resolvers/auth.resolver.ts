import userModel from "@/app/api/models/user.model";
import { connectDB } from "@/app/utils/connectdb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Not authenticated");
      return await userModel.findById(user.id).select("-password");
    },
  },
  Mutation: {
    signup: async (_: any, { input }: { input: any }) => {
      try {
        await connectDB();
        const existingUser = await userModel.findOne({ email: input.email });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        let role = "user";

    if (input.role === "admin" && input.adminSecret === process.env.ADMIN_SECRET) {
      role = "admin";
    }
        const newUser = await userModel.create({
          name: input.name,
          email: input.email,
          role: role,
          password: hashedPassword,
        });

        const token = jwt.sign(
          { userId: newUser._id, email: newUser.email },
          process.env.NEXT_JWT_SECRET as string,
          { expiresIn: "1d" }
        );

        return {
          user: {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
          token,
        };
      } catch (error: any) {
        console.error("Signup error:", error);
        throw new Error(error.message || "Error creating user");
      }
    },

    login: async (_: any, { input }: { input: any }) => {
      try {
        await connectDB();

        const user = await userModel.findOne({ email: input.email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(input.password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.NEXT_JWT_SECRET as string,
          { expiresIn: "1d" }
        );

        return {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      } catch (error: any) {
        console.log("Error logging in", error);
        throw new Error(error.message || "Error logging in");
      }
    },
  },
};
