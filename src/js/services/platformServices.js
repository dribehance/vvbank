angular.module("VVBank").factory("platformServices", function($rootScope, $window,$route, $location, localStorageService, config) {
    return {
        isNative: function() {
            var ua = $window.navigator.userAgent.toLowerCase();
            if( ua.indexOf("vvandroid") != -1) {
                return true;
            }
            return false;
        },
        nativeHandle: function() {
            if (!this.isNative()) {
                return;
            }
            // navbar handle
            $rootScope.hasNavbarTop = true;
            $rootScope.hasNavbarBottom = false;
            // back
            $rootScope.back = this.nativeBack;
        },
        nativeBack:function() {
            android.mygoBack();
        },
        setToken: function() {
            android.getToken(localStorageService.get("token"));
        }
    }
});
