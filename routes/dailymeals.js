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
  DailyMeals.getDailyMealsById(req.params.id, function(dailymeals) {
    dailymeals[0].lunch = dailymeals[1];
    dailymeals[0].dinner = dailymeals[2];

    res.json(dailymeals[0]);
  });
});

module.exports = router;
