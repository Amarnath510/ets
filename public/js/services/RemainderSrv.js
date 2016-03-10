angular.module('RemainderSrv', []).service('remainderService', ['remainderProperties', 'dateService', 'clientService', 
									function(remainderProperties, dateService, clientService) {
	
	var modalDate = null;

	this.getModalDate = function() {
		if(null == modalDate) {
			return new Date();
		} 

		return modalDate;
	}

	this.setModalDate = function(inputModalDate) {
		modalDate = inputModalDate;
	}

	this.validateRecord = function(record) {
		// If selected date is equal to today date then time should be greater than than the current time.
		var status = new Object();
		status.flag = true;

		var todayDate = new Date();
		// we need to create a new date object since once we save the date in DB we are getting it as String.
		var enteredTime = new Date(record.myTime);
		if(!(dateService.areDatesEqual(enteredTime, todayDate))) {
			status.flag = false;
			status.errorMsg = "Please select a valid time for a current date.";
		} else if(record.type === remainderProperties.getDefaultType()) {
			status.flag = false;
			status.errorMsg = "Please select a valid type.";
		} else if(undefined == record.desc || record.desc.trim().length == 0) {
			status.flag = false;
			status.errorMsg = "Please enter description.";
		} else if(record.desc.length > 50) {
			status.flag = false;
			status.errorMsg = "Please limit the input characters by 50.";
		} else if(record.via === remainderProperties.getDefaultType()) {
			status.flag = false;
			status.errorMsg = "Please select a valid via.";
		} else if(clientService.equals(record.via, remainderProperties.getSmsStr())) {
			if(!(clientService.isLengthValid(record.mobile, remainderProperties.getMobNumLen()))) {
				status.flag = false;
				status.errorMsg = "Please enter 10 digit valid mobile number.";
			}
		}

		return status;
	}

}]);