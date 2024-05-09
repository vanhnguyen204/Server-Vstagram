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

export { verifyToken };
