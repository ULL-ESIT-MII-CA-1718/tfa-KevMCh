var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    exec(function (err, dailymeal) {
      if (err) return next(err);
  });

  var dinner = DailyMeals.findOne({ '_id' : dailymealsToFind }).
    populate('dinner').
    exec(function (err, dailymeal) {
      if (err) return next(err);
  });

  Promise.all([specificDailyMeal, lunch, dinner]).then(callback);
}
