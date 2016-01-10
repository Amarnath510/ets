angular.module('ModalCtrl', []).controller('ModalController', 
						function($scope, $uibModalInstance, record, expenseService, clientPropertiesService) {

	/* Get data from service */
	$scope.items = expenseService.getItems(record.incorexp);
	// Initially selected item will be default value.
	$scope.selectedItem = clientPropertiesService.getDefaultType();
	// date format
	$scope.dateFormat = clientPropertiesService.getDateFormat();

	// copy the record to the view. Since we have set incorexp value which we need it in modal.
	$scope.record = angular.copy(record);

	$scope.selectDropDown = function(item) {
		$scope.record.type = item;
		$scope.selectedItem = item;
	};
	
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.save = function() {
		var status = expenseService.validateRecord($scope.record);
		if(!status.flag) {
			$scope.errorMsg = clientPropertiesService.getMsgManFieldsMissing();
			$scope.showError = true;
		} else {
			$uibModalInstance.close($scope.record);
		}
	};

	$scope.update = function() {
		var status = expenseService.validateRecord($scope.record);
		if(!status.flag) {
			$scope.errorMsg = clientPropertiesService.getMsgManFieldsMissing();
			$scope.showError = true;
		} else {
			$uibModalInstance.close($scope.record);
		}
	};

	$scope.delete = function() {
		$uibModalInstance.close();		
	};

	$scope.clearError = function() {
		$scope.showError = false;
	}

});