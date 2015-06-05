var addBankController = function ($scope) {
	// remote data
	$scope.provinces = PROVINCES;
	$scope.cities = CITIES;
	$scope.banks = ["中国工商银行","招商银行","农业银行"];
	// user input 
	$scope.input = {
		province : "广东省",
		city : "深圳市",
		bank : "中国工商银行",
	}
	// user post
	$scope.ajaxForm = function(form) {
		
	}
}