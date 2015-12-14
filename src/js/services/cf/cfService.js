angular.module("VVBank").factory("cfServices", function($rootScope, $http, localStorageService, config) {
    return {
        //查询支持
        supportFindOne : function(id){
            return $http({
                url : config.url + "/cf/service/supportFindOneById",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "rewardId" : id
                })
            }).then(function(data){
                return data.data;
            })
        },


        //验证交易密码
        checkPwd : function(pwd){
            return $http({
                url : config.url + "/cf/service/checkPwd",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "pwd" : pwd
                })
            }).then(function(data){
                    return data.data;
            })
        },

        //扣除账户余额
        nextStepPay : function(input){
            return $http({
                url : config.url + "/cf/service/orderPayment",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "appliedId" : input.appliedId,
                    "pwd" : input.pwd
                })
            }).then(function(data){
                return data.data;
            })
        },


        //提交话题
        topicSubmit : function(params){
            return $http({
                url : config.url + "/cf/service/saveAnswer",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "fundId": params.fundId,
                    "content" : params.content,
                })
            }).then(function(data){
                return data.data;
            })
        },

        //提交回复
        replySubmit : function(params){
            return $http({
                url : config.url + "/cf/service/saveReplay",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "fundId": params.fundId,
                    "content" : params.content,
                    "answerId" : params.answerId,
                })
            }).then(function(data){
                return data.data;
            })
        },

        //话题列表
        topicListOf : function(cfId){
            return $http({
                url : config.url + "/cf/service/topicListOf",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "fundId" : cfId,
                })
            }).then(function(data){
                return data.data;
            });
        },

        //订单提交
        payConfim : function(){
            return $http({
                url : config.url + "/cf/service/orderPay",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                })
            }).then(function(data){
                return data.data;
            });
        },


        //订单页面
        orderTips : function(cfId, amount){
            return $http({
                url : config.url + "/cf/service/orderTips",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "rewardId" : cfId,
                    "amount":amount
                })
            }).then(function(data){
                return data.data;
            });
        },

        //订单确认
        nextStep : function(input){
            return $http({
                url : config.url + "/cf/service/orderConfirm",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "rewardId" : input.rewardId,
                    "money" : input.money,
                    "fundId" : input.fundId,
                })
                /*params : angular.extend({}, config.common_params, {
                    "token" : localStorageService.get("token"),
                    "rewardId" : input.rewardId,
                    "remark" : input.remark,
                    "recipientName" : input.contractName,
                    "recipientPhone" : input.contractPhone,
                    "recipientAddress" : input.contractAddress,
                })*/
            }).then(function(data){
                return data.data;
            });
        },


        //查询支持列表
        supportQuery : function(cfId){
            return $http({
                url : config.url + "/cf/service/supportListOf",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data : angular.extend({}, config.common_params, {
                    "oldToken" : localStorageService.get("token"),
                    "fundId" : cfId
                })
            }).then(function(data){
                return data.data;
            });
        },

        //查询众筹列表
        query : function(page){
            return $http({
              url: config.url + "/cf/service/fundingListOf",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: angular.extend({}, config.common_params, {
                    "curreny": page
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //查询众筹详情
        queryDetails : function(cfId){
            return $http({
                url: config.url + "/cf/service/fundsDetail",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "fundId": cfId
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //更多项目详情
        fundsDetailMore : function(cfId){
            return $http({
                url: config.url + "/cf/service/fundsDetailMore",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "fundId": cfId
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //关注
        attention : function(cfId){
            return $http({
                url: config.url + "/cf/service/attention",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "fundId": cfId
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //点赞
        praise : function(cfId){
            return $http({
                url: config.url + "/cf/service/praise",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: angular.extend({}, config.common_params, {
                    "fundId": cfId
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 修改收货地址;
        modifyAddress: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/modifyAddress",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "contractName": input.contractName,
                    "contractPhone": input.contractPhone,
                    "provinceId": input.provinceId,
                    "cityId": input.cityId,
                    "contractAddress": input.contractAddress,
                    "check": input.check
                })
            }).then(function(data) {
                    return data.data;
            });
        }
    }
});
