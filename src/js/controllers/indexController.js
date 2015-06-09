var indexController = function($scope,licaiServices,bannerServices) {
	licaiServices.recommand().then(function(data) {
		$scope.products = data;
	});
	bannerServices.get().then(function(data){
		$scope.banners = data;
	});
}