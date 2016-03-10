angular.module('ModalCtrl', []).controller('ModalController', 
						function($scope, $uibModalInstance, record, expenseService, 
									clientProperties, 
									expenseProperties, 
									remainderProperties, 
									remainderService,
									clientService,
									smsFactory,
									loginService) {

	if(record.serviceType == clientProperties.getExpenseReportingService()) {
		// get drop down items for expense/income
		$scope.items = expenseService.getItems(record.incorexp);
		$scope.dateFormat = expenseProperties.getDateFormat();

		if(undefined == record.type || null == record.type) {
			record.type = expenseProperties.getDefaultType();
		}
	} else if(record.serviceType == clientProperties.getRemaindersService()) {
		// get drop down items for remainder
		$scope.items = remainderProperties.getTypeItems();
		$scope.dateFormat = remainderProperties.getDateFormat();
		$scope.viaItems = remainderProperties.getViaItems();

		if(undefined == record.type || null == record.type) {
			record.type = remainderProperties.getDefaultType();
		}

		if(undefined == record.via || null == record.via) {
			record.via = remainderProperties.getDefaultType();
		} else if(clientService.equals(record.via, remainderProperties.getSmsStr())) {
			$scope.showSmsInput = true;
		} else {
			$scope.showSmsInput = false;
		}

	}

	// copy the record to the view. Since we have set incorexp value which we need it in modal.
	$scope.record = angular.copy(record);

	$scope.selectDropDown = function(item) {
		$scope.record.type = item;
	};
	
	$scope.selDropDownVia = function(item) {
		$scope.record.via = item;

		if(clientService.equals(item, remainderProperties.getSmsStr())) {
			$scope.showSmsInput = true;
		} else {
			$scope.showSmsInput = false;
		}
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.save = function() {
		var status = expenseService.validateRecord($scope.record);
		if(!status.flag) {
			$scope.errorMsg = clientProperties.getMsgManFieldsMissing();
			$scope.showError = true;
		} else {
			$uibModalInstance.close($scope.record);
		}
	};

	$scope.update = function() {
		var status = expenseService.validateRecord($scope.record);
		if(!status.flag) {
			$scope.errorMsg = clientProperties.getMsgManFieldsMissing();
			$scope.showError = true;
		} else {
			$uibModalInstance.close($scope.record);
		}
	};

	$scope.clearError = function() {
		$scope.showError = false;
	}

	$scope.saveRemainder = function() {
		var status = remainderService.validateRecord($scope.record);
		if(!status.flag) {
			$scope.showError = true;
			$scope.errorMsg = status.errorMsg;
		} else {
			$uibModalInstance.close($scope.record);
		}
	}
});