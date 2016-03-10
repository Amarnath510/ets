angular.module('MainCtrl', []).controller('MainController', 
								function($scope, $uibModal, $location, $localStorage, $state, $window, loginService, loginFactory, clientProperties, clientService) {

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
			if(response.result === clientProperties.getSuccess()) {
				
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
			if(url === '/services/expensereporting' || url === '/services/remainders') {
				loginFactory.IsUserSession.get({}, function(response) {
					if(!response.result) {
						$location.url('/login');
					} else {
						$location.url(url);
					}
				});

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
		
		$scope.login_loading = true;
		loginFactory.UserLogin.save({}, user, function(response) {
			if(response.result === clientProperties.getFailure()) {
				$scope.login_failed_error = true;
				$scope.login_failed_error_msg = clientProperties.getMsgWrongCredentials();
			} else {
				// set username in the service and then close the login modal.
				loginService.setLoginStatus(true);
				loginService.setUserName($scope.username_data);
				$location.url('/services');
			}
			$scope.login_loading = false;
		});
	};

	$scope.register = function() {
		var uname = $scope.regis_uname_data;
		var pwd = $scope.regis_pwd_data;
		var confirm_pwd = $scope.regis_confirm_data;

		if(pwd != confirm_pwd) {
			$scope.registration_failed_error = true;
			$scope.registration_failed_error_msg = clientProperties.getMsgPwdCfmMismatch();
		} else {
			var user = new Object();
			user.username = uname;
			user.password = pwd;

			$scope.register_loading = true;
			loginFactory.UserRegistration.save({}, user, function(status) {
				if(status.result === clientProperties.getUserExists()) {
					$scope.registration_failed_error = true;
					$scope.registration_failed_error_msg = clientProperties.getMsgUserAlreadyExists();
				} else if(status.result === clientProperties.getSaveFailed()) {
					$scope.registration_failed_error = true;
					$scope.registration_failed_error_msg = clientProperties.getMsgUserSaveFailed();
				} else {
					// set username in the service and then close the login modal.
					loginService.setLoginStatus(true);
					loginService.setUserName($scope.regis_uname_data);
					$location.url('/services');
				}
				$scope.register_loading = false;
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
			$scope.forgot_failed_error_msg = clientProperties.getMsgPwdCfmMismatch();
		} else {
			var user = new Object();
			user.username = uname;
			user.password = pwd;

			loginFactory.UpdateUserPwd.save({}, user, function(response) {
				if(response.result === clientProperties.getSuccess()) {
					// instead of redirecting, close the forgot pwd window and show the login page.
					$location.url('/login');
				} else {
					$scope.forgot_failed_error = true;
					if(response.result === clientProperties.getSaveFailed()) {
						$scope.forgot_failed_error_msg = clientProperties.getSaveFailed();
					} else {
						$scope.forgot_failed_error_msg = clientProperties.getMsgNoUserErr();
					}
				}
			});
		}
	};

	function validateEmail(email) {
    	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	return re.test(email);
	}

	$scope.contactSubmit = function() {
		$scope.contactMsg = "";
		var name = $scope.contact_name;
		var comment = $scope.comment;
		var verCode = $scope.verCode;
		var email = $scope.contact_email;

		if(validateComment(name, comment, verCode, email)) {
			var data = new Object();
			data.name = name;
			data.email = email;
			data.comment = comment;

			loginFactory.AddComment.save({}, data, function(response) {
				if(clientService.equals(response.result, clientProperties.getSuccess())) {
					$scope.contactMsg = clientProperties.getMsgCommentSent();
				}
			});
		} else {
			$scope.contactMsg = clientProperties.getMsgCommentError();
		}
	}

	function validateComment(name, comment, verCode, email) {
		var nameVal = clientService.isMinLength(name, 0);
		var commentVal = clientService.isMinLength(comment, 0)
		var verCodeVal = (verCode == 9) ? true : false;
		var emailVal = validateEmail(email);

		return nameVal && commentVal && verCodeVal && email;
	}

});