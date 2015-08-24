var addBankController = function($scope, $rootScope, errorServices, toastServices, parserServices, userServices, settingServices, config) {
    // query bank example
    toastServices.show();
    settingServices.queryBanksExample().then(function(data){
        toastServices.hide()
        if(data.respcode == config.request.SUCCESS) {
            $scope.banks = data.result;
            $scope.selected_bank = $scope.banks[0];
        }
        else {
            errorServices.autoHide(data.message);
        }
    });
    // query provinces
    settingServices.queryProvinces().then(function(data){
        if(data.respcode == config.request.SUCCESS) {
            $scope.provinces = data.result; 
        }
        else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.$watch("bank.provinceId",function(n,o) {
        if (n === undefined || o === undefined) {
            return;
        }
        queryCity(n);
    })
    var queryCity = function(province_id) {
        console.log(province_id)
        settingServices.queryCityByProvinceId(province_id).then(function(data){
            $scope.cities = data.result;
        })
    }
    // $scope.provinces = PROVINCES;
    // $scope.cities = CITIES;
    // $scope.banks = config.banks;
    // user input 
    // $rootScope.user.realname = "dribehance";
    $scope.bank = {
        card_number:"",
        name:"",
        provinceId: 44,
        cityId: 4403,
        bankId: 19,
        branch:"",
        realname:$rootScope.user.realname

    }
    $scope.ajaxForm = function(form) {
        toastServices.show()
        $scope.bank.bankId = $scope.selected_bank.bankId;
        $scope.bank.name = $scope.selected_bank.bankName;
        console.log($scope.bank)
        settingServices.createBank($scope.bank).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS && data.result.status ==1) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
