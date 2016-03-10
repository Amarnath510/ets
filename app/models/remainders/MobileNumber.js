var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MobileNumSchema = mongoose.Schema(
{
	username: {type: String, required: true},
	mobile: {type: String, required: true}
});

var MobileNum = mongoose.model('MobileNumber', MobileNumSchema);
module.exports = MobileNum;
