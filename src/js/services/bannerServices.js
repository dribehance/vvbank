angular.module("VVBank").factory("bannerServices",function($http,$q,config){
	return {
		//首页banner
		get:function() {
			return $http({
				url: config.url + "/v1/service/homepage/banners",
				method:"GET",
				params: angular.extend({},config.common_params),
				cache:true,
			}).then(function(data){
				return data.data;
			});
		},

		//首页众筹项目
		cfGet:function() {
			return $http({
				url : config.url + "/v1/service/homepage/crowdFund",
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
				data : angular.extend({}, config.common_params),
				cache : true,
			}).then(function(data){
				return data.data;
			});
		}
	}
});