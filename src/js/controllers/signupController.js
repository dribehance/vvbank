var signupController = function($scope,userServices,SharedState,config,toastServices){
	$scope.input = {
		telephone:"",
		password:"",
		vertifyCode:"",
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
		toastServices.show("加载中");
		userServices.exist($scope.input.telephone,"").then(function(data){
			console.log(data)
			toastServices.hideLoader();
			if ( !data.result.status ) {
				SharedState.set("signUpStep",2)
			}
			else {
				$scope.errormsg = "该手机号已经注册";
			}
		})
	}
	$scope.getVerifycode = function(){
		userServices.verifycode($scope.input.telephone,config.smstype.SIGNUP).then(function(data){
			console.log(data)
		})
		$scope.callbackTimer.counting = 1;
		$scope.callbackTimer.addSeconds(5);
	}
	// error handler
	$scope.errormsg = "";
	// submit handler
	$scope.ajaxForm = function(form) {
		console.log("submit")
	}
}