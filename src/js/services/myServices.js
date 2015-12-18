angular.module("VVBank").factory("myServices", function($http, localStorageService, config) {
    return {
        // 资金账户
        accountMoney: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/accountMoney",
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
                    token: localStorageService.get("token")
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //投资记录
        investment: function(page) {
            return $http({
                url: config.url + "/v1/service/invests",
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
                    token: localStorageService.get("token")
                })
            }).then(function(data) {
                return data.data;
            })
        },
        //资金明细
        bills: function(page) {
            return $http({
                url: config.url + "/v1/service/fundsdetail",
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
                    // "current": page
                }),
            }).then(function(data) {
                return data.data;
            })
        },
        //资金账户
        bailAccount: function(page) {
            return $http({
                url: config.url + "/v1/service/accountMoney",
                method: "POST",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token")
                }),
            }).then(function(data) {
                return data.data;
            })
        },
        //
        activities: {
            queryStatistics: function() {
                return $http({
                    url: config.url + "/v1/service/queryActivityGroup",
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
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                })
            },
            queryByYear: function(year) {
                return $http({
                    url: config.url + "/v1/service/queryActivity",
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
                        "year": year || (new Date()).getFullYear()
                    })
                }).then(function(data) {
                    return data.data;
                })
            }
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
        //红包信息
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
        //我的消息
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
            read: function(messageid) {
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
            },
            view: function() {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/v1/service/viewMessage",
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
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        },
        // 账户安全
        account: {
            query: function() {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/v1/service/securityCenter",
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
                        token: localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        }
    }
})
