var settingController = function($scope, $location, localStorageService,platformServices, errorServices, userServices, parserServices, config) {
    userServices.info.safety().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.safety_info = parserServices.parseSafetyInfo(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.logout = function() {
        userServices.logout().then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
            	localStorageService.remove("token");
                platformServices.notify();
                $location.path("/index").replace();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
