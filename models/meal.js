var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mealSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  types: [{ type: Schema.Types.ObjectId, ref: 'TypeMeal' }]
});

var Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
