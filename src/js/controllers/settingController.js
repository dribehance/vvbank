var settingController = function($scope, $location, localStorageService, errorServices, userServices, parserServices, config) {
    userServices.info.safety().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.safety_info = parserServices.parseSafetyInfo(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.exit = function() {
        userServices.exist().then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
            	localStorageService.remove("token");
                $location.path("/index").replace();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
