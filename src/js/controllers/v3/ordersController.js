// by dribehance <dribehance.kksdapp.com>
var ordersController = function($scope, $rootScope, $location, $filter, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "订单";
    $scope.order_status = {
        "0":"已取消",
        "1":"已支付",
        "2":"已发货",
        "3":"已收货",
        "4":"已使用",
    }
    // $scope.orders = 
    toastServices.show();
    shoppingCartServices.queryOrders().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.orders = data.result;
            if (angular.equals($scope.orders,{})) {
                $scope.no_order = true;
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
    // query order
    $scope.queryOrderById = function(id) {
        var path = "/orders/" + id;
        if (!id) return;
        $location.path(path);
    };
    $scope.query_order_status = function (status) {
        return $scope.order_status[status]
    }
}
