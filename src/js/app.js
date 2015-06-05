angular.module("VVBank", [
    "ngRoute",
    "mobile-angular-ui",
    "mobile-angular-ui.core.capture",
    "mobile-angular-ui.core.activeLinks",
    "mobile-angular-ui.core.sharedState",
    "wrapOwlcarousel",
    "flow",
    "timer",
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
            reloadOnSearch: false,
            controller: signinController
        })
        .when("/signUp", {
            templateUrl: "signUp.html",
            reloadOnSearch: false,
            controller: signupController
        })
        .when("/forget", {
            templateUrl: "forget.html",
            reloadOnSearch: false
        })
        .when("/investment", {
            templateUrl: "me/investment.html",
            reloadOnSearch: false,
        })
        .when("/bills", {
            templateUrl: "me/bills.html",
            reloadOnSearch: false,
        })
        .when("/activities", {
            templateUrl: "me/activities.html",
            reloadOnSearch: false,
        })
        .when("/eyuan", {
            templateUrl: "me/eyuan.html",
            reloadOnSearch: false,
        })
        .when("/pocket", {
            templateUrl: "me/pocket.html",
            reloadOnSearch: false,
        })
        .when("/message", {
            templateUrl: "me/message.html",
            reloadOnSearch: false,
        })
        .when("/account-setting", {
            templateUrl: "me/account-setting.html",
            reloadOnSearch: false,
            controller: accountSettingController
        })
        .when("/safety-setting", {
            templateUrl: "me/safety-setting.html",
            reloadOnSearch: false,
        })
        .when("/bank-cards", {
            templateUrl: "me/bank-cards.html",
            reloadOnSearch: false,
            controller: bankCardsController
        })
        .when("/add-bank", {
            templateUrl: "me/add-bank.html",
            reloadOnSearch: false,
            controller: addBankController
        })
        .when("/invite", {
            templateUrl: "me/invite.html",
            reloadOnSearch: false,
        })
        .when("/question", {
            templateUrl: "me/question.html",
            reloadOnSearch: false,
        })
        .when("/about", {
            templateUrl: "me/about.html",
            reloadOnSearch: false,
        })
        .when("/name-authen", {
            templateUrl: "me/name-authen.html",
            reloadOnSearch: false,
        })
        .when("/charge", {
            templateUrl: "charge.html",
            reloadOnSearch: false,
            controller: chargeController
        })
        .when("/update-trade-psd", {
            templateUrl: "me/update-trade-psd.html",
            reloadOnSearch: false,
            controller: updateTradePsdController
        })
        .when("/update-signin-psd", {
            templateUrl: "me/update-signin-psd.html",
            reloadOnSearch: false,
            controller: updateSigninPsdController
        })
        .when("/cash", {
            templateUrl: "cash.html",
            reloadOnSearch: false,
            controller: cashController
        })
        .when("/setting", {
            templateUrl: "setting.html",
            reloadOnSearch: false,
        })
        .when("/", {
            templateUrl: "home.html",
            reloadOnSearch: false,
            controller: indexController
        })
        .when("/products/:productID", {
            templateUrl: "product.html",
            reloadOnSearch: false,
            controller: productController
        })
        .when("/products-content/:productID", {
            templateUrl: "product-content.html",
            reloadOnSearch: false,
            controller: productContentController
        })
        .when("/products-files/:productID", {
            templateUrl: "product-files.html",
            reloadOnSearch: false,
            controller: productFilesController
        })
        .when("/buy/:productID", {
            templateUrl: "buy.html",
            reloadOnSearch: false,
            controller: buyController
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
