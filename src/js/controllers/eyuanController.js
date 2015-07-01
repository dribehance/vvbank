var eyuanController = function($scope,myServices,errorServices,parserServices,config) {
	myServices.eyuan(1).then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			$scope.eyuan_groups = parserServices.parseEyuan(data.result);
		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}