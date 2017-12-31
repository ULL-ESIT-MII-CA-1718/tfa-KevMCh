var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cmsa', { useMongoClient: true });
mongoose.Promise = global.Promise;

// Roles in the DB
var Rol = require('./Rol');

var rolIDAdmin = new mongoose.Types.ObjectId();
var admin = new Rol({
  _id: rolIDAdmin,
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
  if (err) console.log(err);
});

var colProm = col.save(function (err) {
  if (err) console.log(err);
});

var commonProm = common.save(function (err) {
  if (err) console.log(err);
});

var vegetProm = veget.save(function (err) {
  if (err) console.log(err);
});

var veganProm = vegan.save(function (err) {
  if (err) console.log(err);
});

var adminUser = admin.save(function (err) {
  if (err) console.log(err);
});

// Admin user in the DB
var User = require('./User');

var newUser = new User ({
  _id: new mongoose.Types.ObjectId(),
  user: 'admin',
  password: 'admin',
  rol: rolIDAdmin,
});

var userAdmin = new Promise(function (fulfill, reject){
    User.createUser(newUser, function(err, user){
      if(err) reject(err);

      fulfill(user);
    })
});

Promise.all([
  adminProm,
  colProm,
  commonProm,
  vegetProm,
  veganProm,
  adminUser,
  userAdmin
]).then(result => {
    mongoose.connection.close()
  }
);
