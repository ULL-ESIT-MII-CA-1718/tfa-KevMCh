var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users list page. */
router.get('/userslist', function(req, res, next) {
  res.render('userslist', { title: 'Express' });
});

/* GET add a user page. */
router.get('/adduser', function(req, res, next) {
  res.render('adduser', { roles: {adm: 'Administrador', col: 'Colegial'} });
});

module.exports = router;
