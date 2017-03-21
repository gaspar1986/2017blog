var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tyg');
db.connection.on('open',function () {
    console.log('数据库连接成功！');
})
//数据库的结构定义
var personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String
})
//定义一个操作数据库的模型,第一个参数为集合的名字
var personModel = mongoose. model('person',personSchema);
personModel.update({name:'HH'},{$inc:{age:100}},function (err,doc) {
    if(err){
        console.log(err);
    }
})
//创建实体,可以操作数据库
/*var personEntity = new personModel({
    name:'HH',
    age:31,
    email:'gaspar@163.com'
})
var promise = personEntity.save();
promise.then(function (doc) {
        console.log(doc);
})*/
//obj.find(查询条件,callback)
/*
var arr = [
    {
        name:'HH',
        age:31,
        email:'gaspar@163.com'
    },
    {
        name:'dd',
        age:10,
        email:'dd@163.com'
    }
]
personModel.create(arr,function (err,doc) {
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }
})
personModel.find({},function (err,doc) {
    if(err){
        console.log(err);
    }else{
        console.log( doc instanceof Array);
    }
})*/
