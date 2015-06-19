// EventHandle
angular.module("VVBank").factory("appServices", function($rootScope,$location,$window,SharedState,signatureServices,errorServices,toastServices,config) { 
    var routeChangeStart = function() {
        toastServices.hide();
    }
    var routeChangeSuccess = function (e,currentRoute,prevRoute) {
        navBarHandler(e,currentRoute,prevRoute);
    }
    var navBarHandler = function (e,currentRoute,prevRoute) {
        // navbar top
        if ($location.path() == "/me") {
            // SharedState.turnOff("navbarTop");
            $rootScope.hasNavbarTop = false;
        }
        else {
            // SharedState.turnOn("navbarTop");
            $rootScope.hasNavbarTop = true;
        }
        // navbar bottom
        var _navbars_b = ["/index","/licai","/me","/"];
        if (!_navbars_b.contains($location.path())) {
            // SharedState.turnOff("navbarBottom");
            $rootScope.hasNavbarBottom = false;
        }
        else {
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
        init:function() {
            // handle android backkeydown
            document.addEventListener("backbutton", onBackKeyDown, false);
            // rootScope binding
            $rootScope.$on("$routeChangeStart", routeChangeStart);
            $rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
            $rootScope.back = function() {
                $window.history.back();
            }
            // each time startup the app get signature from server
            signatureServices.getSigncode().then(function(data){
                if ( data.respcode == config.request.SUCCESS ) {
                    $rootScope.signcode = data.result.signcode;
                }
            });
        }
    }
});