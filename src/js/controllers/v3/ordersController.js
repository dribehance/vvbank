// by dribehance <dribehance.kksdapp.com>
var ordersController = function($scope, $location, $filter, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    // $scope.orders = 
    toastServices.show();
    shoppingCartServices.queryOrders().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.orders = data.result;
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
    }
}
