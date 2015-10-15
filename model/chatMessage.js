var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var chatRoomSchema = mongoose.Schema({
    RoomID:{type: String, required: true, unique: true },
    RoomIcon:String,
    RoomName:String,
    userName:Array

});
mongoose.model('ChatRoom',chatRoomSchema);
chatRoomSchema.plugin(uniqueValidator,{ message: 'Error, expected {RoomID} to be unique.' });



var chatMessageSchema = mongoose.Schema({
    RoomID:{type: String, required: true, unique: true },
    RoomIcon:String,
    RoomName:String,
    InsertedBy:String,
    InsertedOn:Array,
    chatMessage:Array
});
mongoose.model('chatMessage',chatMessageSchema);
chatMessageSchema.plugin(uniqueValidator,{message:'Error , expected {RoomID} to be unique.'});