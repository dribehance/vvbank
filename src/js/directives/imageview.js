// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").directive('imageview', function() {
    return {
        restrict: 'E',
        scope: {
            src: "="
        },
        template: "<img ng-src='{{src}}' show-on-loaded>",
        link: function(scope, element, attrs) {
            var bg_image = "../images/banner_1.png";
            var rate = parseFloat(scope.$eval($(element).attr('data-rate')));
            if (!rate) {
                console.log("unexpect rate")
                return;
            }
            console.log($(element).parent().width())
            var style = {
                display: "block",
                width: $(element).width() || $(element).parent().width(),
                overflow: "hidden",
                "text-align": "center",
                "background-image": "url(" + bg_image + ")",
                "background-size": "100%",
                "background-position": "center center",
                "line-height":($(element).width() || $(element).parent().width()) / rate + "px",
                "height":($(element).width() || $(element).parent().width()) / rate
            }
            $(element).css(style);
            $(element).parent().css({
                overflow: "hidden"
            });
        }
    };
});
