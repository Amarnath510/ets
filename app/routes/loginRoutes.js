var User = require('../models/User');
var bCrypt = require('bCrypt-nodejs');

module.exports = function(loginRouter) {
	
	loginRouter.post('/adduser', function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;

		user.save(function(err, data) {
			if(err) {
				throw err;
			}
			res.json(data);
		});
	});

	/* Get ALL Users */
	loginRouter.get('/allusers', function(req, res) {
		User.find({}, function(err, data) {
			res.json(data);
		});
	});

	/* Check all users for registration */
	loginRouter.post('/userregistration', function(req, res) {
		User.findOne({username: req.body.username}, function(err, data) {
			// For Registration, check whether the user exists or not.
			var result = 'Success';

			if(data) {
				result = 'User_Exists';
			}

			// If the user does not exist then save it to DB.
			if(result === 'Success') {
				// save it to the database
				var user = new User();
				user.username = req.body.username;
				user.password = encrypt(req.body.password);

				user.save(function(err, response) {
					if(err) {
						result = 'Save_Failed';
					} else {
						result = 'Success';
					}
				});
			}
			
			if(result === 'Success') {
				req.session.username = req.body.username;
			}

			res.json({'result' : result});
		});
	});

	/* Remove all docs from the collection */
	loginRouter.delete('/removeallusers', function(req, res) {
		User.remove({}, function(err) {
			res.json({result : err ? 'error' : 'ok'});
		});
	});

	/* Get user(s) by id */
	loginRouter.get('/getuserbyid/:id', function(req, res) {
		User.findOne({_id: req.params.id}, function(err, data) {
			res.json(data);
		});
	});

	/* Get user(s) by name */
	loginRouter.post('/login', function(req, res) {
		// console.log(bCrypt.compareSync(pwd, hash1) ? 'PASSED' : 'FAILED');
		User.findOne({username: req.body.username}, function(err, data) {
			// For Login, check for username and password of the user.
			// If login successful then save the username to session.
			if(data) {
				var originalPwd = req.body.password;
				var encryptedPwd = data.password;
				if(!decryptStatus(originalPwd, encryptedPwd)) {
					res.json({'result' : 'Failure'});	
				}

				req.session.username = req.body.username;
				res.json({'result' : 'Success'});
			} else {
				res.json({'result' : 'Failure'});
			}
		});
	});

	/* DELETE USER BY ID */
	loginRouter.delete('/removeuserbyid/:id', function(req, res) {
		User.remove({_id: req.params.id}, function(err) {
			res.json({result : err ? 'error' : 'ok'});
		});
	});

	/* DELETE USER BY USERNAME */
	loginRouter.delete('/removeuserbyname/:username', function(req, res) {
		User.remove({username: req.params.username}, function(err) {
			res.json({result : err ? 'error' : 'ok'});
		});
	});

	/* USER LOGOUT */
	loginRouter.get('/logout', function(req, res) {
		req.session.destroy();
		res.json({'result' : 'Success'});
	});

	/* IS SESSION */
	loginRouter.get('/isusersession', function(req, res) {
		if(req.session && req.session.username != undefined) {
			res.json({'result' : true, 'username' : req.session.username});
		} else {
			res.json({'result' : false});
		}
	});

	/* UPDATE PASSWORD FOR A USER */
	loginRouter.post('/updateuserpwd', function(req, res) {
		var result = '';
		User.findOne({username : req.body.username}, function(err, data) {
			if(err) {
				result = 'Save_Failed';
				res.json({'result' : result});
			} else {
				if(data) {
					var user = data;
					user.username = req.body.username;
					user.password = req.body.password;
					user.save(function(err, data) {
						if(err) {
							result = 'Save_Failed';
						} else {
							result = 'Success';
						}
						res.json({'result' : result});
					})
				} else {
					result = 'No_User';
					res.json({'result' : result});
				}
			}
		});
	});

	// To encrypt password
	function encrypt(data) {
		// We need salt. Else for same password we will get the same encrypted value.
		var salt = bCrypt.genSaltSync(9);
		var encryptedData = bCrypt.hashSync(data, salt, null);
		return encryptedData;
	}

	// To decrypt password
	function decryptStatus(originalPwd, encryptedPwd) {
		return bCrypt.compareSync(originalPwd, encryptedPwd) ? true : false;
	}

}