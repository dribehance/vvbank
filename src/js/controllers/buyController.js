var buyController = function($scope, $rootScope, $location, $routeParams, $timeout, toastServices, userServices, parserServices, productServices, errorServices, config) {
    userServices.info.account().then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $rootScope.user = angular.extend({}, $rootScope.user, parserServices.parseUser(data.result));
        } else {
            toastServices.hide();
            errorServices.autoHide(data.message)
        }
    })
    $scope.input = {
        amount: "",
        password: "",
        agreement: true,
        remain: $routeParams.remain,
        code: $routeParams.productCode,
        balance: 0
    }
    userServices.info.account().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.input.balance = data.result.usableAmount;
        } else {
            errorServices.autoHide(data.message)
        }
        if ($scope.input.code == "EXPERIENCE_PROJECT") {
            $scope.input.balance = $scope.user.coin;
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
                $timeout(function() {
                    $location.path("/index").replace();
                }, 1000)
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
