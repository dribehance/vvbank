// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").factory("mallServices", function($http,$rootScope, config) {
    return {
    	// 首页商品信息,包括分类商品列表;
        query: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/indexGoods",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "current": input.number,
                    "categoryID": input.category_id
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 商品分类;
        queryCategory:function(input) {
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
        queryById:function(input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/details",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
        	        "goodsId":input.id
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        },
        // 试运气;
        tryLucky:function(input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/rate",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
        	    	"mobile": $rootScope.user.telephone,
        	        "username": $rootScope.user.username,
        	        "goodsId": input.goods_id,
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        },
        // 修改收货地址;
        modifyAddress:function(input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/modifyAddress",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
        	        "mobile": $rootScope.user.telephone,
        	        "username": $rootScope.user.username,
        	        "goodsId": input.goods_id,
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        },
        // 结算;
        buy:function(input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/balance",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
        	    	"mobile": $rootScope.user.telephone,
        	        "username": $rootScope.user.username,
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
        	        "mobile": $rootScope.user.telephone,
        	        "username": $rootScope.user.username,
        	        "pwd": input.password,
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        },
        // 兑换;
        exchange:function(input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/immediately",
        	    method: "GET",
        	    params: angular.extend({}, config.common_params, {
        	    	"mobile": $rootScope.user.telephone,
        	        "username": $rootScope.user.username,
        	        "goodsId": input.goods_id,
        	        "quantity": input.quantity,
        	        "price": input.price,
        	        "pwd": input.password,
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        },
    }
});
