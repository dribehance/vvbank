var licaiController = function($scope, $location, licaiServices, toastServices, parserServices, errorServices, config) {
    toastServices.show();
    // fresh
    $scope.reload = function() {
        if ($scope.current_exchange) {
            $scope.queryByExchange($scope.current_exchange);
        }
    }
    // ------------query product by exchange
    var page = 1;
    $scope.current_exchange={
        "name":"",
        "productCode":""
    };
    $scope.queryByExchange = function(exchange) {
        toastServices.show();
        if ($scope.current_exchange != exchange) {
            page = 1;
        }
        $scope.current_exchange = exchange;
        licaiServices.queryByExchange(exchange.productCode, page).then(function(data) {
            $scope.groups = "";
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.products = parserServices.parseProducts(data.result);
            } else {
                $scope.products = [];
                errorServices.autoHide("暂无数据")
            }
        })
        page++;
    }
    // infinit scroll
    $scope.loadMore = function() {
        
    }
    // query exchange
    licaiServices.queryExchange().then(function(data) {
        $scope.exchanges = data.result;
    })
    // query all product
    licaiServices.query().then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            var result = parserServices.parseLicaiProduct(data.result);
            $scope.groups = result.groups;
            // $scope.exchanges = result.exchanges
        } else {
            errorServices.autoHide(data.message)
        }
        // $scope.groups = data;
    });
}
