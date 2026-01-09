import { base } from "./base-interface"

export interface IUser extends Document, base{
    firstName: string,
    lastName: string,
    email: string,
    password:string,
    isVerified: boolean,
    otp?: string,
    otpExpires?: Date,
}