angular.module("VVBank").factory("settingServices", function($http, localStorageService, userServices, transformServices, config) {
    return {
        updateAccount: function(user) {
            return $http({
                url: config.url + "/v1/service/user/userinfo",
                method: "PUT",
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // },
                // transformRequest: function(obj) {
                //     var str = [];
                //     for (var p in obj)
                //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //     return str.join("&");
                // },
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "position": user.job,
                    "birthday": user.birthday.getFullYear() + "-" +user.birthday.getMonth() + 1 +"-"+user.birthday.getDate(),
                    "corporateSize": transformServices.rever(config.scales)[user.scale],
                    "maxEducation": user.degree,
                    "college": user.school,
                    "homeAddress": user.address,
                    "maritalStatus": transformServices.rever(config.is_marry)[user.is_marry],
                    "gender": transformServices.rever(config.sex)[user.sex],
                    "salary": transformServices.rever(config.incomes)[user.income],
                    "industry": user.industry
                })
            }).then(function(data) {
                return data.data;
            })
        },
        //查询银行卡信息
        queryBanks: function() { 
            return $http({
                url: config.url + "/v1/service/bankinfo",
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
        //获取银行信息
        queryBanksExample:function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/bank",
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
        //获取省份信息
        queryProvinces:function(){
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/provinceinfo",
                method: "GET",
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // },
                // transformRequest: function(obj) {
                //     var str = [];
                //     for (var p in obj)
                //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //     return str.join("&");
                // },
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token")
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //获取市信息
        queryCityByProvinceId:function(id){
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/cityinfo",
                method: "GET",
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // },
                // transformRequest: function(obj) {
                //     var str = [];
                //     for (var p in obj)
                //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //     return str.join("&");
                // },
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "provinceId":id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        querySystemUserinfoInBank:function(){
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/viewBankInfoUser",
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
                    "token":localStorageService.get("token")
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //修改查询银行卡信息
        updateBank: function(bank) {
            return $http({
                url: config.url + "/v1/service/bankinfo",
                method: "PUT",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "cardId": bank.id,
                    "cardno": bank.card_number,
                    "bank": bank.name,
                    "province": bank.province,
                    "city": bank.city,
                    "bankBranch": bank.branch,
                    "bankCode": bank.code
                })
            }).then(function(data) {
                return data.data;
            })
        },
        //删除查询银行卡信息
        deleteBank: function(bank) {
            return $http({
                url: config.url + "/v1/service/bankinfo",
                method: "DELETE",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "cardId": bank.id,
                })
            }).then(function(data) {
                return data.data;
            })
        },
        //添加查询银行卡信息
        createBank: function(bank) {
            return $http({
                url: config.url + "/v1/service/addBankinfo",
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
                    "cardno": bank.card_number,
                    "bank": bank.branch,//支行名称
                    "provinceId": bank.provinceId,
                    "cityId": bank.cityId,
                    "bankId": bank.bankId,
                    // "bankBranch": bank.branch,
                    "realName":bank.realname,
                    "idCard":bank.identity,
                    "code":bank.smscode
                })
            }).then(function(data) {
                return data.data;
            })
        },
        //
        invite: function() {
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
        questions: function() {
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
        about: function() {
            return $http({
                url: config.url + "/v1/service/user/userinfo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token")
                })
            }).then(function(data) {
                return data.data;
            })
        }
    }
})
