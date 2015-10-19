// by dribehance <dribehance.kksdapp.com>
var orderController = function($scope, $rootScope, $filter, $routeParams, $location, SharedState, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "订单详情";
    $scope.order_status = {
        "0":"已取消",
        "1":"已支付",
        "2":"已发货",
        "3":"已收货",
        "4":"已使用",
    }
    toastServices.show();
    shoppingCartServices.queryOrderById({
        order_id: $routeParams.order_id
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            if (data.result.flag == "1") {
                $scope.order = data.result;
            } else {
                $location.path("/orders_offline/" + $routeParams.order_id).replace();
            }
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.parseTime = function(time) {
        if (!time) return;
        var day = $filter("limitTo")(time.split(" ")[0], -5),
            date = $filter("limitTo")(time.split(" ")[1], 5);
        return day + " " + date;
    };
    $scope.parseCode = function(code) {
        if (!code) {
            return [];
        }
        return code.split("、");
    };
    $scope.showQrcode = function(qrcode) {
        SharedState.turnOn("qrcode");
        $scope.current_qrcode = $location.absUrl().split("#")[0] + "#/serial?serial_code=" + qrcode;
    };
    $scope.query_order_status = function (status) {
        return $scope.order_status[status]
    }
}
