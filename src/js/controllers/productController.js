var productController = function($scope,$routeParams,productServices,parserServices,errorServices,config){
	productServices.queryById($routeParams.productID).then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			$scope.product = parserServices.parseProduct(data.result);
		}
		else {
			errorServices.autoHide(data.message)
		}
	});
}