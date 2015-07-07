var meController = function($scope, $rootScope, errorServices, parserServices, userServices, config) {
    userServices.info.account().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            var user = parserServices.parseUser(data.result);
            $rootScope.user.username = user.username;
            $rootScope.user.total = user.total;
            $rootScope.user.frozen = user.frozen;
            $rootScope.user.earning = user.earning;
            console.log($scope.user)
        } else {
            errorServices.autoHide(data.message)
        }
    })
}
