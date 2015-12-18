var activitiesController = function($scope, $routeParams, errorServices, myServices, toastServices, parserServices, config) {
    $scope.current_year = $routeParams.year || (new Date()).getFullYear();
    myServices.activities.queryStatistics().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.activity_statistics = data.result;
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.queryByYear = function(year) {
        toastServices.show();
        myServices.activities.queryByYear(year).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                $scope.activities = data.result;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.queryByYear($scope.current_year);
}
