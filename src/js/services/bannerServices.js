angular.module("VVBank").factory("bannerServices",function($http){
	var get = function () {
		var promise = $http.get("http://jsonplaceholder.typicode.com/posts/1");
		return promise.then(banner_parser);
	}
	return {
		get:get
	}
});
var banner_parser = function(data) {
	var banners = ["images/banner.png"]
	return banners;
}