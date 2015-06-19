angular.module("VVBank").factory("toastServices",function(SharedState){
	return {
		show:function(){
			if (!SharedState.isActive("toast_state")) {
				SharedState.turnOn("toast_state");
			}
		},
		hide:function() {
			if (SharedState.isActive("toast_state")) {
				SharedState.turnOff("toast_state");
			}
		}
	}
});