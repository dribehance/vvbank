// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").factory("shoppingCartServices", function($http, $rootScope,localStorageService, config) {
    return {
        //购物车
        query: function() {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/carItem",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //添加购物车
        add: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/addCar",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "goodsId": input.goods_id,
                    "quantity": input.quantity
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //修改购物车
        modify: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/modifyCar",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "quantity": input.quantity,
                    "carId": input.car_id,
                    "goodsId": input.goods_id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //删除商品
        remove: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/deleteCar",
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
                    "carId": input.car_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        //订单列表
        queryOrders: function(input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/showOrderItem",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        },
        //订单详情
        queryOrderById: function (input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/orderItem",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
        	        "orderId": input.order_id
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        }
    }
});
