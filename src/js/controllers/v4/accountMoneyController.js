// by dribehance <dribehance.kksdapp.com>
var accountMoneyController = function($scope, myServices, errorServices, toastServices, localStorageService, config) {
    toastServices.show();
    myServices.accountMoney().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.money = data.result;
        } else {
            errorServices.autoHide("服务器错误");
        }
    })
}
