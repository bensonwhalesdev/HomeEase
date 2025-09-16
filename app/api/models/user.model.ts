import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
    }
    
});

export default mongoose.models.User || mongoose.model("User", UserSchema);