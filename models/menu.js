var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = Schema({
  _id: Schema.Types.ObjectId,
  starter: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  mainCourse: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  garnish: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  dessert: [{ type: Schema.Types.ObjectId, ref: 'Meal' }]
});

var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
