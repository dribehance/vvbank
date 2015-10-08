// by dribehance <dribehance.kksdapp.com>
var paymentController = function($scope, settingServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    // query provinces
    settingServices.queryProvinces().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {
            $scope.provinces = data.result;
            $scope.input.provinceId = $scope.provinces[0].provinceId;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    $scope.$watch("input.provinceId", function(n, o) {
        if (n === undefined) {
            return;
        }
        queryCity(n);
    },true)
    var queryCity = function(province_id) {
        settingServices.queryCityByProvinceId(province_id).then(function(data) {
            $scope.cities = data.result;
        })
    }
}
