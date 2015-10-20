var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var usersSchema = mongoose.Schema({
    userName:{type: String, required: true, unique: true } ,
    email:String,
    verifyCode:String,
    pass:String,
    userPhoneNumber:Number,
    userGender:String,
    code_Verified:Boolean,
    insertedBy:String,
    InsertedDate:Array,
    randomForPassword:String,
    sessionCode:String,
    ProfilePicture: [{'src':String,'current':Boolean}]

});
 mongoose.model('User',usersSchema);
usersSchema.plugin(uniqueValidator,{ message: 'Error, expected {userName} to be unique.' });

