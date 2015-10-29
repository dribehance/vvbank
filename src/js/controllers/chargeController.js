// by dribehance <dribehance.kksdapp.com>
var chargeController = function($scope,userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.queryChargeInfo().then(function(data){
		toastServices.hide()
		if(data.respcode == config.request.SUCCESS) {
			$scope.charge_info = data.result;
			$scope.input.bank = $scope.charge_info[0];
		}
		else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.ajaxForm = function () {
		toastServices.show();
		userServices.charge({
			"bankName":$scope.input.bank.bankName,
			"money":$scope.input.money,
			"bankCode":$scope.input.bank.bankCode
		}).then(function(data){
			toastServices.hide()
			if(data.respcode == config.request.SUCCESS) {
				return data.payParams;	
			}
			else {
				errorServices.autoHide(data.message);
				return false;
			}
		}).then(function(data){
			console.log(data);
			if (data) {
				userServices.thirdpartCharge(data)
			}
		})
	}
}
