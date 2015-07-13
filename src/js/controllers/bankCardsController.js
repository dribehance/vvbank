var bankCardsController = function($scope, $rootScope,$window, errorServices, localStorageService, toastServices, parserServices, userServices, settingServices, config) {
    userServices.info.basic().then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                $scope.user = parserServices.parseUser(data.result);
            } else {
                errorServices.autoHide(data.message);
            }
        })
        // user post
    settingServices.queryBanks().then(function(data) {
        console.log(data)
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
            console.log(data)
            if (data.respcode == config.request.SUCCESS && data.status == 1) {
                    $window.location.href = $window.location.href;
            }
            else {
                errorServices.autoHide(data.message)
            }
        })
    }

}
