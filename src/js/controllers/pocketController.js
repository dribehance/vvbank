var pocketController = function($scope, myServices, pushToRefreshServices, errorServices, parserServices, config) {
    var currentPage = 1;
    $scope.pockets = [];
    var no_more = false;
    $scope.loadMore = function() {
        if (no_more) {
            pushToRefreshServices.show("我就静静的瞅着，没有更多了...")
            return;
        }
        pushToRefreshServices.show("加载中");
        myServices.pocket(currentPage).then(function(data) {
            pushToRefreshServices.hide();
            if (data.respcode == config.request.SUCCESS || data.result.length > 0) {
                $scope.pocket_groups = parserServices.parsePocket(data.result);
                $scope.pockets = $scope.pockets.concat($scope.pocket_groups.pockets);
            } else {
                pushToRefreshServices.hide();
                errorServices.autoHide(data.message)
            }
            if (data.result.info.length == 0) {
                no_more = true;
            }
        })
        currentPage++;
    }
    $scope.loadMore();
}
