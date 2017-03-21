var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var models = require('../models');

/* GET users listing. */
router.get('/add', auth.checkLogin,function(req, res, next) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add', auth.checkLogin,function(req, res, next) {
    var article = req.body;
    article.user = req.session.user._id;
    models.Article.create(article,function (err,doc) {
        if(err){
            req.flash('error','发表文章失败');
        }else{
            req.flash('success','发表文章成功');
            res.redirect('/');
        }
    })
});

module.exports = router;
