var nameAuthenController = function($scope, $rootScope, SharedState, userServices, errorServices, toastServices, config) {
    $scope.input = {
        "realname": "",
        "identity": ""
    }
    toastServices.show();
    userServices.queryAuthenInfo().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.realname = data.result.realname;
            $scope.realnumber = data.result.realnumber;
        } else {
            SharedState.set("authen_step", 2)
            errorServices.autoHide(data.message);
        }
    })
    $scope.ajaxForm = function(form) {
        userServices.authen($scope.input.realname, $scope.input.identity).then(function(data) {
            console.log(data)
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide("认证失败")
            }
        });
    }
}
