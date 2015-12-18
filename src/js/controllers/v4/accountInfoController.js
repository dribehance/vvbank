var accountInfoController = function($scope, $location, toastServices, errorServices, parserServices, userServices, settingServices, config) {
    // bind _m_user to scope.user
    // remote data
    $scope.degrees = config.degrees;
    $scope.scales = config.scales;
    $scope.incomes = config.incomes;
    $scope.industries = config.industries;
    // safety
    // userServices.info.safety().then(function(data){
    // 	if (data.respcode == config.request.SUCCESS) {
    // 		$scope.safety_info = parserServices.parseSafetyInfo(data.result);
    // 	}
    // })
    // user input
    // userServices.info.basic().then(function(data){
    // 	if (data.respcode == config.request.SUCCESS) {
    // 		$scope.user = parserServices.parseUser(data.result);
    // 	}
    // 	else {
    // 		errorServices.autoHide(data.message);
    // 	}
    // })
	$scope._or_marriage = {
		"false":"未婚",
		"true":"已婚"
	}
	$scope._posteritie = {
		"NONE":"没有子女",
		"ONE":"1个子女",
		"TWO":"2个子女",
		"THREE":"3个子女",
		"MANY":"4个及以上"
	}
	$scope._or_house = {
		"false":"有",
		"true":"无"
	}
	$scope._or_mortgage = {
		"false":"有",
		"true":"无"
	}
	$scope.$watch("input.orMarriage",function(n,o){
		console.log(n)
	})
    $scope.input = {
        "sex": "",
        "birthday": "",
        "orMarriage": "",
        "posterity": "",
        "orHouse": "",
        "orMortgage": "",
        "education": "",
        "companyScale": "",
        "occupation": "",
        "workYear": "",
        "income": "",
        "secondContract": "",
        "secondContractPhone": "",
        "qq": "",
        "contractname": "",
        "providerId": "",
        "cityId": "",
        "contractAddress": "",
        "contractPhone": "",
        "contractpostcode": ""
    }
    toastServices.show();
    userServices.info.all().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            // $scope.input = angular.extend({}, $scope.input, data.result);
            console.log($scope.input)
        } else {
            errorServices.autoHide("服务器错误");
        }
    })
    $scope.ajaxForm = function(form) {
        // $scope.user =
        settingServices.updateAccount($scope.user).then(function(data) {
            console.log(data)
            if (data.respcode == config.request.SUCCESS && data.result.status == 1) {
                $location.path("/setting").replace();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
}
