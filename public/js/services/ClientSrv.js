angular.module('ClientSrv', []).service('clientService', ['clientProperties', function(clientProperties) {

	var currentServiceType = clientProperties.getExpenseReportingService();

	this.getCurrentServiceType = function() {
		return currentServiceType;
	}

	this.setCurrentServiceType = function(serviceType) {
		currentServiceType = serviceType;
	}

	this.equals = function(str1, str2) {
		return str1.toUpperCase() === str2.toUpperCase();
	}

	this.isLengthValid = function(input, validLength) {
		if(undefined === input) {
			return false;
		}

		if(input.trim().length != validLength) {
			return false;
		}

		return true;
	}

	this.isMinLength = function(input, minLength) {
		if(undefined === input) {
			return false;
		}

		// minimum means atleast of given length
		if(input.trim().length >= minLength) {
			return true;
		}

		return false;	
	}

}]);