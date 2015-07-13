var buyController = function($scope, $location, $routeParams, toastServices, userServices,parserServices, productServices, errorServices, config) {
    $scope.input = {
        amount: "",
        password: "",
        agreement: true,
        remain: $routeParams.remain,
        balance: 0
    }
    userServices.info.account().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.input.balance = data.result.usableAmount;
        } else {
            errorServices.autoHide(data.message)
        }
    })
    productServices.queryById($routeParams.productID).then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.product = parserServices.parseProduct(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.ajaxForm = function(form) {
        toastServices.show()
        productServices.buy({
            "amount": $scope.input.amount,
            "password": $scope.input.password,
            "productId": $routeParams.productID,
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS && data.result.status == "1") {
                $location.path("/index").replace();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
