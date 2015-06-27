var indexController = function($scope,$timeout,licaiServices,bannerServices) {
	licaiServices.recommand().then(function(data) {
		$scope.products = data;
		$timeout(function(){
			$("#product-carousel").owlCarousel({autoPlay: false,singleItem:true});
		},0);
	});
	bannerServices.get().then(function(data){
		$scope.banners = data;
		$timeout(function(){
			$("#banner").owlCarousel({autoPlay: 3000,singleItem:true});
		},0);
	});
}