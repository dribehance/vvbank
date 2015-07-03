angular.module("VVBank").factory("settingServices", function($http, localStorageService, userServices, transformServices, config) {
    return {
        updateAccount: function(user) {
            return $http({
                url: config.url + "/v1/service/user/userinfo",
                method: "POST",
                data: angular.extend({}, config.common_params, {
                    "token": localStorageService.cookie.get("token"),
                    "position": user.job,
                    "birthday": user.birthday,
                    "corporateSize": transformServices.rever(config.scale)[user.scale],
                    "maxEducation": user.degree,
                    "college": user.school,
                    "homeAddress": user.address,
                    "maritalStatus": transformServices.rever(config.is_marry)[user.is_marry],
                    "gender": transformServices.rever(config.sex)[user.sex],
                    "salary": transformServices.rever(config.salary)[user.salary],
                    "industry": user.industry
                })
            }).then(function(data) {
                return data.data;
            })
        },
        queryBanks: function() {
            return $http({
                url: config.url + "/v1/service/bankinfo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.cookie.get("token")
                })
            }).then(function(data) {
                return data.data;
            })
        },
        queryBankById: function(id) {

        },
        updateBank: function(bank) {
            return $http({
                url: config.url + "/v1/service/bankinfo",
                method: "POST",
                data: angular.extend({}, config.common_params, {
                    "token": localStorageService.cookie.get("token"),
                    "cardno": bank.card_number,
                    "bank": bank.name,
                    "province": bank.province,
                    "city": bank.city,
                    "bankBranch": bank.branch
                })
            }).then(function(data) {
                return data.data;
            })
        },
        deleteBank: function(bank) {

        },
        createBank: function(bank) {
            return $http({
                url: config.url + "/v1/service/bankinfo",
                method: "POST",
                data: angular.extend({}, config.common_params, {
                    "token": localStorageService.cookie.get("token"),
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
        invite: function() {
            return $http({
                url: config.url + "/v1/service/user/userinfo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.cookie.get("token")
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
                    "token": localStorageService.cookie.get("token")
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
                    "token": localStorageService.cookie.get("token")
                })
            }).then(function(data) {
                return data.data;
            })
        }
    }
})