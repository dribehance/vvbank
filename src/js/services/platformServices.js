angular.module("VVBank").factory("platformServices", function($rootScope, $window, $route, $location, localStorageService, config) {
    $window.connectWebViewJavascriptBridge = function(callback) {
        if ($window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }
    return {
        isAndroid:function(){
            var ua = $window.navigator.userAgent.toLowerCase();
            if (ua.indexOf("vvandroid") != -1) {
                return true;
            }
            return false;
        },
        isIos:function(){
            var ua = $window.navigator.userAgent.toLowerCase();
            if (ua.indexOf("vvios") != -1) {
                return true;
            }
            return false;
        },
        isNative: function() {
            if (this.isAndroid() || this.isIos()) {
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
            if (this.isAndroid()) {
                $rootScope.back = this.androidBack;
            }
            if (this.isIos()) {
                $rootScope.back = this.iosBack;
            }
        },
        androidBack: function() {
            android.mygoBack();
        },
        iosBack:function(){
            $window.connectWebViewJavascriptBridge(function(bridge){
                bridge.send("ios_back",function(data){
                    console.log("ios back");
                });
            });
        },
        setToken: function() {
            android.getToken(localStorageService.get("token"));
        }
    }
});
