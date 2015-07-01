var questionsController = function($scope,errorServices,settingServices){
	settingServices.questions().then(function(data){
		console.log(data)
		if (data.respcode == config.request.SUCCESS) {

		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}