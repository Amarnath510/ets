angular.module('RemainderProp', []).service('remainderProperties', function() {

	// CONSTANT STRINGS	
	var REMAINDER_STR = "Remainder";
	var DATE_FORMAT = 'dd-MMM-yyyy';
	var TYPE_ITEMS = ["Work", "Bike Servicing", "Meeting", "Grocery", "Entertainment"];
	var VIA_ITEMS = ["Email"]; /* Add SMS after its implementation. */
	var DELETE_ALL_REMAINDERS = "DELETE_ALL_REMAINDERS";
	var DEFAULT_TYPE = "Select Type";
	var TIME_ERROR = "TIME_ERROR";
	var ALL_STR = "ALL";
	var ONE_STR = "ONE";
	var ADD_REMAINDER_STR = "Add Remainder";
	var EDIT_REMAINDER_STR = "Edit Remainder";
	var SAVE_REM_FAILED_STR = "SAVE_REM_FAILED";
	var DEL_REM_FAILED_STR = "DEL_REM_FAILED";
	var SMS_STR = "SMS";
	var MOB_NUM_LEN = 10;

	// MESSAGES
	var MSG_ALL_REMAINDERS = "Viewing All Remainder's.";
	var MSG_UPCOMING_REMAINDERS = "Viewing Upcoming Remainder's. (Upto 1 month from now)";
	var MSG_DELETE_ALL_REMAINDERS = "Are you sure you want to delete all the remainder's ?";
	var MSG_DEL_ONE_REM = "Are you sure you want to delete the remainder ?";
	var MSG_NO_REMAINDERS = "Currently there are no remainders.";

	// ERRORS
	var MSG_TIME_ERROR = "Selected time cannot be applied.";
	var MSG_SAVE_REM_FAILED = "Saving Remainder failed. Please try again.";
	var MSG_DEL_REM_FAILED = "Delete not successful.";


	// pagination settings
	var PAGE_SIZE = 5;

	this.getDateFormat = function() {
		return DATE_FORMAT;
	}
	
	this.getTypeItems = function() {
		return TYPE_ITEMS;
	}

	this.getViaItems = function() {
		return VIA_ITEMS;
	}

	this.getMsgAllRemainders = function() {
		return MSG_ALL_REMAINDERS;
	}

	this.getMsgUpcomingRemainders = function() {
		return MSG_UPCOMING_REMAINDERS;
	}

	this.getDeleteAllRemainders = function() {
		return DELETE_ALL_REMAINDERS;
	}

	this.getMsgDeleteAllRemainders = function() {
		return MSG_DELETE_ALL_REMAINDERS;
	}

	this.getPageSize = function() {
		return PAGE_SIZE;
	}

	this.getDefaultTimeStr = function() {
		return DEFAULT_TIME_STR;
	}

	this.getRemaindersStr = function() {
		return REMAINDER_STR;
	}

	this.getDefaultType = function() {
		return DEFAULT_TYPE;
	}

	this.getTimeError = function() {
		return TIME_ERROR;
	}

	this.getMsgTimeError = function() {
		return MSG_TIME_ERROR;
	}

	this.getAllStr = function() {
		return ALL_STR;
	}

	this.getOneStr = function() {
		return ONE_STR;
	}

	this.getMsgDelOneRem = function() {
		return MSG_DEL_ONE_REM;
	}

	this.getAddRemStr = function() {
		return ADD_REMAINDER_STR;
	}

	this.getEditRemStr = function() {
		return EDIT_REMAINDER_STR;
	}

	this.getSaveRemFailedStr = function() {
		return SAVE_REM_FAILED_STR;
	}

	this.getMsgSaveRemFailed = function() {
		return MSG_SAVE_REM_FAILED;
	}

	this.getDelRemFailedStr = function() {
		return DEL_REM_FAILED_STR;
	}

	this.getMsgDelRemFailed = function() {
		return MSG_DEL_REM_FAILED;
	}

	this.getSmsStr = function() {
		return SMS_STR;
	}

	this.getMobNumLen = function() {
		return MOB_NUM_LEN;
	}

	this.getMsgNoRemainders = function() {
		return MSG_NO_REMAINDERS;
	}

});