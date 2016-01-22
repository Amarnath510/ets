angular.module('PdfSrv', []).service('pdfService', ['clientPropertiesService', 'imgUriService', 'loginService', function(clientPropertiesService, imgUriService, loginService) {
	
	this.createPdf = function(username, tableRows, hashMap) {
		var columns = clientPropertiesService.getPdfCols();
		var rows = tableRows;
		
		var dateStr = hashMap['dateStr'];
		var totalIncome = hashMap['totalIncome'];
		var totalExpense = hashMap['totalExpense'];
		var totalSaving = hashMap['totalSaving'];

		// Only pt supported (not mm or in)
		var doc = new jsPDF('p', 'pt');
		doc.autoTable(columns, rows, {                        
		    margin: {
		                top: 100
		            },

		    beforePageContent: function(data) {
		        if(hashMap['requestType'] === clientPropertiesService.getDownloadStr()) {
		        	var imgData = imgUriService.getTitleUri();
		        	doc.addImage(imgData, 'JPEG', 40, 30, 100, 30); 	
		        }
		        
		        doc.text('Income and Expense for the month of ' + dateStr + '.', 40, 80); 
		    },

		    afterPageContent: function(data) {

		    	var FONT_10 = 10;
		    	var FONT_13 = 13;
		    	var FONT_14 = 14;

		    	// default color is "doc.setTextColor(100);"
		    	// pure black: doc.setTextColor(0); you can also use rgb for the same.

		    	doc.setFontSize(FONT_13);
		    	doc.text('Total Income = ' + totalIncome, 40, doc.autoTableEndPosY() + 30);
		    	doc.text('Total Expense = ' + totalExpense, 40, doc.autoTableEndPosY() + 45);
		    	doc.text('Total Saving = ' + totalSaving, 40, doc.autoTableEndPosY() + 60);

		    	// add y-axis by 20 from now. As the last one is 60 now we will make the next one point at 80
		    	doc.setFontSize(FONT_10);
		    	doc.text('To update data please visit ', 40, doc.autoTableEndPosY() + 80);
		    	
		    	doc.setTextColor(2, 143, 204);
		    	doc.setFontSize(FONT_14);
		    	// length of text 'To update data please visit ' x 4 => 28 x 4 => 112 + 10 (10 to give some more space.)
		    	doc.text('www.eToolStore.in', 122 + 40, doc.autoTableEndPosY() + 80);

		    	doc.setFontSize(FONT_10);
		    	doc.setTextColor(100);
		    	doc.text('For any queries please write to ', 40, doc.autoTableEndPosY() + 100);

		    	doc.setFontSize(FONT_14);
		    	doc.setTextColor(2, 143, 204);
		    	doc.text('etoolsstore@gmail.com', (32 * 4) + 10 + 40, doc.autoTableEndPosY() + 100);
		    }
		});

		return doc;
	};
}]);