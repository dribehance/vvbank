// by dribehance <dribehance.kksdapp.com>
var peopleController = function($scope, peopleServices, errorServices, toastServices, localStorageService, config) {
    // var data = {
    //     "respcode": "0000",
    //     "message": "请求成功",
    //     "commissionRate": 0,
    //     "inviteLevelTwoCount": 0,
    //     "inviteLevelOneCount": 10,
    //     "result": [{
    //         "commissionRateTwo": 0,
    //         "memberRealName": "田谧",
    //         "appliedAmount": 0,
    //         "memberId": 777
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "周卫华",
    //         "appliedAmount": 0,
    //         "memberId": 361
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "asdasura",
    //         "appliedAmount": 0,
    //         "memberId": 287
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "张睿",
    //         "appliedAmount": 0,
    //         "memberId": 285
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "liu809225439",
    //         "appliedAmount": 0,
    //         "memberId": 284
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "aiitao",
    //         "appliedAmount": 0,
    //         "memberId": 282
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "黄记龙",
    //         "appliedAmount": 0,
    //         "memberId": 281
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "kings1993",
    //         "appliedAmount": 0,
    //         "memberId": 280
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "king1993",
    //         "appliedAmount": 0,
    //         "memberId": 279
    //     }, {
    //         "commissionRateTwo": 0,
    //         "memberRealName": "743100606",
    //         "appliedAmount": 0,
    //         "memberId": 278
    //     }]
    // };
    // $scope.peoples = data.result;
    // $scope.total_money = data.commissionRate;
    // $scope.people_level1 = data.inviteLevelOneCount;
    // $scope.people_level2 = data.inviteLevelTwoCount;
    toastServices.show();
    peopleServices.query().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.peoples = data.result;
            $scope.total_money = data.commissionRate;
            $scope.people_level1 = data.inviteLevelOneCount;
            $scope.people_level2 = data.inviteLevelTwoCount;
        } else {
            errorServices.autoHide(data.message);
        }
    })
}
