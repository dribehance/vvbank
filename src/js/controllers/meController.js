var meController = function($scope, $rootScope, mallServices, SharedState, errorServices, toastServices, parserServices, userServices, config) {
    // toastServices.show();
    userServices.info.account().then(function(data) {
        toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $rootScope.user = angular.extend({}, $rootScope.user, parserServices.parseUser(data.result));
        } else {
            toastServices.hide();
            errorServices.autoHide(data.message)
        }
    });
    // show qrcode
    $scope.queryQrcode = function() {
        toastServices.show();
        mallServices.queryQrcode().then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                SharedState.turnOn("qrcode_panel");
                $scope.qrcode_url = data.url;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
}
