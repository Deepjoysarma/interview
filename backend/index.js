const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthUser = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send ('Sarma ji');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/users', AuthUser);

app.listen(PORT, ()=> {
    console.log(`Server is running successfully on ${PORT}`);
})