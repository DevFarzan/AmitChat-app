var mongoose = require('mongoose');

var addressListSchema = mongoose.Schema({

    userID:Object,
    isPrimary:Boolean,
    aliasName:String,
    address1:String,
    address2:String,
    address3:String,
    insertedBy:String,
    Zip:Number,
    insertedOn:Array,
    updatedBy:String,
    updatedOn:String
});

mongoose.model('userAddressList',addressListSchema);