angular.module("VVBank").factory("licaiServices", function($rootScope, $http, config) {
    return {
        //理财产品首页项目
        query: function() {
            return $http({
                url: config.url + "/v1/service/products",
                method: "GET",
                params: angular.extend({}, config.common_params),
                cache:true
            }).then(function(data) {
                return data.data;
            })
        },
        //
        loadMore: function() {
            return $http({
                url: config.url + "",
                method: "GET",
                params: angular.extend({}, config.common_params)
            }).then(function(data) {
                return data.data;
            })
        },
        //首页项目
        recommand: function(page) {
            return $http({
                url: config.url + "/v1/service/homepage/products",
                method: "GET",
                params: angular.extend({}, config.common_params,{
                    "current":page
                }),
                // cache: true
            }).then(function(data) {
                return data.data;
            })
        },
        //根据项目类型获取项目产品
        queryByExchange:function(exchangeCode,page) {
            return $http({
                url:config.url +"/v1/service/products/"+exchangeCode,
                method:"GET",
                params:angular.extend({},config.common_params,{
                    "current":page
                })
            }).then(function(data){
                return data.data;
            })
        },
        //获取产品类型
        queryExchange:function() {
            return $http({
                url:config.url +"/v1/service/productType",
                method:"GET",
                params:angular.extend({},config.common_params),
                cache:true
            }).then(function(data){
                return data.data;
            })
        }
    }
});