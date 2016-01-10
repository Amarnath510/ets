angular.module('OnlyDigitsDir', []).directive('onlyDigitsDirective', function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		transclude: true,
		link: function(scope, element, attrs, ctrl) 
		{
			ctrl.$parsers.push(function(input) {
				if(input === undefined) {
					return '';
				}

				var output = input.replace(/[^0-9]/g, '');
				if(output !== input) {
					ctrl.$setViewValue(output);
					ctrl.$render();
				}

				return output;
			});
		}
	};
});