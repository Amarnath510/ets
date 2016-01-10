module.exports = function(app) {

	app.get('/', function(req, res) {
		res.sendfile('./public/views/index.html');
	});


	app.get('/home', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	app.get('/services', function(req, res) {
		res.sendfile('./public/views/index.html');
	});	

	app.get('/services/expensereporting', function(req, res) {
		if(req.session.username === undefined) {
			req.session.redirectTo = '/services/expensereporting';
			res.redirect('/login');
		} else {
			res.sendfile('./public/views/index.html');
		}
	});

	app.get('/remainders', function(req, res) {
		if(req.session.username === undefined) {
			req.session.redirectTo = '/remainders';
			res.redirect('/login');
		} else {
			res.sendfile('./public/views/index.html');
		}
	});

	app.get('/login', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	app.get('/register', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

};