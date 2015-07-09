var messagesController = function($scope, errorServices, myServices, toastServices,parserServices, config) {
    var currentPage = 1;
    $scope.messages = [];
    $scope.loadMore = function() {
        toastServices.show();
        myServices.message.query(currentPage).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $scope.messages = $scope.messages.concat(parserServices.parseMessages(data.result));
            } else {
                toastServices.hide();
                errorServices.autoHide(data.message)
            }
        })
        currentPage++;
    }
    $scope.loadMore();
}
