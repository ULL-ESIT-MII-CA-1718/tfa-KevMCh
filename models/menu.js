var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Meal = require("./Meal");

var menuSchema = Schema({
  _id: Schema.Types.ObjectId,
  starters: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  mainCourses: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  garnishs: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  desserts: [{ type: Schema.Types.ObjectId, ref: 'Meal' }]
});

var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;

function getMeals(type) {
  return Promise.all(type.map((id) =>
    Meal.getPromiseMealById(id)
  ));
}

module.exports.getPromiseMealsMenuById = function(menu) {
  var startersList = getMeals(menu.starters);
  var mainCoursesList = getMeals(menu.mainCourses);
  var garnishsList = getMeals(menu.garnishs);
  var dessertsList = getMeals(menu.desserts);

  return Promise.all([
    startersList,
    mainCoursesList,
    garnishsList,
    dessertsList
  ]);
}
