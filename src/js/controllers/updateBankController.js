var updateBankController = function($scope, $rootScope, errorServices, toastServices, parserServices, userServices, settingServices, config) {
    // remote data
    $scope.provinces = PROVINCES;
    $scope.cities = CITIES;
    $scope.banks = config.banks;

    settingServices.queryBanks().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.bank = parserServices.parseBank(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    })
    $scope.ajaxForm = function(form) {
        toastServices.show()
        $scope.bank.name = $scope.banks[$scope.bank.code];
        settingServices.updateBank($scope.bank).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide()
            }
        })
    }
}
