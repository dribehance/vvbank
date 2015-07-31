var indexController = function($scope, $timeout, toastServices, errorServices, licaiServices, bannerServices, parserServices) {
    // 直投项目
    $scope.project = {
        name: "直投项目",
        code: "0",
        page: "1",
    };
    toastServices.show();
    licaiServices.recommand().then(function(data) {
        toastServices.hide();
        $scope.products = parserServices.parseRecommendProduct(data.result);
        $timeout(function() {
            $("#product-carousel").owlCarousel({
                autoPlay: false,
                singleItem: true
            });
        }, 0);
    });
    // banner
    bannerServices.get().then(function(data) {
        $scope.banners = parserServices.parseBanner(data.result);
        $timeout(function() {
            $("#banner").owlCarousel({
                autoPlay: 3000,
                singleItem: true
            });
        }, 0);
    });
    // d3 chart data
    $scope.gauge_options = {
        thickness: 4,
        mode: "gauge",
        total: 100
    };
    $scope.parseUnit = function(number) {
        return number = number / 10000;
    };
    // 信用标 红本抵押 车辆抵押
    var projects_name = {
        'liaoning': "信用标",
        'shenzhen': "红本抵押",
        'chongqing': "车辆抵押",
    }
    $scope.queryProjectByCode = function(code) {
        $scope.project = {
            name: projects_name[code],
            code: code,
            page: 1
        }
        $scope.load_more_message = "加载更多项目";
        // reset products
        $scope.products = [];
        $scope.no_more = false;
        toastServices.show();
        $scope.loadMore();
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        licaiServices.queryByExchange($scope.project.code, $scope.project.page).then(function(data) {
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
            } else {
                errorServices.autoHide("没有了");
                $scope.no_more = true;
                $scope.load_more_message = "没有了";
            }
            $scope.project.page++;
        })
    }
}
