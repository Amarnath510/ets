angular.module('InputLimitDir', []).directive('inputLimitDirective', function() {
	return {
		restrict: 'A', 
		require: '?ngModel',
		// transclude: true, If two directive are included on same element then either of them can have transclude but not both.
		link: function(scope, element, attrs, ctrl) {
			var limit = parseInt(attrs.limit);
			element.bind('keypress', function(event) {
				if(element[0].value.length >= limit) {
					event.preventDefault();
					return false;
				}
			});
		}
	};
});