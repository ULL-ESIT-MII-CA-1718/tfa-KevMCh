var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = Schema({
  _id: Schema.Types.ObjectId,
  points: Number,
  meal: [{ type: Schema.Types.ObjectId, ref: 'Meal' }]
});

var Score = mongoose.model('Score', mealSchema);
module.exports = Score;
