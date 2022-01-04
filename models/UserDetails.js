const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username :{
        type : String,
        required :true
    },
    Email :{
        type : String,
        required :true
    },
    password :{
        type : String,
        required :true
    }
},{timestamps : true});

const Details = mongoose.model('Details', userSchema);
module.exports = Details;
