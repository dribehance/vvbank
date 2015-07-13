var meController = function($scope, $rootScope, errorServices,toastServices, parserServices, userServices, config) {
    // toastServices.show();
    userServices.info.account().then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            var user = parserServices.parseUser(data.result);
            $rootScope.user.username = user.username;
            $rootScope.user.total = user.total;
            $rootScope.user.frozen = user.frozen;
            $rootScope.user.earning = user.earning;
        } else {
            toastServices.hide();
            errorServices.autoHide(data.message)
        }
    })
}
