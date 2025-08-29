const { COOKIE_SECURE, FRONTEND_URL } = require("../config/serverConfig");
const { loginUser } = require("../service/authService");

async function logout(req, res) {
  try {
    // ✅ Since we are not using cookies anymore, just inform frontend
    console.log("Cookie from frontend", req.cookies);

    res.cookie("authToken", "", {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: "lax",
        maxAge: 0, 
      
    });

    return res.status(200).json({
      success: true,
      message: "Log out successful",
      error: {},
      data: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error,
      data: {}
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const response = await loginUser({ email, password });

        
        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: COOKIE_SECURE,
            sameSite: "lax",
            
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      data: {},
      message: error.message || "Login failed",
      error
    });
  }
}

module.exports = {
    login,
    logout
};
