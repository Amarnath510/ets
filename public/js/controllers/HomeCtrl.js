angular.module('HomeCtrl', []).controller('HomeController', function($scope, $location) {
	$scope.carouselInterval = 2000;
	$scope.slides = [
						{
							'image': 'images/expense_carousel.png',
							'title': 'Expense Reporting'
						},
						{
							'image': 'images/expense_carousel.png',
							'title': "Todo Remainder's"
						},
						{
							'image': 'images/expense_carousel.png',
							'title': "PDF Operation's"
						},
						{
							'image': 'images/expense_carousel.png',
							'title': 'Image Operations'
						}
					];

});
