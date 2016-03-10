var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RemainderSchema = mongoose.Schema(
{
	date: {type: Date, default: Date.now, required: true},
	myTime: {type: Date, required: true},
	type: {type: String, required: true},
	desc: {type: String, required: true},
	via: {type: String, required: true},
	mobile: {type: String},
	username: {type: String, required: true}
});

var RemainderTrans = mongoose.model('Remainders', RemainderSchema);
module.exports = RemainderTrans;