var productFilesController = function($scope,$routeParams,productServices,config){
	productServices.queryFiles($routeParams.productID).then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			$scope.files = data.result;
		}
	})
}