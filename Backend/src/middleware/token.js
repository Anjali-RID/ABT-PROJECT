import jsonwebtoken from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const getToken = async (data) => {
    try {
        if (!process.env.KEY) {
            throw new Error("Server Error: Missing Secret Key");
        }

        const payload = data; // Ensure data is a valid object
        const token = jsonwebtoken.sign(payload, process.env.KEY, { expiresIn: '7d' });

        return token;
    } catch (error) {
        console.error("Token Server Error:", error.message);
        throw new Error("Error generating token");
    }
};

export const verifyToken = async (req, res, next) => {
    try {
        if (!process.env.KEY) {
            return res.status(500).json({ message: "Server Error: Missing Secret Key" });
        }

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const verify = jsonwebtoken.verify(token, process.env.KEY);

        if (!verify) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = verify; // Attach decoded token payload to `req.user`
        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Token verification failed", error: error.message });
    }
};