var forgetController = function($scope, $rootScope, $location, $interval,v4userServices, userServices, toastServices, localStorageService, errorServices, SharedState, config) {
    $scope.input = {
    	"verifycode":"",
        "telephone": "",
        "smscode": "",
        "password": "",
        "password_1":""
    };
    // get verifycode
    $scope.getVerifycode = function() {
        userServices.getVerifycode({
            width: 100,
            height: 22
        }).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                $scope.input.verifyimage = data.result.verifycode;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    var timer = $interval(function() {
        if (!$rootScope.signcode) return;
        $scope.getVerifycode();
        $interval.cancel(timer);
    }, 10);
    // counting
    $scope.callbackTimer = {};
    $scope.callbackTimer.counting = 0;
    $scope.callbackTimer.finish = function() {
        $scope.callbackTimer.counting = 0;
        $scope.$apply();
    }
    $scope.callbackTimer.addSeconds = function(seconds) {
        angular.element("#vvcountdown")[0].clear();
        angular.element("#vvcountdown")[0].resume();
        angular.element("#vvcountdown")[0].start();
    }
    $scope.getSmscode = function() {
        userServices.getSmscode($scope.input.telephone, config.smstype.RESET_PASSWORD).then(function(data) {
            if (data.result.status == 1 && data.respcode == config.request.SUCCESS) {
                errorServices.autoHide("验证码发送成功");
            } else {
                errorServices.autoHide(data.message)
            }
        })
        $scope.callbackTimer.counting = 1;
        $scope.callbackTimer.addSeconds(150);
    }
    $scope.nextStep = function() {
        toastServices.show();
        v4userServices.validateVerifycode({
        	verifycode:$scope.input.verifycode
        }).then(function(data){
        	if (data.respcode == config.request.SUCCESS) {
        		return data;
        	}
        	else {
        		errorServices.autoHide(data.message);
        		$scope.getVerifycode();
        		toastServices.hide();
        		return false;
        	}
        }).then(function(data){
        	if (!data) {
        		return;
        	}
        	v4userServices.queryForgetByTelephone({
        		phone:$scope.input.telephone
        	}).then(function(data){
        		if (data.respcode == config.request.SUCCESS) {
        			SharedState.set("forgetStep", 2)
        		}
        		else {
        			errorServices.autoHide(data.message);
        		}
        	})
        })
        // userServices.exist($scope.input.telephone, $scope.input.username).then(function(data) {
        //     toastServices.hide();
        //     if (data.result.status == config.request.EXIST) {
        //         SharedState.set("forgetStep", 2)
        //     } else {
        //         errorServices.autoHide("该手机号还没注册");
        //     }
        // })
    }
    $scope.ajaxForm = function(form) {
        toastServices.show();
        v4userServices.updateSigninPassword({
        	smscode:$scope.input.smscode,
        	pwd:$scope.input.password,
        	telephone:$scope.input.telephone
        }).then(function(data){
        	if (data.respcode == config.request.SUCCESS) {
                localStorageService.set("token", data.result.token);
                $location.path("/signin").replace();
            } else {
                errorServices.autoHide(data.message);
            }
        })
        // userServices.forgetPassword($scope.input.telephone, $scope.input.smscode, $scope.input.password).then(function(data) {
        //     toastServices.hide();
        //     console.log(data)
        //     if (data.respcode == config.request.SUCCESS) {
        //         localStorageService.set("token", data.result.token);
        //         $location.path("/signin").replace();
        //     } else {
        //         errorServices.autoHide(data.message);
        //     }
        // })
    }
}
