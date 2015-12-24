/**
 * Created by Administrator on 15-12-1.
 */
var orderInfoWriteController = function($scope, $rootScope,$location, $route, $routeParams,SharedState, cfServices, settingServices,errorServices, localStorageService,toastServices,config) {

    $scope.input = {
        province: {},
        city: {}
    };

    //优租包订单
    cfServices.orderTips($routeParams.cfId, $routeParams.amount).then(function(data){
        if (data.respcode == config.request.SUCCESS) {
            $scope.funding = data.result;
        }else{
            errorServices.autoHide(data.message);
        }
    });

    /*$scope.back = function(){
        $location.path("/investment_projects").replace();
    }*/

    //优租包订单下一步
    $scope.nextStep = function(){
        var params = {
            rewardId : $scope.funding.rewardID,
            money : $scope.funding.money,
            fundId : $scope.funding.id
        }
        toastServices.show();
        cfServices.nextStep(params).then(function(data){
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.orderInfo = data.result;
                $location.path("/crowdFund/order/confirm").replace();
            }else{
                errorServices.autoHide(data.message);
            }
        })
    }

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
            $scope.input.city = $scope.cities[0]
        })
    };

    $scope.modifyAddress = function() {
        SharedState.turnOn("address_panel");
        // no address provide
        if ($scope.address.provider.providerId == "") return;
        $scope.input.username = $scope.address.recipientName;
        $scope.input.telephone = $scope.address.recipientPhone;
        $scope.input.address = $scope.address.address;
        angular.forEach($scope.provinces,function(province) {
            if (province.provinceId == $scope.address.provider.providerId) {
                $scope.input.province = province;
            }
        })
        $timeout(function() {
            $scope.input.city.cityId = $scope.address.city.cityId;
            $scope.input.city.cityCode = $scope.address.city.cityCode;
            $scope.input.city.cityName = $scope.address.city.cityName;
        }, 50)
    };


    // sync address;
    $scope.ajaxForm = function() {
        toastServices.show();
        cfServices.modifyAddress({
            "contractName": $scope.input.username,
            "contractPhone": $scope.input.telephone,
            "provinceId": $scope.input.province.provinceId,
            "cityId": $scope.input.city.cityId,
            "contractAddress": $scope.input.address,
            "check": $scope.input.check

        }).then(function(data) {
                toastServices.hide()
                if (data.respcode == config.request.SUCCESS) {
                    $scope.delivery.recipientName = $scope.input.username;
                    console.log($scope.input.telephone)
                    $scope.delivery.recipientPhone = $scope.input.telephone;
                    $scope.delivery.provider.providerName = $scope.input.province.provinceName;
                    $scope.delivery.city.cityName = $scope.input.city.cityName;
                    $scope.delivery.address = $scope.input.address;
                    SharedState.turnOff("address_panel")
                    errorServices.autoHide(data.message);
                } else {
                    errorServices.autoHide(data.message);
                }
            })
    };


}
