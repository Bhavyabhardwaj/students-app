const express = require('express');
const openaiRouter = express.Router();
const {saveRoadmap, findRoadmap} = require('../controller/roadmapSaveController');
const {generateRoadmap}=require('../controller/openaiController')

openaiRouter.post('/generate', generateRoadmap);

openaiRouter.post('/generate/save', saveRoadmap);
openaiRouter.get('/see/:id',findRoadmap)

module.exports = openaiRouter;
