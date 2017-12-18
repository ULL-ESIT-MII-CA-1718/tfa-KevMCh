var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cmsa', { useMongoClient: true });
mongoose.Promise = global.Promise;

// Roles in the DB
var Rol = require('./Rol');

var admin = new Rol({
  _id: new mongoose.Types.ObjectId(),
  name: 'Administrador'
});

var col = new Rol({
  _id: new mongoose.Types.ObjectId(),
  name: 'Colegial'
});

// Types of meals
var TypeMeal = require('./TypeMeal');

var common = new TypeMeal({
  _id: new mongoose.Types.ObjectId(),
  name: 'Común'
});

var veget = new TypeMeal({
  _id: new mongoose.Types.ObjectId(),
  name: 'Vegetariana'
});

var vegan = new TypeMeal({
  _id: new mongoose.Types.ObjectId(),
  name: 'Vegana'
});

// Save
var adminProm = admin.save(function (err) {
  if (err) return handleError(err);
});

var colProm = col.save(function (err) {
  if (err) return handleError(err);
});

var commonProm = common.save(function (err) {
  if (err) return handleError(err);
});

var vegetProm = veget.save(function (err) {
  if (err) return handleError(err);
});

var veganProm = vegan.save(function (err) {
  if (err) return handleError(err);
});

Promise.all([adminProm, colProm, commonProm, vegetProm, veganProm]).
  then(result => {
    mongoose.connection.close()
  }
);
