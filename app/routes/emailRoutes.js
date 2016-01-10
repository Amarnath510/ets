var settings = require('../../config/settings');
var fs = require('fs');
var formidable = require('formidable');

var sendgrid = require('sendgrid')(settings.sg_uname, settings.sg_pwd);

var form = new formidable.IncomingForm();

module.exports = function(emailRoute) {
	emailRoute.post('/sendmail', function(req, res) {

		var mFileName = null;
		var mFilePath = null;
		var mContent = null;

		form.parse(req, function(err, fields, files) {
			mFileName = files.pdf.name;
			mFileType = files.pdf.type;
		});

		form.on('end', function() {
			mFilePath = this.openedFiles[0].path;

			sendgrid.send({
				to: 'amarnath2chandana@gmail.com',
				from: 'sushma.muthireddi@gmail.com',
				subject: 'Hello World',
				text: 'my First mail through sendgrid 123',
				files:  [
							{
								filename: mFileName,
								contentType: mFileType,
								path: mFilePath
							}
						]
			}, function(err, response) {
				if(err) {
					res.send('Failure');
				} else {
					res.send('Success');	
				}
			});	
		});

	});
}