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

        // navbar top
        if ($location.path() == "/me" || $location.path() == "/index") {
            // SharedState.turnOff("navbarTop");
            $rootScope.navbar.top = false;
        } else {
            // SharedState.turnOn("navbarTop");
            $rootScope.navbar.top = true;
        }
        // navbar bottom
        // if ($location.path().toString().indexOf("/licai/") == 0) {
        //     $rootScope.navbar.bottom = true;
        //     return;
        // }
        var _navbars_b = ["/index", "/licai", "/me", "/", "/signIn"];
        if (!_navbars_b.contains($location.path())) {
            // SharedState.turnOff("navbarBottom");
            $rootScope.navbar.bottom = false;
        } else {
            // SharedState.turnOn("navbarBottom");
            $rootScope.navbar.bottom = true;
        }
        // always hide navbar bottom
        $rootScope.navbar.bottom = false;
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
                    top:true,
                    bottom:true
                }
                // android backkey
                document.addEventListener("backbutton", onBackKeyDown, false);
                // manual back control
                $rootScope.back = function() {
                    $window.history.back();
                }
            }
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
            if ($location.$$host == "localhost" || $location.$$host == "192.168.1.100") {
                $rootScope.staticImageUrl = "/";
            } else {
                $rootScope.staticImageUrl = "/resources/app/";
            }
            if (localStorageService.get("token")) {
                userServices.info.basic().then(function(data) {
                    if (data.respcode == config.request.SUCCESS) {
                        $rootScope.user = parserServices.parseUser(data.result);
                    } else {
                        errorServices.autoHide()
                    }
                    if (data.respcode == config.request.TOKEN_INVALID) {
                        localStorageService.cookie.remove("token");
                    }
                })
            }
        }
    }
});
