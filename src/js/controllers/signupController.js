var signupController = function($scope){
	$scope.user = {
		telephone:"",
		vertifyCode:"",
		password:""
	}
	$scope.errormsg = "";
	$scope.ajaxForm = function(user,form) {
		console.log("submit")
	}
	$scope.getVertifyCode = function(){
		console.log("get vertifyCode")
	}
}