const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../validations/authValidator');
const {generateContent,deleteContent,findContent,getUserContentsController,savecontent } = require('../controller/contentSuggestionController');



router.post('/suggest', isLoggedIn, generateContent);


router.post('/suggest/save',isLoggedIn, savecontent);
router.get('/see/:id',findContent)
router.get('/showAll',isLoggedIn,getUserContentsController)
router.delete('/delete/:id', isLoggedIn, deleteContent);

module.exports = router;
