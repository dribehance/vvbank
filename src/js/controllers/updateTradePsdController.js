var updateTradePsdController = function($scope,$rootScope,userServices,errorServices,config){
	$scope.input = {
		vertifyCode:"",
		password:"",
		password_1:""
	}
	// post
	$scope.ajaxForm = function(form) {
		var password = {
			o:"",
			n:$scope.input.password
		}
		console.log(password)
		userServices.updateTradePassword(password).then(function(data){
			if(data.respcode == config.request.SUCCESS) {
				console.log(data)
				$rootScope.back();
			}
			else {
				errorServices.autoHide(data.message)
			}
		})
	}
}