const express = require("express");
const goalRouter = express.Router();
const { isLoggedIn } = require("../validations/authValidator");
const { goalAdd,goalDelete, showGoals } = require("../controller/goalController");

// Apply the middleware before the controller
goalRouter.post("/addGoal",isLoggedIn, goalAdd);
goalRouter.delete("/deleteGoal/:id",isLoggedIn, goalDelete);
goalRouter.get('/showAll', isLoggedIn, showGoals);

module.exports=goalRouter