import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const passwordHash = async (password) => {
    try {
        const saltRounds = Number(process.env.SALTROUND) || 10; // Default to 10 if not set
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Password hashing error:", error.message);
        throw new Error("Error hashing password");
    }
};
export const verifyPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Password verification error:", error.message);
        throw new Error("Error verifying password");
    }
};

