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
    res.json(dailymeals);
  });
});

/* PUT to update a user */
router.put('/update/:id', function(req, res) {
  var date = req.body.date;

  req.checkBody('date', 'El campo de fecha es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: err });

  } else {
    DailyMeals.update(
      { _id: req.params.id },
      { $set:
        {
          date: date
        }
      },
      function (err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
      }
    );
  }
});

module.exports = router;
