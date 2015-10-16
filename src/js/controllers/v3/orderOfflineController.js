var orderOfflineController = function($scope,$rootScope, $filter, $routeParams, $location, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "订单详情";
    toastServices.show();
    shoppingCartServices.queryOrderById({
        order_id: $routeParams.order_id
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            if (!data.result.flag) {
                $scope.order = data.result;
            } else {
                $location.path("/orders/" + $routeParams.order_id).replace();
            }
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.parseTime = function(time) {
    	if(!time) return;
        var day = $filter("limitTo")(time.split(" ")[0], -5),
            date = $filter("limitTo")(time.split(" ")[1], 5);
        return day + " " + date;
    };
}
