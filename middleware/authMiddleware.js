const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecretkey"; // SAME as authController

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Expect: Authorization: Bearer TOKEN
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        // attach user info to request
        req.user = decoded;
        next();
    });
};
