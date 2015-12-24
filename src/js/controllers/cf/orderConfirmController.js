/**
 * Created by Administrator on 15-12-1.
 */
var orderConfirmController = function($scope, $rootScope,$location, $route, $routeParams, $timeout, cfServices, localStorageService, errorServices, toastServices,config) {
	$scope.is_login = false;
    if (localStorageService.get("token")) {
        $scope.is_login = true;
    }  

    /*$scope.back = function(){
        $location.path("/investment_projects").replace();
    }*/

    $rootScope.nextStepPay = function(orderInfo){
        if (orderInfo.flag) {
            errorServices.autoHide("账户余额不足请前往充值");
            $location.path("/cf_confirm/"+$scope.input.req_data).replace();
            
            /*toastServices.show();
            cfServices.checkPwd($scope.input.password).then(function(data){
                toastServices.hide();
                if (data.respcode == config.request.SUCCESS) {
                    $("#payForm").attr("action", "https://yintong.com.cn/llpayh5/authpay.htm").submit();
                }else{
                    errorServices.autoHide(data.message);   
                }
            });*/
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

    $scope.nextStepHide=function(){
        $(".order_progress").css('marginTop','-81px');
    }
    $scope.nextStepShow=function(){
        $(".order_progress").css('marginTop','0px');
    }


	
}
