var inviteController = function($scope, errorServices, settingServices, config) {
    settingServices.invite().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {

        } else {
            errorServices.autoHide(data.message)
        }
    })
}
