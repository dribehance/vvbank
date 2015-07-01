var nameAuthenController = function($scope,$rootScope,userServices,errorServices,config) {
	$scope.input = {
		"realname":"",
		"identifyID":""
	}
	$scope.ajaxForm = function(form){
		console.log("dd")
		userServices.authen($scope.input.realname,$scope.input.identifyID).then(function(data){
			console.log(data)
			if (data.respcode == config.request.SUCCESS) {
				$rootScope.back();
			}
			else {
				errorServices.autoHide("认证失败")
			}
		});
	}
}