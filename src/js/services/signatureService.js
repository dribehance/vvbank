angular.module("VVBank").factory("signatureServices",function($http,config){
	return {
		getSigncode:function(){
			return $http({
				url:config.url + "/v1/service/signature",
				method:"JSONP",
				params : config.common_params
			}).then(function(data){
				return data.data[0];
			});
		}
	}
});