const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.cookies.token; // گرفتن توکن از کوکی

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token expired" });

        req.user = user;
        next();
    });
};


module.exports = auth