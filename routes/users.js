var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('../util');

/* GET users listing. */
router.get('/reg', function(req, res, next) {
    res.render('user/reg', { title: '注册' });
});
router.post('/reg', function(req, res, next) {
    var user = req.body;
    if(user.password != user.repassword){
        res.redirect('back');
    }else {
        user.password = util.md5(user.password);
        models.User.create(user,function (err,doc) {
            if(err){
                req.flash('error','用户注册失败！');
            }else{
                req.flash('success','用户注册成功！');
                res.redirect('/users/login');
            }
        })
    }
});
router.get('/login', function(req, res, next) {
    res.render('user/login', { title: '登录' });
});
router.post('/login', function(req, res, next) {
    var user = req.body;
    user.password = util.md5(user.password);
    models.User.findOne({username:user.username,password:user.password},function (err,doc) {
        if(err){
            req.flash('error','用户登录失败！');
            res.redirect('back');
        }
        else if(doc){
            //如果登录成功之后，把查询成功的数据赋值给user
            req.session.user = doc;
            req.flash('success','用户登录成功！');
            res.redirect('/');
        }else{
            req.flash('error','用户登录失败！');
            res.redirect('back');
        }
    })
});
router.get('/logout', function(req, res, next) {
    req.session.user = null;
    req.flash('success','用户退出成功！');
    res.redirect('/');
});

module.exports = router;
