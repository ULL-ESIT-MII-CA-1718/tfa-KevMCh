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

module.exports = router;
