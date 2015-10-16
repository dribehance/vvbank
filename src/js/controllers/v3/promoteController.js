// by dribehance <dribehance.kksdapp.com>
var promoteController = function($scope, $rootScope,mallServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "推广";
    toastServices.show();
    mallServices.queryQrcode().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.qrcode_url = data.url;
        } else {
            errorServices.autoHide(data.message);
        }
    })
}
