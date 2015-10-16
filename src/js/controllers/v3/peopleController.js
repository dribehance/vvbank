// by dribehance <dribehance.kksdapp.com>
var peopleController = function($scope, $rootScope, peopleServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "一级人脉";
    toastServices.show();
    peopleServices.query().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.peoples = data.result;
            $scope.total_money = data.commissionRate;
            $scope.people_level1 = data.inviteLevelOneCount;
            $scope.people_level2 = data.inviteLevelTwoCount;
        } else {
            errorServices.autoHide(data.message);
        }
    })
}
