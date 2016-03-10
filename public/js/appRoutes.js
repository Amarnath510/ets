angular.module('appRoutes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'views/partials/main/home.html',
			controller: 'MainController'
		})

		.state('services', {
			url: '/services',
			views: 
			{
				'' : 
				{
					templateUrl: 'views/partials/main/main.html', 
					controller: 'MainController'		
	 			},
				'content@services': 
				{
					templateUrl: 'views/partials/main/services.html',
					controller: 'MainController'
				}
			}
		})

		.state('about', {
			url: '/about',
			views: 
			{
				'' : 
				{
					templateUrl: 'views/partials/main/main.html', 
					controller: 'MainController'		
	 			},
				'content@about': 
				{
					templateUrl: 'views/partials/main/about.html',
					controller: 'MainController'
				}
			}
		})

		.state('contact', {
			url: '/contact',
			views: 
			{
				'' : 
				{
					templateUrl: 'views/partials/main/main.html', 
					controller: 'MainController'		
	 			},
				'content@contact': 
				{
					templateUrl: 'views/partials/main/contact.html',
					controller: 'MainController'
				}
			}
		})

		.state('login', {
			url: '/login',
			views: 
			{
				'' : 
				{
					templateUrl: 'views/partials/main/main.html', 
					controller: 'MainController'		
	 			},
				'content@login': 
				{
					templateUrl: 'views/partials/main/login.html',
					controller: 'MainController'
				}
			}
		})

		.state('register', {
			url: '/register',
			views: 
			{
				'' : 
				{
					templateUrl: 'views/partials/main/main.html', 
					controller: 'MainController'		
	 			},
				'content@register': 
				{
					templateUrl: 'views/partials/main/register.html',
					controller: 'MainController'
				}
			}
		})

		.state('forgotPwd', {
			url: '/forgotPwd',
			views: 
			{
				'' : 
				{
					templateUrl: 'views/partials/main/main.html', 
					controller: 'MainController'		
	 			},
				'content@forgotPwd': 
				{
					templateUrl: 'views/partials/main/forgotPwd.html',
					controller: 'MainController'
				}
			}
		})

		.state('expensereporting', {
			url: '/services/expensereporting',
			views: 
			{
				'' : 
				{
					templateUrl: 'views/partials/main/main.html', 
					controller: 'MainController'
	 			},
				'content@expensereporting': 
				{
					templateUrl: 'views/partials/services/expenses/expenses_main.html',
					controller: 'ExpenseController'
				}
			}
		})


		.state('remainders', {
			url: '/services/remainders',
			views:
			{
				'':
				{
					templateUrl: 'views/partials/main/main.html',
					controller: 'MainController'
				}, 
				'content@remainders':
				{
					templateUrl: 'views/partials/services/remainders/remainders_main.html',
					controller: 'RemainderController'
				}
			}
		});

		$locationProvider.html5Mode(true);
}]);