angular.module("VVBank").factory("myServices", function($http, localStorageService, config) {
    return {
        investment: function(page) {
            return $http({
                url: config.url + "/v1/service/invests",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "current": page
                }),
            }).then(function(data) {
                return data.data;
            })
        },
        bills: function(page) {
            return $http({
                url: config.url + "/v1/service/fundsdetail",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "current": page
                }),
            }).then(function(data) {
                return data.data;
            })
        },
        activities: function(page) {
            return $http({
                url: config.url + "/v1/service/fundsdetail",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "current": page
                })
            }).then(function(data) {
                return data.data;
            })
        },
        eyuan: function(page) {
            return $http({
                url: config.url + "/v1/service/eyuan",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "current": page
                })
            }).then(function(data) {
                return data.data;
            })
        },
        pocket: function(page) {
            return $http({
                url: config.url + "/v1/service/bonus",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "current": page
                })
            }).then(function(data) {
                return data.data;
            })
        },
        message: {
            query: function(page) {
                return $http({
                    url: config.url + "/v1/service/message",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token"),
                        "current": page
                    })
                }).then(function(data) {
                    return data.data;
                })
            },
            read:function(messageid) {
            	return $http({
                    url: config.url + "/v1/service/message",
                    method: "POST",
                    data: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token"),
                        "mid": messageid
                    })
                }).then(function(data) {
                    return data.data;
                })
            }
        }
    }
})
