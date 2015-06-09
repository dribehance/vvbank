var productController = function($scope,productServices,userServices){
	productServices.get().then(function(data){
		$scope.product = data;
	});
	userServices.get().then(function(data){
		console.log(data)
		$scope.user = data;
	});
}