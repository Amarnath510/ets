angular.module('RemainderFcty', []).factory('remainderFactory', ['$resource', function($resource) {
	return {
		AddRemainder: 	$resource('/remapi/addRemainder'),
		AllRemainders: 	$resource('/remapi/allRemainders', {}, {'query' : {method : 'GET', isArray: true}}),
		UpdateByRemId: 	$resource('/remapi/updateRemById/:id', {id: '@id'}),
		RemoveRemById: 	$resource('/remapi/removeRemById/:id', {id: '@id'}),
		RemoveAllRem: 	$resource('/remapi/removeAllRem')
	}
}]);