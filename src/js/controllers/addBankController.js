var addBankController = function ($scope) {
	$scope.provinces = PROVINCES;
	$scope.cities = CITIES;
	$scope.banks = ["中国工商银行","招商银行","农业银行"];
	// default value
	$scope.province = "广东省";
	$scope.city = "深圳市";
	$scope.bank = "中国工商银行";
}