var MobileNumber = require('../models/remainders/MobileNumber');

var ACCOUNT_SID = 'ACe76f61f1f21f0abf797ed78b4fed09f6';
var AUTH_TOKEN = '032e2fec6bec5e2e40c51ba79c406e61';

var twilioAcct = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

module.exports = function(smsRoute) {
	smsRoute.get('/sendsms', function(req, res) {
		twilioAcct.sendMessage(
		{
			to: '+917259196989',
			from: '+12053012773',
			body: 'Hello World'
		}, function(err, response) {
			if(err) {
				res.send("ERROR");
			} else {
				res.send("SUCCESS");
			}
		});
	});

	smsRoute.post('/addupdatemobile', function(req, res) {
		if(req.session && req.session.username) {
			MobileNumber.findOne({username: req.session.username}, function(err, data) {
				if(err) {
					res.json({'result' : 'Failure'});
				} else {
					if(data) {
						// If data is there then we will update the record only of the mobile num is different.
						var updateMobile = data;
						if(req.body.mobile != updateMobile.mobile) {
							updateMobile.mobile = req.body.mobile;
							updateMobile.save(function(err, response) {
								if(err) {
									res.json({'result' : 'Failure'});
								} else {
									res.json({'result' : 'Success'});
								}
							});	
						}
					} else {
						// we will insert record
						var newMobile = new MobileNumber();
						newMobile.username = req.session.username;
						newMobile.mobile = req.body.mobile;

						newMobile.save(function(err, response) {
							if(err) {
								res.json({'result' : 'Failure'});
							} else {
								res.json({'result' : 'Success'});	
							}
						});
					}
				}
			});
		} else {
			res.redirect('/login');			
		}
	});

	smsRoute.get('/getMobileNum', function(req, res) {
		if(req.session && req.session.username) {
			MobileNumber.findOne({username: req.session.username}, function(err, data) {
				if(err) {
					res.json({'result' : false});
				} else {
					if(undefined == data) {
						res.json({'result' : false});
					} else {
						res.json({'result' : true, 'data' : data});
					}
				}
			});
		} else {
			res.redirect('/login');			
		}
	});

}