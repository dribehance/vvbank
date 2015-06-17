angular.module("VVBank").factory("toastServices",function(SharedState){
	return {
		showLoader:function(){
			if (!SharedState.isActive("toast_state")) {
				SharedState.turnOn("toast_state");
			}
		},
		hideLoader:function() {
			if (SharedState.isActive("toast_state")) {
				SharedState.turnOff("toast_state");
			}
		}
	}
});