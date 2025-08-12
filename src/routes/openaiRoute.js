const express = require('express');
const openaiRouter = express.Router();
const {saveRoadmap, findRoadmap, showAllRoadmaps} = require('../controller/roadmapSaveController');
const {generateRoadmap,saveroadmap,getUserRoadmapsController, deleteRoadmap}=require('../controller/openaiController')
const { isLoggedIn } = require("../validations/authValidator");

openaiRouter.post('/generate',isLoggedIn, generateRoadmap);
//openaiRouter.post('./generate/:goalId', RoadmapFromGoalId)

openaiRouter.post('/generate/save',isLoggedIn, saveroadmap);
openaiRouter.get('/see/:id',findRoadmap)
openaiRouter.get('/showAll',isLoggedIn,getUserRoadmapsController)
openaiRouter.delete('/delete/:id', isLoggedIn, deleteRoadmap);


module.exports = openaiRouter;
