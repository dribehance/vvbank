var agreementController = function($scope,agrrementServices,errorServices,config){
	$scope.agreement = {
		title:"",
		content:""
	}
	agrrementServices.get(config.agreement.USAGE).then(function(data){
		if (data.respcode == data.request.SUCCESS) {
			$scope.agreement.title = data.title;
			$scope.agreement.content = data.content
		}
		else {
			errorServices.autoHide("获取协议失败")
		}
	})
}