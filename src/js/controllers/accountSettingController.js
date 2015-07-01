var accountSettingController = function($scope,errorServices,parserServices,userServices,settingServices,config) {
	// bind _m_user to scope.user
	// remote data
	$scope.degrees = config.degrees;
	$scope.scales = config.scales;
	$scope.incomes = config.incomes;
	// safety
	userServices.info.safety().then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			console.log(data)
			$scope.safety_info = parserServices.parseSafetyInfo(data.result);
		}
	})
	// user input
	userServices.info.basic().then(function(data){
		console.log("basie")
		console.log(data)
		if (data.respcode == config.request.SUCCESS) {
			$scope.user = parserServices.parseUser(data.result);
		}
		else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.ajaxForm = function(form) {
		// $scope.user =
		settingServices.update($scope.user).then(function(data){
			if (data.respcode == config.request.SUCCESS) {
				$location.path("/setting").replace();
			}
			else {
				errorServices.autoHide(data.message)
			}
		})
	}
}