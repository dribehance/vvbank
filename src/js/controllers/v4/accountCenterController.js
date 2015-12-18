// by dribehance <dribehance.kksdapp.com>
var accountCenterController = function($scope,myServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	myServices.account.query().then(function(data){
		toastServices.hide()
		if(data.respcode == config.request.SUCCESS) {
			$scope.account = data.result;		
		}
		else {
			errorServices.autoHide("服务器错误");
		}
	})
}
