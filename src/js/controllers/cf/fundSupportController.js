// by dribehance <dribehance.kksdapp.com>
var fundSupportController = function($scope, $rootScope,$location, $route, $routeParams, $timeout, localStorageService, licaiServices, bannerServices, cfServices, parserServices, errorServices,toastServices,config) {
    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  
    $scope.crowdFunds = [];
    $scope.products = [];
    $scope.crowd = {
        code: "1",
        page: "1",
        curreny : "1",
    };

    $scope.fundSupports = [];

    $scope.input = {};

    toastServices.show();
    cfServices.supportQuery($routeParams.cfId).then(function(data){
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.fundSupports = $scope.fundSupports.concat(parserServices.parseUZBFundSupports(data.reward)); 
            $scope.funding = data.result;
        } else {
            errorServices.autoHide(data.message);
        }
    })

    $scope.ajaxForm = function(id){
         $location.path("/crowdFund/order/infoWrite/"+id+"/"+$scope.input.amount[id]).replace();
    }

    //关注
    $scope.attention = function(funding){
        if ($scope.is_login) {
            cfServices.attention(funding.id).then(function(data) {
                if (data.result.respcode == config.request.SUCCESS) {
                    $scope.funding.supportCount = "";
                    $scope.funding.supportCount = data.result.count;
                    $scope.funding.attentions = "已关注";
                } else {
                    errorServices.autoHide(data.result.message);
                }
            })
        }else{
            errorServices.autoHide("请先登录再关注");
            $timeout(function() {
                    $location.path("/me").replace();
            }, 1000);
        }
    }

    //点赞
    $scope.praise = function(funding){
        cfServices.praise(funding.id).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                $scope.funding.praise = $scope.funding.praise+1;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }


}
