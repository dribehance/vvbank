// by dribehance <dribehance.kksdapp.com>
var paymentController = function($scope, $routeParams, mallServices,SharedState, settingServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        password: "",
        province:{},
        city:{},
        payment_result: false
    };
    toastServices.show();
    mallServices.queryPaymentInfo({
        car_ids: $routeParams.car_ids,
        goods_id: $routeParams.goods_id,
        quantity: $routeParams.quantity
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.delivery = data.conditions;
            $scope.products = data.result;
            $scope.input.username = $scope.delivery.recipientName;
            $scope.input.telephone = $scope.delivery.recipientPhone;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.pay = function() {
        if ($scope.delivery.recipientName.trim() == '' || $scope.delivery.address.trim() == '' || $scope.delivery.recipientPhone.trim() == '') {
            errorServices.autoHide("请先完善收货信息")
            return;
        }
        var params = {
            pwd: $scope.input.password,
            car_ids: $routeParams.car_ids,
            goods_id: $routeParams.goods_id,
            quantity: $routeParams.quantity,
            contractName: $scope.delivery.recipientName,
            contractPhone: $scope.delivery.recipientPhone,
            contractAddress: $scope.delivery.address
        }
        toastServices.show();
        mallServices.payment(params).then(function(data){
            toastServices.hide()
            if(data.respcode == config.request.SUCCESS) {
                errorServices.autoHide(data.message) 
                $scope.input.payment_result = true;   
            }
            else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // query provinces
    settingServices.queryProvinces().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.provinces = data.result;
            $scope.input.province = $scope.provinces[0];
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.$watch("input.province.provinceId", function(n, o) {
        if (n === undefined) {
            return;
        }
        queryCity(n);
    }, true)
    var queryCity = function(province_id) {
        settingServices.queryCityByProvinceId(province_id).then(function(data) {
            $scope.cities = data.result;
        })
    }
    $scope.ajaxForm = function() {
        toastServices.show();
        mallServices.modifyAddress({
            "contractName":$scope.input.username,
            "contractPhone":$scope.input.telephone,
            "provinceId":$scope.input.province.provinceId,
            "cityId":$scope.input.city.cityId,
            "contractAddress":$scope.input.address,
            "check":$scope.input.check

        }).then(function(data){
            toastServices.hide()
            if(data.respcode == config.request.SUCCESS) {
                $scope.delivery.recipientName = $scope.input.username;
                $scope.delivery.recipientPhone = $scope.input.telephone;
                $scope.delivery.address = $scope.input.province.provinceName+$scope.input.city.cityName+$scope.input.address;
                SharedState.turnOff("address_panel")
                errorServices.autoHide(data.message);
            }
            else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
