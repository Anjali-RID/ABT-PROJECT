import express from "express";
import connection from "./src/config/db.js";
import userRouter from "./src/routes/userRoute.js"


import session from "express-session";
import passport from "passport";

import authRoutes from "./src/routes/authRoutes.js"; // Import external routes
import "./src/config/passport.js"; // Import Passport config



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Express session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set true if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send('<h1>Google OAuth with Passport.js</h1><a href="/auth/google">Login with Google</a>');
});

// Protected Route
app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.send(`<h1>Welcome, ${req.user.displayName}!</h1>`);
});


app.use('/user', userRouter);


app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, async () => {
    try {
        await connection;
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(`MongoDB Not Connected: ${error}`);
    }
    console.log(`Server is Running on port ${port}`);
});
