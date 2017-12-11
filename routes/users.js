var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users list page. */
router.get('/userslist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('users');
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
});

/* POST to add a user. */
router.post('/add', function(req, res) {
    var db = req.db;
    var collection = db.get('users');

    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
