var express = require('express');
var router = express.Router();

var User = require('../models/User.js');
var Rol = require('../models/Rol.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users list page. */
router.get('/userslist', function(req, res, next) {
  res.render('users/list');
});

/* GET page to add a user. */
router.get('/adduser', function(req, res, next) {
  Rol.find(function (err, roles) {
    if (err) return next(err);
    res.render('users/add', { roles: roles });
  });
});

/* GET page to modify a user. */
router.get('/modifyuser/:id', function(req, res, next) {
  var userToFind = req.params.id;
  User.findOne({ '_id' : userToFind }).
    populate('rol').
    exec(function (err, user) {
      if (err) return next(err);

      Rol.find(function (err, roles) {
        if (err) return next(err);
        res.render('users/modify', { user: user, roles: roles });
      });
    });
});

module.exports = router;
