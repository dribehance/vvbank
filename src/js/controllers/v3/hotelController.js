// by dribehance <dribehance.kksdapp.com>
var hotelController = function($scope,$location, $routeParams,$filter, SharedState, mallServices, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        password: "",
        message:"",
        error:false
    }
    $scope.amount_options = [1,2,3,4,5,6,7,8,9,10];
    toastServices.show();
    mallServices.queryById({
        id: $routeParams.item_id
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.emall_item = data.result;
            var amount = $scope.emall_item.goodsNumber > 10?10:$scope.emall_item.goodsNumber;
            $scope.amount_options = $filter("limitTo")($scope.amount_options,amount);
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.enter_password = function () {
        if (!localStorageService.get("token")) {
            $location.path("/signIn");
            return;
        }
        SharedState.turnOn("password_panel");
    }
    $scope.try = function() {
        toastServices.show();
        mallServices.tryLucky({
            goods_id: $scope.emall_item.goodsId,
            password: $scope.input.password
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                $scope.prize_status = 1;
                SharedState.turnOff("password_panel");
                SharedState.turnOn("award_panel");
                $scope.input.message = "";
                return;
            } 
            if (data.respcode == "0001") {
                $scope.prize_status = 0;
                SharedState.turnOff("password_panel");
                SharedState.turnOn("award_panel");
                return;
            }
            $scope.input.message = data.message;
        })
    }
    $scope.addToCart = function() {
        if (!localStorageService.get("token")) {
            $location.path("/signIn");
            return;
        }
        toastServices.show();
        shoppingCartServices.add({
            goodsId: $scope.emall_item.goodsId
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                errorServices.autoHide(data.message)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
