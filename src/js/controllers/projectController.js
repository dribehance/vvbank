var projectController = function($scope,$routeParams,errorServices,projectServices,parserServices,config) {
	projectServices.queryById($routeParams.productID).then(function(data) {
		if (data.respcode == config.request.SUCCESS) {
			console.log(data)
			$scope.projects = parserServices.parseProject(data.result);
		}
	})
}