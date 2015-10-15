/**
 * Created by farzan on 6/5/2015.
 */



var mongoose = require('mongoose');
mongoose.connect('mongodb://Farzan:admin@ds043012.mongolab.com:43012/chatappdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("db connected")
});
