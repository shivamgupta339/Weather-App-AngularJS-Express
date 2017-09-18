//importing required dependencies
let mongoose = require('mongoose');
mongoose.set('debug',true);
let config = require('../config/config');
let schema = mongoose.Schema;

//defining schema of our collection
let assigSchema = new schema({
	userName : String,
	phoneNumber : Number,
	emailId : String,
	password : String
},{collection : "register", versionKey : false, unique: true});


assigSchema.methods.comparePassword = function (passw, cb) {
    if (this.password == passw) {
            cb(null,true);
        }
    else{
        cb(null, false);
    }
};



let model = mongoose.model('register',assigSchema);
//exporting model
module.exports = model;