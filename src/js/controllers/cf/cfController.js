// by dribehance <dribehance.kksdapp.com>
var cfController = function($scope, $rootScope,$location, $route, $routeParams,$timeout,$interpolate, cfServices, parserServices, errorServices, localStorageService, toastServices,config) {
    // toastServices.show();
    var currentPage = 1;
    $scope.input = {};

    $scope.fundSupports = [];
    $scope.support = [];
    // $scope.topicList = [];
    // $scope.reward = [];


    $rootScope.detailMore = [];
    $rootScope.rewardMore = [];

    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  


    $scope.ajaxForm = function(id){
         $location.path("/crowdFund/order/infoWrite/"+id+"/"+$scope.input.supportAmount[id]).replace();
    }

    //支持列表
    $scope.supportList = function(cfId){
        toastServices.show();
        cfServices.supportQuery(cfId).then(function(data){
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                // $scope.fundSupports = $scope.fundSupports.concat(parserServices.parseFundSupports(data.result));
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


    //更多项目详情
    $scope.fundsDetailMore = function(funding){
        toastServices.show();
        cfServices.fundsDetailMore(funding.id).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $rootScope.fundingMore = data.funding;

                var interpolatedFunc = $interpolate(data.funding.videoUrl);
                $rootScope.interpolatedValue = interpolatedFunc({myName: $scope.myName});
                
                // $rootScope.rewardMore = $rootScope.rewardMore.concat(parserServices.parseFundSupports(data.rewardList));
                $rootScope.detailMore = $rootScope.detailMore.concat(parserServices.parseFundDetails(data.detailList));
                // $rootScope.answerMore = data.answer;
                // $timeout(function() {
                    $location.path("/crowdFund/detailsMore").replace();
                // }, 1000);
            } else {
                errorServices.autoHide(data.message);
            }
        }) 
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
                $scope.funding.praise = $scope.funding.praise+1;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }


     $scope.openDialog =function(){
        $(".Cover,.Dialog").show();
    }
    $scope.closeDialog = function(){
        $(".Cover,.Dialog").hide();
    }
    
    $scope.supportBtn = function(){
        $(".supportBtn i").siblings(".shareBox").toggle();
        $(".Cover").toggle();
    }
    
    // $scope.queryDetails();

    //分享到对应的平台
    var projectDetailCode = window.location.protocol + "//" + window.location.host + "/crowdfunding/crowdfund-excsFundingDetail.do?id="+1;
    $scope.shareToAll =function(toUrl){
        var shareUrl = projectDetailCode;
        var title = "亲，在优易投投资了一个项目，年化利率8.5%-16%，本息担保，100元超低门槛，我们一起投资赚钱吧。";
        window.open(toUrl+'?title='+encodeURIComponent(title)+'&url=' + encodeURIComponent(shareUrl),'_blank','toolbar=no,menubar=no,scrollbars=no,width=700,height=600');
    }
}
