angular.module('StartFromFltr', []).filter('startFromFilter', function() {
	return function(data, start) {
		if(data === undefined || data == null) {
			return;
		}
		return data.slice(start);
	}
});