const express = require('express');
const {createUser,getUserProfileController}=require('../controller/userContoller')
const { isLoggedIn } = require("../validations/authValidator");


const userRouter = express.Router();  

userRouter.post('/', createUser); 
userRouter.get("/profile", isLoggedIn, getUserProfileController);

module.exports = userRouter; 