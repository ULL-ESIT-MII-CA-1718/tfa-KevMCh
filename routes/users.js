var express = require('express');
var router = express.Router();

var User = require('../models/User.js')
var Rol = require('../models/Rol.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users list page. */
router.get('/userslist', function(req, res, next) {
  User.find().
    populate('Rol').
    exec(function (err, rol) {
      if (err) return next(err);

      res.json(rol);
    });
});

/* POST to add a user. */
router.post('/add', function(req, res) {
  Rol.findOne({ _id: req.body.rol }, function (err, rol) {
    if (err) return next(err);

    var newUser = new User ({
      _id: new req.db.Types.ObjectId(),
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
    if (err) return next(err);
  });
});

module.exports = router;
