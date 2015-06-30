angular.module("VVBank").factory("errorServices",function($rootScope,$timeout,SharedState){
	return {
		show:function(error){
			SharedState.turnOn("error_state");
			$rootScope.errormsg = error;
		},
		hide:function() {
			SharedState.turnOff("error_state");
		},
		autoHide:function(error) {
			SharedState.turnOn("error_state");
			$rootScope.errormsg = error;
			$timeout(function(){
				SharedState.turnOff("error_state");
			},3000)
		},
		requestError:function(data, status, headers, config) {
			switch (status) {
	            case 500:
	            case 501:
	            case 502:
	            case 503:
	            case 504:
	            case 505:
	            case 506:
	            case 507:
	            case 509:
	            case 510:
	                alert("服务器连接出错");
	                break;
	            default:
	                ;
	        }
	        console.log("onRequestError output status, data, headers, config")
	        console.log(status);
	        console.log(data);
	        console.log(headers)
	        console.log(config);
	        console.log("onRequestError end")
		}
	}
});