var messagesController = function($scope, errorServices, myServices, toastServices,parserServices, config) {
    $scope.messages = [];
    $scope.page = {
        number:1,
        page_size:1,
        message:"点击加载更多"
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message ="正在加载...";
        myServices.message.query($scope.page.number).then(function(data) {
            toastServices.hide();
            $scope.page.message ="点击加载更多";
            if (data.respcode == config.request.SUCCESS) {
                $scope.messages = $scope.messages.concat(parserServices.parseMessages(data.result));
            } else {
                errorServices.autoHide("服务器错误");
            }
            if (data.result.length == 0) {
                $scope.no_more = true;
                $scope.page.message = "我就静静的瞅着，没有更多了...";
            }
            $scope.page.number++;
        })
    
    }
    $scope.loadMore();
}
