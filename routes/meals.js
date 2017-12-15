var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var TypeMeal = require('../models/TypeMeal');
var Meal = require('../models/meal.js');

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
  var mealToFind = req.params.id;
  Meal.findOne({ '_id' : mealToFind }).
    populate('types').
    exec(function (err, meal) {
      if (err) return next(err);

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
    var typesList = [];

    /* var p1 = Promise.resolve(3);
    var p2 = 1337;
    var p3 = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, "foo");
    });

    var prmis = [p1, p2, p3];

    Promise.all(prmis).then(types => {
      console.log(types);
    }); */

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

        req.flash('success_msg', 'Plato creado.');
      });
    });
  }
});

module.exports = router;
