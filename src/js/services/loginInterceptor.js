var loginInterceptor = function ($location,$q,userServices) {
	var defer = $q.defer();
	if (userServices.checkAuth()) {
		return true;
	}
	else {
		$location.path("/signIn").replace();
		defer.reject()
	}
	return defer.promise;
}