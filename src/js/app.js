angular.module("VVBank", [
    "ngRoute",
    "mobile-angular-ui",
    "mobile-angular-ui.core.capture",
    "mobile-angular-ui.core.activeLinks",
    "mobile-angular-ui.core.sharedState",
    "flow",
    "timer",
    "LocalStorageModule",
    "n3-pie-chart"
])
.config(function($routeProvider,$httpProvider,localStorageServiceProvider) {
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
        })
        .when("/licai/:exchangeCode", {
            templateUrl: "products.html",
            reloadOnSearch: false,
            controller: productsController,
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
            controller:investmentController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/bills", {
            templateUrl: "me/bills.html",
            reloadOnSearch: false,
            controller:billsController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/activities", {
            templateUrl: "me/activities.html",
            reloadOnSearch: false,
            controller:activitiesController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/eyuan", {
            templateUrl: "me/eyuan.html",
            reloadOnSearch: false,
            controller:eyuanController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/pocket", {
            templateUrl: "me/pocket.html",
            reloadOnSearch: false,
            controller:pocketController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/messages", {
            templateUrl: "me/messages.html",
            reloadOnSearch: false,
            controller:messagesController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/account-setting", {
            templateUrl: "me/account-setting.html",
            reloadOnSearch: false,
            controller: accountSettingController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/safety-setting", {
            templateUrl: "me/safety-setting.html",
            reloadOnSearch: false,
            controller:safetySettingController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/bank-cards", {
            templateUrl: "me/bank-cards.html",
            reloadOnSearch: false,
            controller: bankCardsController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/add-bank", {
            templateUrl: "me/add-bank.html",
            reloadOnSearch: false,
            controller: addBankController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/update-bank", {
            templateUrl: "me/update-bank.html",
            reloadOnSearch: false,
            controller: updateBankController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/invite", {
            templateUrl: "me/invite.html",
            reloadOnSearch: false,
            controller:inviteController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/questions", {
            templateUrl: "me/question.html",
            reloadOnSearch: false,
            controller:questionsController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/about", {
            templateUrl: "me/about.html",
            reloadOnSearch: false,
            controller:aboutController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/name-authen", {
            templateUrl: "me/name-authen.html",
            reloadOnSearch: false,
            controller: nameAuthenController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/charge", {
            templateUrl: "charge.html",
            reloadOnSearch: false,
            controller: chargeController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/update-trade-psd", {
            templateUrl: "me/update-trade-psd.html",
            reloadOnSearch: false,
            controller: updateTradePsdController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/update-signin-psd", {
            templateUrl: "me/update-signin-psd.html",
            reloadOnSearch: false,
            controller: updateSigninPsdController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/cash", {
            templateUrl: "cash.html",
            reloadOnSearch: false,
            controller: cashController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/setting", {
            templateUrl: "setting.html",
            reloadOnSearch: false,
            controller:settingController,
            resolve: {
                factory:loginInterceptor
            }
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
            controller: agreementController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/bind-telephone", {
            templateUrl: "bind-telephone.html",
            reloadOnSearch: false,
            controller: bindTelephoneController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .otherwise({
            redirectTo: "/index"
        });
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        localStorageServiceProvider.setStorageCookie(1/50);
        $httpProvider.interceptors.push('tokenInterceptor');

}).run(function($rootScope, $window, $sce, appServices) {
    // init event such as routechangestart...
    appServices.init();
    $rootScope.trustAsHtml = function (safehtml) {
        return $sce.trustAsHtml(safehtml)
    }
});
