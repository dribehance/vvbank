// EventHandle
angular.module("VVBank").factory("appServices", function($rootScope, $location, $interval, $window, platformServices, SharedState, localStorageService, signatureServices, errorServices, userServices, parserServices, toastServices, config) {

    var routeChangeStart = function(e) {
        // userServices.checkAuth();
    }
    var routeChangeSuccess = function(e, currentRoute, prevRoute) {
        toastServices.hide();
        errorServices.hide();
        navBarHandler(e, currentRoute, prevRoute);
    }
    var navBarHandler = function(e, currentRoute, prevRoute) {

        // always hide all navbar top
        $rootScope.navbar.top = false;
        // var _navbars_t = ["eyuan_mall"];

        // if (_navbars_t.contains($location.path().split("/")[1])) {
        //     $rootScope.navbar.top = true;
        // }
        // else {
        //     $rootScope.navbar.top = false;
        // }
        // navbar bottom 
        var _navbars_b = ["/index", "/investment_projects", "/eyuan_mall", "/", "/me"];
        if (!_navbars_b.contains($location.path())) {
            $rootScope.navbar.bottom = false;
        } else {
            $rootScope.navbar.bottom = true;
        }
    }
    var onBackKeyDown = function() {
        $rootScope.$apply(function() {
            $rootScope.back();
        });
    }
    return {
        init: function() {
            // native app handle
            platformServices.nativeHandle();
            // handle android browser backkeydown
            if (!platformServices.isNative()) {
                // rootScope binding
                $rootScope.$on("$routeChangeStart", routeChangeStart);
                $rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
                $rootScope.navbar = {
                    top: false,
                    bottom: true
                };
                // android backkey
                document.addEventListener("backbutton", onBackKeyDown, false);
                // manual back control
                $rootScope.back = function() {
                    $window.history.back();
                }
            };
            // token expired
            $interval(function() {
                userServices.token();
            }, 1000 * 60 * 25);
            // each time startup the app get signature from server
            signatureServices.getSigncode().then(function(data) {
                if (data.respcode == config.request.SUCCESS) {
                    $rootScope.signcode = data.result.signcode;
                }
            });
            // each time startup the app fetch the user info
            $rootScope.user = {};
            // static image url handle
            if ($location.$$host == "localhost" || $location.$$host == "192.168.1.118") {
                $rootScope.staticImageUrl = "/";
            } else {
                $rootScope.staticImageUrl = "/resources/app/";
            }
            localStorageService.set("token","e9f9d15687ad1194cf7aab9470e87ba5_18219351089")
            if (localStorageService.get("token")) {
                // userServices.info.basic().then(function(data) {
                //     if (data.respcode == config.request.SUCCESS) {
                //         $rootScope.user = angular.extend({}, parserServices.parseUser(data.result));
                //     } else {
                //         errorServices.autoHide(data.message)
                //     }
                //     if (data.respcode == config.request.TOKEN_INVALID) {
                //         localStorageService.cookie.remove("token");
                //     }
                // });
                userServices.info.account().then(function(data) {
                    if (data.respcode == config.request.SUCCESS) {
                        $rootScope.user = angular.extend({}, $rootScope.user, parserServices.parseUser(data.result));
                    } else {
                        errorServices.autoHide(data.message)
                    }
                })
            }
        }
    }
});
