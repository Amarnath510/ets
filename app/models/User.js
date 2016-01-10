// Get the mongoose model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Now we have a mongoose connection available.
// We will create a schema.
var userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;