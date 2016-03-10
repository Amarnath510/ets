angular.module('ClientProp', []).service('clientProperties', function() {

	// final variables
	var ALL = 'All';
	var SUCCESS = 'Success';
	var FAILURE = 'Failure';
	var PASSWORD_MISMATCH = 'Password_Mismatch';
	var USER_EXISTS = 'User_Exists';
	var NO_USER = 'No_User';
	var SAVE_SUCCESS = 'Save_Success';
	var SAVE_FAILED = 'Save_Failed';
	var WRONG_PASSWORD = 'Wrong_Password';
	var ALERT = 'Alert';
	var LOADING = 'Loading';
	var DELETE = 'Delete';
	var ACTION_FAILED_STR = 'Action Failed';

	// services type
	var EXPENSE_REPORTING_SERVICE = "ExpenseReporting";
	var REMAINDERS_SERVICE = "REMAINDERS";

	// error or status messages.
	var MSG_NO_USER_ERR = 'User does not exist.';
	var MSG_USER_PWD_MISMATCH = 'Username and Password do not match.';
	var MSG_WRONG_PWD = 'Password incorrect.';
	var MSG_WRONG_CREDENTIALS = 'Username or Password is incorrect.';
	var MSG_PWD_CFM_MISMATCH = 'Password and Confirm Password do not match.';
	var MSG_USER_ALREADY_EXISTS = 'Username already exists.';
	var MSG_USER_SAVE_FAILED = 'Failed to save User.';
	var MSG_MANDATORY_FIELDS_MISSING = 'Please fill all the mandatory(*) fields.';
	var MSG_CONFIRM_DELETE = "Are you sure you want to delete this transaction?";
	var MSG_DELETE_NO_UNDO = "There is no undo.";
	var MSG_COMMENT_SENT = "Message sent successfully.";
	var MSG_COMMENT_ERROR = "Please fill all the mandatory fields with valid data.";

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

	this.getMsgManFieldsMissing = function() {
		return MSG_MANDATORY_FIELDS_MISSING;
	}

	this.getAlertStr = function() {
		return ALERT;
	}

	this.getLoadingStr = function() {
		return LOADING;
	}

	this.getExpenseReportingService = function() {
		return EXPENSE_REPORTING_SERVICE;
	}

	this.getRemaindersService = function() {
		return REMAINDERS_SERVICE;
	}

	this.getDeleteStr = function() {
		return DELETE;
	}

	this.getMsgDeleteNoUndo = function() {
		return MSG_DELETE_NO_UNDO;
	}

	this.getMsgConfirmDelete = function() {
		return MSG_CONFIRM_DELETE;
	}

	this.getActionFailedStr = function() {
		return ACTION_FAILED_STR;
	}

	this.getMsgCommentSent = function() {
		return MSG_COMMENT_SENT;
	}

	this.getMsgCommentError = function() {
		return MSG_COMMENT_ERROR;
	}

});