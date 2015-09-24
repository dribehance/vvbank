// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").directive('imageview', function() {
    return {
        restrict: 'E',
        scope: {
            src: "="
        },
        template: "<img ng-src='{{src}}' class='block full-width'>",
        link: function(scope, element, attrs) {
            var rate = parseFloat(scope.$eval($(element).attr('data-rate')));
            var style = {
                display: "block",
                width: $(element).parent().width() || $(window).width(),
                height: ($(element).parent().width() || $(window).width()) / rate,
                overflow: "hidden",
                "text-align":"center",
                "background-image": "url('../images/banner_1.png')",
                "background-size":"100%",
                "background-position":"center center",
                "background-repeat":"no-repeat"
            }
            $(element).css(style);
        }
    };
});
