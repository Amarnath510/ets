angular.module('ExpenseProp', []).service('expenseProperties', function() {

	var INCOME = 'Income';
	var EXPENSE = 'Expense';
	var DEFAULT_TYPE = 'Type';
	var SAVINGS = 'Savings';
	var DATE_FORMAT = 'MMM-yyyy';
	var DOWNLOAD = 'Download';
	var EMAIL = 'Email';

	var MSG_TRANS_DATE_MISSING = 'Please enter Date.';
	var MSG_TRANS_AMOUNT_MISSING = 'Please enter Amount.';
	var MSG_TRANS_TYPE_MISSING = 'Please enter Type.';

	var MSG_CONFIRM_DOWNLOAD = 'Do you want to download expense report for';
	var MSG_CONFIRM_EMAIL = 'Do you want to send expense report for';
	var MSG_SENT_EMAIL_SUCCESS = 'Your email has been sent successfully.';
	var MSG_SENT_EMAIL_FAILED = 'Failed to send email. Please try again later.';

	// var expense_table_columns = ["Date", "Amount", "Type", "Transaction", "Operation"];
	var incomeItems = ["Salary", "Reimbursement", "Property Rents"];
	var expenseItems = ["Fuel", "Grocery", "Entertainment", "House Rent", "Electricity Bill", "Travel"];

	var EXP_PAGE_SIZE = 8;

	var PDFCOLS = [
                    {title: "Date", dataKey: "date"},
                    {title: "Amount", dataKey: "amount"},
                    {title: "Type", dataKey: "type"},
                    {title: "Transaction", dataKey: "incorexp"},
                    {title: "Description", dataKey: "desc"}
                  ];

	/* pie/bar chart properties - START */
	var pie_chart_properties = {
		chart: {
            type: 'pieChart',
            height: 250,
            x: function(d){return d.key;},
            y: function(d){return d.value;},
            useInteractiveGuideline: true,
            showLabels: true,
            transitionDuration: 500,
            labelThreshold: 0.01,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            },
            noData: ' '
        }
	};

	var bar_chart_properties = {
		chart: {
            type: 'discreteBarChart',
            height: 280,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            useInteractiveGuideline: true,
            showValues: true,
            valueFormat: function(d){
                return d3.format('')(d);
            },
            transitionDuration: 500,
            xAxis: {
               	//axisLabel: 'Type'
            },
            yAxis: {
                //axisLabel: 'Amount',
                axisLabelDistance: -1
			},
			noData: 'No Income/Expense Data yet.'
        }
	};
	/* pie/bar chart properties - END */

	this.getDateFormat = function() {
		return DATE_FORMAT;
	};

	this.getDefaultType = function() {
		return DEFAULT_TYPE;
	};

	this.getIncomeStr = function() {
		return INCOME;
	};

	this.getExpenseStr = function() {
		return EXPENSE;
	};

	this.getPieChartOptions = function() {
		return pie_chart_properties;
	};

	this.getBarChartOptions = function() {
		return bar_chart_properties;
	};

	this.getIncomeItems = function() {
		return incomeItems;
	};

	this.getExpenseItems = function() {
		return expenseItems;
	};

	this.getSavingsStr = function() {
		return SAVINGS;
	};

	this.getDownloadStr = function() {
		return DOWNLOAD;
	};

	this.getEmailStr = function() {
		return EMAIL;
	};

	this.getMsgTransDateMissing = function() {
		return MSG_TRANS_DATE_MISSING;
	};

	this.getMsgTransAmountMissing = function() {
		return MSG_TRANS_AMOUNT_MISSING;
	};

	this.getMsgTransTypeMissing = function() {
		return MSG_TRANS_TYPE_MISSING;
	};

	this.getMsgConfirmDownload = function() {
		return MSG_CONFIRM_DOWNLOAD;
	};

	this.getMsgConfirmEmail = function() {
		return MSG_CONFIRM_EMAIL;
	}	

	this.getMsgSentEmailSuccess = function() {
		return MSG_SENT_EMAIL_SUCCESS;
	}

	this.getMsgSentEmailFailed = function() {
		return MSG_SENT_EMAIL_FAILED;
	}

	this.getExpPageSize = function() {
		return EXP_PAGE_SIZE;
	}

		this.getPdfCols = function() {
		return PDFCOLS;
	}

});