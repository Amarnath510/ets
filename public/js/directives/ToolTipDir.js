angular.module('ToolTipDir', []).directive('toolTipDirective', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			/*if(attrs.toolTipDirective == 'popover') {
				$(element).popover();
			}*/
			$(element).popover();
		}
	};
});