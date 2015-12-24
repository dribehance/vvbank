// by dribehance <dribehance.kksdapp.com>
var cfController = function($scope, $rootScope,$location, $route, $routeParams,$timeout,$interpolate, cfServices, parserServices, errorServices, localStorageService, toastServices,config) {
    // toastServices.show();
    var currentPage = 1;
    $scope.input = {supportAmount:{}};

    $scope.fundSupports = [];
    $scope.support = [];
    // $scope.topicList = [];
    // $scope.reward = [];


    $rootScope.detailMore = [];
    $rootScope.rewardMore = [];

    $rootScope.topicList = [];
    $rootScope.reward = [];

    /*$scope.topicList = [];
    $scope.reward = [];*/

    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  

   toastServices.show();
        // $scope.load_more_message = "正在加载...";
        cfServices.queryDetails($routeParams.cfId).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                //基本信息
                $rootScope.funding = data.funding;

                $rootScope.answer = data.answer;
                //项目答疑
                $rootScope.topicList = $rootScope.topicList.concat(parserServices.parseTopicLists(data.topicList));
                //话题数量
                $rootScope.topicNum = data.topicCount;
                //项目支持列表
                // $rootScope.reward = $rootScope.reward.concat(parserServices.parseFundSupports(data.reward));
                $rootScope.reward = $rootScope.reward.concat(parserServices.parseFundSustains(data.reward));
                // $timeout(function() {
                    // $location.path("/crowdFund/details").replace();
                // }, 100);
            } else {
                errorServices.autoHide(data.message);
            }
        })

    $scope.ajaxForm = function(id){
        if ($scope.input.supportAmount[id] < 100) {
            errorServices.autoHide("最小投资金额为100元");
        }else{
            $location.path("/crowdFund/order/infoWrite/"+id+"/"+$scope.input.supportAmount[id]).replace();
        }
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
                $rootScope.detailMore = $rootScope.detailMore.concat(parserServices.parseFundDetails(data.detailList));
                    $location.path("/crowdFund/detailsMore").replace();
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
                    $scope.funding.attention = "";
                    $scope.funding.attention = data.result.count;
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
    var projectDetailCode = window.location.protocol + "//" + window.location.host + "/#/crowdFund/detail/"+$routeParams.cfId;
    $scope.shareToAll =function(toUrl){
        var shareUrl = projectDetailCode;
        var title = "亲，在优易投投资了一个项目，年化利率8.5%-16%，本息担保，100元超低门槛，我们一起投资赚钱吧。";
        window.open(toUrl+'?title='+encodeURIComponent(title)+'&url=' + encodeURIComponent(shareUrl),'_blank','toolbar=no,menubar=no,scrollbars=no,width=700,height=600');
    }
}
