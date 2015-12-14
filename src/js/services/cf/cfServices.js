angular.module("VVBank").factory("cfServices", function($rootScope, $http, localStorageService, config) {
    return {
        query : function(cfId){
            return $http({
                url: config.url + "/cf/service/fundsDetail",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    "fundId": cfId
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});
