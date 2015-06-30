var meController = function($scope,errorServices,parserServices,userServices,config){
	userServices.info.account().then(function(data){
		if (data.respcode == config.request.SUCCESS) {
			console.log(data)
		}
		else {
			errorServices.autoHide(data.message)
		}
	})	
}