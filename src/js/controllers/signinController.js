var signinController = function($scope, $routeParams, $location, userServices, platformServices, toastServices, errorServices, localStorageService, config) {
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
                platformServices.notify();
                if ($routeParams.serial_code) {
                    $location.path("/serial").replace();
                } else {
                    $location.path("/me").replace();
                }
            } else {
                errorServices.autoHide(data.message);
            }
        });
    }

}
