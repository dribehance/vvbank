// by dribehance <dribehance.kksdapp.com>
var topicSubmitController = function($scope, $rootScope,$location, $route, $routeParams,$timeout, cfServices, parserServices, errorServices, localStorageService, toastServices,config) {
    
    $scope.fundId = $routeParams.cfId;
    $scope.type = $routeParams.type;
    $scope.answerId = $routeParams.aId;

    $scope.topicSubmit = function(){
        
        if ($scope.type == "topic") {
            var params = {
                content : $scope.input.topic,
                fundId : $scope.fundId,
            }
            toastServices.show();
            cfServices.topicSubmit(params).then(function(data) {
                toastServices.hide()
                if (data.respcode == config.request.SUCCESS) {
                    errorServices.autoHide(data.message);
                    $timeout(function() {
                        $location.path("/crowdFund/crowdFundDetails/"+data.fundId).replace();
                    }, 1000);
                } else {
                    errorServices.autoHide(data.message);
                }
            })
        }else if ($scope.type == "reply") {
            var answer = {
                content : $scope.input.topic,
                fundId : $scope.fundId,
                answerId : $scope.answerId,
            }
            toastServices.show();
            cfServices.replySubmit(answer).then(function(data) {
                toastServices.hide()
                if (data.respcode == config.request.SUCCESS) {
                    errorServices.autoHide(data.message);
                    $timeout(function() {
                        $location.path("/crowdFund/crowdFundDetails/"+data.fundId).replace();
                    }, 1000);
                } else {
                    errorServices.autoHide(data.message);
                }
            })
        }

    }
    
}
