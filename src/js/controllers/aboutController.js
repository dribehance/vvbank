var aboutController = function($scope,$rootScope, errorServices, settingServices, config) {
	$rootScope.page_title = "关于我们";
    settingServices.about().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {

        } else {
            errorServices.autoHide(data.message)
        }
    })
}
