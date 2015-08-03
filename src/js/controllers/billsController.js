var billsController = function($scope, myServices,toastServices, parserServices, pushToRefreshServices, errorServices, config) {
    var currentPage = 1;
    $scope.bills = [];
    var no_more = false;
    $scope.loadMore = function() {
        if (no_more) {
            return;
        }
        pushToRefreshServices.show("加载中");
        myServices.bills(currentPage).then(function(data) {
            pushToRefreshServices.hide();
            if (data.respcode == config.request.SUCCESS || data.result.length>0) {
                $scope.bills = $scope.bills.concat(parserServices.parseBills(data.result));
            } else {
                pushToRefreshServices.hide();
                errorServices.autoHide(data.message)
            }
            if (data.result.length == 0) {
                no_more = true;
                pushToRefreshServices.show("我就静静的瞅着，没有更多了...")
            }
        })
        currentPage++;
    }
    $scope.loadMore();
}
