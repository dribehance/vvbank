var signinController = function($scope, $rootScope,$routeParams, $location, $timeout, userServices, platformServices, toastServices, errorServices, localStorageService, config) {
    $rootScope.page_title = "优易投";
    if($location.path().indexOf("/signIn") != -1){
        $scope.signIn = true;
    }
    $scope.input = {
        name: "",
        password: ""
    }
    $scope.ajaxSubmit = function(form) {
        toastServices.show();
        userServices.login($scope.input.name, $scope.input.password, $routeParams.type).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                localStorageService.set("token", data.result.token);
                localStorageService.set("logonUsername", data.result.logonUsername);
                localStorageService.set("iconUrl", data.result.iconUrl);
                platformServices.notify();
                if ($routeParams.type == 1) {
                    $timeout(function() {
                        window.location.href = data.result.url;
                    }, 1000);
                }else{
                    var path = $routeParams.from;
                    if (path) {
                        $location.path(path).replace();
                    }else {
                        $location.path("/me").replace();
                    }
                }
            } else {
                errorServices.autoHide(data.message);
            }
        });
    }

}
