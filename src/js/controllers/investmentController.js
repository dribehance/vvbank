var investmentController = function($scope, errorServices, myServices, pushToRefreshServices, parserServices, config) {
    var currentPage = 1;
    $scope.investments = [];
    var no_more = false;
    $scope.loadMore = function() {
        if (no_more) {
            return;
        }
        pushToRefreshServices.show("加载中");
        myServices.investment(currentPage).then(function(data) {
            pushToRefreshServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $scope.investments = $scope.investments.concat(parserServices.parseInvestments(data.result));
            } else {
                pushToRefreshServices.hide();
                errorServices.autoHide(data.message)
            }
            if (data.result.length == 0) {
                no_more = true;
                pushToRefreshServices.show("我就静静的瞅着，没有更多了...")
            }
        });
        currentPage++;
    }
    $scope.loadMore();
}
