angular.module('DatePickerDir', []).directive('datePickerDirective', function() {
	return {
		restrict: 'A',
		scope: {
			date: '=ngModel'
		},
		templateUrl: '/views/partials/utils/datePicker.html',
		controller: function($scope, $filter, expenseService, dateService) {
			// On click of date icon we need to show the date picker.
			// But before doing this make sure we have made opened as false for status.
			$scope.open = function() {
				$scope.status.opened = true;
			};
			$scope.status = {
				opened: false
			};

			$scope.showButtonBar = false;

			$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			$scope.format = $scope.formats[0];

			$scope.dateOptions = {
				showWeeks: false
			}

			var reportDate = expenseService.getModalDate();
			var year = dateService.getYear(reportDate);
			var month = dateService.getMonth(reportDate);
			
			// Set the month and year and get the date and then set day to 1st day of the month.
			$scope.minDate = dateService.createDate(year, month, 0);
			$scope.minDate = dateService.setToFirstDayOfMonth($scope.minDate);

			$scope.maxDate = dateService.createDate(year, month, 0);

			// finally make the fist day as the default date in the modal.
			// $scope.date = $scope.minDate;

		} // controller
	}; // return
}); // directive