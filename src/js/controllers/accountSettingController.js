var accountSettingController = function($scope) {
	$scope.degrees = ["小学毕业","中心毕业","高中毕业","本科生","研究生","博士","博士后"];
	$scope.scales = ["10人以内","20人以内","30人以内"];
	$scope.jobs = ["工程师","设计师"];
	$scope.incomes = ["5000元","8000元"];
	// default value
	$scope.degree = "小学毕业";
	$scope.scale = "10人以内";
	$scope.job = "工程师";
	$scope.income = "5000元";
}