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
            income: "0",
            coin:"0",
        }
        return _m_user;
    }


        var _m_fund = function(){
            var _m_fund = {
                id : "",
                big : "",
                small : "",
                fundsName : "",
                endDayCount :  "0",
                status : "0",
                fundStatus : "",
                supportCount : "0",
                appliedTotalAmount : "0",
                totalAmount : "0",
            }
            return _m_fund;
        }

        var _m_uzb_fund = function(){
            var  _m_uzb_fund = {
                id :"",
                fundsName :"",
                status :"",
                fundStatus :"",
                small :"",
                speed :"",
                periodMin :"",
                periodMax :"",
                rateMin :"",
                rateMax :"",
                reward : "",
            }
            return _m_uzb_fund;
        }

        var _m_support = function(){
            var _m_support = {
                id : "",
                fundId : "",
                rewardType : "",
                supportAmount : "0",
                extractOr : "",
                rewardtitle : "",
                rewardDetail : "",
                supportCount : "0",
                fee : "",
                rewardDays : "0",
                count : "0",
                rewardOne : "",
                rewardTwo : "",
                rewardThree : "",
                rewardFour : "",
                rewardFive : "",
            }
            return _m_support;
        }

        var _m_sustain = function(){
            var _m_sustain = {
                id :"",
                fundId :"",
                period :"",
                rate :"",
                supportCount : "",
                rewardtitle :"",
                rewardDetail :"",
                rewardDays :"",
                rewardOne :"",
                rewardTwo :"",
                rewardThree :"",
                rewardFour :"",
                rewardFive :"",
            }
            return _m_sustain;
        }
            

        var _m_support_list = function(){
            var _m_support_list = {
                logon : "",
            }
            return _m_support_list;
        }

        var _m_topicList = function(){
            var _m_topicList = {
                id : "",
                topicUser : "",
                topicContent : "",
                answerTime : "",
                replies : "",
            }
            return _m_topicList;
        }

        var _m_fund_deatil = function(){
            var _m_fund_deatil = {
                id : "",
                logo : "",
                subTitle : "",
                name : "",
                order : "",
                detail : "",
            }
            return _m_fund_deatil;
        }

        var _m_reward_banner = function(){
            var _m_reward_banner = {
                id : "",
                fundId : "",
                period : "",
                rate : "",
                addPeriod : "",
            }
            return _m_reward_banner;
        }

        var _m_uzb_support = function(){
            var _m_uzb_support = {
                id :"",
                fundId :"",
                rate :"",
                period :"",
                rewardtitle :"",
                rewardDetail :"",
                addPeriod :"",
                rewardDays :"",
                rewardOne :"",
                rewardTwo :"",
                rewardThree :"",
                rewardFour :"",
                rewardFive :"",
            }
            return _m_uzb_support;
        }

    // product -----------------
var _m_product = function() {
    // title: 产品标题
    // tag:1-热卖 tag:2-募满 tag:3 结束
    // feature: 到期还本付息
    // duration: 持有时长(项目期限)---------10天
    // limit: 起投金额------------1000元起投
    // max: 最大投资金额
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

    // endtime
    // transaction
    var product = {

        id: "",
        title: "",
        tag: "1",
        feature: "1",
        duration: "15",
        limit: "1000",
        max:"1000",
        percentage: "5.00%",
        addition: "1.00%",
        progress: "60%",
        safety: [],
        total: "",
        already:"",
        remain: 0,
        faqiren: "",
        dealer: "",
        exchange: "",
        agency: "",
        code: "",
        unit:"",
        endtime:"",
        transaction:"",
        detail:"",
        delta:"",
        emoney:"0",
        projectChannelType:""
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
            url: "#",
            id : "0"
        }
    }
    // bills ------------------
var _m_bill = function() {
        return {
            "date": "",
            "type": "",
            "money": "",
            "trade_money":"",
            "status":""
        }
    }

var _m_bailAccount = function(){
    return {
        "netAsset": "",    //账户总额
        "incomeAmount":"",    //总收益
        "usableAmount":"",   //可用余额
        "totalAmount":"",    //待收本金
        "frozenAmount":"", //冻结金额
        "interestAmount":"",   //待收收益
        "emoney" : "",  //e圆总额
        "totalTokens": "",    //红包总额
        "coin": "",  //新人尊享金  可用余额
        "frozenCoin": "" //新人尊享金  冻结金额
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
