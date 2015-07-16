// EventHandle
angular.module("VVBank").factory("appServices", function($rootScope, $location, $interval, $window, SharedState,localStorageService, signatureServices, errorServices, userServices,parserServices, toastServices, config) {
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
        if ($location.path() == "/me") {
            // SharedState.turnOff("navbarTop");
            $rootScope.hasNavbarTop = false;
        } else {
            // SharedState.turnOn("navbarTop");
            $rootScope.hasNavbarTop = true;
        }
        // navbar bottom
        if ($location.path().toString().indexOf("/licai/") == 0) {
            $rootScope.hasNavbarBottom = true;
            return;
        }
        var _navbars_b = ["/index", "/licai", "/me", "/","/signIn"];
        if (!_navbars_b.contains($location.path())) {
            // SharedState.turnOff("navbarBottom");
            $rootScope.hasNavbarBottom = false;
        } else {
            // SharedState.turnOn("navbarBottom");
            $rootScope.hasNavbarBottom = true;
        }

    }
    var onBackKeyDown = function() {
        $rootScope.$apply(function() {
            $rootScope.back();
        });
    }
    return {
        init: function() {
            // handle android backkeydown
            document.addEventListener("backbutton", onBackKeyDown, false);
            // rootScope binding
            $rootScope.$on("$routeChangeStart", routeChangeStart);
            $rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
            $rootScope.back = function() {
                $window.history.back();
            }
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
            if ($location.$$host == "localhost") {
                $rootScope.staticImageUrl = "/";
            }
            else {
                $rootScope.staticImageUrl = "/app/";
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
