import jwt from "jsonwebtoken";

const secretKey = process.env.TOKEN_SEC_KEY;

const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Không có quyền truy cập.',
            cause: 'Không thể kiểm tra người dùng.'
        });
    }

    try {
        const decoded = await verifyToken(token);
        req.body.user = decoded;  
        next(); 
    } catch (err) {
        res.status(400).json({message: 'Failed', cause: 'Invalid Token', status: 400});
    }
};

export { verifyToken, authMiddleware };
