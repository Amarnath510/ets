var settings = require('../../config/settings');
var fs = require('fs');
var formidable = require('formidable');

var sendgrid = require('sendgrid')(settings.sg_uname, settings.sg_pwd);

var form = new formidable.IncomingForm();

module.exports = function(emailRoute) {
	emailRoute.post('/sendmail', function(req, res) {

		if(req.session && req.session.username) {
			// mail file name, file path, file conenteType
			var mFileName = null;
			var mFilePath = null;
			var mContent = null;

			// data and toEmail address.
			var dateStr = null;
			var toEmail = null;

			form.parse(req, function(err, fields, files) {
				mFileName = files.pdf.name;
				mFileType = files.pdf.type;
				
				dateStr = fields.dateStr;
				toEmail = fields.toEmail;
				// console.log('Field date: ' + fields.dateStr);
				// console.log('Field date: ' + fields.toEmail);
			});

			form.on('end', function() {
				mFilePath = this.openedFiles[0].path;

				sendgrid.send({
					to: toEmail,
					from: settings.etsEmail,
					subject: 'Expense Report for the month of' + ' ' + dateStr,
					text: 'Please find the attached expense report for the month of' + ' ' + dateStr,
					files:  [
								{
									filename: mFileName,
									contentType: mFileType,
									path: mFilePath
								}
							]
				}, function(err, response) {
					var result = 'Success';
					if(err) {
						result = 'Failure';
					} else {
						result = 'Success';
					}
					res.send(result);
				});	
			});			
		} else {
			res.redirect('/login');
		}
	});
}