// by dribehance <dribehance.kksdapp.com>
var detailsMoreController = function($scope, $rootScope,$location, $route, $routeParams, $interpolate, cfServices, parserServices, errorServices, localStorageService, toastServices,config) {
    // toastServices.show();
    var currentPage = 1;
    $scope.input = {};

    $scope.fundSupports = [];
    $scope.support = [];
    $scope.topicList = [];
    $scope.reward = [];

    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  

    //支持列表
    $scope.supportList = function(cfId){
        toastServices.show();
        cfServices.supportQuery(cfId).then(function(data){
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $scope.fundSupports = $scope.fundSupports.concat(parserServices.parseFundSupports(data.result));
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }


    //众筹列表
    $scope.query = function(){
        cfServices.query(currentPage).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {

            } else {
                errorServices.autoHide(data.message);
            }
        })
        currentPage++;
    }

    //关注
    $scope.attention = function(funding){
        if ($scope.is_login) {
            cfServices.attention(funding.id).then(function(data) {
                if (data.result.respcode == config.request.SUCCESS) {
                    $rootScope.fundingMore.supportCount = "";
                    $rootScope.fundingMore.supportCount = data.result.count;
                    $rootScope.fundingMore.attentions = "已关注";
                } else {
                    errorServices.autoHide(data.result.message);
                }
            })
        }else{
            errorServices.autoHide("请先登陆再关注");
            $timeout(function() {
                    $location.path("/me").replace();
            }, 1000);
        }
    }

    //点赞
    $scope.praise = function(funding){
        cfServices.praise(funding.id).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.fundingMore.praise = $scope.fundingMore.praise+1;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    
    
    
    // $scope.queryDetails();
}
