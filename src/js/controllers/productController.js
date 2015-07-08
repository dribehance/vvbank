var productController = function($scope, $routeParams, toastServices, productServices, parserServices, errorServices, config) {
   	toastServices.show();
    productServices.queryById($routeParams.productID).then(function(data) {
    	toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.product = parserServices.parseProduct(data.result);
            console.log($scope.product)
        } else {
            errorServices.autoHide(data.message)
        }
    });
}
