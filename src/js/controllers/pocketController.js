var pocketController = function($scope,myServices,errorServices,parserServices,config) {
	// pamams page
	myServices.pocket(1).then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			$scope.pocket_groups = parserServices.parsePocket(data.result);
		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}