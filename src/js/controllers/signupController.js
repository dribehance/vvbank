var signupController = function($rootScope,$scope,$location,userServices,errorServices,SharedState,config,toastServices,signatureServices){
	$scope.input = {
		telephone:"",
		password:"",
		smscode:"",
		username:"",
		referee:""
	}
	// bind telephone and password
	$scope.$watch("input.telephone",function(n,o){
		$scope.input.username = n;
	});
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
			if ( data.result.status == config.result.SUCCESS ) {
				SharedState.set("signUpStep",2)
			}
			else {
				errorServices.autoHide("该手机号已经注册");
			}
		})
	}
	$scope.getSmscode = function(){
		userServices.getSmscode($scope.input.telephone,config.smstype.SIGNUP).then(function(data){
			console.log(data)
		})
		$scope.callbackTimer.counting = 1;
		$scope.callbackTimer.addSeconds(5);
	}
	// error handler
	$scope.errormsg = "";
	// submit handler
	$scope.ajaxForm = function(form) {
		userServices.register($scope.input.telephone,$scope.input.password,$scope.input.username,$scope.input.referee,$scope.input.smscode).then(function(data){
			if (data.respcode == config.request.SUCCESS) {
				localStorageService.cookie.set("token",data.result.token);
				$location.path("/index").replace();
			}
			else {
				errorServices.autoHide(data.result.message);
			}
		});
	}
}