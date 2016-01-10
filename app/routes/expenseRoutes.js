var Transaction = require('../models/expense/Transaction');

module.exports = function(expenseRoute) {
	
	/* INSERT ONE */
	expenseRoute.post('/addtrans', function(req, res) {

		try {
			var trans = new Transaction();
			trans.date = req.body.date;
			trans.type = req.body.type;
			trans.amount = req.body.amount;
			trans.incorexp = req.body.incorexp;
			trans.desc = req.body.desc;
			trans.username = req.session.username;

			trans.save(function(err, data) {
				if(err) {
					throw err;
				} else {
					res.json(data);
				}
			});
		} catch(ex) {
			throw ex;
		}
	});

	/* SELECT ALL */
	expenseRoute.get('/alltrans', function(req, res) {
		Transaction.find({}, function(err, data) {
			res.json(data);
		});
	});

	/* SELECT ALL IN DATE RANGE */
	expenseRoute.get('/alltransbydate/:sDate/:eDate', function(req, res) {
		Transaction.find({ 'date' : {'$gte' : req.params.sDate, '$lt' : req.params.eDate}, 'username': req.session.username}, function(err, data) {
			res.json(data);
		});
	});

	/* SELECT ONE */
	expenseRoute.get('/gettrans/:id', function(req, res) {
		Transaction.findOne({_id: req.params.id}, function(err, data) {
			res.json(data);
		});
	});

	/* DELETE ALL */
	expenseRoute.delete('/removealltrans', function(req, res) {
		Transaction.remove({}, function(err) {
			res.json({result : err ? 'error' : 'ok'});
		});
	});

	/* DELETE ONE */
	expenseRoute.delete('/removetrans/:id', function(req, res) {
		Transaction.remove({_id: req.params.id}, function(err) {
			res.json({result : err ? 'error' : 'ok'});
		});
	});

	/* UPDATE ONE */
	expenseRoute.post('/updatetrans/:id', function(req, res) {
		Transaction.findOne({_id: req.params.id}, function(err, data) {
			if(err) {
				throw err;
			} else {
				var trans = data;
				trans.date = req.body.date;
				trans.type = req.body.type;
				trans.amount = req.body.amount;
				trans.incorexp = req.body.incorexp;
				trans.desc = req.body.desc;
				trans.save(function(err, data) {
					if(err) {
						throw err;
					} else {
						res.json(data);
					}
				});
			}
		});
	});
}