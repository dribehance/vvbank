var productController = function($scope, $routeParams, toastServices, productServices, projectServices, parserServices, errorServices, config) {
    toastServices.show();
    productServices.queryById($routeParams.productID).then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.product = parserServices.parseProduct(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    productServices.queryFiles($routeParams.productID).then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.files = data.result;
        }
    });
    projectServices.queryById($routeParams.productID).then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.projects = parserServices.parseProject(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.parseUnit = function(number) {
        return number = number / 10000;
    };
}
