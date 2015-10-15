var mongoose = require('mongoose');


var loginSchema = mongoose.Schema({

    UserNameID:String,
    ip_address:String,
    InsertedDate:Array,
    Location:String,
    InsertedBy:String,
    updatedBy:String,
    updatedOn:String

});

mongoose.model('userLogin',loginSchema);
