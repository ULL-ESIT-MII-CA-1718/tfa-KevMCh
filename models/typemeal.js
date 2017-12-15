var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typemealSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String
});

var TypeMeal = mongoose.model('TypeMeal', typemealSchema);
module.exports = TypeMeal;
