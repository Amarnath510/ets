angular.module('MainCtrl', []).controller('MainController', 
								function($scope, $uibModal, $location, $localStorage, $state, $window, loginService, loginFactory, clientPropertiesService) {

	// Initially show login form and hide registerForm
	$scope.loginForm_show = true;
	$scope.registerForm_show = false;
	$scope.login_validation = false;

	// custom error messages
	$scope.login_failed_error = false;
	$scope.user_exists_error = false;
	$scope.pwd_conPwd_error = false;
	$scope.registration_failed_error = false;

	// error message
	$scope.login_failed_error_msg = '';


    $scope.isActive = function(destination) {
    	if(destination.indexOf('services') > -1) {
    		if($location.path().indexOf('services') > -1) {
    			return true;
    		}
    	} else {
    		return destination === $location.path();	
    	}
	}

	$scope.getActiveColor = function(destination) {
		if(destination === $location.path()) {
			return '#40FFC0';
		} else {
			return '';
		}
	}

	// check the session whether user exists or not.
	loginFactory.IsUserSession.get(function(response) {
		if(response.result) {
			loginService.setLoginStatus(true);
			loginService.setUserName(response.username);
		} else {
			loginService.setUserName('');
			loginService.setLoginStatus(false);
		}
	});

	$scope.isLogin = loginService.getLoginStatus();

	$scope.$on('username', function() {
		var username = loginService.getUserName();
		if(username != undefined && username.trim().length > 0) {
			$scope.username = loginService.getUserName();
		}
		$scope.isLogin = loginService.getLoginStatus();
	});

	$scope.logout = function() {
		loginFactory.Logout.get(function(response) {
			if(response.result === clientPropertiesService.getSuccess()) {
				
				// clear all the local storage data
				loginService.setLoginStatus(false);
				loginService.setUserName('');
				// $localStorage.currentReportDate	= null;
				$localStorage.$reset(); // to reset everything in local storage.

				//reload the whole application to clear all the service values.
				$location.url('/services');
				$window.location.reload();
			}
		});
	};

	$scope.gotoUrl = function(url) {
		if(url === $location.path()) {
			$state.reload();
		} else {
			if(url === '/services/expensereporting') {
				loginFactory.IsUserSession.get({}, function(response) {
					if(!response.result) {
						$location.url('/login');
					} else {
						$location.url(url);
					}
				});
			} else if(url === '/services/remainders') {

			} else {
				$location.url(url);
			}	
		}
	}

	$scope.login = function() {
		var uname = $scope.username_data;
		var pwd = $scope.pwd_data;
		
		var user = new Object();
		user.username = uname;
		user.password = pwd;

		loginFactory.UserLogin.save({}, user, function(response) {
			if(response.result === clientPropertiesService.getFailure()) {
				$scope.login_failed_error = true;
				$scope.login_failed_error_msg = clientPropertiesService.getMsgWrongCredentials();							
			} else {
				// set username in the service and then close the login modal.
				loginService.setLoginStatus(true);
				loginService.setUserName($scope.username_data);
				$location.url('/services');
			}
		});
	};

	$scope.register = function() {
		var uname = $scope.regis_uname_data;
		var pwd = $scope.regis_pwd_data;
		var confirm_pwd = $scope.regis_confirm_data;

		if(pwd != confirm_pwd) {
			$scope.registration_failed_error = true;
			$scope.registration_failed_error_msg = clientPropertiesService.getMsgPwdCfmMismatch();
		} else {
			var user = new Object();
			user.username = uname;
			user.password = pwd;

			loginFactory.UserRegistration.save({}, user, function(status) {
				if(status.result === clientPropertiesService.getUserExists()) {
					$scope.registration_failed_error = true;
					$scope.registration_failed_error_msg = clientPropertiesService.getMsgUserAlreadyExists();
				} else if(status.result === clientPropertiesService.getSaveFailed()) {
					$scope.registration_failed_error = true;
					$scope.registration_failed_error_msg = clientPropertiesService.getMsgUserSaveFailed();
				} else {
					// set username in the service and then close the login modal.
					loginService.setLoginStatus(true);
					loginService.setUserName($scope.regis_uname_data);
					$location.url('/services');
				}
			});
		}
	};

	$scope.clearErrMsg = function() {
		$scope.login_failed_error = false;
		$scope.user_exists_error = false;
		$scope.pwd_conPwd_error = false;
		$scope.registration_failed_error = false;

		$scope.forgot_failed_error = false;
	};

	$scope.forgotPwd = function() {
		var uname = $scope.regis_uname_data;
		var pwd = $scope.regis_pwd_data;
		var confirm_pwd = $scope.regis_confirm_data;

		if(pwd != confirm_pwd) {
			$scope.forgot_failed_error = true;
			$scope.forgot_failed_error_msg = clientPropertiesService.getMsgPwdCfmMismatch();
		} else {
			var user = new Object();
			user.username = uname;
			user.password = pwd;

			loginFactory.UpdateUserPwd.save({}, user, function(response) {
				if(response.result === clientPropertiesService.getSuccess()) {
					// instead of redirecting, close the forgot pwd window and show the login page.
					$location.url('/login');
				} else {
					$scope.forgot_failed_error = true;
					if(response.result === clientPropertiesService.getSaveFailed()) {
						$scope.forgot_failed_error_msg = clientPropertiesService.getSaveFailed();
					} else {
						$scope.forgot_failed_error_msg = clientPropertiesService.getMsgNoUserErr();
					}
				}
			});
		}
	};

	function validateEmail(email) {
    	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	return re.test(email);
	}

});
