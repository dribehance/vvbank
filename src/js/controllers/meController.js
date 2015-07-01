var meController = function($scope,errorServices,parserServices,userServices,config){
	userServices.info.account().then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			$scope.user = parserServices.parseUser(data.result)
		}
		else {
			errorServices.autoHide(data.message)
		}
	})	
}