var investmentController = function($scope, errorServices, myServices, parserServices, config) {
    myServices.investment().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.investments = parserServices.parseInvestments(data.result);
        } else {
            errorServices.autoHide(data.message)
        }
    })
}
