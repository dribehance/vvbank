angular.module("VVBank").factory("v4userServices", function($http, $rootScope, $q, $location, localStorageService, config) {
    return {
        getSmscode: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/code/sendCode",
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
                    "mobile": input.mobile,
                    "sendType": input.sendType
                })
            }).then(function(data) {
                return data.data;
            });
        },
        queryForgetByTelephone: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/backPwdAndPhone",
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
                    "phone": input.phone
                })
            }).then(function(data) {
                return data.data;
            });
        },
        validateVerifycode:function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/checkVerifyCode",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "verifycode": input.verifycode
                })
            }).then(function(data) {
                return data.data;
            });  
        },
        updateSigninPassword:function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/backPwd",
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
                    "smscode":input.smscode,
                    "pwd":input.pwd,
                    "telephone":input.telephone,
                    "code": $rootScope.signcode
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
