var signinController = function($scope, $location, userServices, toastServices, errorServices, localStorageService, config) {
    $scope.input = {
        name: "",
        password: ""
    }
    $scope.ajaxSubmit = function(form) {
        toastServices.show();
        userServices.login($scope.input.name, $scope.input.password).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                localStorageService.cookie.set("token", data.result.token);
                $location.path("/index").replace();
            } else {
                errorServices.autoHide(data.message);
            }
        });
    }

}
