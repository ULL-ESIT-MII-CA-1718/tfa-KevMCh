var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Score = require('../models/Score');
var Meal = require('../models/Meal');

/* GET score list. */
router.get('/', function(req, res) {
  Score.find().
    populate('meal').
    exec(function (err, scores) {
      if (err) return next(err);

      res.json(scores);
    });
});

/* POST to add a score. */
router.post('/add', function(req, res) {
  var mealID = req.body.mealID;
  var points = req.body.points;

  req.checkBody('mealID', 'El campo de comida es obligatorio.').notEmpty();
  req.checkBody('points', 'El campo de puntuación es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: errors });

  } else {
    Meal.findOne({ _id: mealID }, function (err, meal) {
      if (err) return next(err);

      var newScore = new Score ({
        _id: new mongoose.Types.ObjectId(),
        meal: meal,
        points: points,
      });

      newScore.save(function (err) {
        if (err) return handleError(err);

        req.flash('success_msg', 'Puntuación registrada.');
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
      });
    });
  }
});

/* DELETE to remove a score */
router.delete('/delete/:id', function(req, res) {
  var scoreToDelete = req.params.id;
  Meal.remove({ '_id' : scoreToDelete }, function (err) {
    res.send(
        (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/* PUT to update a score */
router.put('/update/:id', function(req, res) {
  var mealID = req.body.mealID;
  var points = req.body.points;

  req.checkBody('mealID', 'El campo de comida es obligatorio.').notEmpty();
  req.checkBody('points', 'El campo de puntuación es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: errors });

  } else {
    Meal.findOne({ _id: mealID }, function (err, meal) {
      if (err) return next(err);

      var scoreToUpdate = req.params.id;
      Score.update(
        { _id: scoreToUpdate },
        { $set:
          {
            points: points,
            meal: mealID
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
