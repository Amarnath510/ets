angular.module('TimePickerDir', []).directive('timePickerDirective', function() {
	return {
		restrict: 'A',
		scope: {
			myTime: '=ngModel'
		},
		templateUrl: '/views/partials/utils/timePicker.html',
		controller: function($scope, $filter) {
			$scope.hstep = 1;
			$scope.mstep = 1; 
			$scope.isMeridian = true;

			$scope.toggleMode = function() {
    			$scope.isMeridian = ! $scope.isMeridian;
  			};
		} // controller
	} // return
});