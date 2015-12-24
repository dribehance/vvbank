// by dribehance <dribehance.kksdapp.com>
var crowdFundListController = function($scope, $rootScope,$location, $route, $routeParams, $timeout,localStorageService, licaiServices, bannerServices, cfServices, parserServices, toastServices,errorServices,config) {
    $scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  
    $scope.crowdFunds = [];
    $scope.products = [];
    $scope.crowd = {
        code: "1",
        page: "1",
        curreny : "1"
    };

    $rootScope.topicList = [];
    $rootScope.reward = [];
    // $scope.rewardBanner = [];


    //获取众筹详情
    /*$scope.queryDetails = function(crowdFund){
        toastServices.show();
        cfServices.queryDetails(crowdFund.id).then(function(data) {
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
                $rootScope.reward = $rootScope.reward.concat(parserServices.parseFundSustains(data.reward));
                
                    $location.path("/crowdFund/details").replace();
                    
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }*/


    // banner
    bannerServices.get().then(function(data) {
        $scope.banners = parserServices.parseBanner(data.result);
        $timeout(function() {
            $("#banner").owlCarousel({
                autoPlay: 3000,
                singleItem: true
            });
        }, 0);
    });

    $scope.back = function(b){
        if (b.id == 16) {
            window.location.href = "http://192.168.16.2:8080/act/act-excsdLottery.do?token="+localStorageService.get("token");
        }
    }


    //绘制进度环
    var color = ["#e4e4e4","#007cd2"];
    var drawCircle = function(i){
        var canvas =$("canvas")[i];
        var percent=$scope.products[i].progress;
        percent=parseInt(percent);
        var ctx = canvas.getContext("2d");
        var startPoint=Math.PI*1.5;
        var data = [100,percent];

        for(var i=0;i<data.length;i++){
            ctx.fillStyle = color[i];
            ctx.beginPath();
            ctx.moveTo(59,59);
            ctx.arc(59,59,59,startPoint,startPoint+Math.PI*2*(data[i]/100),false);
            ctx.fill();

        }
    }

    $scope.$on("repeat_done",function(){
        for(var i = 0;i <  $scope.products.length;i++){
            drawCircle(i);
        }
    });

    $scope.queryCrowdFundsAndProject = function(code){
        if ($scope.crowd.code == code) {
            return;
        }
        $scope.load_more_message = "加载更多项目";
        var domId ="fundList";
        if (code == "0") {
            $scope.crowd = {
                code: "0",
                page: 1
            }
            $scope.crowdFunds = [];
            $scope.rewardBanner = [];
            domId = "stableList";
        }else{
            $scope.crowd = {
                code: "1",
                page: 1
            }
            $scope.products = [];
        }
        $timeout(function(){
            $("#"+domId).parent().siblings().removeClass("cur");
            console.log($("#"+domId).parent().attr("class"));
            $("#"+domId).parent().addClass("cur");
        },0);
        $scope.no_more = false;
        $scope.loadMore(); 
    }

    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        if ($scope.crowd.code == "0") {
            loadRecommand();
        }else{
            loadOther();
        }
    }

    var loadOther = function() {
        toastServices.show();
        cfServices.query($scope.crowd.page).then(function(data){
            toastServices.hide();
            $scope.load_more_message = "正在加载...";
            $scope.type = 1;
            if (data.result.length > 0) {
                $scope.load_more_message = "加载更多项目";
                $scope.crowdFunds = $scope.crowdFunds.concat(parserServices.parseUZBCrowdFunds(data.result));
                //$scope.rewardBanner = $scope.rewardBanner.concat(parserServices.parseRewardBanners(data.reward));
                if ($scope.crowdFunds.length >= 20) {
                    $scope.load_more_message = "点击显示更多";
                };
            }else{
                errorServices.autoHide("没有了");
                $scope.no_more = true;
                $scope.load_more_message = "没有了";
            }
            $scope.crowd.page++;
        })
    }
    var loadRecommand = function() {
        toastServices.show();
        $scope.load_more_message = "正在加载...";
        $scope.type = 0;
        licaiServices.recommand($scope.crowd.page, 8).then(function(data) {
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.load_more_message = "加载更多项目";
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
            } else {
                errorServices.autoHide("没有了");
                $scope.no_more = true;
                $scope.load_more_message = "没有了";
            }
            $scope.crowd.page++;
        });
    }
    $scope.loadMore();
}
