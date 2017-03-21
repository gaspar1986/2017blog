var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);
exports.User = mongoose.model('user',new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    avatar:String
}))
exports.Article = mongoose.model('article',new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now()}
}))
