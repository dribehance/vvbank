var billsController = function($scope, myServices, parserServices, toastServices, errorServices, config) {
    var currentPage = 1;
    $scope.bills = [];
    $scope.loadMore = function() {
        toastServices.show();
        myServices.bills(currentPage).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $scope.bills = $scope.bills.concat(parserServices.parseBills(data.result));
            } else {
                toastServices.hide();
                errorServices.autoHide(data.message)
            }
        })
        currentPage++;
    }
    $scope.loadMore();
}
