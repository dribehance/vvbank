var bankCardsController = function($scope, $routeParams, $location, $rootScope, $route, $window, errorServices, localStorageService, toastServices, parserServices, userServices, settingServices, config) {
    if ($routeParams.state == '1') {
        toastServices.show();
        settingServices.queryBanks().then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS) {
                $scope.banks = data.result;
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
    $scope.deleteBank = function(bank) {
        toastServices.show();
        settingServices.deleteBank(bank).then(function(data) {
            toastServices.hide();
            if (data.respcode == config.request.SUCCESS && data.result.status == 1) {
                $route.reload();
            } else {
                errorServices.autoHide(data.message)
            }
        })
    }
    $scope.createBank = function() {
        $location.path("/add_bank")
    }
    $scope.parseNumber = function(card_number) {
        if (card_number.length < 4) {
            return "****" + card_number;
        } else {
            return card_number = "****" + card_number.slice(card_number.length - 4, card_number.length)
        }
    }
    $scope.parseName = function(name) {
        if (!name) {
            return name = "";
        }
        return name = name.slice(0, 1) + "****";
    }
}
