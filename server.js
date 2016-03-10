// Modules
var express = require('express');
// var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

process.on('uncaughtException', function (error) {
   console.log(error.stack);
});

app.use(cookieParser());

// secret is used to encript the cookie.
app.use(session({secret : 'eToolStore', 
				 saveUninitialized: true, 
				 resave: true,
				 store: new MongoStore({mongooseConnection: mongoose.connection,
				 						ttl: 30 * 60 })
				}));

// db configuration file and connect db
var settings = require('./config/settings');
mongoose.connect(settings.dburl, function(err) {
	if(err) {
		console.log(err);
		console.log('DB is down. Exiting Application.');
		process.exit(1);
	} else {
		console.log('DB connection successful.');
	}
});

// server port
var port = process.env.PORT || 80;

// get data/stuff body parameters
app.use(bodyParser.json());

// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// client side pages, images, js will be present in the below location.
app.use(express.static(__dirname + '/public'));

// front end page routes
require('./app/routes/routes')(app);

// Route the server calls. Else these calls will go to client side routing i,e. appRoutes.js
// Also pass our application i,e. app variable to the routes.js file
// Then tell the server to router any calls that have api in their url to goto routes.js
var api = express.Router();
require('./app/routes/loginRoutes')(api);
app.use('/api', api);

// Expense Routes for server calls.
var expenseapi = express.Router();
require('./app/routes/expenseRoutes')(expenseapi);
app.use('/exapi', expenseapi);

// For Email calls
var emailapi = express.Router();
require('./app/routes/emailRoutes')(emailapi);
app.use('/mailapi', emailapi);

// For Remainder calls
var remainderapi = express.Router();
require('./app/routes/remainderRoutes')(remainderapi);
app.use('/remapi', remainderapi);

// For SMS calls
var smsapi = express.Router();
require('./app/routes/smsRoutes')(smsapi);
app.use('/smsapi', smsapi);

// Start the app
app.listen(port);

// shout out that the server is available
console.log('eToolsStore application is at port = ' + port);

// expose app to outside world.
exports = module.exports = app;