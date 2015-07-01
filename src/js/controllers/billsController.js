var billsController = function($scope,myServices,parserServices,errorServices,config) {
	myServices.bills().then(function(data){
		console.log(data)
		if (data.respcode == config.request.SUCCESS) {
			$scope.bills = parserServices.parseBills(data.result)
		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}