var buyController = function($scope, $location, $routeParams,$timeout, toastServices, userServices,parserServices, productServices, errorServices, config) {
    $scope.input = {
        amount: "",
        password: "",
        agreement: true,
        remain: $routeParams.remain,
        code:$routeParams.productCode,
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
                errorServices.show("投资成功，正在为你跳转")
                $timeout(function(){
                    $location.path("/index").replace();
                },1000)
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
