angular.module("VVBank").factory("productServices",function($rootScope, $http, $q, $route, _EventHandler) {
	var get = function() {
		var promise = $http.get("http://jsonplaceholder.typicode.com/posts/1");
		return promise.then(product_parser);
	}
	return {
		get: get
	}
});
var product_parser = function(data) {
	var product = new _m_product();
	data = _test_product;
	product.id = data.id;
	product.title = data.title;
	product.tag = data.tag;
	product.feature = data.feature;
	product.limit = data.limit;
	product.percentage = data.percentage;
	product.addition = data.addition;

	product.progress = data.progress;
	product.total = data.total;
	product.remain = data.remain;
	product.faqiren = data.faqiren;
	product.dealer = data.dealer;
	product.exchange = data.exchange;
	product.agency = data.agency;

	return product;
}
var _test_product = {
	id:"15135",
	title:"资产权益项目SZQH110203",
	tag:"1",
	feature : "到期还本付息",
	limit : "1000",
	percentage : "5.00%",
	addition : "1.00%",

	progress:"60%",
	total:"500,000",
	remain:"4,000",
	faqiren:"深圳白海龙股份有限公司",
	dealer:"中国平安保险股份有限公司",
	exchange:"深圳白海龙股份有限公司",
	agency:"中国平安保险股份有限公司"
}