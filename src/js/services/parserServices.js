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
            product.progress = parseFloat(data.totalInvestAmount || "0") / data.amount * 100;
            product.safety = safety_parser(data.safety);
            product.total = data.amount || "";
            product.already = data.totalInvestAmount || "0";
            product.remain = parseFloat(data.amount) - (parseFloat(data.totalInvestAmount) || "0");
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
        },
    }
})
