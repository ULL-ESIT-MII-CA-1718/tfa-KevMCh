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
