var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
   Admin:Object,
   adminName:String,
   Password:String
});
mongoose.model('admin',adminSchema);