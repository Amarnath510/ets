// Get the mongoose model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Now we have a mongoose connection available.
// We will create a schema.
var commentSchema = mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	comment: {type: String, required: true}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;