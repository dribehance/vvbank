var billsController = function($scope, myServices, parserServices,toastServices, errorServices, config) {
	toastServices.show();
    myServices.bills().then(function(data) {
    	toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.bills = parserServices.parseBills(data.result)
        } else {
        	toastServices.hide();
            errorServices.autoHide(data.message)
        }
    })
}
