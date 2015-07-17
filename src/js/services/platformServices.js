angular.module("VVBank").factory("platformServices", function($rootScope, $window,$route, $location, localStorageService, config) {
    // native webview or browser
    $window.setSource = function(platform) {
        if (platform) {
            $rootScope.isNative = true;
        }
        if (platform == 1) {
            $rootScope.isNativeAndroid = true;
        }
        if (platform == 2) {
            $rootScope.isNativeIOS = true;
        }
        $route.reload();
    }
    return {
        nativeHandle: function() {
            $rootScope.hasNavbarTop = false;
            if ($rootScope.isNativeIOS) {
                this.ios();
            }
            if ($rootScope.isNativeAndroid) {
                this.android();
            }
        },
        ios: function() {

        },
        android: function() {
            // pass url
            android.open($location.$$absUrl, "title");
            // hide navbar bottom
            if ($location.$$path == '/me' || $location.$$path == "/signIn") {
                $rootScope.hasNavbarBottom = false;
            }
        },
        setToken: function() {
            android.getToken(localStorageService.get("token"));
        }
    }
});
