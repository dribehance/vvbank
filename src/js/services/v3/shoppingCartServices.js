// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").factory("shoppingCartServices", function($http, $rootScope,localStorageService, config) {
    return {
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
        add: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/addCar",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "token":localStorageService.get("token"),
                    "goodsId": input.goods_id
                })
            }).then(function(data) {
                return data.data;
            });
        },
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
        remove: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/deleteCar",
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
                    "carId": input.car_id,
                })
            }).then(function(data) {
                return data.data;
            });
        },
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
        queryOrderById: function (input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/orderItem",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
        	        "orderId": input.order_id
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        }
    }
});
