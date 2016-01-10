angular.module('LoginSrv', []).service('loginService', 
							['$rootScope', 'loginFactory', 'clientPropertiesService', function($rootScope, loginFactory, clientPropertiesService) {

	var loginStatus = false;
	var username = '';
	var clientRedirectTo = null;
	var email = '';

	this.getLoginStatus = function() {
		return loginStatus;
	};

	this.setLoginStatus = function(value) {
		loginStatus = value;
	};

	this.setUserName = function(value) {
		username = value;
		this.setUserEmail(username);
		this.broadcast();
	};

	this.getUserName = function() {
		return username;
	};

	this.getUserEmail = function() {
		return email;
	}

	this.setUserEmail = function(value) {
		email = value;
	}

	this.broadcast = function() {
		$rootScope.$broadcast('username');
	};


	this.getClientRedirectTo = function() {
		return clientRedirectTo;
	};

	this.setClientRedirectTo = function(url) {
		clientRedirectTo = url;
	};

	/* Delete the user by calling login factory */
	function deleteUser(uname) {
		loginFactory.DeleteUserByName.delete({username: uname}, function(data) {
			// code
		});
	}

	/* Get all users by calling login factory */
	function getAllUsers(uname, callback) {
		loginFactory.AllUsers.query(function(response) {
			if(response && response.length > 0) {
				callback(response);
			} else {
				callback(clientPropertiesService.getFailure());
			}
		});
	}
}]);