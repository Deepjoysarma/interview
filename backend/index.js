const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthUser = require('./Routes/AuthRouter');
const AgentUser = require('./Routes/AgentRouter');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/users', AuthUser);
app.use('/agents', AgentUser);

app.listen(PORT, ()=> {
    console.log(`Server is running successfully on ${PORT}`);
})