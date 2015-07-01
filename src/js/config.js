angular.module("VVBank").constant("config", {
    url: "http://localhost:8000/proxy/vv.kksdapp.com:9090",
    appid: "android_vv",
    version: "1.0",
    smstype: {
        "SIGNUP": 1,
        "CASH": 2,
        "RETURN": 3,
        "ACTIVE_ACCOUNT": 4,
        "SYNC_PASSWOARD": 5,
        "RESET_PASSWORD": 6
    },
    request: {
        "SUCCESS": "0000",
        "EXIST": "1",
        "UNEXIST": 0
    },
    common_params: {
        appid: "android_vv",
        version: "1.0"
    },
    feature: {
        "averageByMonth": "按月等额本息",
        "interestByMonth": "按月付息,到期还本",
        "allInOnce": "一次性还本付息"
    },
    safety: {
        "100": "优质项目",
        "101": "实地认证",
        "102": "本息保证",
        "103": "金交所会员"
    },
    login: {
        "SUCCESS": "0400",
        "0400": "登录成功",
        "0401": "账户密码不匹配",
        "0402": "账户锁定",
        "0499": "其他错误"
    },
    agreement: {
        "USAGE": 1,
        "PRIVACY": 2
    },
    safety_info: {
        telephone: {
            "0": "未绑定手机",
            "1": "绑定但是未认证",
            "2": "绑定手机且已认证"
        },
        realname: {
            "0": "未实名认证",
            "1": "已实名认证"
        },
        trade_password: {
            "0": "未设置",
            "1": "已设置"
        },
        signin_password: {
            "0": "未设置",
            "1": "已设置"
        }
    },
    // 学位
    degrees: ["小学毕业", "中心毕业", "高中毕业", "本科生", "研究生", "博士", "博士后"],
    // 公司规模
    scales: ["1-100人", "100-500人", "500-1000人", "1000-5000人", "5000+人"],
    // 收入
    incomes: ["5000以内", "5000-10000元", "10000-20000元", "20000-50000元", "50000以上"],
    // 婚否
    is_marry: {
        "1": "已婚",
        "2": "未婚"
    },
    sex: {
        "0": "其他",
        "1": "男",
        "2": "女"
    },
    scales: {
        "1": "1-100人",
        "2": "100-500人",
        "3": "500-1000人",
        "4": "1000-5000人",
        "5": "5000+人"
    },
});
