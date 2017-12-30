var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Menu = require('../models/Menu');

var dailymealsSchema = Schema({
  _id: Schema.Types.ObjectId,
  lunch: { type: Schema.Types.ObjectId, ref: 'Menu' },
  dinner: { type: Schema.Types.ObjectId, ref: 'Menu' },
  date: Date
});

var DailyMeals = mongoose.model('DailyMeals', dailymealsSchema);
module.exports = DailyMeals;

module.exports.getDailyMealsById = function(dailymealsToFind, callback) {
  specificDailyMeal = DailyMeals.findOne({ '_id' : dailymealsToFind }).exec();

  var lunch = DailyMeals.findOne({ '_id' : dailymealsToFind }).
    populate('lunch').
    exec().
    then(dailyMeals => {
      if (dailyMeals.lunch !== undefined) {
        return Menu.getPromiseMealsMenuById(dailyMeals.lunch);
      }
  });

  var dinner = DailyMeals.findOne({ '_id' : dailymealsToFind }).
    populate('dinner').
    exec().
    then(dailyMeals => {
      if (dailyMeals.dinner !== undefined) {
        return Menu.getPromiseMealsMenuById(dailyMeals.dinner);
      }
  });

  Promise.all([specificDailyMeal, lunch, dinner]).then(callback);
}

module.exports.deleteByID = function(dailymealsToDelete, callback) {
  DailyMeals.findOne({ '_id' : dailymealsToDelete }).
    exec(function (err, dailyMeals) {
      if (err) return next(err);

      var lunch = Menu.remove({ '_id': dailyMeals.lunch });
      var dinner = Menu.remove({ '_id': dailyMeals.dinner });

      Promise.all([lunch, dinner]).then(() => {
        DailyMeals.remove({ '_id' : dailymealsToDelete }, callback);
      });
  });
}
