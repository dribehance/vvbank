angular.module("VVBank").factory("projectServices",function($http,config){
	return {
		queryById:function(id){
			return $http({
				url:config.url + "/v1/service/project/"+id,
				method:"GET",
				params:angular.extend({},config.common_params),
				cache:true
			}).then(function(data){
				return data.data;
			})
		}
	}
});