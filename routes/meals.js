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

/* POST to add a meal. */
router.post('/add', function(req, res) {
  var name = req.body.name;
  var typeMeal = req.body.typeMeal;

  req.checkBody('name', 'El campo de nombre es obligatorio.').notEmpty();
  req.checkBody('typeMeal', 'El campo del tipo es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: errors });

  } else {
    TypeMeal.findOne({ _id: typeMeal }, function (err, type) {
      if (err) return next(err);

      var newMeal = new Meal ({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        type: type,
      });

      newMeal.save(function (err) {
        if (err) return handleError(err);

        req.flash('success_msg', 'Plato creado.');
      });
    });
  }
});

module.exports = router;
