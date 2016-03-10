angular.module('DatePickerDir', []).directive('datePickerDirective', function() {
	return {
		restrict: 'A',
		scope: {
			date: '=ngModel'
		},
		templateUrl: '/views/partials/utils/datePicker.html',
		controller: function($scope, $filter, expenseService, dateService, clientService, clientProperties, remainderService) {
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

			if(clientService.getCurrentServiceType() === clientProperties.getExpenseReportingService()) {
				var reportDate = expenseService.getModalDate();
				var year = dateService.getYear(reportDate);
				var month = dateService.getMonth(reportDate);
				
				// Calculate minimum date
				// Set the month and year and get the date and then set day to 1st day of the month.
				$scope.minDate = dateService.createDate(year, month, 0);
				$scope.minDate = dateService.setToFirstDayOfMonth($scope.minDate);
				$scope.maxDate = dateService.createDate(year, month, 0);	
			} else if(clientService.getCurrentServiceType() === clientProperties.getRemaindersService()) {
				// Min date will be today.
				$scope.minDate = new Date();
			}
		} // controller
	}; // return
}); // directive