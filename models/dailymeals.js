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
        return Menu.getPromiseMenuById(dailyMeals.lunch._id);
      }
  });

  var dinner = DailyMeals.findOne({ '_id' : dailymealsToFind }).
    populate('dinner').
    exec().
    then(dailyMeals => {
      if (dailyMeals.dinner !== undefined) {
        return Menu.getPromiseMenuById(dailyMeals.dinner._id);
      }
  });

  Promise.all([specificDailyMeal, lunch, dinner]).then(callback);
}
