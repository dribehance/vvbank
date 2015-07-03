var questionsController = function($scope, errorServices, settingServices, config) {
    settingServices.questions().then(function(data) {
        if (data.respcode == config.request.SUCCESS) {

        } else {
            errorServices.autoHide(data.message)
        }
    })
}
