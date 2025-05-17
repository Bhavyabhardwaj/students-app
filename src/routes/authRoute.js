const express = require('express');
const { login, logout } = require('../controller/authController');


const authRouter = express.Router();  

authRouter.post('/login', login); 
authRouter.post('/logout', logout);

module.exports = authRouter;
