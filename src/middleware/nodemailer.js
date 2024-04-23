import nodemailer from "nodemailer";
import email, {passWord} from "../constants/infor.js";
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: email,
        pass: passWord,

    },
    port: 587,
    secure: true
});

