// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").factory("peopleServices", function($http, $rootScope,localStorageService, config) {
    return {
        query: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/e1/emall/system/brokerInfo",
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
                    "token":localStorageService.get("token"),
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
                    "token":localStorageService.get("token"),
                    "memberId": input.member_id
        	    })
        	}).then(function(data) {
        	    return data.data;
        	});
        }
    }
});
