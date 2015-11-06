// by dribehance <dribehance.kksdapp.com>
var cashConfirmController = function($scope, $rootScope, $location, $timeout, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
    // get confirm info
    $scope.input = {};
    toastServices.show();
    userServices.queryCashConfirmInfo({
        "withdrawMoneyHidden": $routeParams.withdrawMoneyHidden,
        "antiWithdrawMoneyHidden": $routeParams.antiWithdrawMoneyHidden,
        "fee": $routeParams.fee,
        "fee2": $routeParams.fee2,
        "voucher": $routeParams.voucher,
        "selectID": $routeParams.selectID,
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.cash_confirm_info = data;
        } else {
            errorServices.autoHide(data.message);
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
    };
    // get smscode
    $scope.getSmscode = function() {
        userServices.getCashSmscode($scope.cash_confirm_info.boundCellphone).then(function(data) {
            if (data.result.status == 1 && data.respcode == config.request.SUCCESS) {
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(150);
    };
    // ajaxform
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.cash({
            "pwd": $scope.input.password,
            "code": $scope.input.smscode,
            "withdrawMoney": $routeParams.withdrawMoneyHidden,
            "antiWithdrawMoney": $routeParams.antiWithdrawMoneyHidden,
            "fee": $routeParams.fee,
            "fee2": $routeParams.fee2,
            "voucher": $routeParams.voucher,
            "bankAccountID": $routeParams.selectID,
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                errorServices.autoHide(data.message);
                $timeout(function() {
                    $location.path("me").replace();
                }, 1500)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
