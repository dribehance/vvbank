var investmentController = function($scope, errorServices, myServices, toastServices, parserServices, config) {
    var currentPage = 1;
    $scope.investments = [];
    $scope.loadMore = function() {
        toastServices.show();
        myServices.investment(currentPage).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $scope.investments = $scope.investments.concat(parserServices.parseInvestments(data.result));
            } else {
                toastServices.hide();
                errorServices.autoHide(data.message)
            }
        });
        currentPage++;
    }
    $scope.loadMore();
}
