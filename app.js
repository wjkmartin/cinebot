const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
// add API code here

module.exports = app;
