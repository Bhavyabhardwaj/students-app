const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../validations/authValidator');
const { getSuggestionFromGoalId } = require('../controller/contentSuggestionController');

router.post('/suggest/:goalId', isLoggedIn, getSuggestionFromGoalId);

module.exports = router;
