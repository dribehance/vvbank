// by dribehance <dribehance.kksdapp.com>
var crowdFundDetailsController = function($scope, $rootScope,$location, $route, $routeParams,$timeout, localStorageService, licaiServices, bannerServices, cfServices, parserServices, toastServices,config) {
    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  

    $rootScope.topicList = [];
    $rootScope.reward = [];


    //获取众筹详情
        toastServices.show();

        cfServices.queryDetails($routeParams.cfId).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                //基本信息
                $rootScope.funding = data.funding;

                $rootScope.answer = data.answer;

                //话题数量
                $rootScope.topicNum = data.topicCount;
                //项目答疑
                $rootScope.topicList = $rootScope.topicList.concat(parserServices.parseTopicLists(data.topicList));
                //项目支持列表
                $rootScope.reward = $rootScope.reward.concat(parserServices.parseUZBFundSupport(data.reward));

                    $location.path("/crowdFund/details").replace();

            } else {
                errorServices.autoHide(data.message);
            }
        })

}
