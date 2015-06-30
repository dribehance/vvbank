angular.module("VVBank").constant("config",{
	url:"http://vv.kksdapp.com:9090",
	appid:"android_vv",
	version:"1.0",
	smstype : {
		"SIGNUP":1,
		"CASH":2,
		"RETURN":3,
		"ACTIVE_ACCOUNT":4,
		"SYNC_PASSWOARD":5,
		"RESET_PASSWORD":6
	},
	request:{
		"SUCCESS":"0000",
		"EXIST":"1",
		"UNEXIST":0
	},
	common_params : {
		appid: "android_vv",
		version: "1.0"
	},
	feature: {
		"averageByMonth":"按月等额本息",
		"interestByMonth":"按月付息,到期还本",
		"allInOnce":"一次性还本付息"
	},
	safety: {
		"100":"优质项目",
		"101":"实地认证",
		"102":"本息保证",
		"103":"金交所会员"
	},
	login: {
		"SUCCESS":"0400",
		"0400":"登录成功",
		"0401":"账户密码不匹配",
		"0402":"账户锁定",
		"0499":"其他错误"
	},
	agreement: {
		"USAGE":1,
		"PRIVACY":2
	}
});