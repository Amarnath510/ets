angular.module('DeleteCtrl', []).controller('deleteController', function($scope, $uibModalInstance, data, 
																				clientProperties, expenseProperties, remainderProperties){

	if(data.serviceType.toUpperCase() === clientProperties.getExpenseReportingService().toUpperCase()) {
		$scope.msg = clientProperties.getMsgConfirmDelete();
	} else if(data.serviceType.toUpperCase() === clientProperties.getRemaindersService().toUpperCase()) {
		if(data.flag.toUpperCase() === remainderProperties.getAllStr().toUpperCase()) {
			$scope.msg = remainderProperties.getMsgDeleteAllRemainders();
		} else {
			$scope.msg = remainderProperties.getMsgDelOneRem();
		}
	} 

	$scope.msg_noUndo = clientProperties.getMsgDeleteNoUndo();

	$scope.delete = function() {
		$uibModalInstance.close();
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});