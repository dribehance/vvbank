// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").directive('delta', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(by_delta);
            function by_delta(viewValue) {
                if (ctrl.$isEmpty(viewValue)){
                    ctrl.$setValidity('delta', true);
                    return viewValue;
                }
                if (parseInt(viewValue) % attrs.delta === 0) {
                    ctrl.$setValidity('delta', true);
                } else {
                    ctrl.$setValidity('delta', false);
                 }
                return viewValue;
            }
        }
    };
});
