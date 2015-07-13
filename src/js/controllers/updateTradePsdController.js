var updateTradePsdController = function($scope, $rootScope, userServices,toastServices, parserServices, errorServices, config) {
    $scope.input = {
        old_password: "",
        password: "",
        password_1: ""
    }
    userServices.info.safety().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.safety_info = parserServices.parseSafetyInfo(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    // post
    $scope.ajaxForm = function(form) {
    	toastServices.show();
        var password = {
            o: $scope.input.password,
            n: $scope.input.password
        }
        userServices.updateTradePassword(password).then(function(data) {
        	toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
