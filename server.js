'use strict';
const app = require('./app');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const User = require('./models/user');

const publicRoutes = require('./routes/public');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './webfonts')));
app.use(express.static(path.resolve(__dirname, './img')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', publicRoutes);

app.set('port', port);

const mongoUri = 'mongodb+srv://wjkmartin:UUgpU6qHz4Lzmn-@cluster0-7ddl5.mongodb.net/movieApp?retryWrites=true'

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true
    })
    .then(result => {
        var server = http.createServer(app);
        server.listen(port);
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    email: 'wjkmartin@gmail.com',
                });
                user.save();
            }
        })
        console.log('== now listening on port ' + port + ' ==')
    })
    .catch(err => {
        console.log(err);
    });