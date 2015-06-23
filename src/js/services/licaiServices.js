angular.module("VVBank").factory("licaiServices",function($rootScope, $http, $q, $route) {
	var query = function() {
		var promise = $http.get("http://jsonplaceholder.typicode.com/posts/1",{cache:true});
		return promise.then(licai_parser);
	}
	var loadMore = function () {
		var promise = $http.get("http://jsonplaceholder.typicode.com/posts/1");
		return promise.then(licai_parser);
	}
	var recommand = function () {
		var promise = $http.get("http://jsonplaceholder.typicode.com/posts/1",{cache:true});
		return promise.then(recommand_parser);
	}
	return {
		query: query,
		loadMore: loadMore,
		recommand: recommand
	}
});
var licai_parser = function(data) {
	data = Data;
	var response = [],group, products , product;
	for(var i = 0;i<data.length;i++) {
		group = new _m_group();
		group.name= data[i].name;
		products = data[i].products;
		for(var j=0;j<products.length;j++) {
			product = new _m_product();

			product.id = products[j].id;
			product.title = products[j].title;
			product.tag = products[j].tag;
			product.feature = products[j].feature;
			product.limit = products[j].limit;
			product.percentage = products[j].percentage;
			product.addition = products[j].addition;

			product.progress = data.progress;
			product.total = data.total;
			product.remain = data.remain;
			product.faqiren = data.faqiren;
			product.dealer = data.dealer;
			product.exchange = data.exchange;
			product.agency = data.agency;

			group.products.push(product);
		}
		response.push(group);
	}
	return response;
}
var recommand_parser = function(data) {
	data = Data[0].products;
	return data;
}
// emulator data
var Data = [
	{
		name:"深圳前海金融资产交易所",
		products:[
			{
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
			},
			{
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
			},
			{
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
		]
	},
	{
		name:"重庆金融资产交易所",
		products:[
			{
				id:"15135",
				title:"资产权益项目SZQH110203",
				tag:"2",
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
		]
	},
	{
		name:"辽宁金融资产交易中心",
		products:[
			{
				id:"15135",
				title:"资产权益项目SZQH110203",
				tag:"3",
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
		]
	}
];