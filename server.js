'use strict';
const app = require('./app');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const publicRoutes = require('./routes/public');

const publicController = require('./controllers/publicController');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './webfonts')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', publicRoutes);


var port = process.env.PORT || 3000;
app.set('port', port);
var server = http.createServer(app);

server.listen(port);
