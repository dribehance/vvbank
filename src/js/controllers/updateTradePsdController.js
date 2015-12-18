var updateTradePsdController = function($scope, $rootScope, userServices, v4userServices, toastServices, parserServices, errorServices, config) {
    $scope.input = {
        smscode: "",
        identify: "",
        password: "",
        password_1: "",
    };
    toastServices.show();
    userServices.queryTradePasswordInfo().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.phone = data.phone;
        } else {
            errorServices.autoHide("服务器错误");
        }
    });
    // counting
    $scope.callbackTimer = {};
    $scope.callbackTimer.counting = 0;
    $scope.callbackTimer.finish = function() {
        $scope.callbackTimer.counting = 0;
        $scope.$apply();
    }
    $scope.callbackTimer.addSeconds = function(seconds) {
        angular.element("#vvcountdown")[0].clear();
        angular.element("#vvcountdown")[0].resume();
        angular.element("#vvcountdown")[0].start();
    }
    $scope.getSmscode = function() {
        v4userServices.getSmscode({
            mobile:$scope.phone,
            sendType: 8
        }).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                errorServices.autoHide("验证码发送成功");
            } else {
                errorServices.autoHide(data.message);
            }
        })
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(150);
    };
    // userServices.info.safety().then(function(data) {
    //     if (data.respcode == config.request.SUCCESS) {
    //         $scope.safety_info = parserServices.parseSafetyInfo(data.result);
    //     } else {
    //         errorServices.autoHide(data.message)
    //     }
    // });
    // query update info
    // post
    $scope.ajaxForm = function(form) {
        toastServices.show();
        var password = {
            smscode: $scope.input.smscode,
            n: $scope.input.password,
            idCard: $scope.input.identify
        }
        userServices.updateTradePassword(password).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS && data.result.status == 1) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
