var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = Schema({
  _id: Schema.Types.ObjectId,
  points: Number,
  meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
