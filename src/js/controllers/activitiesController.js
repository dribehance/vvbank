var activitiesController = function($scope, errorServices, myServices,parserServices, config) {
    myServices.activities().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.activities = parserServices.parseActivities(data.result)
        } else {
            errorServices.autoHide(data.message)
        }
    });
}