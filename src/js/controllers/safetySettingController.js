var safetySettingController = function($scope,errorServices,userServices,parserServices,config){
	userServices.info.safety().then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			$scope.safety_info = parserServices.parseSafetyInfo(data.result);
		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}