import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { transporter } from "../../middleware/nodemailer.js";
import dotenv from 'dotenv';
dotenv.config();
const Schema = mongoose.Schema;
const keySecret = process.env.TOKEN_SEC_KEY;
const User = new Schema({
    email: { type: String, default: '' },
    passWord: { type: String, default: '' },
    fullName: { type: String, default: '' },
    avatar: { type: String, default: '' },
    token: { type: String, default: '' },
    codeRegister: { type: Number, default: 0 }

}, {
    timestamps: true
})

User.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id, email: user.email }, keySecret);
    user.token = token;
    await user.save();
    return token;
};
User.methods.sendVerificationEmail = async function (verificationCode) {
    const user = this;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Verify Your Email from Vstagram',
            text: `Your verification code is ${verificationCode}`
        });
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};
User.statics.findByCredentials = async (email, passWord) => {
    const user = await mongoose.model('User').findOne({ email });
    if (!user) {
        return { error: 'Tài khoản không tồn tại' };
    }
    const isPasswordMatch = await bcrypt.compare(passWord, user.passWord);
    if (!isPasswordMatch) {
        return { error: 'Mật khẩu không chính xác' };
    }
    return user;
};
const UserModel = mongoose.model('User', User, 'User');

export default UserModel;
