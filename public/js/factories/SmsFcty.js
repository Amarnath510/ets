angular.module('SmsFcty', []).factory('smsFactory', ['$resource', function($resource) {
	return {
		SendSms: 			$resource('/smsapi/sendsms'),
		AddUpdateMobile:	$resource('/smsapi/addupdatemobile'),
		GetMobileNum: 		$resource('/smsapi/getMobileNum')
	}
}]);