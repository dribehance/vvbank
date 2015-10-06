// by dribehance <dribehance.kksdapp.com>
var peopleController = function($scope,peopleServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	peopleServices.query().then(function(data){
		toastServices.hide()
		if(data.respcode == config.request.SUCCESS){
			// $scope.peoples = 		
		}
		else {
			errorServices.autoHide(data.message);
		}
	})
}
