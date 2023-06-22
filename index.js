const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Always require and configure near the top 
require('dotenv').config();
// Connect to the database
require('./config/database');

// create the app
const app = express();

// comes from .env file or use 3001
const PORT = process.env.PORT || 3001

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// telling our express app to use this directory for our static assets 
app.use(express.static(path.join(__dirname, 'build')));

app.use(require("./config/checkToken"))

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))

app.listen(PORT, function() {
    console.log(`Express app running on port ${PORT}`)
  });