angular.module('ModalSrv', []).service('modalService', ['$uibModalStack', function($uibModalStack) {
	this.closeAllModal = function() {
		$uibModalStack.dismissAll('cancel');
	}
}]);