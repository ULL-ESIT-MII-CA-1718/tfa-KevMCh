var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  _id: Schema.Types.ObjectId,
  user: String,
  password: String,
  rol: { type: Schema.Types.ObjectId, ref: 'rol' }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
