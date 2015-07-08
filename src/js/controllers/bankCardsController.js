var bankCardsController = function($scope, $rootScope, errorServices, localStorageService, toastServices, parserServices, userServices, settingServices, config) {
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

            if (data.respcode == config.request.SUCCESS) {

            }
            else {
                errorServices.autoHide(data.message)
            }
        })
    }

}
