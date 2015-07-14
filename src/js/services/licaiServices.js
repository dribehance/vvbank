angular.module("VVBank").factory("licaiServices", function($rootScope, $http, config) {
    return {
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
        loadMore: function() {
            return $http({
                url: config.url + "",
                method: "GET",
                params: angular.extend({}, config.common_params)
            }).then(function(data) {
                return data.data;
            })
        },
        recommand: function() {
            return $http({
                url: config.url + "/v1/service/homepage/products",
                method: "GET",
                params: angular.extend({}, config.common_params),
                cache: true
            }).then(function(data) {
                return data.data;
            })
        },
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