var agreementController = function($scope,agreementServices,errorServices,config){
	$scope.agreement = {
		title:"",
		content:""
	}
	agreementServices.get(config.agreement.USAGE).then(function(data){
		if (data.respcode == data.request.SUCCESS) {
			$scope.agreement.title = data.title;
			$scope.agreement.content = data.content
		}
		else {
			errorServices.autoHide("获取协议失败")
		}
	})
}