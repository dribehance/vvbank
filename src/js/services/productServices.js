angular.module("VVBank").factory("productServices", function($rootScope, $http, localStorageService, config) {
    return {
        //产品详情
        queryById: function(id) {
            return $http({
                url: config.url + "/v1/service/product/" + id,
                method: "GET",
                params: angular.extend({}, config.common_params)
            }).then(function(data) {
                return data.data;
            })
        },
        //
        queryFiles: function(productID) {
            return $http({
                url: config.url + "/v1/service/attachment/" + productID,
                method: "GET",
                params: angular.extend({}, config.common_params)
            }).then(function(data) {
                return data.data;
            })
        },
        //投资
        buy: function(entity) {
            return $http({
                url: config.url + "/v1/service/investment",
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
                    "token": localStorageService.get("token"),
                    "password": entity.password,
                    "investAmount": entity.amount,
                    "productId": entity.productId
                })
            }).then(function(data) {
                return data.data;
            })
        }
    }
});
