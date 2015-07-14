var updateSigninPsdController = function($scope,$rootScope, errorServices, toastServices, userServices, config) {
    $scope.input = {
            old_password: "",
            password: "",
            password_1: ""
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
    $scope.getVertifyCode = function() {
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(5);
    }
    $scope.ajaxForm = function(form) {
        toastServices.show();
        var password = {
            o: $scope.input.old_password,
            n: $scope.input.password
        }
        userServices.updateSignPassword(password).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS && data.result.status ==1) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
