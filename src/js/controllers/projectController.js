var projectController = function($scope,$routeParams,errorServices,projectServices,parserServices,config) {
	projectServices.queryById($routeParams.productID).then(function(data) {
		if (data.respcode == config.request.SUCCESS) {
			$scope.projects = parserServices.parseProject(data.result);
		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}