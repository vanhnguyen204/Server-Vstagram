import email from '../../constants/infor.js';
import User from '../models/User.js'
import bcrypt from 'bcrypt'
const AuthController = {
    async register(req, res, next) {
        console.log('register');
        console.log(req.body);
        try {
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            const existingUser = await User.findOne({ email: req.body.email });
            console.log(existingUser);
            if (existingUser) {
                return res.status(400).json({ status: 'failed', message: 'Tài khoản đã tồn tại!', code: 400 });

            }
            const user = new User({
                email: req.body.email,
                codeRegister: verificationCode
            });

            await user.save();

            await user.sendVerificationEmail(verificationCode);

            return res.status(201).json({
                status: 'success',
                message: 'Email hợp lệ, vui lòng kiểm tra email của bạn để lấy mã xác nhận!',
                code: 201
            });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(400).json({
                status: 'failed',
                message: 'Email không hợp lệ, vui lòng kiểm tra email của bạn để lấy mã xác nhận!',
                code: 201
            });
            next(error);
        }
    },
    async verify(req, res, next) {
        console.log('verify code register');
        console.log(req.body)
        try {
            const { email, codeRegister } = req.body;

            User.findOne({ email: email, codeRegister: codeRegister })
                .then(data => {
                    if (data) {
                        console.log('verify success!');
                        res.status(200).json({ status: 'success', message: 'Chuyển đến màn hình nhập mật khẩu!', code: 200 });
                    } else {
                        res.status(404).json({ message: 'Mã xác nhận không đúng!', status: 'failed', code: 404 });
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    async createAccount(req, res, next) {
        console.log('Register account');
        console.log(req.body);
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.passWord, salt);
            existingUser.passWord = hashedPassword;


            const newUser = await existingUser.save();
            await newUser.generateAuthToken();
            return res.status(201).json({ message: 'Create account successfully' });

        } catch (error) {
            next(error);
        }
    },
    async login(req, res, next) {
        console.log('Login');
        console.log(req.body);
        try {
            const result = await User.findByCredentials(req.body.email, req.body.passWord);
            if (result.error) {
                console.log(result.error);
                return res.status(404).json({ error: result.error });
            }
            const token = await result.generateAuthToken();
            result.passWord = '';
            result.token = token;
            res.status(200).json({
                email: result.email,
                fullName: result.fullName,
                avatar: result.avatar,
                token: token
            });
        } catch (error) {
            next(error);
        }
    },
    async getUserInformation(req, res, next) {
        try {
            const { _id } = req.body.user;
            const response = await User.findOne({ _id: _id })

            return res.status(200).json({
                email: response.email,
                fullName: response.fullName,
                avatar: response.avatar,
            })
        } catch (error) {
            next(error)
        }
    }

}

export default AuthController;
