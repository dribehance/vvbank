angular.module("VVBank").factory("bannerServices",function($http,$q,config){
	return {
		get:function() {
			return $http({
				url: config.url + "/v1/service/homepage/banners",
				method:"GET",
				params: angular.extend({},config.common_params)
			}).then(function(data){
				if (data.data[0].respcode == config.request.SUCCESS) {
					return banner_parser(data.data[0]);
				}
				return;
			});
		}
	}
});
var banner_parser = function(data) {
	var banners = [];

	for( var i = 0,r = data.result;i < r.length;i++) {
		var banner = new _m_banner();
		banner.order = r[i].order;
		banner.name = r[i].name;
		banner.img = r[i].img;
		banner.url = r[i].url;
		banners.push(banner);
	}
	return banners;
}
