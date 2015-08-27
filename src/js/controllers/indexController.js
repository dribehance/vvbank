var indexController = function($scope, $timeout, toastServices, localStorageService, errorServices, licaiServices, bannerServices, parserServices, config) {
    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }
    // 直投项目
    $scope.project = {
        name: "直投项目",
        code: "0",
        page: "1",
    };
    $scope.products = [];
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
    licaiServices.queryExchange().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.channels = data.result;
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.queryProjectByCode = function(channel) {
        if ($scope.project.code == channel.channelType) {
            return;
        }
        $scope.project = {
            name: channel.name,
            code: channel.channelType,
            page: 1
        }
        $scope.load_more_message = "加载更多项目";
        // reset products
        $scope.products = [];
        $scope.no_more = false;
        $scope.loadMore();
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        if ($scope.project.code == "0") {
            loadRecommand();
        }
        else {
            loadOther();
        }
    }
    $scope.parseProgress = function (progress) {
        if (progress >100 || progress ==100 ) {
            return progress;
        }
        return progress = parseFloat(progress).toFixed(2);
    }
    var loadOther = function() {
        toastServices.show();
        $scope.load_more_message = "正在加载...";
        licaiServices.queryByExchange($scope.project.code, $scope.project.page).then(function(data) {
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.load_more_message = "加载更多项目";
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
            } else {
                errorServices.autoHide("没有了");
                $scope.no_more = true;
                $scope.load_more_message = "没有了";
            }
            $scope.project.page++;
        })
    }
    var loadRecommand = function() {
        toastServices.show();
        $scope.load_more_message = "正在加载...";
        licaiServices.recommand($scope.project.page).then(function(data) {
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.load_more_message = "加载更多项目";
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
            } else {
                errorServices.autoHide("没有了");
                $scope.no_more = true;
                $scope.load_more_message = "没有了";
            }
            $scope.project.page++;
        });
    }
    $scope.loadMore();
}
