var productsController = function($scope,$route,$routeParams, $location, licaiServices, toastServices, parserServices, errorServices, config) {
    toastServices.show();

    // query exchange
    licaiServices.queryExchange().then(function(data) {
        $scope.exchanges = data.result;
        for (var i = 0;i<$scope.exchanges.length;i++) {
            if ($routeParams.exchangeCode == $scope.exchanges[i].productCode) {
                $scope.exchangeName = $scope.exchanges[i].name;
            }
        }
    })

    // infinit scroll
    var page=1;
    $scope.products = [];
    $scope.loadMore = function() {
        licaiServices.queryByExchange($routeParams.exchangeCode, page).then(function(data) {
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
                page++;
            } else {
                $scope.products = [];
                errorServices.autoHide("暂无数据")
            }
        })
    }
    // fresh
    $scope.reload = function() {
        $route.reload();
    }
    $scope.loadMore();
}
