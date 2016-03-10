/*
	Usage: Add the following attributes to your html code.
		data-content="<your content goes here>" 
		data-trigger="hover"
	    tool-tip-directive="popover"
*/

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