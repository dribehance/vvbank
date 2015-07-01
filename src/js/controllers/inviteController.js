var inviteController = function($scope,errorServices,settingServices){
	settingServices.invite().then(function(data){
		console.log(data)
		if (data.respcode == config.request.SUCCESS) {

		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}