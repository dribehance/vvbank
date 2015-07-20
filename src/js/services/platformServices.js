angular.module("VVBank").factory("platformServices", function($rootScope, $window, $route, $location, localStorageService, config) {
    $window.toggle = function() {
        $rootScope.$apply(function() {
            $rootScope.hasNavbarBottom = !$rootScope.hasNavbarBottom;
        })
    }
    return {
        isNative: function() {
            var ua = $window.navigator.userAgent.toLowerCase();
            if (ua.indexOf("vvandroid") != -1) {
                return true;
            }
            return false;
        },
        nativeHandle: function() {
            if (!this.isNative()) {
                return;
            }
            // navbar handle
            $rootScope.navbar = {
                top: true,
                bottom: true
            }
            // route change
            $rootScope.$on("$routeChangeSuccess", function() {
                if ($location.$$path == "/me") {
                    $rootScope.navbar.top = false;
                }
                else {
                    $rootScope.navbar.top = true;
                }
                $rootScope.navbar.bottom = false;
            });
            // back
            $rootScope.back = this.nativeBack;
        },
        nativeBack: function() {
            android.mygoBack();
        },
        setToken: function() {
            android.getToken(localStorageService.get("token"));
        }
    }
});
