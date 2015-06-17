angular.module("VVBank").factory("userServices",function($http,config,$rootScope){
	return {
		get: function(){
			var promise = $http.get("http://jsonplaceholder.typicode.com/posts/1");
			return promise.then(user_parser);
		},
		register: function(telephone,password){
			return $http({
				url: config.url+"/user",
				method:"POST",
				data:{
					"telephone":telephone,
					"password":password
				}
			}).then(function(data){
				return data.data;
			});
		},
		login: function(telephone,password) {
			return $http({
				url: config.url+"/auth",
				method:"POST",
				data:{
					"telephone":telephone,
					"password":password
				}
			}).then(function(data){
				return data.data;
			});
		},
		logout: function() {
			return $http({
				url: config.url+"/auth",
				method:"DELETE"
			}).then(function(data){
				return data.data;
			});
		},
		checkAuth: function() {
			return $http({
				url: config.url+"/auth",
				method:"POST"
			}).then(function(data){
				return data.data;
			});
		},
		exist : function(telephone,username) {
			return $http({
				url:config.url + "/v1/service/account",
				method:"JSONP",
				params : config.common_params
			}).then(function(data){
				return data.data[0];
			},function(e){
				console.log(e)
			})
		},
		verifycode : function(telephone,smstype){
			return $http({
				url:config.url + "/v1/service/smscode",
				method:"JSONP",
				params: angular.extend(config.common_params,{
					"telephone":telephone,
					"signcode":$rootScope.signcode,
					"smstype":smstype
				})
			}).then(function(data){
				return data.data[0];
			})
		}
	}
});
var user_parser = function(data) {
	var user = new _m_user;

	data = _test_user;

	user.id = data.id,
	user.nickname = data.nickname,
	user.realname = data.realname,
	user.total = data.total,
	user.earning = data.earning,
	user.frozen = data.frozen,

	user.identify = data.identify,
	user.telephone = data.telephone,
	user.email = data.email,

	user.sex = data.sex,
	user.birthday = data.birthday,
	user.degree = data.degree,
	user.address = data.address,
	user.industry = data.industry,
	user.scale = data.scale,
	user.job = data.job,
	user.income = data.income
	return user;
}
var _test_user = {
	id:111,
	nickname:"juncun",
	realname:"陈生",
	total:"14,000",
	earning:"45,000",
	frozen:"4,000",

	identify:"450881**********11111",
	telephone:"137****2373",
	email:"2818921054@qq.com",

	sex:"男",
	degree:"小学毕业",
	address:"深圳宝安财富港",
	industry:"",
	scale:"10人以内",
	job:"工程师",
	income:"5000元"
}