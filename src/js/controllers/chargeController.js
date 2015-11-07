// by dribehance <dribehance.kksdapp.com>
var chargeController = function($scope,$filter, $location, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.other_bank = {
        bank_name: "其他银行",
        no_agree: "other",
        card_no: "",
        bank_code: "other"
    };
    toastServices.show();
    // chare info;
    userServices.queryChargeInfo().then(function(data) {
        toastServices.hide();
        $scope.charge_info = data;
        $scope.btn_text = data.message;
        if (data.respcode == config.request.SUCCESS && data.type =="1") {
            $scope.charge_bank = data.resultBank;
            $scope.input.bank = $scope.charge_bank[0];
            console.log($scope.input.bank)
            var end_card_no = $filter("limitTo")($scope.input.bank.card_no,-4)
            $scope.input.bank.label = $scope.input.bank.bank_name + " "+end_card_no;
            $scope.btn_text = "充值";
        } else {
            errorServices.autoHide(data.message);
        }
    });
    // query bank info;
    // userServices.queryChargeBankInfo().then(function(data) {
    //     toastServices.hide()
    //     if (data.respcode == config.request.SUCCESS) {
    //         $scope.banks = data.result;
    //         // $scope.banks.push($scope.other_bank);
    //         $scope.banks = $scope.banks.map(function(bank) {
    //             // bank.label = bank.bank_name + " " + bank.card_no;
    //             bank.label = bank.bank_name + " " + bank.card_no;
    //             return bank;
    //         })
    //         $scope.input.bank = $scope.banks[0]
    //     } else {
    //         errorServices.autoHide(data.message);
    //     }
    // })
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.charge({
            "money": $scope.input.money,
            "bank_name": $scope.input.bank.bank_name,
            "bank_code": $scope.input.bank.bank_code,
            "card_no": $scope.input.bank.card_no,
            // "no_agree": $scope.input.bank.no_agree,
            // "type": $scope.input.bank.card_no == "other" ? "N" : "Y",
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                // return data.payParams; 
                $location.path("charge_confirm").search({
                    "req_data": angular.toJson(data.payParams),
                    "charge_balance": data.balance,
                    "charge_money": data.money,
                    "charge_bankname": data.bankName + data.card_no,
                });
            } else {

                errorServices.autoHide(data.message);
                return false;
            }
        })
    }
}
