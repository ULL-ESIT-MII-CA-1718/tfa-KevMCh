var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var User = require('../models/User')
var Rol = require('../models/Rol');

/* GET users list. */
router.get('/', function(req, res) {
  User.find().
    populate('rol').
    exec(function (err, users) {
      if (err) return next(err);

      res.json(users);
    });
});

/* GET a specific user */
router.get('/:id', function(req, res) {
  var userToFind = req.params.id;
  User.findOne({ '_id' : userToFind }).
    populate('rol').
    exec(function (err, user) {
      if (err) return next(err);

      res.json(user);
    });
});

/* POST to add a user. */
router.post('/add', function(req, res) {
  var user = req.body.user;
  var password = req.body.password;
  var rol = req.body.rol;

  req.checkBody('user', 'El campo de nombre es obligatorio.').notEmpty();
  req.checkBody('password', 'El campo de contraseña es obligatorio.').notEmpty();
  req.checkBody('rol', 'El campo del rol es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: errors });

  } else {
    Rol.findOne({ _id: req.body.rol }, function (err, rol) {
      if (err) return next(err);

      var newUser = new User ({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        password: req.body.password,
        rol: rol,
      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;

        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
  		});

      req.flash('success_msg', 'Usuario registrado.');
    });
  }
});

/* DELETE to remove a user */
router.delete('/delete/:id', function(req, res) {
  var userToDelete = req.params.id;
  User.remove({ '_id' : userToDelete }, function (err) {
    res.send(
        (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/* PUT to update a user */
router.put('/update/:id', function(req, res) {
  var user = req.body.user;
  var password = req.body.password;
  var rol = req.body.rol;

  req.checkBody('user', 'El campo de nombre es obligatorio.').notEmpty();
  req.checkBody('password', 'El campo de contraseña es obligatorio.').notEmpty();
  req.checkBody('rol', 'El campo de nombre es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: err });

  } else {
    Rol.findOne({ _id: req.body.rol }, function (err, rol) {
      if (err) return next(err);

      var userToUpdate = req.params.id;
      User.update(
        { _id: userToUpdate },
        { $set:
          {
            user: req.body.user,
            password: req.body.password,
            rol: rol
          }
        },
        function (err) {
          res.send(
              (err === null) ? { msg: '' } : { msg: err }
          );
        }
      );
    });
  }
});

module.exports = router;
