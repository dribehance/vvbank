angular.module("VVBank").factory("settingServices",function($http,localStorageService,userServices,config){
	return {
		updateAccount:function(user){
			return $http({
				url:config.url + "/v1/service/user/userinfo",
				method:"POST",
				params:angular.extend({},config.common_params,{
					"token":localStorageService.cookie.get("token"),
					"position":user.job,
					"birthday":user.birthday,
					"corporateSize":user.scale,
					"maxEducation":user.degree,
					"college":user.school,
					"homeAddress":user.address,
					"maritalStatus":user.is_marry,
					"gender":user.sex,
					"salary":user.salary,
					"industry":user.industry
				})
			}).then(function(data){
				return data.data;
			})
		},
		queryBanks:function(){

		},
		updateBank:function(bank){

		},
		deleteBank:function(bank){

		},
		invite:function(){

		},
		questions:function() {

		},
		about:function(){
			
		}
	}
})