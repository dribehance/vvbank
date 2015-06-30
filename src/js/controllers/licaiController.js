var licaiController = function($scope, licaiServices, toastServices, parserServices, errorServices, config) {
    $scope.exchange = {
        name: "理财产品",
        code: "all"
    }
    var page = 1;
    $scope.query = function(exchange) {
        $scope.exchange = exchange;
        if (exchange.code == "all") {
            $scope.queryAll();
        }
        else {
        	$scope.queryByExchange(exchange,page)
        }
    }
    $scope.queryAll = function() {
    	toastServices.show();
        licaiServices.query().then(function(data) {
        	toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                var result = parserServices.parseLicaiProduct(data.result);
                $scope.groups = result.groups;
                $scope.exchanges = result.exchanges
            } else {
                console.log("query licaiproduct error")
            }
            // $scope.groups = data;
        });
    }
    $scope.queryByExchange = function(exchange,page) {
    	toastServices.show();
    	licaiServices.queryByExchange(exchange.code, page).then(function(data) {
            $scope.groups = "";
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.products = data;
            } else {
                errorServices.autoHide("暂无数据")
            }
        })
    }
    $scope.loadMore = function() {
        // licaiServices.loadMore().then(function(data){
        // 	if (data.respcode == config.request.SUCCESS) {
        // 		$scope.groups = $scope.groups.concat(parserServices.parserLicaiProduct(data.result))
        // 	}
        // });
    }
    // fetch data
    console.log("licai")
    $scope.queryAll();
}
