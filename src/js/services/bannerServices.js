angular.module("VVBank").factory("bannerServices",function($http,$q,config){
	return {
		get:function() {
			return $http({
				url: config.url + "/v1/service/homepage/banners",
				method:"GET",
				params: angular.extend({},config.common_params),
				cache:true,
			}).then(function(data){
				return data.data;
			});
		}
	}
});