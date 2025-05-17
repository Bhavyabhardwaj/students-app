const express = require('express');
const {createUser}=require('../controller/userContoller')


const userRouter = express.Router();  

userRouter.post('/', createUser); 

module.exports = userRouter; 