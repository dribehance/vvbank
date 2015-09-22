// by dribehance <dribehance.kksdapp.com>
angular.module("VVBank").directive('balance', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(by_balance);
            function by_balance(viewValue) {
                if (ctrl.$isEmpty(viewValue)){
                    ctrl.$setValidity('balance', true);
                    return viewValue;
                }
                if (parseInt(viewValue) > attrs.balance) {
                    ctrl.$setValidity('balance', false);
                } else {
                    ctrl.$setValidity('balance', true);
                 }
                return viewValue;
            }
        }
    };
});
