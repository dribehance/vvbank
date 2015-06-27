angular.module("VVBank").factory("agreementServices",function($http,config){
	return {
		get:function(type) {
			return $http({
				url:config.url+"/v1/service/protocol",
				method:"GET",
				params:angular.extend({},config.common_params,{
					"type":type
				}).then(function(data){
					return data.data[0];
				})
			})
		}
	}
});