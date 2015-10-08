// by dribehance <dribehance.kksdapp.com>
var hotelController = function($scope, $routeParams, SharedState, mallServices, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    // $scope.emall_item = {
    //     "summary": "尊享深圳希尔顿南海酒店大床房1晚＋1份免费早餐＋免费wifi＋更多优惠! 深圳蛇口希尔顿南海酒店地处南山区望海路",
    //     "logo": "http://192.168.16.20:80/resources/images/index/1.png",
    //     "goodsId": 1,
    //     "category": "酒店",
    //     "exchangPrice": 100,
    //     "luckPrice": 100,
    //     "goodsName": "希尔顿南海酒店大床房1晚"
    // };
    toastServices.show();
    mallServices.queryById({
        id:$routeParams.item_id
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.emall_item = data.result;
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.try = function(goods_id) {
        // $scope.prize = {
        //     "message": "客户18219351089抽取商品希尔顿南海酒店大床房1晚花费100.00e圆，未中奖",
        //     "status": "0"
        // };
        // SharedState.turnOn("award_panel");
        toastServices.show();
        mallServices.tryLucky({
            goods_id: goods_id
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                $scope.prize = data.result;
                SharedState.turnOn("password_panel");
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.addToCart = function() {
        toastServices.show();
        shoppingCartServices.add({
            goodsId: $scope.emall_item.goodsId
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {

            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.ajaxForm = function () {
        SharedState.turnOff("password_panel");
        SharedState.turnOn("award_panel")
    }
}
