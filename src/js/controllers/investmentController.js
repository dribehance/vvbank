var investmentController = function($scope, errorServices, myServices,toastServices, parserServices, config) {
	toastServices.show();
    myServices.investment().then(function(data) {
    	toastServices.hide();
        if (data.respcode == config.request.SUCCESS) {
            $scope.investments = parserServices.parseInvestments(data.result);
        } else {
        	toastServices.hide();
            errorServices.autoHide(data.message)
        }
    })
}
