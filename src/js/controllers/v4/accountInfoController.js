var accountInfoController = function($scope, $rootScope, $filter, $location, toastServices, errorServices, settingServices, parserServices, userServices, settingServices, config) {
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
    $scope.$watch("input.provinceId", function(n, o) {
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
    $scope.input = {
        "sex": "M",
        "birthday": new Date(),
        "or_marriage": "false",
        "posterity": "NONE",
        "or_house": "false",
        "or_mortgage": "false",
        "education": "PRIMARY_SCHOOL",
        "company_scale": "小于50人",
        "occupation": "OFFICIAL",
        "work_year": "",
        "income": "3000以下",
        "second_contract": "",
        "second_contract_phone": "",
        "qq": "",
        "recipientName": "",
        "recipientPhone": "",
        "provinceId": 44,
        "providerName": "",
        "providerCode": "",
        "cityId": 4403,
        "cityName": "",
        "cityCode": "",
        "address": "",
        "postcode": "",
    }
    toastServices.show();
    userServices.info.all().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.input = angular.extend({}, $scope.input, data.result);
            $scope.input.or_marriage = $scope.input.or_marriage.toString();
            $scope.input.or_house = $scope.input.or_house.toString();
            $scope.input.or_mortgage = $scope.input.or_mortgage.toString();
            console.log($scope.input)
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.ajaxForm = function(form) {
        // $scope.user =
        userServices.info.update($scope.input).then(function(data) {
            console.log(data)
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.back();
                // $location.path("/setting").replace();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
