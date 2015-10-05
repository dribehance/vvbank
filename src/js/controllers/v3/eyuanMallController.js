// by dribehance <dribehance.kksdapp.com>
var eyuanMallController = function($scope, mallServices, errorServices, toastServices, localStorageService, config) {
    $scope.hotels = ["../images/example_1.png", "../images/example_2.png"];
    $scope.emall_items = [];
    $scope.page = {
    	number:1,
    	message:"点击加载更多",
    	category_id: 1
    }
    $scope.loadMore = function() {
    	if ($scope.no_more) {
    		return;
    	}
        toastServices.show();
        $scope.page.message ="正在加载...";
        mallServices.query($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message ="点击加载更多";
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
