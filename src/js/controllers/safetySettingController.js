var safetySettingController = function($scope, $location, errorServices, userServices, parserServices, config) {
    userServices.info.safety().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.safety_info = parserServices.parseSafetyInfo(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.goAuthen = function () {
    	if ($scope.safety_info.realname.status == 0 ) {
    		$location.path("/name-authen")
    	}	
    }
}
