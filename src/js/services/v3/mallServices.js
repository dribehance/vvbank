// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").factory("mallServices", function($http, $rootScope, localStorageService, config) {
    return {
        // 首页商品信息,包括分类商品列表;
        query: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/indexGoods",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "current": input.number,
                    "categoryId": input.category_id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 商品分类;
        queryCategory: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/category",
                method: "GET",
                params: angular.extend({}, config.common_params, {})
            }).then(function(data) {
                return data.data;
            });
        },
        // 商品详情;
        queryById: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/details",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "goodsId": input.id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 试运气;
        tryLucky: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/rate",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "goodsId": input.goods_id,
                    "pwd": input.password
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 修改收货地址;
        modifyAddress: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/modifyAddress",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "contractName": input.contractName,
                    "contractPhone": input.contractPhone,
                    "provinceId": input.provinceId,
                    "cityId": input.cityId,
                    "contractAddress": input.contractAddress,
                    "check": input.check
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //结算页面
        queryPaymentInfo: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/readyBalance",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "carIds": input.car_ids,
                    "goodsId": input.goods_id,
                    "quantity": input.quantity
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //结算
        payment: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/balance",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "carIds": input.car_ids,
                    "goodsId": input.goods_id,
                    "quantity": input.quantity,
                    "pwd":input.pwd,
                    "contractName": input.contractName,
                    "contractPhone": input.contractPhone,
                    "contractAddress": input.contractAddress
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 立即结算;
        buy: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/balance",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "goodsId": input.goods_id,
                    "quantity": input.quantity,
                    "price": input.price,
                    "pwd": input.password,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 验证交易密码
        validatePassword: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/checkPwd",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "pwd": input.password,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 兑换;
        exchange: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/immediately",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "goodsId": input.goods_id,
                    "quantity": input.quantity,
                    "price": input.price,
                    "pwd": input.password,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        querySerial: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/doProvider",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //查询序列号
        querySerialCode: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/serialNo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "serial": input.serial
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //使用序列号
        useSerialCode: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/useSerial",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                    "serial": input.serial,
                    "itemId": input.itemId
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //我的推广    二维码链接
        queryQrcode: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/extensionUrl",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token": localStorageService.get("token"),
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
