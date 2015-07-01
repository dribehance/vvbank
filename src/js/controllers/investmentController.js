var investmentController = function($scope,errorServices,myServices){
	myServices.investment().then(function(data){
		console.log(data)
		if (data.respcode == config.request.SUCCESS) {

		}
		else {
			errorServices.autoHide(data.message)
		}
	})
}