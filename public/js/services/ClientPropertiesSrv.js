angular.module('ClientPropertiesSrv', []).service('clientPropertiesService', function(imgUriService) {

	// final variables
	var INCOME = 'Income';
	var EXPENSE = 'Expense';
	var DEFAULT_TYPE = 'Type';
	var SAVINGS = 'Savings';	
	var DATE_FORMAT = 'MMM-yyyy';
	var ALL = 'All';
	var SUCCESS = 'Success';
	var FAILURE = 'Failure';
	var PASSWORD_MISMATCH = 'Password_Mismatch';
	var USER_EXISTS = 'User_Exists';
	var NO_USER = 'No_User';
	var SAVE_SUCCESS = 'Save_Success';
	var SAVE_FAILED = 'Save_Failed';
	var WRONG_PASSWORD = 'Wrong_Password';
	var DOWNLOAD = 'Download';
	var EMAIL = 'Email';
	var ALERT = 'Alert';
	var LOADING = 'Loading';

	// error messages
	var MSG_NO_USER_ERR = 'User does not exist.';
	var MSG_USER_PWD_MISMATCH = 'Username and Password do not match.';
	var MSG_WRONG_PWD = 'Password incorrect.';
	var MSG_WRONG_CREDENTIALS = 'Username or Password is incorrect.';
	var MSG_PWD_CFM_MISMATCH = 'Password and Confirm Password do not match.';
	var MSG_USER_ALREADY_EXISTS = 'Username already exists.';
	var MSG_USER_SAVE_FAILED = 'Failed to save User.';
	var MSG_TRANS_DATE_MISSING = 'Please enter Date.';
	var MSG_TRANS_AMOUNT_MISSING = 'Please enter Amount.';
	var MSG_TRANS_TYPE_MISSING = 'Please enter Type.';
	var MSG_MANDATORY_FIELDS_MISSING = 'Please fill all the mandatory(*) fields.';
	var MSG_CONFIRM_DOWNLOAD = 'Do you want to download expense report for';
	var MSG_CONFIRM_EMAIL = 'Do you want to send expense report for';
	var MSG_SENT_EMAIL_SUCCESS = 'Your email has been sent successfully.';
	var MSG_SENT_EMAIL_FAILED = 'Failed to send email. Please try again later.';

	// var expense_table_columns = ["Date", "Amount", "Type", "Transaction", "Operation"];
	var incomeItems = ["Salary", "Reimbursement", "Property Rents"];
	var expenseItems = ["Fuel", "Grocery", "Entertainment", "House Rent", "Electricity Bill", "Travel"];


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

	var EXP_PAGE_SIZE = 8;

	this.getDefaultType = function() {
		return DEFAULT_TYPE;
	};

	this.getDateFormat = function() {
		return DATE_FORMAT;
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

	this.getAllStr = function() {
		return ALL;
	};

	this.getSuccess = function() {
		return SUCCESS;
	};

	this.getFailure = function() {
		return FAILURE;
	};

	this.getPasswordMismatch = function() {
		return PASSWORD_MISMATCH;
	}

	this.getUserExists = function() {
		return USER_EXISTS;
	};

	this.getNoUser = function() {
		return NO_USER;
	};

	this.getSaveSuccess = function() {
		return SAVE_SUCCESS;
	};

	this.getSaveFailed = function() {
		return SAVE_FAILED;
	};

	this.getWrongPassword = function() {
		return WRONG_PASSWORD;
	};

	this.getMsgNoUserErr = function() {
		return MSG_NO_USER_ERR;
	};

	this.getMsgUserPwdMismatch = function() {
		return MSG_USER_PWD_MISMATCH;
	};

	this.getMsgWrongPwd = function() {
		return MSG_WRONG_PWD;
	};

	this.getMsgWrongCredentials = function() {
		return MSG_WRONG_CREDENTIALS;
	};

	this.getMsgPwdCfmMismatch = function() {
		return MSG_PWD_CFM_MISMATCH;
	};

	this.getMsgUserAlreadyExists = function() {
		return MSG_USER_ALREADY_EXISTS;
	};

	this.getMsgUserSaveFailed = function() {
		return MSG_USER_SAVE_FAILED;
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

	this.getMsgManFieldsMissing = function() {
		return MSG_MANDATORY_FIELDS_MISSING;
	}

	this.getPdfCols = function() {
		return PDFCOLS;
	}

	this.getDownloadStr = function() {
		return DOWNLOAD;
	}

	this.getEmailStr = function() {
		return EMAIL;
	}

	this.getMsgConfirmDownload = function() {
		return MSG_CONFIRM_DOWNLOAD;
	}

	this.getMsgConfirmEmail = function() {
		return MSG_CONFIRM_EMAIL;
	}

	this.getAlertStr = function() {
		return ALERT;
	}

	this.getMsgSentEmailSuccess = function() {
		return MSG_SENT_EMAIL_SUCCESS;
	}

	this.getMsgSentEmailFailed = function() {
		return MSG_SENT_EMAIL_FAILED;
	}

	this.getLoadingStr = function() {
		return LOADING;
	}

	this.getExpPageSize = function() {
		return EXP_PAGE_SIZE;
	}

});

