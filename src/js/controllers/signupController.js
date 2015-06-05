var signupController = function($scope){
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
	$scope.getVertifyCode = function(){
		console.log("get vertifyCode")
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