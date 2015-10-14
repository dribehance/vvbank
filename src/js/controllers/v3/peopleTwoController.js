// by dribehance <dribehance.kksdapp.com>
var peopleTwoController = function($scope,$routeParams, peopleServices, errorServices, toastServices, localStorageService, config) {
    toastServices.show();
    peopleServices.queryByLevel({
        member_id:$routeParams.member_id,
    }).then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.peoples = data.result;
            $scope.total_money = data.totalTwoCommissionRate;
            $scope.total_income = data.totalCommissionRate;
            $scope.people_level1 = data.inviteLevelOneCount;
            $scope.people_level2 = data.inviteLevelTwoCount;
        } else {
            errorServices.autoHide(data.message);
        }
    })
}