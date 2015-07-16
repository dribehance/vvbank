var bankCardsController = function($scope, $rootScope, $route, $window, errorServices, localStorageService, toastServices, parserServices, userServices, settingServices, config) {
    userServices.info.basic().then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                $scope.user = parserServices.parseUser(data.result);
            } else {
                errorServices.autoHide(data.message);
            }
        })
        // user post
    settingServices.queryBanks().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.bank = parserServices.parseBank(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    })
    $scope.deleteBank = function() {
        toastServices.show();
        settingServices.deleteBank($scope.bank).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS && data.result.status == 1) {
                $route.reload();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }

}
