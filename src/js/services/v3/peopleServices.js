// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").factory("peopleServices", function($http, $rootScope, config) {
    return {
        query: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/system/brokerInfo",
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
                    "mobile": $rootScope.user.telephone,
                    "username": $rootScope.user.username,
                })
            }).then(function(data) {
                return data.data;
            });
        },
        // 二级人脉
        queryByLevel: function (input) {
        	return $http({
        		// by dribehance <dribehance.kksdapp.com>
        	    url: config.url + "/e1/emall/system/brokerInfoTwo",
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
        	        "mobile": $rootScope.user.telephone,
                    "username": $rootScope.user.username,
                    "memberId": input.member_id
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        }
    }
});
