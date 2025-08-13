const jwt = require('jsonwebtoken');
const { JWT_SECRET, COOKIE_SECURE } = require('../config/serverConfig');

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    console.log(`token: ${token}`);

    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded, decoded.exp, Date.now() / 1000);

        if (!decoded) {
            throw new Error("Unauthorized");
        }

        req.user = {
            email: decoded.email,
            id: decoded.id
        };

        next();
    } catch (error) {
        console.log(error.name);

        if (error.name === "TokenExpiredError") {
            // Clear cookie properly for cross-origin
            res.cookie("authToken", "", {
                httpOnly: true,
                sameSite: "None",  // Important for cross-origin
                secure: COOKIE_SECURE === 'true', // HTTPS only in production
                maxAge: 0 // expire immediately
            });

            return res.status(200).json({
                success: true,
                message: "Logged out due to expired token",
                error: {},
                data: {}
            });
        }

        return res.status(401).json({
            success: false,
            data: {},
            error: error.message || error,
            message: "Invalid Token provided"
        });
    }
}

module.exports = {
    isLoggedIn
};
