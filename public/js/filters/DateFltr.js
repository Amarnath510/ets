angular.module('DateFltr', []).filter('dateFilter', function($filter) {
	
	return 	function(input) {
		if(null == input || undefined == input || input.trim().length <= 0) {
			return '';
		} else {
			var dateStr = $filter('date')(input, 'dd-MMM-yyyy');
			return dateStr;
		}
	}

});