export const loginSuccess = (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "User authenticated",
            user: req.user
        });
    } else {
        res.status(401).json({ success: false, message: "Not authenticated" });
    }
};

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ success: false, message: "Logout failed" });
        res.redirect("/");
    });
};
