var vvbank = angular.module("VVBank", [
        "ngRoute",
        "mobile-angular-ui",
        "mobile-angular-ui.core.capture",
        "mobile-angular-ui.core.activeLinks",
        "mobile-angular-ui.core.sharedState",
        "wrapOwlcarousel",
        "flow",
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when("/index", {
            templateUrl: "home.html",
            reloadOnSearch: false,
            controller: indexController
        })
        .when("/licai", {
            templateUrl: "licai.html",
            reloadOnSearch: false,
            controller: licaiController
        })
        .when("/me", {
            templateUrl: "me.html",
            reloadOnSearch: false,
            controller: meController
        })
        .when("/signIn", {
            templateUrl: "signIn.html",
            reloadOnSearch: false
        })
        .when("/signUp", {
            templateUrl: "signUp.html",
            reloadOnSearch: false
        })
        .when("/forget", {
            templateUrl: "forget.html",
            reloadOnSearch: false
        })
        .when("/investment",{
            templateUrl: "me/investment.html",
            reloadOnSearch: false,
        })
        .when("/bills",{
            templateUrl: "me/bills.html",
            reloadOnSearch: false,
        })
        .when("/activities",{
            templateUrl: "me/activities.html",
            reloadOnSearch: false,
        })
        .when("/eyuan",{
            templateUrl: "me/eyuan.html",
            reloadOnSearch: false,
        })
        .when("/pocket",{
            templateUrl: "me/pocket.html",
            reloadOnSearch: false,
        })
        .when("/message",{
            templateUrl: "me/message.html",
            reloadOnSearch: false,
        })
        .when("/account-setting",{
            templateUrl: "me/account-setting.html",
            reloadOnSearch: false,
            controller: accountSettingController
        })
        .when("/safety-setting",{
            templateUrl: "me/safety-setting.html",
            reloadOnSearch: false,
        })
        .when("/bank-cards",{
            templateUrl: "me/bank-cards.html",
            reloadOnSearch: false,
            controller: bankCardsController
        })
        .when("/add-bank",{
            templateUrl: "me/add-bank.html",
            reloadOnSearch: false,
            controller: addBankController
        })
        .when("/invite",{
            templateUrl: "me/invite.html",
            reloadOnSearch: false,
        })
        .when("/question",{
            templateUrl: "me/question.html",
            reloadOnSearch: false,
        })
        .when("/about",{
            templateUrl: "me/about.html",
            reloadOnSearch: false,
        })
        .when("/name-authen",{
            templateUrl: "me/name-authen.html",
            reloadOnSearch: false,
        })
        .when("/charge",{
            templateUrl: "charge.html",
            reloadOnSearch: false,
            controller: chargeController
        })
        .when("/update-trade-psd",{
            templateUrl: "me/update-trade-psd.html",
            reloadOnSearch: false,
            controller: updateTradePsdController
        })
        .when("/update-signin-psd",{
            templateUrl: "me/update-signin-psd.html",
            reloadOnSearch: false,
            controller: updateSigninPsdController
        })
        .when("/cash",{
            templateUrl: "cash.html",
            reloadOnSearch: false,
            controller: cashController
        })
        .when("/setting",{
            templateUrl: "setting.html",
            reloadOnSearch: false,
        })
        .when("/", {
            templateUrl: "home.html",
            reloadOnSearch: false,
            controller: indexController
        });
    }).run(function($rootScope, $window, $sce, _EventHandler) {
        // $rootScope.slide = 'fadeIn';
        // $rootScope.host = "http://218.85.137.242:8080/";
        // $rootScope.bannerHost = "http://218.85.137.242:8080/upload/";
        // $rootScope.IMG_PATH=$rootScope.host+"upload/picture/";
        // $rootScope.PERSON_IMG_PATH=$rootScope.host+"upload/person/";
        _EventHandler.enableProgress();
        $rootScope.back = function() {
            $window.history.back();
        }
    });
// EventHandle
vvbank.factory("_EventHandler", function($rootScope, $location, $route,SharedState) {
    var onBackKeyDown = function() {
        document.addEventListener("backbutton", onBackKeyDownHandler, false);
    }
    var onBackKeyDownHandler = function(e) {
        $rootScope.$apply(function() {
            $rootScope.back();
        });
    }
    var onRequestError = function(data, status, headers, config) {
        switch (status) {
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 505:
            case 506:
            case 507:
            case 509:
            case 510:
                alert("服务器连接出错");
                break;
            default:
                ;
        }
        console.log("onRequestError output status, data, headers, config")
        console.log(status);
        console.log(data);
        console.log(headers)
        console.log(config);
        console.log("onRequestError end")
    }
    var enableProgress = function() {
        $rootScope.$on("$routeChangeStart", loading);
        $rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
    }
    var routeChangeSuccess = function (e,currentRoute,prevRoute) {
        loaded(e,currentRoute,prevRoute);
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
    var loading = function(e, currentRoute, prevRoute) {
        console.log("route change start")
        if (currentRoute.$$route && currentRoute.$$route.resolve) {
            $rootScope.cancelLoading = false;
        }
        // angular.element(".loading").unbind("click").bind("click", function() {
        //     $rootScope.$emit("cancelRequest");
        //     $rootScope.$apply(function() {
        //         $rootScope.cancelLoading = true;
        //     });
        // });
        
    }
    var loaded = function(e, currentRoute, prevRoute) {
        console.log("route change success")
        $rootScope.cancelLoading = true;
    }
    return {
        "onBackKeyDown": onBackKeyDown,
        "onRequestError": onRequestError,
        "enableProgress": enableProgress
    }
});
// sync data from server 
vvbank.factory("_VVBankModal", ["$rootScope", "$http", "$q", "$route", "_EventHandler", function($rootScope, $http, $q, $route, _EventHandler) {
    var vvbankhttp = {
            fetch: function(method, url) {
                var url = url,
                    method = method;
                // for local data test use
                if (url.split("local://").length > 1) {
                    url = url.split("local://")[1];
                } else {
                    url = $rootScope.host + url;
                }
                return function() {
                    // query as param
                    return function(query) {
                        var canceler = $q.defer(),
                            param = "";
                        //  param process ,such as {}
                        if (query && !angular.element.isEmptyObject(query)) {
                            for (key in query) {
                                param += key + "=" + query[key] + "&";
                            }
                            param = param.substring(0, param.length - 1);
                        }
                        url = url.split("?")[0];
                        // handle get request
                        if (method == "get" || method == "GET") {
                            if (param) {
                                url = url + "?" + param;
                            }
                            var promise = $http({
                                method: "GET",
                                url: url,
                                cache: true,
                                timeout: canceler.promise
                            });
                        }
                        // handle post request
                        else if (method == "post" || method == "POST") {
                            var promise = $http({
                                method: "POST",
                                url: url,
                                data: data,
                                cache: true,
                                timeout: canceler.promise
                            });
                        }
                        // promise success/error handle
                        promise.success(function(data, status, headers, config) {
                            console.log("promise success")
                            $rootScope.loaded = true;
                            canceler.no
                            return data;
                        }).error(function(data, status, headers, config) {
                            canceler.resolve("ERROR");
                            _EventHandler.onRequestError(data, status, headers, config);
                        });

                        $rootScope.$on("cancelRequest", function() {
                            console.log("user cancel");
                            canceler.reject("CANCEL");
                        })
                        return promise;
                    }
                }
            }
        }
        // if post,at least {} pass as paramter
    vvbankhttp.getBanners = vvbankhttp.fetch("GET", "app/Banner/all");
    // interface to expose
    var vvbankModal = {

    };

    return vvbankModal;
}]);
