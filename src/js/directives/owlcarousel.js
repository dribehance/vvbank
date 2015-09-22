angular.module("VVBank").directive('wrapOwlcarousel', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var options = scope.$eval($(element).attr('data-options'));
            scope.$on('repeat_done', function() {
                // carousel化
                // $el.owlCarousel();
            	$(element).owlCarousel(options);
            });
        }
    };
});
