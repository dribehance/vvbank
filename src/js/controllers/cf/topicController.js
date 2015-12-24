// by dribehance <dribehance.kksdapp.com>
var topicController = function($scope, $rootScope,$location, $route, $routeParams,$timeout, cfServices, parserServices, errorServices, localStorageService, toastServices,config) {
    $scope.topicList = [];

    cfServices.topicListOf($routeParams.cfId).then(function(data){
        if (data.respcode == config.request.SUCCESS) {
             $scope.topicList = $scope.topicList.concat(parserServices.parseTopicLists(data.result));
             $scope.funding = data.funding;
        }else{
            errorServices.autoHide(data.message);
        }
    });

    /*$scope.back = function(){
        $location.path("/crowdFund/crowdFundDetails/"+$routeParams.cfId).replace();
    }*/
}
