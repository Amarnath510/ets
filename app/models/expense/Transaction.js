var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = mongoose.Schema({
	date: {type: Date, default: Date.now, required: true},
	amount: {type: Number, required: true},
	type: {type: String, required: true},
	incorexp: {type: String, required: true},
	desc: {type: String},
	username: {type: String}
});

var Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;