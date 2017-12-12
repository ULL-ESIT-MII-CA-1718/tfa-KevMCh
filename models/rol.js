var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rolSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String
});

var Rol = mongoose.model('Rol', rolSchema)
module.exports = Rol;
