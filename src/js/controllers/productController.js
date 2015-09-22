var productController = function($rootScope, $scope, $routeParams, toastServices, productServices, projectServices, parserServices, errorServices, config) {
    toastServices.show();
    productServices.queryById($routeParams.productID).then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.product = parserServices.parseProduct(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    });
    // productServices.queryFiles($routeParams.productID).then(function(data) {
    //     if (data.respcode == config.request.SUCCESS) {
    //         $scope.files = data.result;
    //     }
    // });
    // projectServices.queryById($routeParams.productID).then(function(data) {
    //     if (data.respcode == config.request.SUCCESS) {
    //         $scope.projects = parserServices.parseProject(data.result);
    //     } else {
    //         errorServices.autoHide(data.message)
    //     }
    // });
    $scope.parseUnit = function(number) {
        return number = number / 10000;
    };
    $scope.parseTime = function(time) {
        return time = new Date(time)
    }
    $scope.getTime = function(time) {
        if (!time) {
            return;
        }
        var time_string = time.split(" ")[0],
            hour_string = time.split(" ")[1],
            year = time_string.split("-")[0],
            month = time_string.split("-")[1],
            day = time_string.split("-")[2],

            hour = hour_string.split(":")[0],
            minute = hour_string.split(":")[1],
            second = hour_string.split(":")[2];
        return time = new Date(year, month - 1, day, hour, minute, second).getTime();
    }
}
