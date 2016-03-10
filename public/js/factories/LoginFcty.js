angular.module('LoginFcty', []).factory('loginFactory', ['$resource', function($resource){
	return {
		AddUser: 			$resource('/api/adduser/:id', {id: '@id'}),
		DeleteAllUsers: 	$resource('/api/removeallusers'),
		DeleteUserByName: 	$resource('/api/removeuserbyname/:username', {username: '@uname'}),
		AllUsers: 			$resource('/api/allusers', {}, {'query': {method: 'GET', isArray: true}}),
		UserById: 			$resource('/api/getuserbyid/:id', {id: '@id'}),
		UserLogin: 			$resource('/api/login'),
		UserRegistration:   $resource('/api/userregistration'),
		Logout: 			$resource('/api/logout'),
		IsUserSession: 		$resource('/api/isusersession'),
		UpdateUserPwd: 		$resource('/api/updateuserpwd'),
		AddComment: 		$resource('/api/addComment')
	}
}]);