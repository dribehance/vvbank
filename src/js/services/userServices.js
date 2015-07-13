angular.module("VVBank").factory("userServices", function($http, $rootScope, $q, $location, localStorageService, config) {
    return {
        register: function(telephone, password, username, referee, smscode) {
            return $http({
                url: config.url + "/v1/service/account",
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
                    "mobile": telephone,
                    "username": username,
                    "password": password,
                    "referee": referee,
                    "smscode": smscode,
                    "signcode": $rootScope.signcode

                })
            }).then(function(data) {
                return data.data;
            });
        },
        login: function(username, password) {
            return $http({
                url: config.url + "/v1/service/account/in",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "username": username,
                    "password": password
                })
            }).then(function(data) {
                return data.data;
            });
        },
        logout: function() {
            return $http({
                url: config.url + "/v1/service/account/logout",
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
        },
        checkAuth: function() {
            if (localStorageService.get("token")) {
                return true;
            }
            return false;
        },
        authen: function(realname, identifyID) {
            return $http({
                url: config.url + "/v1/service/realname",
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
                    "realname": realname,
                    "idcode": identifyID,
                    "token": localStorageService.get("token")
                })
            }).then(function(data) {
                return data.data;
            })
        },
        exist: function(telephone, username) {
            return $http({
                url: config.url + "/v1/service/account",
                method: "get",
                params: angular.extend({}, config.common_params, {
                    "telephone":telephone,
                    "username":username
                })
            }).then(function(data) {
                return data.data;
            });
        },
        getSmscode: function(telephone, smstype) {
            return $http({
                url: config.url + "/v1/service/smscode",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "telephone": telephone,
                    "signcode": $rootScope.signcode,
                    "smstype": smstype
                })
            }).then(function(data) {
                return data.data;
            })
        },
        token: function() {
            return $http({
                url: config.url + "/v1/service/token",
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
                localStorageService.set("token", data.result.token);
            })
        },
        forgetPassword: function(telephone, smscode, password) {
            return $http({
                url: config.url + "/v1/service/findpassword",
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
                    "telephone": telephone,
                    "smscode": smscode,
                    "signcode": $rootScope.signcode,
                    "password": password
                })
            }).then(function(data) {
                return data.data;
            })
        },
        info: {
            basic: function() {
                return $http({
                    url: config.url + "/v1/service/user/userinfo",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                })
            },
            safety: function() {
                return $http({
                    url: config.url + "/v1/service/safeinfo",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token")
                    }),
                }).then(function(data) {
                    return data.data;
                })
            },
            account: function() {
                return $http({
                    url: config.url + "/v1/service/user/account",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                })
            },
            authen: function() {
                return $http({
                    url: config.url + "/v1/service/user/account",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.get("token")
                    })
                }).then(function(data) {
                    return data.data;
                })
            }
        },
        charge: function() {

        },
        cash: function(cash) {
            return $http({
                url: config.url + "/v1/service/encashment",
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
                    "amount": cash.money,
                    "dealpwd": cash.password,
                    "signcode": $rootScope.signcode,
                    "smscode": cash.smscode,
                    "cardId": cash.id,
                    "token": localStorageService.get("token"),
                })
            }).then(function(data) {
                return data.data;
            })
        },
        updateSignPassword: function(password) {
            return $http({
                url: config.url + "/v1/service/loginpwd",
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
                    "oldpwd": password.o,
                    "newpwd": password.n
                })
            }).then(function(data) {
                return data.data;
            })
        },
        updateTradePassword: function(password) {
            return $http({
                url: config.url + "/v1/service/tradepwd",
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
                    "tradingPwd": password.n,
                    "oldpassword": password.o
                })
            }).then(function(data) {
                return data.data;
            })
        }
    }
});
