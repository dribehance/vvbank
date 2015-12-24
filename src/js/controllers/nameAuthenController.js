var nameAuthenController = function($scope, $rootScope, $routeParams, $timeout, SharedState, userServices, errorServices, toastServices, config) {
    // authen
    if ($routeParams.state == '1') {
        $timeout(function() {
            SharedState.set("authen_step", 1)
        }, 0)
        toastServices.show();
        userServices.queryAuthenInfo().then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                $scope.realname = data.result.realname;
                $scope.realnumber = data.result.realnumber;
            } else {
                errorServices.autoHide(data.message);
            }
        })
        return;
    }
    // without authen
    $scope.input = {
        "realname": "",
        "identity": ""
    }
    $timeout(function() {
        SharedState.set("authen_step", 2)
    }, 0)
    $scope.ajaxForm = function(form) {
        userServices.authen($scope.input.realname, $scope.input.identity).then(function(data) {
            console.log(data)
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message)
            }
        });
    }
}