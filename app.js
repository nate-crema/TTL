const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const getIP = require("ipware")().get_ip();

const app = express();

const port = 80;
const ip = "localhost";
const server = app.listen(port, ip, function() {
    console.log("||-------TTL Server------||");
    console.log("Server started!!");
    console.log("Link: http://" + ip + ":" + port);
    console.log("||-------TTL Server------||");
})


var date = new Date().getDate();

if (date < 10) {
    date = '0' + date;
}

var month = new Date().getMonth()+1;
if (month < 10) {
    month = '0' + month;
}

var hour = new Date().getHours();
if (hour < 10) {
    hour = '0' + hour;
}

var minute = new Date().getMinutes();
if (minute < 10) {
    minute = '0' + minute;
}

var second = new Date().getSeconds();
if (second < 10) {
    second = '0' + second;
}



const time = ''+new Date().getFullYear()+month+date + '-' + hour+minute+second;

// access ip check
app.use((req, res, next) => {
    const ipInfo = getIP(req);
    console.log("---------\n\nAccessed: " + ipInfo.clientIp + "\n Time: " + time + "\n\n----------\n\n\n");
});


app.use(express.static(__dirname + "/source"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
    key: 'key_TTL',
    secret: '$^%&^IYHdfjsfaij4w5635qecmsqo',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 12000
    }
}));

//mongodb

var pre_model = require('./models/pre_model');

var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log("Mongodb: connected");
})

mongoose.connect('mongodb://121.170.91.63:754', { dbName: 'TTL_pre'});

//Router
var router = require('./router')(app, fs, path, crypto, pre_model);