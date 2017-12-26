var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = Schema({
  _id: Schema.Types.ObjectId,
  starters: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  mainCourses: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  garnishs: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  desserts: [{ type: Schema.Types.ObjectId, ref: 'Meal' }]
});

var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;

module.exports.getPromiseMenuById = function(id) {
  return Menu.findById(id).exec();
}
