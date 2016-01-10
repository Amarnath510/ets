angular.module('ConfirmCtrl', []).controller('ConfirmController', function($scope, $uibModalInstance, clientPropertiesService, data) {
	
	if(data.flag == clientPropertiesService.getDownloadStr()) {
		$scope.flag = data.flag;
		$scope.header = 'Confirm' + ' ' + clientPropertiesService.getDownloadStr();
		$scope.msg = clientPropertiesService.getMsgConfirmDownload() + ' ' + data.month + '-' + data.year + '?'
	} else if(data.flag == clientPropertiesService.getEmailStr()) {
		$scope.flag = data.flag;
		$scope.email = data.email;
		$scope.header = 'Confirm' + ' ' + clientPropertiesService.getEmailStr();
		$scope.msg = clientPropertiesService.getMsgConfirmEmail() + ' ' + data.month + '-' + data.year + ' to ';
	} else if(data.flag == clientPropertiesService.getAlertStr()) {
		$scope.flag = data.status;
		$scope.header = 'Information';
		if($scope.flag == clientPropertiesService.getSuccess()) {
			if(data.type.toUpperCase() == clientPropertiesService.getEmailStr().toUpperCase()) {
				$scope.msg = clientPropertiesService.getMsgSentEmailSuccess();
			}
		} else {
			if(data.type.toUpperCase() == clientPropertiesService.getEmailStr().toUpperCase()) {
				$scope.msg = clientPropertiesService.getMsgSentEmailFailed();
			}
		}
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.confirm = function() {
		$uibModalInstance.close();
	};

});