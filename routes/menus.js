var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Meal = require('../models/Meal');
var Menu = require('../models/Menu');
var DailyMeals = require('../models/DailyMeals');

/* POST to add a menu. */
router.post('/add', function(req, res) {
  var date = req.body.date;
  var type = req.body.type;
  var starters = null;
  var mainCourses = null;
  var garnishs = null;
  var desserts = null;

  if(Array.isArray(req.body['starters[]'])) {
    starters = req.body['starters[]'];
  } else {
    starters = new Array();
    starters.push(req.body['starters[]']);
  }

  if(Array.isArray(req.body['mainCourses[]'])) {
    mainCourses = req.body['mainCourses[]'];
  } else {
    mainCourses = new Array();
    mainCourses.push(req.body['mainCourses[]']);
  }

  if(Array.isArray(req.body['garnishs[]'])) {
    garnishs = req.body['garnishs[]'];
  } else {
    garnishs = new Array();
    garnishs.push(req.body['garnishs[]']);
  }

  if(Array.isArray(req.body['desserts[]'])) {
    desserts = req.body['desserts[]'];
  } else {
    desserts = new Array();
    desserts.push(req.body['desserts[]']);
  }

  req.checkBody('date', 'El campo de fecha es obligatorio.').notEmpty();
  req.checkBody('type', 'El campo de tipo es obligatorio.').notEmpty();
  // req.checkBody('starters', 'El campo de primer plato es obligatorio.').notEmpty();
  // req.checkBody('mainCourses', 'El campo de segundo plato es obligatorio.').notEmpty();
  // req.checkBody('garnishs', 'El campo de la guarnición es obligatorio.').notEmpty();
  // req.checkBody('desserts', 'El campo de postre es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: errors });

  } else {
    var startersList;
    var mainCoursesList;
    var garnishsList;
    var dessertsList;

    Promise.all(starters.map((id) =>
      new Promise((resolve, reject) => {
        Meal.findOne({ _id: id }, function (err, type) {
          if (err) reject(err);

          resolve(type);
        });
      })
    )).then(starters => {
      startersList = starters;

      Promise.all(mainCourses.map((id) =>
        new Promise((resolve, reject) => {
          Meal.findOne({ _id: id }, function (err, type) {
            if (err) reject(err);

            resolve(type);
          });
        })
      )).then(mainCourses => {
        mainCoursesList = mainCourses;

        Promise.all(garnishs.map((id) =>
          new Promise((resolve, reject) => {
            Meal.findOne({ _id: id }, function (err, type) {
              if (err) reject(err);

              resolve(type);
            });
          })
        )).then(garnishs => {
          garnishsList = garnishs;

          Promise.all(desserts.map((id) =>
            new Promise((resolve, reject) => {
              Meal.findOne({ _id: id }, function (err, type) {
                if (err) reject(err);

                resolve(type);
              });
            })
          )).then(desserts => {
            dessertsList = desserts;

            var newMenu = new Menu ({
              _id: new mongoose.Types.ObjectId(),
              starters: startersList,
              mainCourses: mainCoursesList,
              garnishs: garnishsList,
              desserts: dessertsList,
            });

            newMenu.save(function (err) {
              if (err) return handleError(err);

              req.flash('success_msg', 'Menú creado.');
            });

            DailyMeals.findOne({ 'date' : date }).
              exec(function (err, dailyMeals) {
                if (err) return err;

                if (!dailyMeals) {
                  if(type === 'Almuerzo') {
                    var newDailyMeals = new DailyMeals ({
                      _id: new mongoose.Types.ObjectId(),
                      lunch: newMenu,
                      date: date,
                    });
                  } else {
                    if (type === 'Cena') {
                      var newDailyMeals = new DailyMeals ({
                        _id: new mongoose.Types.ObjectId(),
                        dinner: newMenu,
                        date: date,
                      });
                    }
                  }

                  newDailyMeals.save(function (err) {
                    if (err) return err;

                    req.flash('success_msg', 'Comida del día creada.');
                    res.send(
                        (err === null) ? { msg: '' } : { msg: err }
                    );
                  });
                } else {
                  if(type === 'Almuerzo') {
                    DailyMeals.update(
                      { date: date },
                      { $set:
                        {
                          lunch: newMenu
                        }
                      },
                      function (err) {
                        res.send(
                            (err === null) ? { msg: '' } : { msg: err }
                        );
                      }
                    );
                  } else {
                    if (type === 'Cena') {
                      DailyMeals.update(
                        { date: date },
                        { $set:
                          {
                            dinner: newMenu
                          }
                        },
                        function (err) {
                          res.send(
                              (err === null) ? { msg: '' } : { msg: err }
                          );
                        }
                      );
                    }
                  }
                }
              });
          });
        });
      });
    });
  }
});

/* GET a specific menu */
router.get('/:id', function(req, res) {
  Menu.findById(req.params.id, function(err, menu) {
    if(menu) {
      Menu.getPromiseMealsMenuById(menu).then(function(result) {
        res.json(result);
      });
    }
  });
});

/* PUT to update a menu */
router.put('/update/:id', function(req, res) {
  var starters = req.body['starters[]'];
  var mainCourses = req.body['mainCourses[]'];
  var garnishs = req.body['garnishs[]'];
  var desserts = req.body['desserts[]'];

  // req.checkBody('starters', 'El campo de primer plato es obligatorio.').notEmpty();
  // req.checkBody('mainCourses', 'El campo de segundo plato es obligatorio.').notEmpty();
  // req.checkBody('garnishs', 'El campo de la guarnición es obligatorio.').notEmpty();
  // req.checkBody('desserts', 'El campo de postre es obligatorio.').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.send({ msg: errors });

  } else {
    Menu.update(
      { _id: req.params.id },
      { $set:
        {
          starters: starters,
          mainCourses: mainCourses,
          garnishs: garnishs,
          desserts: desserts
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

/* DELETE to remove a menu */
router.delete('/delete/:id', function(req, res) {
  Menu.deleteMenuByID(req.params.id, function(err) {
    res.send(
        (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

module.exports = router;
