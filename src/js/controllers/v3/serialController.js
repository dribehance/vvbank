// by dribehance <dribehance.kksdapp.com>
var serialController = function($scope, $rootScope,$routeParams, mallServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "序列号查询";
    $scope.input = {
        search_result: false,
        serial_code: ""
    };
    toastServices.show();
    mallServices.querySerial().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.serial_name = data.message;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.query = function() {
        toastServices.show();
        mallServices.querySerialCode({
            serial: $scope.input.serial_code
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                $scope.serial_entity = data.result;
                $scope.input.search_result = true;
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.use = function() {
        toastServices.show();
        mallServices.useSerialCode({
            "serial": $scope.input.serial_code,
            "itemId": $scope.serial_entity.itemId
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                errorServices.autoHide(data.message);
                $rootScope.back();
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // query serial code ;
    if ($routeParams.serial_code) {
        $scope.input.serial_code = $routeParams.serial_code;
        $scope.query();
    }
}
