const express = require('express');
const openaiRouter = express.Router();
const { generateRoadmap,saveRoadmap} = require('../controller/openaiController');

openaiRouter.post('/generate', generateRoadmap);

openaiRouter.post('/generate/save', saveRoadmap);

module.exports = openaiRouter;
