var forgetController = function($scope,$location,userServices,toastServices,localStorageService,errorServices,SharedState,config){
	$scope.input = {
		"telephone":"",
		"smscode":"",
		"password":""
	}
	// counting
	$scope.callbackTimer = {};
	$scope.callbackTimer.counting = 0;
	$scope.callbackTimer.finish = function() {
		console.log("callbackTimer");
		$scope.callbackTimer.counting = 0;
		$scope.$apply();
	}
	$scope.callbackTimer.addSeconds = function(seconds) {
		angular.element("#vvcountdown")[0].clear();
		angular.element("#vvcountdown")[0].resume();
		angular.element("#vvcountdown")[0].start();
	}
	$scope.nextStep = function () {
		toastServices.show();
		userServices.exist($scope.input.telephone,$scope.input.username).then(function(data){
			toastServices.hide();
			if ( data.result.status == config.request.EXIST ) {
				SharedState.set("forgetStep",2)
			}
			else {
				errorServices.autoHide("该手机号还没注册");
			}
		})
	}
	$scope.ajaxForm = function(form) {
		userServices.forgetPassword($scope.input.telephone,$scope.input.smscode,$scope.input.password).then(function(data){
			if (data.respcode == config.request.SUCCESS) {
				localStorageService.cookie.set(data.result.token);
				$location.path("/signin").replace();
			}
			else {
				errorServices.autoHide(data.message);
			}
		})
	}
}