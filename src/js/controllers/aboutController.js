var aboutController = function($scope,errorServices,settingServices){
	settingServices.about().then(function(data){
		console.log(data)
		if (data.respcode == config.request.SUCCESS) {

		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}