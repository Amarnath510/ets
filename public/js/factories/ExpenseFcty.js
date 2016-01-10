angular.module('ExpenseFcty', []).factory('expenseFactory', ['$resource', function($resource){
	return {
		AllTrans: 			$resource('/exapi/alltrans', {}, {'query' : {method: 'GET', isArray: true}}),
		AllTransByDate: 	$resource('/exapi/alltransbydate/:sDate/:eDate', 
											{sDate: '@sDate', eDate: '@eDate'}, {'query' : {method: 'GET', isArray: true}}),
		TransById: 			$resource('/exapi/gettrans/:id', {id: '@id'}),
		AddTrans: 			$resource('/exapi/addtrans'),
		DeleteAllTrans: 	$resource('/exapi/removealltrans'),
		DeleteById: 		$resource('/exapi/removetrans/:id', {id: '@id'}),
		UpdateTransById: 	$resource('/exapi/updatetrans/:id', {id: '@id'})
		// SendMail: 			$resource('/mailapi/sendmail')
	}
}]);