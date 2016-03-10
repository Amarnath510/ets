var RemainderTrans = require('../models/remainders/RemainderTrans');
var MobileNumber = require('../models/remainders/MobileNumber');

module.exports = function(remainderRoute) {

	/* ADD REMAINDER */
	remainderRoute.post('/addRemainder', function(req, res) {
		if(req.session && req.session.username) {
			var remTrans = new RemainderTrans();
			remTrans.date = req.body.date;
			remTrans.myTime = req.body.myTime;
			remTrans.type = req.body.type;
			remTrans.desc = req.body.desc;
			remTrans.via = req.body.via;
			remTrans.username = req.session.username;

			remTrans.save(function(err, response) {
				if(err) {
					res.json({'result' : false});
				} else {
					res.json({'result' : true});
				}
			});
		} else {
			res.redirect('/login');
		}
	});

	/* GET ALL REMAINDERS */
	remainderRoute.get('/allRemainders', function(req, res) {
		if(req.session && req.session.username) {
			RemainderTrans.find({username : req.session.username}, function(err, response) {
				MobileNumber.findOne({username : req.session.username}, function(err, data) {
					if(data) {
						for(i = 0; i < response.length; i++) {
							response[i].mobile = data.mobile;
						}
						res.json(response);	
					} else {
						res.json(response);	
					}
				});
			});
		} else {
			res.redirect('/login');
		}
	});

	/* UPDATE ONE REMAINDER */
	remainderRoute.post('/updateRemById/:id', function(req, res) {
		if(req.session && req.session.username) { 
			RemainderTrans.findOne({_id: req.params.id}, function(err, data) {
				if(err) {
					throw err;
				} else {
					var updateRem = data;
					updateRem.date = req.body.date;
					updateRem.myTime = req.body.myTime;
					updateRem.type = req.body.type;
					updateRem.desc = req.body.desc;
					updateRem.via = req.body.via;
					updateRem.mobile = req.body.mobile;

					updateRem.save(function(err, data) {
						if(err) {
							throw err;
						} else {
							res.json(data);
						}
					});
				}
			});
		} else {
			res.redirect('/login');	
		}
	});

	/* DELETE REMAINDER */
	remainderRoute.delete('/removeRemById/:id', function(req, res) {
		if(req.session && req.session.username) {
			RemainderTrans.remove({_id: req.params.id}, function(err, response) {
				if(err) {
					res.json({'result' : 'Failure'});
				} else {
					res.json({'result' : 'Success'});
				}
			});
		}
	});

	/* DELETE ALL REMAINDERS */
	remainderRoute.delete('/removeAllRem', function(req, res) {
		if(req.session && req.session.username) {
			RemainderTrans.remove({}, function(err, response) {
				if(err) {
					res.json({'result' : 'Failure'});
				} else {
					res.json({'result' : 'Success'});
				}
			});
		}
	});

}