// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").directive('banner', function($rootScope) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var options = {
                autoPlay: 5000,
                stopOnHover: true,
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true
            };
            var rate = parseFloat(scope.$eval($(element).attr('data-rate'))),
                bgURL = $rootScope.staticImageUrl + "images/banner_1.png";
            var style = {
                width:$(element).width() || $(window).width(),
                height:($(element).width() || $(window).width())/rate,
                "line-height": ($(element).width() || $(window).width())/rate +"px",
                overflow:"hidden",
                "text-align":"center",
                "background-image": bgURL,
                "background-repeat":"no-repeat",
                "background-position":"center center",
                "background-size":"100%"
            }
            options = angular.extend({},options,scope.$eval($(element).attr('data-options')));
            $(element).css({"overflow":"hidden"});
            scope.$on('repeat_done', function() {
                $(element).find(".image-holder").css(style)
                // carousel init
                $(element).owlCarousel(options);
            });
        }
    };
});
r
