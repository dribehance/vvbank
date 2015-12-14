var signinController = function($scope, $rootScope,$routeParams, $location, userServices, platformServices, toastServices, errorServices, localStorageService, config) {
    $rootScope.page_title = "优易投";
    $scope.input = {
        name: "",
        password: ""
    }
    $scope.ajaxSubmit = function(form) {
        toastServices.show();
        userServices.login($scope.input.name, $scope.input.password).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                localStorageService.set("token", data.result.token);
                localStorageService.set("logonUsername", data.result.logonUsername);
                localStorageService.set("iconUrl", data.result.iconUrl);
                platformServices.notify();
                    var path = $routeParams.from;
                    if (path) {
                        $location.path(path).replace();
                    }else {
                        $location.path("/me").replace();
                    }
            } else {
                errorServices.autoHide(data.message);
            }
        });
    }

}
