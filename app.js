const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const crypto = require("crypto");
var getIP = require('ipware')().get_ip;

const app = express();



app.set('views', path.join(__dirname+"/views"));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// const port = 554;
// const ip = "localhost";
const port = 80;
const ip = "121.170.91.63";
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
    next();
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

var preorder = require('./models/pre_order');

var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log("Mongodb: connected");
})

mongoose.connect('mongodb://ttl_admin:TTL_ADMIN_00**@121.170.91.63', { dbName: 'TTL_pre'});

//Router
var router = require('./router')(app, fs, path, crypto, preorder, getIP);