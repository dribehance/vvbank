// by dribehance <dribehance.kksdapp.com>
var eyuanMallController = function($scope, mallServices, errorServices, toastServices, localStorageService, config) {
    $scope.filter_category = {
        id: 1
    };
    // category;
    mallServices.queryCategory().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.categories = data.result;
        } else {
            errorServices.autoHide(data.result);
        }
    })
    $scope.categoryFilter = function(item) {
        $scope.filter_category.id = item.id;
        $scope.page = {
            number: 1,
            message: "点击加载更多",
            category_id: item.id
        }
        $scope.emall_items = [];
        $scope.no_more = false;
        $scope.loadMore();
    };
    // items;
    $scope.emall_items = [];
    $scope.page = {
        number: 1,
        message: "点击加载更多",
        category_id: 1
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        mallServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.respcode == config.request.SUCCESS) {
                $scope.emall_items = $scope.emall_items.concat(data.result);
                $scope.no_more = data.result.length == 0;
            } else {
                errorServices.autoHide(data.message);
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.number++;
        })

    }
    $scope.loadMore();
}
