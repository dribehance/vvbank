angular.module("VVBank", [
    "ngRoute",
    "mobile-angular-ui",
    "mobile-angular-ui.core.capture",
    "mobile-angular-ui.core.activeLinks",
    "mobile-angular-ui.core.sharedState",
    "flow",
    "timer",
    "LocalStorageModule"
])
.config(function($routeProvider,$httpProvider) {
    $routeProvider
        .when("/index", {
            templateUrl: "home.html",
            reloadOnSearch: false,
            controller: indexController
        })
        .when("/licai", {
            templateUrl: "licai.html",
            reloadOnSearch: false,
            controller: licaiController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/me", {
            templateUrl: "me.html",
            reloadOnSearch: false,
            controller: meController,
            resolve: {
                factory:loginInterceptor
            }
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
            reloadOnSearch: false,
            controller:forgetController
        })
        .when("/investment", {
            templateUrl: "me/investment.html",
            reloadOnSearch: false,
            controller:investmentController
        })
        .when("/bills", {
            templateUrl: "me/bills.html",
            reloadOnSearch: false,
            controller:billsController
        })
        .when("/activities", {
            templateUrl: "me/activities.html",
            reloadOnSearch: false,
            controller:activitiesController
        })
        .when("/eyuan", {
            templateUrl: "me/eyuan.html",
            reloadOnSearch: false,
            controller:eyuanController
        })
        .when("/pocket", {
            templateUrl: "me/pocket.html",
            reloadOnSearch: false,
            controller:pocketController
        })
        .when("/message", {
            templateUrl: "me/message.html",
            reloadOnSearch: false,
            controller:messageController
        })
        .when("/account-setting", {
            templateUrl: "me/account-setting.html",
            reloadOnSearch: false,
            controller: accountSettingController
        })
        .when("/safety-setting", {
            templateUrl: "me/safety-setting.html",
            reloadOnSearch: false,
            controller:safetySettingController
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
            controller:inviteController
        })
        .when("/questions", {
            templateUrl: "me/question.html",
            reloadOnSearch: false,
            controller:questionsController
        })
        .when("/about", {
            templateUrl: "me/about.html",
            reloadOnSearch: false,
            controller:aboutController
        })
        .when("/name-authen", {
            templateUrl: "me/name-authen.html",
            reloadOnSearch: false,
            controller: nameAuthenController
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
            reloadOnSearch: false
        })
        .when("/products/:productID", {
            templateUrl: "product.html",
            reloadOnSearch: false,
            controller: productController
        })
        .when("/project/:productID", {
            templateUrl: "project.html",
            reloadOnSearch: false,
            controller: projectController
        })
        .when("/products-files/:productID", {
            templateUrl: "product-files.html",
            reloadOnSearch: false,
            controller: productFilesController
        })
        .when("/buy/:productID/:remain", {
            templateUrl: "buy.html",
            reloadOnSearch: false,
            controller: buyController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/agreement", {
            templateUrl: "agreement.html",
            reloadOnSearch: false,
            controller: agreementController
        })
        .otherwise({
            redirectTo: "/index"
        });
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

}).run(function($rootScope, $window,appServices) {
    // init event such as routechangestart...
    appServices.init();
});
