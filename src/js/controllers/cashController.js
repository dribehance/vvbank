var cashController = function($scope){
	$scope.banks = ["中国工商银行","招商银行","农业银行"];
	// user input
	$scope.input = {
		bank:"中国工商银行",
		password:"",
		vertifyCode:""
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
	// user post
	$scope.ajaxForm = function(){

	}
}