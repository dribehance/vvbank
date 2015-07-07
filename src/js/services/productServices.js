angular.module("VVBank").factory("productServices", function($rootScope, $http, localStorageService, config) {
    return {
        queryById: function(id) {
            return $http({
                url: config.url + "/v1/service/product/" + id,
                method: "GET",
                params: angular.extend({}, config.common_params),
                cache: true
            }).then(function(data) {
                return data.data;
            })
        },
        queryFiles: function(productID) {
            return $http({
                url: config.url + "/v1/service/attachment/" + productID,
                method: "GET",
                params: angular.extend({}, config.common_params),
                cache: true
            }).then(function(data) {
                return data.data;
            })
        },
        buy: function(entity) {
            return $http({
                url: config.url + "/v1/service/investment",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: angular.extend({}, config.common_params, {
                    "token": localStorageService.cookie.get("token"),
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
