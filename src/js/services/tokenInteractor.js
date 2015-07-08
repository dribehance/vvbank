angular.module("VVBank").factory("tokenInterceptor", function($window, $location, $q, localStorageService, toastServices, config) {
    return {
        // optional method
        'request': function(config) {
            // do something on success
            return config;
        },

        // optional method
        'requestError': function(rejection) {
            // do something on error
            // if (canRecover(rejection)) {
            //     return responseOrNewPromise
            // }
            // return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
            // do something on success
            var defer = $q.defer();
            // static response
            if (response.config.url.indexOf(".html") > 0){
            	return response;
            }
            // server response
            if (response.data.respcode == config.request.TOKEN_INVALID ) {
            	console.log("TOKEN_INVALID")
                localStorageService.remove("token");
                $location.path("/signIn").replace();
                return defer.promise;
            }
            else {
            	return response;
            }
            return response;
        },

        // optional method
        'responseError': function(rejection) {
        	console.log("error")
            // do something on error
            // if (canRecover(rejection)) {
            //     return responseOrNewPromise
            // }
            // return $q.reject(rejection);
        }
    }
})
