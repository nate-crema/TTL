const mongoose = require('mongoose');


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

const pre_order_log_Schema = new mongoose.Schema({
    req_date: {
        type: String,
        default: time
    },
    ip: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    num: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    phonenum: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    }
});

var preorder_db = mongoose.model('preorder', pre_order_log_Schema);

module.exports = preorder_db;