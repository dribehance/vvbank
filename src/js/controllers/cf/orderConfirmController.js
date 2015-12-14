/**
 * Created by Administrator on 15-12-1.
 */
var orderConfirmController = function($scope, $rootScope,$location, $route, $routeParams, $timeout, cfServices, localStorageService, errorServices, toastServices,config) {
	$scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  

    $scope.nextStepPay = function(orderInfo){
        if (orderInfo.flag) {
            toastServices.show();
            cfServices.checkPwd($scope.input.password).then(function(data){
                toastServices.hide();
                if (data.respcode == config.request.SUCCESS) {
                    $("#payForm").attr("action", "https://yintong.com.cn/llpayh5/authpay.htm").submit();
                }else{
                    errorServices.autoHide(data.message);   
                }
            });
        }else{
            //优租包订单
            var params = {
                appliedId : orderInfo.appliedId,
                pwd : $scope.input.password
            }
            toastServices.show();
            cfServices.nextStepPay(params).then(function(data){
                toastServices.hide();
                if (data.respcode == config.request.SUCCESS) {
                    errorServices.autoHide(data.message);
                    $rootScope.rewardPay = data.result;
                        $location.path("/crowdFund/pay/success").replace();
                }else{
                    errorServices.autoHide(data.message);
                }
            });
        }
    }

    /*$scope.nextStepPay = function(appliedId){
        //优租包订单
        var params = {
        	appliedId : appliedId,
        	pwd : $scope.input.password
        }
        toastServices.show();
    	cfServices.nextStepPay(params).then(function(data){
    		toastServices.hide();
        	if (data.respcode == config.request.SUCCESS) {
        		errorServices.autoHide(data.message);
        		$rootScope.rewardPay = data.result;
                    $location.path("/crowdFund/pay/success").replace();
	        }else{
    	        errorServices.autoHide(data.message);
        	}
    	});
    }

    $scope.nextBtnPay = function(){
    	toastServices.show();
    	cfServices.checkPwd($scope.input.password).then(function(data){
    		toastServices.hide();
    		if (data.respcode == config.request.SUCCESS) {
    			$("#payForm").submit();
    		}else{
    			errorServices.autoHide(data.message);	
    		}
    	});
    }*/


	
}
