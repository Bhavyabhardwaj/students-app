const express = require("express");
const goalRouter = express.Router();
const { isLoggedIn } = require("../validations/authValidator");
const { goalAdd } = require("../controller/goalController");

// Apply the middleware before the controller
goalRouter.post("/addGoal",isLoggedIn, goalAdd);
module.exports=goalRouter