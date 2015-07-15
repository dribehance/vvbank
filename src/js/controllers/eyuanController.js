var eyuanController = function($scope, myServices, pushToRefreshServices, errorServices, parserServices, config) {
    var currentPage = 1;
    $scope.eyuans = [];
    var no_more = false;
    $scope.loadMore = function() {
        if (no_more) {
            pushToRefreshServices.show("没有了")
            return;
        }
        pushToRefreshServices.show("加载中");
        myServices.eyuan(currentPage).then(function(data) {
        	console.log(data)
            pushToRefreshServices.hide();
            if (data.respcode == config.request.SUCCESS || data.result.length > 0) {
                $scope.eyuan_groups = parserServices.parseEyuan(data.result);
                $scope.eyuans = $scope.eyuans.concat($scope.eyuan_groups.eyuans);
            } else {
                pushToRefreshServices.hide();
                errorServices.autoHide(data.message)
            }
            if (data.result.length == 0) {
                no_more = true;
            }
        })
        currentPage++;
    }
    $scope.loadMore();
}
