var mongoose = require('mongoose');

var friendInviteSchema = mongoose.Schema({
   user_id:Object,
   friendsEmail:Array,
   insertedBY:String,
   insertedOn:Array,
   updatedBy:String,
   updatedOn:Array

});

mongoose.model('inviteFriend',friendInviteSchema);