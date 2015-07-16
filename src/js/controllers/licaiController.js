var licaiController = function($scope,$route, $location, licaiServices, toastServices, parserServices, errorServices, config) {
    toastServices.show();
    // fresh
    $scope.reload = function() {
        $route.reload();
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
