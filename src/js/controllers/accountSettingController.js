var accountSettingController = function($scope) {
	// remote data
	$scope.degrees = ["小学毕业","中心毕业","高中毕业","本科生","研究生","博士","博士后"];
	$scope.scales = ["10人以内","20人以内","30人以内"];
	$scope.jobs = ["工程师","设计师"];
	$scope.incomes = ["5000元","8000元"];
	// user input
	$scope.input = {
		degree : "小学毕业",
		scale : "10人以内",
		job : "工程师",
		income : "5000元",
		birthday: new Date("1990-01-01"),
		sex:"男"
	}
	// user post
	$scope.ajaxForm = function(form) {

	}
}