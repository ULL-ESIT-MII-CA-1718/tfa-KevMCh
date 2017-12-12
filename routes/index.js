var express = require('express');
var router = express.Router();

var Rol = require('../models/Rol.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users list page. */
router.get('/userslist', function(req, res, next) {
  res.render('users/userslist');
});

/* GET add a user page. */
router.get('/adduser', function(req, res, next) {
  Rol.find(function (err, roles) {
    if (err) return next(err);
    res.render('users/adduser', { roles: roles });
  });
});

module.exports = router;
