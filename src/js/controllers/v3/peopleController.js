// by dribehance <dribehance.kksdapp.com>
var peopleController = function($scope, $rootScope, $timeout, mallServices, peopleServices, errorServices, toastServices, localStorageService, config) {
    // $rootScope.page_title = "一级人脉";
    toastServices.show();
    peopleServices.queryAll().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.peoples = data.result;
            $scope.peoples_level2 = data.listTwo;
            $scope.total_money = data.commissionRate;
            $scope.totalCommissionRate = data.totalCommissionRate || "0";
            $scope.totalCommissionRateTwo = data.totalCommissionRateTwo || "0";
            $scope.people_level1 = data.inviteLevelOneCount;
            $scope.people_level2 = data.inviteLevelTwoCount;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // query qrcode
    mallServices.queryQrcode().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.qrcode_url = data.url;
            $scope.url = data.qurl;
            $scope.realname = data.realName;
            $scope.telephone = data.phone;
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.isTop = false;
    angular.element(".scrollable-content").bind("scroll", function(e) {
        var scrollTop = angular.element(".scrollable-content").scrollTop();
        $scope.to = angular.element("#toTop").offset().top - angular.element(".scrollable-content").offset().top + angular.element(".scrollable-content").scrollTop();
        if (scrollTop > 20) {
            $scope.$apply(function(){
                $scope.isTop = true;
            })
            angular.element(".scrollable-content").unbind("scroll")
            angular.element(".scrollable-content").animate({
                scrollTop: $scope.to
            });
        }
    })
}
