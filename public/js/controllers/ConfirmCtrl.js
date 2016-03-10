angular.module('ConfirmCtrl', []).controller('ConfirmController', 
								function($scope, 
											$uibModalInstance, 
												data, 
													clientProperties, 
														expenseProperties, 
															remainderProperties) {
	
	if(data.serviceType === clientProperties.getExpenseReportingService()) {
		if(data.flag == expenseProperties.getDownloadStr()) {
			$scope.flag = data.flag;
			$scope.header = 'Confirm' + ' ' + expenseProperties.getDownloadStr();
			$scope.msg = expenseProperties.getMsgConfirmDownload() + ' ' + data.month + '-' + data.year + '?'
		} else if(data.flag == expenseProperties.getEmailStr()) {
			$scope.flag = data.flag;
			$scope.email = data.email;
			$scope.header = 'Confirm' + ' ' + expenseProperties.getEmailStr();
			$scope.msg = expenseProperties.getMsgConfirmEmail() + ' ' + data.month + '-' + data.year + ' to ';
		} else if(data.flag == clientProperties.getAlertStr()) {
			$scope.flag = data.status;
			$scope.header = 'Information';
			if($scope.flag == clientProperties.getSuccess()) {
				if(data.type.toUpperCase() == expenseProperties.getEmailStr().toUpperCase()) {
					$scope.msg = expenseProperties.getMsgSentEmailSuccess();
				}
			} else {
				if(data.type.toUpperCase() == expenseProperties.getEmailStr().toUpperCase()) {
					$scope.msg = expenseProperties.getMsgSentEmailFailed();
				}
			}
		}
	} else if(data.serviceType === clientProperties.getRemaindersService()) {
		if(data.flag == remainderProperties.getSaveRemFailedStr()) {
			$scope.flag = clientProperties.getFailure();
			$scope.header = clientProperties.getActionFailedStr();
			$scope.msg = remainderProperties.getMsgSaveRemFailed();
		} else if(data.flag.toUpperCase() === remainderProperties.getDelRemFailedStr()) {
			$scope.flag = clientProperties.getFailure();
			$scope.header = clientProperties.getActionFailedStr();
			$scope.msg = remainderProperties.getMsgDelRemFailed();
		}
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.confirm = function() {
		$uibModalInstance.close();
	};

});