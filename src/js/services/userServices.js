angular.module("VVBank").factory("userServices", function($http, $rootScope,$filter, $q, $location, localStorageService, config) {
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
        login: function(username, password, type) {
            return $http({
                url: config.url + "/v1/service/account/in",
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
                    "username": username,
                    "password": password,
                    "type": type
                })
            }).then(function(data) {
                return data.data;
            });
        },
        logout: function() {
            return $http({
                url: config.url + "/v1/service/account/logout",
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
        queryAuthenInfo: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/checkReanName",
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
                    "idCard": identifyID,
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
                    "telephone": telephone,
                    "username": username
                })
            }).then(function(data) {
                return data.data;
            });
        },
        getVerifycode: function(input) {
            return $http({
                url: config.url + "/v1/service/verifycode",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "signcode": $rootScope.signcode,
                    "width": input.width,
                    "height": input.height,
                })
            }).then(function(data) {
                return data.data;
            })
        },
        checkVerifycode: function(input) {
            return $http({
                url: config.url + "/v1/service/checkVerifyCode",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "verifycode": input.verifycode,
                })
            }).then(function(data) {
                return data.data;
            })
        },
        getSmscode: function(telephone, verify, smstype) {
            return $http({
                url: config.url + "/v1/service/sendVerifyCode",
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
                    "code": $rootScope.signcode,
                    "sendType": smstype,
                    "verify": verify,
                })
            }).then(function(data) {
                return data.data;
            })
        },
        getSmscodePwd: function(telephone, verify) {
            return $http({
                url: config.url + "/v1/service/smscodeAndPwd",
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
                    "code": $rootScope.signcode,
                    "sendType": verify
                })
            }).then(function(data) {
                return data.data;
            })
        },
        getCashSmscode: function(mobile) {
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
                    "mobile": mobile,
                    "sendType": 2
                })
            }).then(function(data) {
                return data.data;
            });
        },
        token: function() {
            return $http({
                url: config.url + "/v1/service/token",
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
                    "token": localStorageService.get("token")
                })
            }).then(function(data) {
                localStorageService.set("token", data.result.token);
            })
        },
        forgetPassword: function(telephone, smscode, password) {
            return $http({
                url: config.url + "/v1/service/findpassword",
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
            },
            all: function() {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/v1/service/queryUserInfo",
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
            update: function(input) {
                return $http({
                    // by dribehance <dribehance.kksdapp.com>
                    url: config.url + "/v1/service/addUserInfo",
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
                        "sex": input.sex,
                        "birthday": $filter("date")(input.birthday, "yyyy-MM-dd"),
                        "orMarriage": input.or_marriage,
                        "posterity": input.posterity,
                        "orHouse": input.or_house,
                        "orMortgage": input.or_mortgage,
                        "education": input.education,
                        "companyScale": input.company_scale,
                        "occupation": input.occupation,
                        "workYear": input.work_year,
                        "income": input.income,
                        "secondContract": input.second_contract,
                        "secondContractPhone": input.second_contract_phone,
                        "qq": input.qq,
                        "contractname": input.recipientName,
                        "providerId": input.provinceId,
                        "cityId": input.cityId,
                        "contractAddress": input.address,
                        "contractPhone": input.recipientPhone,
                        "contractpostcode": input.postcode
                    })
                }).then(function(data) {
                    return data.data;
                });
            }
        },
        queryChargeInfo: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/securityCard",
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
        queryChargeBankInfo: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/userbankcard",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token")
                })
            }).then(function(data) {
                return data.data;
            });
        },
        charge: function(charge) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/recharge",
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
                    "bank_name": charge.bank_name,
                    "bank_code": charge.bank_code,
                    "card_no": charge.card_no,
                    "money": charge.money,
                    "no_agree": charge.no_agree,
                    "type": charge.type,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        thirdpartCharge: function(pay_params) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: "https://yintong.com.cn/llpayh5/payment.htm",
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
                data: angular.extend({}, {
                    req_data: angular.toJson(pay_params)
                })
            }).then(function(data) {
                return data.data;
            });
        },
        queryCashInfo: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/withdraw",
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
        cash: function(cash) {
            return $http({
                url: config.url + "/v1/service/submitwithdraw",
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
                    "pwd": cash.pwd,
                    "code": cash.code,
                    "withdrawMoney": cash.withdrawMoney,
                    "antiWithdrawMoney": cash.antiWithdrawMoney,
                    "voucher": cash.voucher,
                    "fee": cash.fee,
                    "fee2": cash.fee2,
                    "bankAccountID": cash.bankAccountID,
                })
            }).then(function(data) {
                return data.data;
            })
        },
        queryCashConfirmInfo: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/checkwithdraw",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "withdrawMoneyHidden": input.withdrawMoneyHidden,
                    "antiWithdrawMoneyHidden": input.antiWithdrawMoneyHidden,
                    "fee": input.fee,
                    "fee2": input.fee2,
                    "voucher": input.voucher,
                    "selectID": input.selectID
                })
            }).then(function(data) {
                return data.data;
            });
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
        queryTradePasswordInfo: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/v1/service/securityPhone",
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
        updateTradePassword: function(password) {
            return $http({
                url: config.url + "/v1/service/tradepwdSetting",
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
                    "smscode": password.smscode,
                    "idCard": password.idCard
                })
            }).then(function(data) {
                return data.data;
            })
        },
        bindTelephone: function(telephone, smscode) {
            return $http({
                url: config.url + "/v1/service/validateTelephone",
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
                    "smscode": smscode,
                    "telephone": telephone,
                    "signcode": $rootScope.signcode,
                })
            }).then(function(data) {
                return data.data;
            })
        }
    }
});
