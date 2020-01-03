const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json());

// routes 
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));
app.use('/api/signup', require('./routes/signup'));

module.exports = app;

