angular.module("VVBank").factory("parserServices", function(config) {
    var feature_parser = function(feature) {
        if (!feature) {
            return;
        }
        return config.feature[feature];
    }
    var safety_parser = function(safety) {
        if (!safety) {
            return;
        }
        var obj = {};
        safety.split(",").map(function(s) {
            var o = {};
            o[s] = config.safety[s];
            angular.extend(obj,o)
            return o;
        })
        return obj;
    }
    var parseTag = function (tag) {
        if (tag) {
            return 1;
        }
        return 3;
    }

    var parsetwodecimal =function(data){
        if(data){
            var dataArr = data.toString().split(".");
            if(dataArr.length > 1){
                if(dataArr[1].length >2){
                    data = data.toFixed(2);
                }
            }
        }
        return data;
    }

    return {
        // product parser
        parseProduct: function(data) {
            var product = new _m_product();
            product.id = data.productId;
            product.title = data.productName;
            // product.feature = feature_parser(data.repaymentType);
            product.feature = data.repaymentType;
            product.duration = data.investPeriod || "";
            product.limit = data.minInvestAmount || "0";
            product.max = data.maxInvestAmount || "0";
            product.percentage = data.annualRate || "0";
            product.addition = data.addRate || "0";
            product.progress = parsetwodecimal(parseFloat(data.totalInvestAmount || "0") / data.amount * 100);
            product.safety = safety_parser(data.safety);
            product.total = data.amount || "";
            product.already = data.totalInvestAmount || "0";
            product.remain = parsetwodecimal(parseFloat(data.amount) - (parseFloat(data.totalInvestAmount) || "0"));
            product.tag = data.status;
            product.faqiren = data.initiator || "";
            product.dealer = data.underwriter || "";
            product.exchange = data.financialExchange || "";
            product.agency = data.guarantor || "";
            product.code = data.channelType || "EXAMPLE";
            product.unit = data.periodUnit == "天"?"天":"个月";
            product.endtime = data.remainderTime || "0";
            product.transaction = data.investPersonCount || "0";
            product.detail = data.detail;
            product.delta = data.incrementAmount || "5";
            product.emoney = data.emoney || "0";
            product.projectChannelType = data.projectChannelType || "";
            return product;
        },
        parseProducts: function(data) {
            var products = [];
            for (var i = 0; i < data.length; i++) {
                var product = this.parseProduct(data[i]);
                products.push(product);
            }
            return products;
        },

        parseCrowdFund : function(data){
            var fund = new _m_fund();
            fund.id = data.id;
            fund.big = data.big || "";
            fund.small = data.small || "";
            fund.fundsName = data.fundsName;
            fund.endDayCount = data.endDayCount || "0";
            fund.status = data.status;
            fund.fundStatus = data.fundStatus;
            fund.supportCount = data.supportCount || "0";
            fund.appliedTotalAmount = data.appliedTotalAmount || "0";
            fund.totalAmount = data.totalAmount || "0";
            return fund;
        },

        parseCrowdFunds : function(data){
            var crowdFunds = [];
            for (var i = 0; i < data.length; i++){
                var fund = this.parseCrowdFund(data[i]);
                crowdFunds.push(fund);
            }
            return crowdFunds;
        },

        parseUZBCrowdFund : function(data){
            var fund = new _m_uzb_fund();
            fund.id = data.id;
            fund.fundsName = data.fundsName;
            fund.status = data.status;
            fund.fundStatus = data.fundStatus;
            fund.small = data.small;
            fund.speed = data.speed;
            fund.periodMin = data.periodMin;
            fund.periodMax = data.periodMax;
            fund.rateMin = data.rateMin;
            fund.rateMax = data.rateMax;
            fund.reward = data.reward;
            return fund;
        },

        parseUZBCrowdFunds : function(data){
            var crowdFunds = [];
            for (var i = 0; i < data.length; i++) {
                var fund = this.parseUZBCrowdFund(data[i]);
                crowdFunds.push(fund);
            }
            return crowdFunds;
        },

        parseFundSupport : function(data){
            var support = new _m_support();
            support.id = data.rewardId;
            support.fundId = data.fundingId;
            support.rewardType = data.rewardType;
            support.supportAmount = data.supportAmount || "0";
            support.extractOr = data.extractOr;
            support.rewardtitle = data.rewardtitle || "";
            support.rewardDetail = data.rewardDetail || "";
            support.supportCount = data.supportCount || "0";
            support.fee = data.fee;
            support.rewardDays = data.rewardDays || "0";
            support.count = data.count || "0";
            support.rewardOne = data.rewardOne;
            support.rewardTwo = data.rewardTwo;
            support.rewardThree = data.rewardThree;
            support.rewardFour = data.rewardFour;
            support.rewardFive = data.rewardFive;
            return support;
        },

        parseFundSupports : function(data){
            var fundSupports = [];
            for (var i = 0; i < data.length; i++) {
                var support = this.parseFundSupport(data[i]);
                fundSupports.push(support);
            }
            return fundSupports;
        },

        parseUZBFundSupport : function(data){
            var support = new _m_uzb_support();
            support.id = data.rewardId;
            support.fundId = data.fundId;
            support.period = data.period;
            support.rate = data.rate;
            support.rewardtitle = data.rewardtitle;
            support.rewardDetail = data.rewardDetail;
            support.rewardDays = data.rewardDays;
            support.addPeriod = data.addPeriod;
            support.rewardOne = data.rewardOne;
            support.rewardTwo = data.rewardTwo;
            support.rewardThree = data.rewardThree;
            support.rewardFour = data.rewardFour;
            support.rewardFive = data.rewardFive;
            return support;
        },

        parseUZBFundSupports : function(data){
            var fundSupports = [];
            for(var i = 0; i < data.length; i++){
                var support = this.parseUZBFundSupport(data[i]);
                fundSupports.push(support);
            }
            return fundSupports;
        },

        parseRewardBanner : function(data){
            var reward = new _m_reward_banner();
            reward.id = data.rewardId;
            reward.fundId = data.fundId;
            reward.period = data.period;
            reward.rate = data.rate;
            reward.addPeriod = data.addPeriod;
            return reward;
        },


        parseRewardBanners : function(data){
            var rewards = [];
            for (var i = 0; i < data.length; i++) {
                var reward = this.parseRewardBanner(data[i]);
                rewards.push(reward);
            }
            return rewards;
        },

        parseFundSustain : function(data){
            var sustain = new _m_sustain();
            sustain.id = data.rewardId;
            sustain.fundId = data.fundId;
            sustain.period = data.period;
            sustain.rate = data.rate;
            sustain.supportCount = data.supportCount;
            sustain.rewardtitle = data.rewardtitle;
            sustain.rewardDetail = data.rewardDetail;
            sustain.rewardDays = data.rewardDays;
            sustain.rewardOne = data.rewardOne;
            sustain.rewardTwo = data.rewardTwo;
            sustain.rewardThree = data.rewardThree;
            sustain.rewardFour = data.rewardFour;
            sustain.rewardFive = data.rewardFive;
            return sustain;
        },

        parseFundSustains : function(data){
            var sustains = [];
            for(var i = 0; i < data.length; i++){
                var sustain = this.parseFundSustain(data[i]);
                sustains.push(sustain);
            }
            return sustains;
        },

        parseTopicList : function(data){
            var topicList = new _m_topicList();
            topicList.id = data.id;
            topicList.topicUser = data.topicUser;
            topicList.topicContent = data.topicContent;
            topicList.answerTime = data.answerTime;
            topicList.replies = data.replies;
            return topicList; 
        },

        parseTopicLists : function(data){
            var topic = [];
            for(var i = 0; i < data.length; i++){
                var topics = this.parseTopicList(data[i]);
                topic.push(topics);
            }
            return topic;
        },


        parseFundDetail : function(data){
            var detail = new _m_fund_deatil();
            detail.id = data.detailId;
            detail.logo = data.logo;
            detail.subTitle = data.subTitle;
            detail.detail = data.detail;
            detail.name = data.name;
            detail.order = data.order;
            return detail;
        },

        parseFundDetails : function(data){
            var details = [];
            for(var i = 0; i < data.length; i++){
                var detai = this.parseFundDetail(data[i]);
                details.push(detai);
            }
            return details;
        },

        // recommand parse
        parseRecommendProduct: function(data) {
            var products = this.parseProducts(data);
            return products;
        },
        // licai product parser
        parseLicaiProduct: function(data) {
            var exchanges = [{
                name:"理财产品",
                code:"all"
            }],
                groups = [],
                group, products, product;
            for (var i = 0; i < data.length; i++) {
                group = new _m_group();
                group.name = data[i].fax;
                products = data[i].info;
                // parse product
                for (var j = 0; j < products.length; j++) {
                    product = this.parseProduct(products[j]);
                    group.code = products[j].productCode;
                    group.products.push(product);
                }
                // parse exchange;
                var exchange = {};

                exchange["name"] = group.name;
                exchange["code"] = group.code;
                exchanges.push(exchange);
                groups.push(group);
            }
            return {
                "groups": groups,
                "exchanges": exchanges
            }
        },
        // banner parser
        parseBanner: function(data) {
            var banners = [];

            for (var i = 0; i < data.length; i++) {
                var banner = new _m_banner();
                banner.order = data[i].order;
                banner.name = data[i].name;
                banner.path = data[i].path;
                banner.url = data[i].url;
                banner.id = data[i].id;
                banners.push(banner);
            }
            return banners;
        },
        // project parser
        parseProject: function(data) {
            var projects = [];
            for (var i = 0; i < data.length; i++) {
                var project = new _m_project();
                project.title = data[i].title;
                project.order = data[i].order;
                project.path = data[i].path;
                project.description = data[i].describe;
                projects.push(project);
            }
            return projects;
        },
        // user
        parseUser:function(data) {
            var user = new _m_user();
            user.id = data.id || "";
            user.username = data.username || "";
            user.nickname = data.nickName || "";
            user.realname = data.realName || "";
            user.avatar = data.userImg || "";

            user.total = data.netAsset || "0";
            user.earning = data.incomeAmount || "0";
            // user.frozen = data.frozenAmount || "0";
            user.frozen = data.usableAmount || 0;
            user.identify = data.idNo || "";
            user.telephone = data.cellphone || "";
            user.email = data.email || "";

            user.sex = config.sex[data.gender] || "男";
            user.is_marry = config.is_marry[data.maritalStatus] || "未婚";
            user.school = data.college || "";
            user.birthday = new Date(data.birthday || "1990,01,01");
            user.degree = data.maxEducation || "本科生";
            user.address = data.homeAddress || "";
            user.industry = data.industry || "互联网金融";
            user.scale = config.scales[data.corporateSize] || "1-100人";
            user.job = data.position || "工程师";
            user.income = config.incomes[data.salary] || "5000以内";
            user.coin = data.coin || "0";
            user.provider = data.provider;
            user.message_count = data.messageCount;
            return user;
        },
        // eyuan
        parseEyuan:function (data) {
            var eyuan_group = new _m_eyuan_group(),
                eyuans = [];
            eyuan_group.remain = data.eyuanUsable || "0";

            for (var i=0,r=data.info;i<r.length;i++) {
                var eyuan = new _m_eyuan();
                eyuan.date = r[i].time.split(" ")[0];
                eyuan.type = r[i].eyuanType;
                eyuan.amount = r[i].amount;
                eyuan.remain = r[i].surplusAmount;
                eyuans.push(eyuan);
            }

            eyuan_group.eyuans = eyuans;
            return eyuan_group;

        },
        parsePocket:function (data) {
            // var pocket_group = new _m_pocket_group(),
            //     pockets = [];
            // pocket_group.remain = data.bonus || "0";
            var pockets = [];
            for (var i=0,r=data;i<r.length;i++) {
                var pocket = new _m_pocket();
                pocket.date = r[i].createTime.split(" ")[0];
                // pocket.expires = r[i].expiryTime.split(" ")[0];
                pocket.type = r[i].type || "";
                pocket.money = r[i].amount || "";
                // pocket.status = new Date() > new Date(pocket.expires)?"过期":"可用";
                pocket.status = r[i].scoreChange;
                pockets.push(pocket);
            }

            // pocket_group.pockets = pockets;
            return pockets;

        },
        // bills
        parseBills:function (data) {
            var bills = [];
            for (var i=0,r=data;i<r.length;i++) {
                var bill = new _m_bill();
                bill.date = r[i].time.split(" ")[0];
                bill.type = r[i].fundType;
                bill.status = config.bill_status[r[i].fundStatus];
                bill.money = r[i].amount;
                bill.trade_money = r[i].tradeAmount;
                bills.push(bill);
            }
            return bills;
        },
        // safety info 
        parseSafetyInfo:function(data) {
            var safety_info = new _m_safety_info();
            safety_info.telephone = {
                "status": data.phoneStatus,
                "message": config.safety_info.telephone[data.phoneStatus]
            },
            safety_info.realname = {
                "status": data.realStatus,
                "message": config.safety_info.realname[data.realStatus]
            },
            safety_info.trade_password = {
                "status": data.tradeStatus,
                "message": config.safety_info.trade_password[data.tradeStatus]
            },
            safety_info.signin_password = {
                "status": data.loginStatus,
                "message": config.safety_info.signin_password[data.loginStatus]
            }
            return safety_info;
        },
        parseBank:function(data) {
            var bank = new _m_bank();
            bank.id = data.cardId || "";
            bank.name = data.bank || "";
            bank.code = data.bankCode || "";
            bank.branch = data.bankBranch || "",
            bank.card_number = data.cardNo || "";
            bank.user = data.user || "";
            bank.province = data.province;
            bank.city = data.city;
            return bank;
        },
        parseBanks:function(data){
            var banks = [];
            for(var i=0;i<data.length;i++) {
                var investment = this.parseBank(data[i]);
                banks.push(investment);
            }
            return banks;
        },
        parseInvestment:function(data){
            var investment = new _m_investment();
            investment.name = data.productName;
            investment.money = data.investAmount;
            // investment.rate = data.annualRate;
            investment.rate = data.investTime.split(" ")[0] || "-";
            return investment;
        },
        parseInvestments:function(data) {
            var investments = [];
            for(var i=0;i<data.length;i++) {
                var investment = this.parseInvestment(data[i]);
                investments.push(investment);
            }
            return investments;
        },
        // project parser
        parseActivity: function(data) {
                var activity = new _m_activity();
                activity.title = data.title;
                activity.path = data.path;
            return activity;
        },
        parseActivities: function(data) {
            var activities = [];
            for (var i = 0; i < data.length; i++) {
                var activity = this.parseActivity(data[i]);
                activities.push(activity);
            }
            return activities;
        },
        parseMessage: function(data) {
            var message = new _m_message();
            message.id=data.mid;
            message.title= data.title;
            message.date= data.time;
            message.content= data.content;
            message.type= data.type;
            message.status=data.status;
            message.path=data.path;
            return message;
        },
        parseMessages: function(data) {
            var messages = [];
            for (var i = 0; i < data.length; i++) {
                var message = this.parseMessage(data[i]);
                messages.push(message);
            }
            return messages;
        }
    }
})
