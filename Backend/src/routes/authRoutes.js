// authRoutes.js - Defines authentication API routes (POST /login, POST /logout)

import express from "express";
import passport from "passport";
import { loginSuccess, logout } from "../controllers/authController.js";

const router = express.Router();

// Google Auth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

router.get("/logout", logout);
router.get("/login/success", loginSuccess);

export default router;

