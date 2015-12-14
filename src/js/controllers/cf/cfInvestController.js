// by dribehance <dribehance.kksdapp.com>
var cfInvestController = function($scope, $rootScope,$location, $route, $routeParams,$timeout, cfServices, parserServices, errorServices, localStorageService, toastServices,config) {
    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  

    $scope.supportFindOne = function(){
        toastServices.show();
        cfServices.supportFindOne($routeParams.rewardId).then(function(data){
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $scope.supportOne = data.result;
            }else{
                errorServices.autoHide(data.message);
            }
        })
    }

   $scope.supportFindOne();

   $scope.ajaxForm = function(id){
         $location.path("/crowdFund/order/infoWrite/"+id+"/"+$scope.input.supportAmount[id]).replace();
    }



    //关注
    $scope.attention = function(funding){
        if ($scope.is_login) {
            cfServices.attention(funding.fundId).then(function(data) {
                if (data.result.respcode == config.request.SUCCESS) {
                    $scope.supportOne.supportCount = "";
                    $scope.supportOne.supportCount = data.result.count;
                    $scope.supportOne.attentions = "已关注";
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
        cfServices.praise(funding.fundId).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                $scope.supportOne.praise = $scope.supportOne.praise+1;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }

}
