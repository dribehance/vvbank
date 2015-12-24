var bindTelephoneController = function($scope, $rootScope,userServices,config) {
    console.log($rootScope.user)
    $scope.input = {
            telephone: "",
            smscode: "",
        }
        // bind telephone and password
    $scope.$watch("input.telephone", function(n, o) {
        $scope.input.username = n;
    });
    // counting
    // $scope.callbackTimer = {};
    // $scope.callbackTimer.counting = 0;
    // $scope.callbackTimer.finish = function() {
    //     $scope.callbackTimer.counting = 0;
    //     $scope.$apply();
    // }
    // $scope.callbackTimer.addSeconds = function(seconds) {
    //     angular.element("#vvcountdown")[0].clear();
    //     angular.element("#vvcountdown")[0].resume();
    //     angular.element("#vvcountdown")[0].start();
    // }
    $scope.getSmscode = function() {
        userServices.getSmscode($scope.user.telephone, config.smstype.BIND_TELEPHONE).then(function(data) {
            if (!(data.result.status == 1 && data.respcode == config.request.SUCCESS)) {
                errorServices.autoHide();
            }
        })
        // $scope.callbackTimer.counting = 1;
        // $scope.callbackTimer.addSeconds(150);
    }
    $scope.ajaxForm = function(form) {
        userServices.bindTelephone($rootScope.user.telephone, $scope.input.smscode).then(function(data) {
            if (data.respcode == config.request.SUCCESS && data.result.status == 1) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message);
            }
        });
    }
}
