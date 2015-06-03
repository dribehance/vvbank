var licaiController = function($scope){
	$scope.stocks = ["理财产品","深圳前海金融资产交易所","重庆金融资产交易所","辽宁金融资产交易中心"];
	$scope.stock = {
		name: ""
	}
	var data = [
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
					addition : "1.00%"
				},
				{
					id:"15135",
					title:"资产权益项目SZQH110203",
					tag:"1",
					feature : "到期还本付息",
					limit : "1000",
					percentage : "5.00%",
					addition : "1.00%"
				},
				{
					id:"15135",
					title:"资产权益项目SZQH110203",
					tag:"1",
					feature : "到期还本付息",
					limit : "1000",
					percentage : "5.00%",
					addition : "1.00%"
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
					addition : "1.00%"
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
					addition : "1.00%"
				}
			]
		}
	];
	$scope.groups = _parser(data);
	$scope.loadMore = function(){
		$scope.groups = $scope.groups.concat(_parser(data));
		console.log($scope.groups)
	}
	
}
var _parser = function(data) {
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
			product.addition = products.addition;

			group.products.push(product);
		}
		response.push(group);
	}
	return response;
}
var _m_product = function() {
	// title: 产品标题
	// tag:1-热卖 tag:2-募满 tag:3 结束
	// feature: 到期还本付息
	// duration: 持有时长---------10天
	// limit: 起投金额------------1000元起投
	// percentage:收益率----------5.00%
	// addtion:加送---------------1.00%
	
	var product = {
	
		id:"",
		title:"",
		tag:"1",
		feature:"1",
		duration:"15",
		limit:"1000",
		percentage:"5.00%",
		addition: "1.00%"
	}
	return product;
}
var _m_group = function () {
	// name: 深圳前海金融资产交易所
	var _m_group = {
		name:"",
		products: []
	};
	return _m_group;
}