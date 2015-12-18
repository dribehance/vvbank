var addBankController = function($scope, $rootScope, errorServices, toastServices, parserServices, userServices, v4userServices, settingServices, config) {
    // query bank example
    toastServices.show();
    settingServices.queryBanksExample().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.banks = data.result;
            $scope.selected_bank = $scope.banks[0];
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // query provinces
    toastServices.show();
    settingServices.queryProvinces().then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.provinces = data.result;
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.$watch("bank.provinceId", function(n, o) {
        if (n === undefined || o === undefined) {
            return;
        }
        queryCity(n);
    })
    var queryCity = function(province_id) {
        settingServices.queryCityByProvinceId(province_id).then(function(data) {
            $scope.cities = data.result;
        })
    };
    // query system user info
    $scope.userinfo = {};
    settingServices.querySystemUserinfoInBank().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.userinfo = data.result;
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
    }
    $scope.getSmscode = function() {
        v4userServices.getSmscode({
            mobile: $scope.userinfo.cellPhone,
            sendType: "9"
        }).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                errorServices.autoHide("验证码发送成功");
            } else {
                errorServices.autoHide(data.message);
            }
        })
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(150);
    };
    // $scope.provinces = PROVINCES;
    // $scope.cities = CITIES;
    // $scope.banks = config.banks;
    // user input 
    // $rootScope.user.realname = "dribehance";
    $scope.bank = {
        card_number: "",
        name: "",
        provinceId: 44,
        cityId: 4403,
        bankId: 19,
        branch: "",
        realname: $scope.userinfo.realname,
        identity: "",
        smscode: ""

    }
    $scope.ajaxForm = function(form) {
        toastServices.show()
        $scope.bank.bankId = $scope.selected_bank.bankId;
        $scope.bank.name = $scope.selected_bank.bankName;
        $scope.bank.realname = $scope.userinfo.realname;
        console.log($scope.bank)
        settingServices.createBank($scope.bank).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
