// userController.js - Handles user-related operations (login, register, profile update)
import UserModel from "../models/userModel.js";
import { passwordHash ,verifyPassword} from "../utils/passwordBcrypt.js";
import { getToken } from "../middleware/token.js";

export const userSignup = async (req, res) => {
    try {
        // Hash the password p
        const hashedPassword = await passwordHash(req.body.password);
        

        // Create new user
        const newUser = new UserModel({ ...req.body, password: hashedPassword });
        
        // Save user to database
        await newUser.save();
        console.log(newUser)
        // Send response
        res.status(201).json({ message: "User registered successfully"});

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "User Signup Server Error", error: error.message });
    }
};
export const userLogin = async (req, res) => {
    try {
        const userP = await UserModel.findOne({ email: req.body.email });

        if (!userP) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordTrue = await verifyPassword(req.body.password, userP.password);
        if (!passwordTrue) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await getToken({ userId: userP._id });

        // Send response
        res.status(200).json({ message: "User login successfully", token });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "User login server error", error: error.message });
    }
};
