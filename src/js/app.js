var vvbank = angular.module("VVBank", [
  "ngRoute",
  "mobile-angular-ui",
  "mobile-angular-ui.core.capture",
  "mobile-angular-ui.core.activeLinks",
  "wrapOwlcarousel",
])
.config(function($routeProvider) {
	$routeProvider.when("/", {templateUrl:"home.html",  reloadOnSearch: false});
  	$routeProvider.when("/index", {templateUrl:"home.html",  reloadOnSearch: false});
  	$routeProvider.when("/licai", {templateUrl:"licai.html",  reloadOnSearch: false});
  	$routeProvider.when("/me", {templateUrl:"me.html",  reloadOnSearch: false});
    $routeProvider.when("/signIn", {templateUrl:"signIn.html",  reloadOnSearch: false});
    $routeProvider.when("/signUp", {templateUrl:"signUp.html",  reloadOnSearch: false});
    $routeProvider.when("/forget", {templateUrl:"forget.html",  reloadOnSearch: false});
}).run(function($rootScope,$window,$sce,_EventHandler){
        // $rootScope.slide = 'fadeIn';
        // $rootScope.host = "http://218.85.137.242:8080/";
        // $rootScope.bannerHost = "http://218.85.137.242:8080/upload/";
        // $rootScope.IMG_PATH=$rootScope.host+"upload/picture/";
        // $rootScope.PERSON_IMG_PATH=$rootScope.host+"upload/person/";
        $rootScope.back = function() {
            $window.history.back();
        }
});
// EventHandle
vvbank.factory("_EventHandler",function($rootScope,$location,$route){
    var onBackKeyDown = function() {
        document.addEventListener("backbutton", onBackKeyDownHandler, false);
    }
    var onBackKeyDownHandler = function (e) {
        $rootScope.$apply(function(){
            $rootScope.back(); 
        }); 
    }
    var onRequestError = function( data, status, headers, config ) {
        switch( status ) {
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
            default:;
        }
        console.log("onRequestError output status, data, headers, config")
        console.log(status);
        console.log(data);
        console.log(headers)
        console.log(config);
        console.log("onRequestError end")
    }
    var onProgress = function () {
        $rootScope.$on("$routeChangeStart",loading);
        $rootScope.$on("$routeChangeSuccess",loaded);
    }
    var loading = function (e,currentRoute,prevRoute) {
        console.log("route change start")
        if (currentRoute.$$route && currentRoute.$$route.resolve) {
            $rootScope.cancelLoading = false;
        }
        angular.element(".loading").unbind("click").bind("click",function(){
            $rootScope.$emit("cancelRequest");
            $rootScope.$apply(function(){
                $rootScope.cancelLoading = true;
            });
        });
    }
    var loaded = function(e,currentRoute,prevRoute) {
            console.log("route change success")
            $rootScope.cancelLoading = true;
    }
    return {
        "onBackKeyDown":onBackKeyDown,
        "onRequestError":onRequestError,
        "onProgress":onProgress
    }
});
// sync data from server 
vvbank.factory("_VVBankModal",["$rootScope","$http","$q","$route","_EventHandler",function($rootScope,$http,$q,$route,_EventHandler){
    var vvbankhttp = {
        fetch: function(method,url) {
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
                    if (query && !angular.element.isEmptyObject(query) ) {
                        for (key in query){
                            param += key+"="+query[key]+"&";
                        }
                        param = param.substring(0,param.length-1);
                    }
                    url = url.split("?")[0];
                    // handle get request
                    if (method == "get" || method == "GET") {
                        if (param) {
                            url = url + "?" + param;
                        }
                        var promise = $http({method:"GET",url:url,cache:true,timeout:canceler.promise});
                    } 
                    // handle post request
                    else if (method == "post" || method == "POST") {
                        var promise = $http({method:"POST",url:url,data:data,cache:true,timeout:canceler.promise});
                    }
                    // promise success/error handle
                    promise.success(function(data,status,headers,config){
                        console.log("promise success")
                        $rootScope.loaded = true;
                        canceler.no
                        return data;
                    }).error(function (data, status,headers,config) {
                    	canceler.resolve("ERROR");
                        _EventHandler.onRequestError(data,status,headers,config);
                    });

                    $rootScope.$on("cancelRequest",function(){
                        console.log("user cancel");
                        canceler.reject("CANCEL");
                    })
                    return promise;
                }
            }
        }
    }
    // if post,at least {} pass as paramter
    vvbankhttp.getBanners = vvbankhttp.fetch("GET","app/Banner/all");
    // interface to expose
    var vvbankModal = {
        
    };

    return vvbankModal;
}]);
