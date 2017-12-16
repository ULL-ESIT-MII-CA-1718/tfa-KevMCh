var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');
var Rol = require('../models/Rol');
var TypeMeal = require('../models/TypeMeal');
var Meal = require('../models/Meal');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('users/login');
});

/* GET menu page. */
router.get('/menu', function(req, res, next) {
  res.render('menu');
});

/* GET users list page. */
router.get('/userslist', function(req, res, next) {
  res.render('users/list');
});

/* GET page to add a user. */
router.get('/adduser', function(req, res, next) {
  Rol.find(function (err, roles) {
    if (err) return next(err);
    res.render('users/add', { roles: roles });
  });
});

/* GET page to modify a user. */
router.get('/modifyuser/:id', function(req, res, next) {
  var userToFind = req.params.id;
  User.findOne({ '_id' : userToFind }).
    populate('rol').
    exec(function (err, user) {
      if (err) return next(err);

      Rol.find(function (err, roles) {
        if (err) return next(err);
        res.render('users/modify', { user: user, roles: roles });
      });
    });
});

/* LOGIN page */
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;

      if(!user){
        return done(null, false, {message: 'Usuario no registrado.'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Contraseña incorrecta.'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

/* POST to login a user */
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/menu',
    failureRedirect:'/',
    failureFlash: true
  }),
  function(req, res, next) {
    res.redirect('/');
});


router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'Sesión cerrada.');
	res.redirect('/');
});

/* GET page to add a meal. */
router.get('/addmeal', function(req, res, next) {
  TypeMeal.find(function (err, typemeals) {
    if (err) return next(err);
    res.render('meals/add', { typemeals: typemeals });
  });
});

/* GET meals list page. */
router.get('/mealslist', function(req, res, next) {
  res.render('meals/list');
});

/* GET page to modify a meal. */
router.get('/modifymeal/:id', function(req, res, next) {
  var mealToFind = req.params.id;
  Meal.findOne({ '_id' : mealToFind }).
    populate('types').
    exec(function (err, meal) {
      if (err) return next(err);

      TypeMeal.find(function (err, typesmeals) {
        if (err) return next(err);
        res.render('meals/modify', { meal: meal, typesmeals: typesmeals });
      });
    });
});

/* GET page to add a menu. */
router.get('/addmenu', function(req, res, next) {
	Meal.find().
    populate('type').
    exec(function (err, meals) {
      if (err) return next(err);

			res.render('menus/add', {
				starters: meals,
				mainCourses: meals,
				garnishs: meals,
				desserts: meals,
			});
    });
});

module.exports = router;
