var cashController = function($scope, $rootScope, $location, $filter, userServices, toastServices, parserServices, settingServices, $location, errorServices, myServices, config) {
    $scope.input = {
        money: "",
        total_fee: "0"
    };
    toastServices.show();
    userServices.queryCashInfo().then(function(data) {
        toastServices.hide()
            // if(data.respcode == "1") {
        if (data.respcode == config.request.SUCCESS) {
            $scope.cash_info = data;
            $scope.banks = data.result;
            $scope.banks = $scope.banks.map(function(bank) {
                bank.bankInfo = decodeURIComponent(bank.bankInfo);
                return bank;
            })
            $scope.input.bank = $scope.banks[0];
        } else {
            errorServices.autoHide(data.message);
        }
    })
    $scope.ajaxForm = function() {
        $location.path("cash_confirm").search({
            "withdrawMoneyHidden": $scope.queryActuralMoney(),
            "antiWithdrawMoneyHidden": parseFloat($filter("currency")(($scope.cash_info.fee2 / $scope.cash_info.feeRate),"")),
            "fee": $scope.input.total_fee - $scope.cash_info.fee2 - $scope.use_bonus,
            "fee2": $scope.cash_info.fee2,
            "voucher": $scope.use_bonus,
            "selectID": $scope.input.bank.bankId
        });
    };
    $scope.queryFee = function() {
        var number_reg = /[0-9]$/;
        if (!number_reg.test($scope.input.money)) {
            // errorServices.autoHide("金额不合法")
            return "0";
        }
        $scope.input.total_fee = 0;
        $scope.cash_info.fee2 = 0; //未投资部分金额所需手续费;
        var cashable = $scope.cash_info.balance - $scope.cash_info.antiWithdraw;
        var flag = cashable - $scope.input.money;
        if (flag > 0 || flag == 0) {
            return $scope.input.total_fee = 2;
        }
        $scope.cash_info.fee2 = parseFloat($filter("currency")(-flag * $scope.cash_info.feeRate, ""));
        $scope.input.total_fee = 2 + $scope.cash_info.fee2;
        return $scope.input.total_fee;
    }
    $scope.queryActuralMoney = function() {
        var number_reg = /[0-9]$/;
        if (!number_reg.test($scope.input.money)) return "0";
        var bonus_flag = $scope.cash_info.voucher - 2;
        $scope.use_bonus = 0;
        if (bonus_flag > 0 || bonus_flag == 0) {
            $scope.use_bonus = 2;
        } else {
            $scope.use_bonus = -$scope.use_bonus;
        }
        return $scope.input.money - $scope.input.total_fee + $scope.use_bonus;
    }
    $scope.parsePercentage = function(value) {
        return value * 100;
    };
}
