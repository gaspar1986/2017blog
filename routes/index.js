var express = require('express');
var router = express.Router();
var modles = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  modles.Article.find({}).populate('user').exec(function (err,articles) {
      res.render('index', { title: '首页',articles:articles});
  })
});

module.exports = router;
