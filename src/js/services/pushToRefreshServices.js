angular.module("VVBank").factory("pushToRefreshServices",function($rootScope,SharedState){
	return {
		show:function(pushmsg){
			if (!SharedState.isActive("push_state")) {
				SharedState.turnOn("push_state");
				$rootScope.pushmsg = pushmsg;
			}
		},
		hide:function() {
			if (SharedState.isActive("push_state")) {
				SharedState.turnOff("push_state");
			}
		}
	}
});