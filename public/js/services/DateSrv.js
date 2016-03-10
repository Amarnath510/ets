angular.module('DateSrv', []).service('dateService', function() {

	this.getMonth = function(date) {
		// month starts from 0 so add 1 to the month.
		return date.getMonth() + 1;
	};

	this.getDay = function(date) {
		return date.getDate();
	};

	this.getYear = function(date) {
		return date.getFullYear();
	};

	this.createDate = function(year, month, day) {
		return new Date(year, month, day);
	};

	this.setToFirstDayOfMonth = function(date) {
		date.setDate(1);
		return date;
	};

	this.getMonthName = function(monthNumber) {
		var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber - 1];
	}

	/*
		Check whether both the given date's are same or not.
		If given date is greater than the current date then accept else throw error.
	*/
	this.areDatesEqual = function(enteredDate, todayDate) {
  		return enteredDate > todayDate;
	}

});