var indexController = function($scope,$rootScope, $location, $timeout,toastServices, localStorageService, errorServices, licaiServices, bannerServices, cfServices, parserServices,userServices,platformServices, config) {
    $rootScope.page_title = "优易投";
    $scope.is_login = false;
    $scope.iconUrl = "1";
    $scope.logonUsername = "";
    if (localStorageService.get("token")) {
        $scope.is_login = true;
        $scope.logonUsername = localStorageService.get("logonUsername");
        $scope.iconUrl = localStorageService.get("iconUrl");
        if (!$scope.iconUrl || $scope.iconUrl == '') {
            $scope.iconUrl = "1";
        }
    }

    $rootScope.topicList = [];
    $rootScope.reward = [];
    $scope.rewardBanner = [];


    // 直投项目
    $scope.project = {
        name: "直投项目",
        code: "0",
        page: "1"
    };
    $scope.products = [];
    // banner
    /*bannerServices.get().then(function(data) {
        $scope.banners = parserServices.parseBanner(data.result);
    });*/

    //首页众筹项目
    bannerServices.cfGet().then(function(data){
        if (data.respcode == config.request.SUCCESS) {
            $scope.crowdFund = data.result;
            $scope.rewardBanner = $scope.rewardBanner.concat(parserServices.parseRewardBanners(data.reward));
        } else {
            errorServices.autoHide(data.message)
        }
    });

    //获取众筹详情
    $scope.queryDetails = function(crowdFund){
        toastServices.show();
        // $scope.load_more_message = "正在加载...";
        cfServices.queryDetails(crowdFund.id).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                //基本信息
                $rootScope.funding = data.funding;

                $rootScope.answer = data.answer;
                //项目答疑
                $rootScope.topicList = $rootScope.topicList.concat(parserServices.parseTopicLists(data.topicList));
                //项目支持列表
                // $rootScope.reward = $rootScope.reward.concat(parserServices.parseFundSupports(data.reward));
                $rootScope.reward = $rootScope.reward.concat(parserServices.parseFundSustains(data.reward));
                // $timeout(function() {
                    $location.path("/crowdFund/details").replace();
                // }, 100);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }


    // d3 chart data
    $scope.gauge_options = {
        thickness: 4,
        mode: "gauge",
        total: 100
    };
    $scope.parseUnit = function(number) {
        return number = number / 10000;
    };
    // 信用标 红本抵押 车辆抵押
    var projects_name = {
        'liaoning': "信用标",
        'shenzhen': "红本抵押",
        'chongqing': "车辆抵押",
    }
    licaiServices.queryExchange().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.channels = data.result;
        } else {
            errorServices.autoHide(data.message)
        }
    });
    $scope.queryProjectByCode = function(channel) {
        if ($scope.project.code == channel.channelType) {
            return;
        }
        $scope.project = {
            name: channel.name,
            code: channel.channelType,
            page: 1
        }
        $scope.load_more_message = "加载更多项目";
        // reset products
        $scope.products = [];
        $scope.no_more = false;
        $scope.loadMore();
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        if ($scope.project.code == "0") {
            loadRecommand();
        }
        else {
            loadOther();
        }
    }

    $scope.parseProgress = function (progress) {
        if (progress >100 || progress ==100 ) {
            return progress;
        }
        return progress = parseFloat(progress).toFixed(2);
    }


    //绘制进度环
var color = ["#e4e4e4","#007cd2"];
   $scope.drawCircle = function(i){
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


    var loadOther = function() {
        toastServices.show();
        $scope.load_more_message = "正在加载...";
        licaiServices.queryByExchange($scope.project.code, $scope.project.page).then(function(data) {
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.load_more_message = "加载更多项目";
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
            } else {
                errorServices.autoHide("没有了");
                $scope.no_more = true;
                $scope.load_more_message = "没有了";
            }
            $scope.project.page++;
            
               
        })
    }
    var loadRecommand = function() {
        toastServices.show();
        $scope.load_more_message = "正在加载...";
        licaiServices.recommand($scope.project.page).then(function(data) {
            toastServices.hide();
            if (data.result.length > 0) {
                $scope.load_more_message = "加载更多项目";
                $scope.products = $scope.products.concat(parserServices.parseProducts(data.result));
            } else {
                errorServices.autoHide("没有了");
                $scope.no_more = true;
                $scope.load_more_message = "没有了";
            }
            $scope.project.page++;
        });
    }
    $scope.loadMore();

    //控制器
    $scope.$on("repeat_done",function(){
        for(var i = 0;i <  $scope.products.length;i++){
            $scope.drawCircle(i);
        }
    });

    $scope.openDialog =function(){
        $(".Cover,.Dialog")	.show();
    }
    $scope.closeDialog = function(){
        $(".Cover,.Dialog").hide();
    }

    function listSlide(){
        $(".investList").animate({left:"0%"},600);
    }
    $scope.logout = function() {
        userServices.logout().then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                localStorageService.remove("token");
                platformServices.notify();
                $scope.is_login = false;
                $scope.iconUrl = "1";
                $scope.logonUsername = "";
                //刷新界面
                $timeout(function(){
                    $scope.$apply();
                },0)
            } else {
                errorServices.autoHide(data.message)
            }

        })
    }
    $scope.swipeLeft = function(){
        $timeout(function(){
            $(".investList").animate({left:"0%"},600);
        },0);
    }

    $scope.swipeRight = function(){
        $timeout(function(){
            $(".investList").animate({left:"100%"});
        },0);
    }
}
