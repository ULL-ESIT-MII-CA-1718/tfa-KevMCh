var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Score = require('../models/Score');

/* GET score list. */
router.get('/', function(req, res) {
  Score.find().
    populate('meal').
    exec(function (err, scores) {
      console.log(err)
      if (err) return next(err);

      res.json(scores);
    });
});

module.exports = router;
