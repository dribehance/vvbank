// by dribehance <dribehance.kksdapp.com>
var ordersController = function($scope,shoppingCartServices, errorServices, toastServices, localStorageService, config) {
	// $scope.orders = 
	toastServices.show();
	shoppingCartServices.queryOrders().then(function(data){
		toastServices.hide()
		if(data.respcode == config.request.SUCCESS) {
			$scope.orders = data.result;	
		}
		else {
			errorServices.autoHide(data.message);
		}
	})
}
