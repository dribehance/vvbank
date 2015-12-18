var investmentController = function($scope,$filter, toastServices, errorServices, myServices, pushToRefreshServices, parserServices, config) {
    toastServices.show();
    myServices.investment().then(function(data){
        toastServices.hide()
        if(data.respcode == config.request.SUCCESS) {
            $scope.investments = data.result;  
            if (angular.equals($scope.investments,{})) {
                $scope.no_record = true;
            }      
        }
        else {
            errorServices.autoHide("服务器错误");
        }
    })
    $scope.parseTime = function(time) {
        if(!time) return;
        var day = $filter("limitTo")(time.split(" ")[0], -5),
            date = $filter("limitTo")(time.split(" ")[1], 5);
        return day + " " + date;
    };
    // $scope.investments = [];
    // $scope.page = {
    //     number: 1,
    //     page_size: 1,
    //     message: "点击加载更多"
    // }


    // $scope.loadMore = function() {
    //     if ($scope.no_more) {
    //         return;
    //     }
    //     toastServices.show();
    //     $scope.page.message = "正在加载...";
    //     myServices.investment($scope.page.number).then(function(data) {
    //         toastServices.hide();
    //         $scope.page.message = "点击加载更多";
    //         if (data.respcode == config.request.SUCCESS) {
    //             $scope.investments = $scope.investments.concat(parserServices.parseInvestments(data.result));
    //         } else {
    //             errorServices.autoHide("服务器错误");
    //         }
    //         if (data.result.length == 0) {
    //             $scope.no_more = true;
    //             $scope.page.message = "我就静静的瞅着，没有更多了...";
    //         }
    //         $scope.page.number++;
    //     })

    // }
    // $scope.loadMore();

}
