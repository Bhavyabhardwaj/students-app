const jwt = require('jsonwebtoken');
const { JWT_SECRET, COOKIE_SECURE } = require('../config/serverConfig');

async function isLoggedIn(req, res, next) {
    // Frontend se aayi hui cookie 'authToken' ko read karo
    const token = req.cookies["authToken"];
    console.log('Received token:', token);

    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        // Token verify karo
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token:', decoded, 'Exp:', decoded.exp, 'Now:', Date.now() / 1000);

        if (!decoded) {
            throw new Error("Unauthorized");
        }

        // User info request object me daal do
        req.user = {
            email: decoded.email,
            id: decoded.id,
        };

        next();
    } catch (error) {
        console.log('Auth error:', error.name);

        if (error.name === "TokenExpiredError") {
            // Token expire ho gaya toh cookie clean karo with correct flags
            res.cookie("authToken", "", {
                httpOnly: true,
                sameSite: "none",      // cross-site cookie ke liye none lagana zaroori hai
                secure: true,          // https me secure true rakhna
                maxAge: 0              // cookie expire kar do
            });

            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again.",
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
