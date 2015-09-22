var cashController = function($scope, $rootScope, userServices, toastServices, parserServices, settingServices, $location, errorServices, myServices, config) {
    settingServices.queryBanks().then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                $scope.bank = parserServices.parseBank(data.result);
            } else {
                errorServices.autoHide(data.message)
            }
        })
        // user input
    $scope.input = {
            bankId: "",
            password: "",
            smscode: "",
            money: "",
        }
        // counting

    $scope.callbackTimer = {};
    $scope.callbackTimer.counting = 0;
    $scope.callbackTimer.finish = function() {
        console.log("callbackTimer");
        $scope.callbackTimer.counting = 0;
        $scope.$apply();
    }
    $scope.callbackTimer.addSeconds = function(seconds) {
        angular.element("#vvcountdown")[0].clear();
        angular.element("#vvcountdown")[0].resume();
        angular.element("#vvcountdown")[0].start();
    }
    $scope.getSmscode = function() {
        userServices.getSmscode($scope.input.telephone, config.smstype.SIGNUP).then(function(data) {
            if (data.result.status == 1 && data.respcode == config.request.SUCCESS) {
                errorServices.autoHide("验证码发送成功");
            }
            else {
                errorServices.autoHide(data.message)
            }
        })
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(150);
    }

    $scope.ajaxForm = function(form) {
        $scope.input.id = $scope.bank.id;
        toastServices.show();
        userServices.cash($scope.input).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message);
            }
        },
        function(){
            toastServices.hide();
            errorServices.autoHide("提现错误");
        });
    }
}
