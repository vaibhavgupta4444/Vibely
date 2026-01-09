import mongoose from "mongoose";
import { IUser } from "../interfaces/user-interface"

const userSchema = new mongoose.Schema<IUser>({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter valid emailId"
        ]
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Please enter strong password"
        ]
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;