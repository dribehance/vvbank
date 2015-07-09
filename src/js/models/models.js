// user
var _m_user = function() {
        // id 
        // nickname 昵称
        // realname 真实姓名
        // total 账户金额
        // earing 账户收益
        // frozen 账户冻结金额
        // indentify 身份证
        // telephone: 手机
        // email 电子邮件
        // sex 性别
        // birthday 生日
        // degree 学业
        // industry 行业
        // scale 公司规模
        // job 工作岗位
        // income 收入
        var _m_user = {
            id: "",
            username: "未填写",
            nickname: "未填写",
            realname: "未填写",
            avatar: "",

            total: 0,
            earning: 0,
            frozen: 0,

            identify: "未填写",
            telephone: "未填写",
            email: "未填写",

            sex: "男",
            is_marry: "",
            school: "",
            birthday: new Date("1990,01,01"),
            degree: "小学毕业",
            address: "未填写",
            industry: "未填写",
            scale: "未填写",
            job: "未填写",
            income: "0"
        }
        return _m_user;
    }
    // product -----------------
var _m_product = function() {
    // title: 产品标题
    // tag:1-热卖 tag:2-募满 tag:3 结束
    // feature: 到期还本付息
    // duration: 持有时长(项目期限)---------10天
    // limit: 起投金额------------1000元起投
    // percentage:收益率----------5.00%
    // addtion:加送---------------1.00%
    // progress:投资进度
    // safety:安全标记 100：优质项目 101：实地认证 102：本息保证 103：金交所会员
    // total:项目总额
    // remain:剩余金额
    // faqiren:发起人
    // dealer:承销商
    // exchange:交易所
    // agency:担保机构

    var product = {

        id: "",
        title: "",
        tag: "1",
        feature: "1",
        duration: "15",
        limit: "1000",
        percentage: "5.00%",
        addition: "1.00%",
        progress: "60%",
        safety: [],
        total: "",
        remain: 0,
        faqiren: "",
        dealer: "",
        exchange: "",
        agency: "",
        code: ""
    }
    return product;
}
var _m_group = function() {
        // name: 深圳前海金融资产交易所
        var _m_group = {
            name: "",
            code: "",
            products: []
        };
        return _m_group;
    }
    // banner ----------------
var _m_banner = function() {
        return {
            order: "0",
            name: "1",
            path: "#",
            url: "#"
        }
    }
    // bills ------------------
var _m_bill = function() {
        return {
            "date": "",
            "type": "",
            "money": "",
            "status":""
        }
    }
    // eyuan ------------------
var _m_eyuan = function() {
    // date eyuan获取日期
    // type 类型
    // amount 数量
    // 
    return {
        "date": "",
        "type": "",
        "amount": "",
        "remain": ""
    }
}
var _m_eyuan_group = function() {
    var _m_eyuan_group = {
        remain: "",
        eyuans: []
    };
    return _m_eyuan_group;
}
var _m_pocket = function() {
    // date pocket获取日期
    // type 类型
    // amount 数量
    // 
    return {
        "date": "",
        "type": "",
        "money": "",
        "status": ""
    }
}
var _m_pocket_group = function() {
        var _m_pocket_group = {
            remain: "",
            pockets: []
        };
        return _m_pocket_group;
    }
    // message ----------------
var _m_message = function() {
        return {
            "id":"",
            "title": "系统消息",
            "date": "2015-06-01",
            "content": "...",
            "type": "1",
            "status":"0",
            "path":""
        }
    }
    // pocket
var _m_pocket = function() {
    return {
        "date": "04-13",
        "expires":"05-13",
        "type": "活动奖励",
        "money": "100",
        "status": "可用"
    }
}
var _m_pocket_group = function() {
    return {
        "remain": "0",
        "pockets": []
    }
}
var _m_safety_info = function() {
        return {
            "telephone": {
                "status": "0",
                "message": "",
            },
            "realname": {
                "status": "0",
                "message": "",
            },
            "trade_password": {
                "status": "0",
                "message": "",
            },
            "signin_password": {
                "status": "0",
                "message": "",
            }
        }
    }
    // bank info
var _m_bank = function() {
        return {
            "id": "",
            "name": "",
            "branch": "",
            "card_number": "",
            "user": "",
            "province": "",
            "city": "",
            "code": "",
        }
    }
    // project
var _m_project = function() {
    return {
        "title": "",
        "order": "",
        "path": "",
        "description": ""
    }
}

// investment record
var _m_investment = function() {
        return {
            "name": "",
            "money": "",
            "rate": "",
        }
    }
    // activities
var _m_activity = function() {
    return {
        "path": "",
        "title": ""
    }
}
