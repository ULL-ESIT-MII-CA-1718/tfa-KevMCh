var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var TypeMeal = require('../models/TypeMeal');
var Meal = require('../models/Meal');

/* GET meals list. */
router.get('/', function(req, res) {
  Meal.find().
    populate('type').
    exec(function (err, meal) {
      if (err) return next(err);

      res.json(meal);
    });
});

/* GET a specific meal */
router.get('/:id', function(req, res) {
  Meal.getMealById(req.params.id, function(err, meal) {
    res.json(meal);
  });
});

/* POST to add a meal. */
router.post('/add', function(req, res) {
  var name = req.body.name;
  var typesMeal = req.body['typesMeal[]'];

  req.checkBody('name', 'El campo de nombre es obligatorio.').notEmpty();
  // req.checkBody('typesMeal', 'El campo del tipo es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: errors });

  } else {
    Promise.all(typesMeal.map((id) =>
      new Promise((resolve, reject) => {
        TypeMeal.findOne({ _id: id }, function (err, type) {
          if (err) reject(err);

          resolve(type);
        });
      })
    )).then(typesList => {
      var newMeal = new Meal ({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        types: typesList,
      });

      newMeal.save(function (err) {
        if (err) return handleError(err);

        req.flash('success_msg', 'Comida creada.');
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
      });
    });
  }
});

/* DELETE to remove a meal */
router.delete('/delete/:id', function(req, res) {
  var mealToDelete = req.params.id;
  Meal.remove({ '_id' : mealToDelete }, function (err) {
    res.send(
        (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/* PUT to update a user */
router.put('/update/:id', function(req, res) {
  var name = req.body.name;
  var typesMeal = req.body['typesMeal[]'];

  req.checkBody('name', 'El campo de nombre es obligatorio.').notEmpty();
  // req.checkBody('typesMeal', 'El campo del tipo es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: err });

  } else {
    Promise.all(typesMeal.map((id) =>
      new Promise((resolve, reject) => {
        TypeMeal.findOne({ _id: id }, function (err, type) {
          if (err) reject(err);

          resolve(type);
        });
      })
    )).then(typesList => {
      console.log("Promise all")
      var mealToUpdate = req.params.id;
      Meal.update(
        { _id: mealToUpdate },
        { $set:
          {
            name: name,
            types: typesList
          }
        },
        function (err) {
          res.send(
              (err === null) ? { msg: '' } : { msg: err }
          );
        }
      );

      req.flash('success_msg', 'Comida modificada.');
    });
  }
});

module.exports = router;
