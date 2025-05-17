const express = require('express');
const router = express.Router();
const { addAgent, getAllAgents } = require('../Controllers/AgentController');

router.post('/add-agent', addAgent);

router.get('/', getAllAgents);

module.exports = router;
