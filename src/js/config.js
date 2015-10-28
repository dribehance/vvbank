angular.module("VVBank").constant("config", {
    // url: "http://youyitou.f3322.net:8022/ws",
    url: "http://172.16.4.70:9000/proxy/youyitou.f3322.net:8022/ws",
    appid: "mobile_h5",
    version: "1.01",
    smstype: {
        "SIGNUP": 1,
        "CASH": 2,
        "RETURN": 3,
        "ACTIVE_ACCOUNT": 4,
        "SYNC_PASSWOARD": 5,
        "RESET_PASSWORD": 6,
        "BIND_TELEPHONE":7
    },
    request: {
        "SUCCESS": "0000",
        "EXIST": "1",
        "UNEXIST": "0",
        "TOKEN_INVALID":"0403"
    },
    common_params: {
        appid: "mobile_h5",
        version: "1.01"
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
    // 行业
    industries:["互联网金融","IT互联网科技","制造业","政府机关"],
    // 婚否
    is_marry: {
        "1": "已婚",
        "2": "未婚"
    },
    sex: {
        "0": "未知",
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
    banks: {
        "ccb": "建设银行",
        "icbc": "工商银行",
        "abc": "农业银行",
        "cmb": "招商银行",
        "boc": "中国银行",
        "bocom": "交通银行",
        "psbc": "邮政银行",
        "ceb": "光大银行",
        "cmbc": "民生银行",
        "cib": "兴业银行",
        "citic": "中信银行",
        "spdb": "浦发银行",
        "pab": "平安银行",
        "gdb": "广发银行",
        "hxbc": "华夏银行",
        "bos": "上海银行",
        "njcb": "南京银行",
        "bobj": "北京银行",
        "nbcb": "宁波银行",
        "tccb": "天津银行"
    },
    bill_status:{
        "-1":"支出",
        "1":"收入"
    }
});
