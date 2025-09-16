import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./schemas/typeDefs/typeDefs";
import jwt from "jsonwebtoken";
import { resolvers } from "./schemas/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const verifyToken = (token: string) => {
  try {
    const cleanToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(
      cleanToken,
      process.env.NEXT_JWT_SECRET as string
    );
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: any) => {
    const authHeader = req.headers.get("authorization") || "";
    const user = authHeader ? verifyToken(authHeader) : null;
    return { user };
  },
});

export { handler as GET, handler as POST };
