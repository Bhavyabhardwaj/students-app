const { COOKIE_SECURE, FRONTEND_URL } = require("../config/serverConfig");
const { loginUser } = require("../service/authService");

async function logout(req, res) {
    console.log("Cookie from frontend", req.cookies);

    res.cookie("authToken", "", {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: "none",
        maxAge: 0, 
      
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
            secure: COOKIE_SECURE,
            sameSite: "none",
            
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData,
                token: response.token 
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
