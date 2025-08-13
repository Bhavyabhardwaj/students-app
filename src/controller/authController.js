const { COOKIE_SECURE } = require("../config/serverConfig");
const { loginUser } = require("../service/authService");

async function logout(req, res) {
    console.log("Cookie from frontend", req.cookies);

    res.cookie("authToken", "", {
        httpOnly: true,
        secure: COOKIE_SECURE,       // true in prod, false in local
        sameSite: "None",            // important for cross-origin
        expires: new Date(0)         // clear immediately
    });

    return res.status(200).json({
        success: true,
        message: "Log out successful",
        error: {},
        data: {}
    });
}

async function login(req, res) {
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);

        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: COOKIE_SECURE,    // true in prod, false in local
            sameSite: "None",          // important for cross-origin
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
            error: {}
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            message: error.message || "Login failed",
            error: error
        });
    }
}

module.exports = {
    login,
    logout
};
