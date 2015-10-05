// by dribehance <dribehance.kksdapp.com>
var hotelController = function($scope, $routeParams,SharedState, mallServices, errorServices, toastServices, localStorageService, config) {
    $scope.t_hotel = {
        image: "../images/example_1.png"
    }
    toastServices.show();
    mallServices.queryById($routeParams.item_id).then(function(data){
    	toastServices.hide()
    	if(data.respcode == config.request.SUCCESS) {
    		$scope.emall_item = data.result;
    	}
    	else {
    		errorServices.autoHide(data.message);
    	}
    })
    $scope.try = function(goods_id) {
    	toastServices.show();
    	mallServices.tryLucky({goods_id:goods_id}).then(function(data){
    		toastServices.hide()
    		if(data.respcode == config.request.SUCCESS) {
    			$scope.award_status = data.status;
    			SharedState.turnOn("modal1");
    		}
    		else {
    			errorServices.autoHide(data.message);
    		}
    	})
    }
}
