// by dribehance <dribehance.kksdapp.com>
var chargeController = function($scope, $location, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    toastServices.show();
    userServices.queryChargeInfo().then(function(data) {
        toastServices.hide()
        $scope.btn_text = data.message;
        if (data.respcode == config.request.SUCCESS) {
            // $scope.charge_info = data.result;
            // $scope.input.bank = $scope.charge_info[0];
            $scope.btn_text = "充值";
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.charge({
            // "bankName": $scope.input.bank.bankName,
            "money": $scope.input.money,
            // "bankCode": $scope.input.bank.bankCode
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                // return data.payParams; 
                $location.path("charge_confirm").search({
                    "req_data": angular.toJson(data.payParams),
                    "charge_balance":data.balance,
                    "charge_money":data.money,
                    // "charge_bankname":data.bankName,
                });
            } else {

                errorServices.autoHide(data.message);
                return false;
            }
        })
    }
}
