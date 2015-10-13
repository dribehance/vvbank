var orderOfflineController = function($scope, $filter, $routeParams, $location, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
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
