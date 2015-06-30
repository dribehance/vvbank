var signinController = function($scope,$location,userServices,errorServices,localStorageService,config) {
	$scope.input = {
		name:"",
		password:""
	}
	$scope.ajaxSubmit = function(form){
		userServices.login($scope.input.name,$scope.input.password).then(function(data){
			if ( data.respcode == config.request.SUCCESS ){
				localStorageService.cookie.set("token",data.result.token);
				$location.path("/index").replace();
			}
			else {
				errorServices.autoHide(data.message);
			}
		});
	}

}