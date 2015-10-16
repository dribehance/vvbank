// by dribehance <dribehance.kksdapp.com>
var hotelController = function($scope, $rootScope, $location, $routeParams, $filter, SharedState, mallServices, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "商品详情";
    $scope.input = {
        password: "",
        message: "",
        error: false,
        banners:[],
    }
    $scope.amount_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    toastServices.show();
    mallServices.queryById({
        id: $routeParams.item_id
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.emall_item = data.result;
            $scope.input.banners.push($scope.emall_item.imageOne);
            $scope.input.banners.push($scope.emall_item.imageTwo);
            $scope.input.banners.push($scope.emall_item.imageThree);
            $scope.input.banners.push($scope.emall_item.imageFour);
            var amount = $scope.emall_item.goodsNumber > 10 ? 10 : $scope.emall_item.goodsNumber;
            $scope.amount_options = $filter("limitTo")($scope.amount_options, amount);
            if ($scope.amount_options.length == 0) {
                $scope.amount_options.push("0")
            }
            $scope.input.amount = $scope.amount_options[0];
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.enter_password = function() {
        if (!localStorageService.get("token")) {
            $location.path("/signIn");
            return;
        }
        if ($scope.emall_item.goodsNumber == 0) {
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
                // SharedState.turnOff("password_panel");
                SharedState.turnOn("award_panel");
                $scope.input.message = "";
                return;
            }
            if (data.respcode == "0001") {
                $scope.prize_status = 0;
                // SharedState.turnOff("password_panel");
                SharedState.turnOn("award_panel");
                return;
            }
            errorServices.autoHide(data.message)
        })
    }
    $scope.exchange = function() {
        var url = "/eyuan_mall/payment?goods_id=" + $scope.emall_item.goodsId + "&quantity=" + $scope.input.amount;
        if ($scope.emall_item.goodsNumber == 0) {
            return;
        }
        $location.url(url)
    }
    $scope.addToCart = function() {
        if (!localStorageService.get("token")) {
            $location.path("/signIn");
            return;
        }
        if ($scope.emall_item.goodsNumber == 0 || $scope.emall_item.goodsNumber < 0) {
            return;
        }
        toastServices.show();
        shoppingCartServices.add({
            goods_id: $scope.emall_item.goodsId,
            quantity: $scope.input.amount
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
