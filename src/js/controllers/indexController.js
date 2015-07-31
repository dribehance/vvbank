var indexController = function($scope, $timeout, toastServices, licaiServices, bannerServices, parserServices) {
    toastServices.show();
    licaiServices.recommand().then(function(data) {
        toastServices.hide();
        $scope.products = parserServices.parseRecommendProduct(data.result);
        $timeout(function() {
            $("#product-carousel").owlCarousel({
                autoPlay: false,
                singleItem: true
            });
        }, 0);
    });
    bannerServices.get().then(function(data) {
        $scope.banners = parserServices.parseBanner(data.result);
        $timeout(function() {
            $("#banner").owlCarousel({
                autoPlay: 3000,
                singleItem: true
            });
        }, 0);
    });
    $scope.gauge_data = [{
        label: "CPU",
        value: 75,
        suffix: "%",
        color: "steelblue"
    }];
    $scope.gauge_options = {thickness: 5, mode: "gauge", total: 100};
}