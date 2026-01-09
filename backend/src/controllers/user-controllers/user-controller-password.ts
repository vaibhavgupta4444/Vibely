import { AuthenticatedRequest } from "../../interfaces/auth-request";
import User from "../../models/User";
import { BadRequestError, NotFoundError, UnauthorizedError, ValidationError } from "../../utils/https-error";
import { passwordSchema } from "../../validators/password-schema";
import bcrypt from "bcrypt"
import { Response } from "express";

export const resetPassword = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if(!userId){
        throw UnauthorizedError("Unauthorized Access");
    }

    const currentPassword: string = req.body.currentPassword; 
    const password: string = passwordSchema.parse(req.body.password);

    if(!password || !currentPassword){
        throw BadRequestError("Password required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(userId);

    if(!user){
        throw NotFoundError("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if(!isMatch){
        throw ValidationError("Current password is incorrect");
    }

    user.password = hashedPassword;
    await user.save();
    return res.json({
        success: true,
        message: "Password updated successfully"
    });
}