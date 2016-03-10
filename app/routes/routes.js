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
		if(req.session && req.session.username) { 
			res.sendfile('./public/views/index.html');
		} else {
			res.redirect('/login');
		}
	});

	app.get('/services/remainders', function(req, res) {
		if(req.session && req.session.username) { 
			res.sendfile('./public/views/index.html');
		} else {
			res.redirect('/login');
		}
	});

	app.get('/login', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	app.get('/register', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	app.get('/about', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	app.get('/contact', function(req, res) {
		res.sendfile('./public/views/index.html');
	});	

};