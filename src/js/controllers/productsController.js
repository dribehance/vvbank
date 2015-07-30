var productsController = function($scope, $route, $routeParams, $location, pushToRefreshServices, licaiServices, toastServices, parserServices, errorServices, config) {
    toastServices.show();

    // query exchange
    licaiServices.queryExchange().then(function(data) {
        $scope.exchanges = data.result;
        for (var i = 0; i < $scope.exchanges.length; i++) {
            if ($routeParams.exchangeCode == $scope.exchanges[i].productCode) {
                $scope.exchangeName = $scope.exchanges[i].name;
            }
        }
    })

    // infinit scroll
    var page = 1,
        no_more = false;
    $scope.products = [];
    $scope.loadMore = function() {
        if (no_more) {
            pushToRefreshServices.show("没有了")
            return;
        }
        licaiServices.queryByExchange($routeParams.exchangeCode, page).then(function(data) {
            toastServices.hide();
            pushToRefreshServices.hide();
            if (data.result.length > 0) {
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
                page++;
            } else {
                errorServices.autoHide("没有了")
                // $scope.products = [];
                no_more = true;
            }
        })
    }
    // fresh
    $scope.reload = function() {
        $route.reload();
    }
    $scope.loadMore();
}
