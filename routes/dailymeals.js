var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var DailyMeals = require('../models/DailyMeals');

/* GET daily meals list. */
router.get('/', function(req, res) {
  DailyMeals.find({}, function (err, meals) {
    if (err) reject(err);

    res.json(meals);
  });
});

/* GET a specific daily meals */
router.get('/:id', function(req, res) {
  var dailymealsToFind = req.params.id;
  specificDailyMeal = DailyMeals.findOne({ '_id' : dailymealsToFind }).exec();

  var lunch = DailyMeals.findOne({ '_id' : dailymealsToFind }).
    populate('lunch').
    exec(function (err, dailymeal) {
      if (err) return next(err);
  });

  var dinner = DailyMeals.findOne({ '_id' : dailymealsToFind }).
    populate('dinner').
    exec(function (err, dailymeal) {
      if (err) return next(err);
  });

  Promise.all([specificDailyMeal, lunch, dinner]).then(result => {
    result[0].lunch = result[1].lunch;
    result[0].dinner = result[2].dinner;

    res.json(result[0]);
  });
});

module.exports = router;
