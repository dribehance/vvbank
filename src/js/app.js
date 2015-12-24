angular.module("VVBank", [
    "ngRoute",
    "mobile-angular-ui",
    "mobile-angular-ui.core.capture",
    "mobile-angular-ui.core.activeLinks",
    "mobile-angular-ui.core.sharedState",
    // "mobile-angular-ui.gestures",
    // "mobile-angular-ui.gestures.touch",
    "flow",
    "timer",
    "LocalStorageModule",
    "n3-pie-chart",
    "monospaced.qrcode"
    // "ngTouch"
])
.config(function($routeProvider,$httpProvider,localStorageServiceProvider) {
    $routeProvider
        .when("/index", {
            templateUrl: "home.html",
            reloadOnSearch: false,
            controller: indexController
        })
        .when("/investment_projects", {
            templateUrl: "investment_projects.html",
            reloadOnSearch: false,
            // controller: investmentProjectsController
            controller : crowdFundListController
        })
        .when("/licai", {
            templateUrl: "licai.html",
            reloadOnSearch: false,
            controller: licaiController,
        })
        .when("/licai/:exchangeCode", {
            templateUrl: "products.html",
            reloadOnSearch: false,
            controller: productsController
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
            reloadOnSearch: true,
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
        .when("/bank_cards", {
            templateUrl: "me/bank-cards.html",
            reloadOnSearch: false,
            controller: bankCardsController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/add_bank", {
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
        .when("/name_authen", {
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
        .when("/charge_confirm", {
            templateUrl: "charge_confirm.html",
            reloadOnSearch: false,
            controller: chargeConfirmController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/update_trade_psd", {
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
        .when("/cash_confirm", {
            templateUrl: "cash_confirm.html",
            reloadOnSearch: false,
            controller: cashConfirmController,
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
        .when("/buy/:productCode/:productID/:remain", {
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
        .when("/eyuan_mall/hotels", {
            templateUrl: "hotels.html",
            reloadOnSearch: false,
            controller: hotelsController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/eyuan_mall/hotels/:item_id", {
            templateUrl: "hotel.html",
            reloadOnSearch: false,
            controller: hotelController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/eyuan_mall/restaurants", {
            templateUrl: "restaurants.html",
            reloadOnSearch: false,
            controller: restaurantsController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/eyuan_mall/stores", {
            templateUrl: "stores.html",
            reloadOnSearch: false,
            controller: storesController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/eyuan_mall/clubs", {
            templateUrl: "clubs.html",
            reloadOnSearch: false,
            controller: clubsController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/eyuan_mall/shopping_cart", {
            templateUrl: "shopping_cart.html",
            reloadOnSearch: false,
            controller: shoppingcartController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/eyuan_mall/payment", {
            templateUrl: "payment.html",
            reloadOnSearch: false,
            controller: paymentController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/eyuan_mall", {
            templateUrl: "eyuan_mall.html",
            reloadOnSearch: true,
            controller: eyuanMallController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/qrcode", {
            templateUrl: "qrcode.html",
            reloadOnSearch: false,
            controller: qrcodeController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/serial", {
            templateUrl: "serial.html",
            reloadOnSearch: false,
            controller: serialController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/promote", {
            templateUrl: "promote.html",
            reloadOnSearch: false,
            controller: promoteController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/people", {
            templateUrl: "people.html",
            reloadOnSearch: false,
            controller: peopleController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/people_two/:member_id", {
            templateUrl: "people_two.html",
            reloadOnSearch: false,
            controller: peopleTwoController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/orders", {
            templateUrl: "orders.html",
            reloadOnSearch: false,
            controller: ordersController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/orders/:order_id", {
            templateUrl: "order.html",
            reloadOnSearch: false,
            controller: orderController,
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/orders_offline/:order_id", {
            templateUrl: "order_offline.html",
            reloadOnSearch: false,
            controller: orderOfflineController
            // resolve: {
            //     factory:loginInterceptor
            // }
        })
        .when("/bails-account", {
            templateUrl : "me/bails-account.html",
            reloadOnSearch: false,
            controller: orderOfflineController
        })
        .when("/crowdFund/detailsing/:cfId",{
            templateUrl : "cf/fundDetails.html",
            reloadOnSearch : true,
            controller : cfController
        })
        .when("/crowdFund/detailsMore",{
            templateUrl : "cf/fundDetails_more.html",
            reloadOnSearch : false,
            controller : detailsMoreController,
        })
        .when("/crowdFund/fundSupport/:cfId", {
            templateUrl : "cf/fundSupport.html",
            reloadOnSearch : false,
            controller : fundSupportController,
        })
        .when("/crowdFund/order/infoWrite/:cfId/:amount",{ 
            templateUrl : "cf/cfpro_infoWrite.html",
            reloadOnSearch : false,
            controller : orderInfoWriteController,
            resolve: {
                factory:loginInterceptor
            }
        })
        .when("/crowdFund/order/confirm",{
            templateUrl : "cf/cfpro_confirm.html",
            reloadOnSearch : false,
            controller : orderConfirmController
        })
        .when("/crowdFund/order/pay",{
            templateUrl : "cf/cfpro_pay.html",
            reloadOnSearch : false,
            controller : orderConfirmController
        })
        .when("/crowdFund/topic/:cfId",{
            templateUrl : "cf/cf_topicList.html",
            reloadOnSearch : false,
            controller : topicController
        })
        .when("/crowdFund/topicSubmit/:cfId/:aId/:type",{
            templateUrl : "cf/cf_topicSubmit.html",
            reloadOnSearch : false,
            controller : topicSubmitController,
            resolve : {
                factory:loginInterceptor
            }
        })
        .when("/crowdFund/details/:cfId",{
            templateUrl : "cf/fundDetails.html",
            reloadOnSearch : false,
            controller : crowdFundDetailsController
        })
        .when("/crowdFund/crowdFundDetails/:cfId",{
            templateUrl : "cf/cf_topicSubmit.html",
            reloadOnSearch : false,
            controller : crowdFundDetailsController,
        })
        .when("/crowdFund/pay/success",{
            templateUrl : "cf/cf_pay_suc.html",
            reloadOnSearch : false,
            controller : cfPayController
        })
        .when("/crowdFund/support/one/:rewardId",{
            templateUrl : "cf/cf_invest.html",
            reloadOnSearch : false,
            controller : cfInvestController
        })
        .when("/chou",{
            templateUrl : "chou.html",
            reloadOnSearch : false,
            controller : chouController
        })
        .when("/account_center",{
            templateUrl : "account_center.html",
            reloadOnSearch : false,
            controller : accountCenterController
        })
        .when("/eyuan_mall_center",{
            templateUrl : "eyuan_mall_center.html",
            reloadOnSearch : false,
            controller : eyuanMallCenterController
        })
        .when("/account_info",{
            templateUrl : "account_info.html",
            reloadOnSearch : false,
            controller : accountInfoController
        })
        .when("/account_money",{
            templateUrl : "account_money.html",
            reloadOnSearch : false,
            controller : accountMoneyController
        })
        .when("/cf_confirm/:req_data",{
            templateUrl : "cf/cf_confirm.html",
            reloadOnSearch : false,
            controller : cfConfirmController
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
