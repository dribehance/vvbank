angular.module("VVBank").factory("userServices", function($http, $rootScope, $q, $location, localStorageService, config) {
    return {
        register: function(telephone, password, username, referee, smscode) {
            return $http({
                url: config.url + "/v1/service/account",
                method: "POST",
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
                url: config.url + "/auth",
                method: "DELETE"
            }).then(function(data) {
                return data.data;
            });
        },
        checkAuth: function() {
            if (localStorageService.cookie.get("token")) {
                return true;
            }
            return false;
        },
        authen: function(realname, identifyID) {
            return $http({
                url: config.url + "/v1/service/authentication",
                method: "PUT",
                data: angular.extend({}, config.common_params, {
                    "realname": realname,
                    "idcode": identifyID,
                    "token": localStorageService.cookie.get("token")
                })
            }).then(function(data) {
                return data.data[0];
            })
        },
        exist: function(telephone, username) {
            return $http({
                url: config.url + "/v1/service/account",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "telephone": telephone,
                    "username": username
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
                method: "PUT",
                data: angular.extend({}, config.common_params, {
                    "token": localStorageService.cookie.get("token")
                })
            }).then(function(data) {
                return data.data[0];
            })
        },
        forgetPassword: function(telephone, smscode, password) {
            return $http({
                url: config.url + "/v1/service/findpassword",
                method: "PUT",
                params: angular.extend({}, config.common_params, {
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
                    url: config.url + "/v1/service/user/account",
                    method: "GET",
                    params: angular.extend({}, config.common_params, {
                        "token": localStorageService.cookie.get("token")
                    })
                }).then(function(data){
                	return data.data;
                })
            },
            safety:function() {
            	return $http({
            		url:config.url + "/v1/service/safeinfo",
            		method:"GET",
            		params:angular.extend({},config.common_params,{
            			"token":localStorageService.cookie.get("token")
            		})
            	}).then(function(data){
            		return data.data;
            	})
            },
            account:function() {
            	return $http({
            		url:config.url + "/v1/service/user/account",
            		method:"GET",
            		params:angular.extend({},config.common_params,{
            			"token":localStorageService.cookie.get("token")
            		})
            	}).then(function(data){
            		return data.data;
            	})
            }
        }
    }
});
var user_parser = function(data) {
    var user = new _m_user;

    data = _test_user;

    user.id = data.id,
        user.nickname = data.nickname,
        user.realname = data.realname,
        user.total = data.total,
        user.earning = data.earning,
        user.frozen = data.frozen,

        user.identify = data.identify,
        user.telephone = data.telephone,
        user.email = data.email,

        user.sex = data.sex,
        user.birthday = data.birthday,
        user.degree = data.degree,
        user.address = data.address,
        user.industry = data.industry,
        user.scale = data.scale,
        user.job = data.job,
        user.income = data.income
    return user;
}
var _test_user = {
    id: 111,
    nickname: "juncun",
    realname: "陈生",
    total: "14,000",
    earning: "45,000",
    frozen: "4,000",

    identify: "450881**********11111",
    telephone: "137****2373",
    email: "2818921054@qq.com",

    sex: "男",
    degree: "小学毕业",
    address: "深圳宝安财富港",
    industry: "",
    scale: "10人以内",
    job: "工程师",
    income: "5000元"
}
