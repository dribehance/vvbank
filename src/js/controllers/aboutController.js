var aboutController = function($scope, errorServices, settingServices, config) {
    settingServices.about().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {

        } else {
            errorServices.autoHide(data.message)
        }
    })
}
