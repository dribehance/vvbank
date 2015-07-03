var bankCardsController = function($scope, $rootScope, errorServices, localStorageService, parserServices, userServices, settingServices, config) {
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

}