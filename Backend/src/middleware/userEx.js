import UserModel from "../models/userModel.js";

export const userEx = async (req, res, next) => {
    const { email, password, name, number, role } = req.body;

    try {
        // ✅ Ensure at least one of `email` or `number` is provided m
        if (!email && !number) {
            return res.status(400).json({ message: "Either email or phone number is required." });
        }

        // ✅ Ensure all required fields are provided
        if (!password || !name || !role) {
            return res.status(400).json({ message: "All fields (name, password, role) are required." });
        }

        let findUser = null;

        if (email) {
            findUser = await UserModel.findOne({ email });
        } else if (number) {
            findUser = await UserModel.findOne({ number });
        }

        if (findUser) {
            return res.status(400).json({ message: "User already exists. Please login first." });
        }

        next(); 

    } catch (error) {
        console.error("User Signup Error:", error);
        res.status(500).json({ message: "User Signup Server Error", error: error.message });
    }
};
