var signupController = function($rootScope,$routeParams, $window, $scope, $location, userServices, errorServices, platformServices, SharedState, config, toastServices, localStorageService, signatureServices) {
    $scope.input = {
        telephone: "",
        password: "",
        smscode: "",
        username: "",
        referee: $routeParams.rc || "",
    };
    // bind telephone and password
    $scope.$watch("input.telephone", function(n, o) {
        $scope.input.username = n;
    });
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
    $scope.nextStep = function() {
        toastServices.show();

        userServices.exist($scope.input.telephone, $scope.input.username).then(function(data) {

            toastServices.hide();
            if (data.result.status == config.request.UNEXIST) {
                // SharedState.set("signUpStep", 2)
                return true;
            } else {
                errorServices.autoHide("该手机号已经注册");
                return false;
            }
        }).then(function(d) {
            if(!d) {
                return;
            }
            console.log("checkVerifycode")
            userServices.checkVerifycode({
                verifycode: $scope.input.verifycode
            }).then(function(data) {
                // SharedState.set("signUpStep", 2)
                if (data.respcode == config.request.SUCCESS) {
                    // errorServices.autoHide(data.message);
                    SharedState.set("signUpStep", 2)
                } else {
                    errorServices.autoHide(data.message);
                }
            })
        });
    }
    $scope.getSmscode = function() {
            userServices.getSmscode($scope.input.telephone, config.smstype.SIGNUP).then(function(data) {
                if (data.result.status == 1 && data.respcode == config.request.SUCCESS) {
                    errorServices.autoHide("验证码发送成功");
                } else {
                    errorServices.autoHide(data.message);
                }
            })
            $scope.callbackTimer.counting = 1;
            $scope.callbackTimer.addSeconds(150);
        }
        // error handler
    $scope.errormsg = "";
    // submit handler
    $scope.ajaxForm = function(form) {
        userServices.register($scope.input.telephone, $scope.input.password, $scope.input.username, $scope.input.referee, $scope.input.smscode).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                localStorageService.set("token", data.result.token);
                platformServices.notify();
                $window.location.href = data.result.wapUrl;
                // $location.path("/index").replace();
            } else {
                errorServices.autoHide(data.message);
            }
        });
    }
    $scope.getVerifycode = function() {
        userServices.getVerifycode({
            width: 120,
            height: 46
        }).then(function(data) {
            if(data.respcode == config.request.SUCCESS) {
                $scope.input.verifyimage = data.result.verifycode;
                console.log($scope.input.verifyimage)
            }
            else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.getVerifycode();
}
