var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var User = require('../models/User.js')
var Rol = require('../models/Rol.js');

/* GET users list. */
router.get('/', function(req, res) {
  User.find().
    populate('rol').
    exec(function (err, rol) {
      if (err) return next(err);

      res.json(rol);
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
  Rol.findOne({ _id: req.body.rol }, function (err, rol) {
    if (err) return next(err);

    var newUser = new User ({
      _id: new mongoose.Types.ObjectId(),
      user: req.body.user,
      password: req.body.password,
      rol: rol,
    });

    newUser.save(function (err) {
      res.send(
          (err === null) ? { msg: '' } : { msg: err }
      );
    });
  });
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
  console.log("Cuerpo")
  console.log(req.body)
  console.log("ID")
  console.log(req.params.id)

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
});

module.exports = router;
