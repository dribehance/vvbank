var activitiesController = function($scope,errorServices,myServices) {
	myServices.activities().then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			// $scope.activities = 
		}
		else {
			errorServices.autoHide(data.message)
		}
	});
}