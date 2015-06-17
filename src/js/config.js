angular.module("VVBank").constant("config",{
	url:"http://58.60.240.82:9090",
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
		"SUCCESS":"0000"
	},
	common_params : {
		callback: "JSON_CALLBACK",
		appid: "android_vv",
		version: "1.0"
	}
});