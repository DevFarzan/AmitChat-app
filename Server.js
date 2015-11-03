var express = require('express');
var  app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
mongoose.connect('mongodb://Farzan:admin@ds043012.mongolab.com:43012/chatappdb');
var morgan = require('morgan');




var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Schemas = require('./model/User.js');
var chatSchema = require('./model/chatMessage.js');
var adminSchema = require('./model/adminSchema.js');
var loginSchemas = require('./model/login_detail.js');
var friendInviteEmail = require('./model/friendInviteSchema.js');
var addressListSchemas = require('./model/addressList.js');
var Api = require('./model/Api.js');

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("'Access-Control-Allow-Methods',['OPTIONS', 'GET', 'POST', 'DELETE']");
    res.header("'Access-Control-Allow-Headers','Content-Type'");


    next();
});


//socket.io code



io.on('connection', function(socket){
    socket.on('chat message', function(msg,sendingUser){
        io.emit('chat message', msg,sendingUser);
    });
});











app.use(bodyParser.urlencoded( {extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit:'50mb'}));

var port = process.env.PORT || 8000;        // set our port




app.post('/signUp',Api.signUp);
app.post('/signIn',Api.signIn);
app.post('/recoverPassword',Api.recoverPassword);
/*app.get('/newPassword',Api.newPassword);*/
app.post('/newPassword',Api.newPassword);
app.post('/resetPassword',Api.resetPassword);
app.post('/getUser',Api.getUser);
app.post('/loginDetail',Api.loginDetail);
app.post('/verifyCode',Api.verifyCode);
app.post('/addressList',Api.addressList);
app.post('/chatRoom',Api.chatRoom);
app.post('/chatMessage',Api.chatMessage);
app.post('/getChatMessage',Api.getChatMessage);
app.post('/updatedMessage',Api.updatedMessage);
app.post('/friendInvite',Api.friendInvite);
app.post('/UserProfile',Api.UserProfile);
app.post('/updateUserProfile',Api.updateUserProfile);
app.post('/SessionStorageId',Api.SessionStorageId);
app.post('/socialLogin',Api.socialLogin);




http.listen(port, function(){
    console.log('listening on *:8000');
});