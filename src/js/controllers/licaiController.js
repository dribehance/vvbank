var licaiController = function($scope,licaiServices){
	$scope.stocks = ["理财产品","深圳前海金融资产交易所","重庆金融资产交易所","辽宁金融资产交易中心"];
	$scope.stock = {
		name: ""
	}
	licaiServices.query().then(function(data){
		$scope.groups = data;
	});
	$scope.loadMore = function () {
		licaiServices.loadMore().then(function(data){
			console.log(data)
			$scope.groups = $scope.groups.concat(data);
		});
	}
}
