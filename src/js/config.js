angular.module("VVBank").constant("config",{
	url:"http://localhost:8000/proxy/58.60.243.46:9090",
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
	result: {
		"SUCCESS":"0"
	},
	common_params : {
		appid: "android_vv",
		version: "1.0"
	}
});