var addBankController = function($scope, $rootScope, errorServices, toastServices, parserServices, userServices, settingServices, config) {
    // remote data
    $scope.provinces = PROVINCES;
    $scope.cities = CITIES;
    $scope.banks = config.banks;
    // user input 
    $scope.bank = {
        province: "广东省",
        city: "深圳市",
        name: "中国工商银行",
        card_number: "",
        branch: "",
        code: "ccb",

    }
    $scope.ajaxForm = function(form) {
        toastServices.show()
        $scope.bank.name = $scope.banks[$scope.bank.code];
        settingServices.createBank($scope.bank).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide()
            }
        })
    }
}
