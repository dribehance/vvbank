var tokenInterceptor = function ($location,$q,userServices,localStorageService) {
	var token = localStorageService.cookie.get("token");
	return userServices.token(token).then(function(data){
		console.log("sss")
		localStorageService.cookie.set("token",data.result.token)
	})
}