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
        return safety.split(",").map(function(s) {
            var o = {};
            o[s] = config.safety[s];
            return o;
        })
    }
    var parseTag = function (tag) {
        if (tag) {
            return 1;
        }
        return 2;
    }
    return {
        // product parser
        parseProduct: function(data) {
            var product = new _m_product();
            product.id = data.productId;
            product.title = data.productName + data.productCode;
            product.feature = feature_parser(data.repaymentType);
            product.duration = data.investPeriod || "";
            product.limit = data.minInvestAmount + "元";
            product.percentage = data.annualRate + "%";
            product.addition = data.addRate || "";
            product.progress = data.totalInvestAmount / data.amount * 100 + "%";
            product.safety = safety_parser(data.safety);
            product.total = data.amount || "";
            product.remain = parseInt(data.amount) - parseInt(data.totalInvestAmount);
            product.tag = parseTag(product.remain);
            product.faqiren = data.initiator || "";
            product.dealer = data.underwriter || "";
            product.exchange = data.financialExchange || "";
            product.agency = data.guarantor || "";
            product.code = data.code || "";
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
            user.frozen = data.frozenAmount || "0";

            user.identify = data.idNo || "";
            user.telephone = data.cellphone || "";
            user.email = data.email || "";

            user.sex = config.sex[data.gender] || "男";
            user.is_marry = config.is_marry[data.maritalStatus] || "未婚";
            user.school = data.college || "";
            user.birthday = data.birthday || new Date("1990-01-01");
            user.degree = data.maxEducation || "本科生";
            user.address = data.homeAddress || "";
            user.industry = data.industry || "";
            user.scale = config.scales[data.corporateSize] || "1-100人";
            user.job = data.position || "工程师";
            user.income = data.salary || "5000以内";
            return user;
        },
        // eyuan
        parseEyuan:function (data) {
            var eyuan_group = new _m_eyuan_group(),
                eyuans = [];
            eyuan_group.remain = data.eyuanUsable || "0";

            for (var i=0,r=data.info;i<r.length;i++) {
                var eyuan = new _m_eyuan();
                eyuan.date = r[i].time.split(" ");
                eyuan.type = r[i].eyuanType;
                eyuan.amount = r[i].amount;
                eyuan.remain = r[i].surplusAmount;
                eyuans.push(eyuan);
            }

            eyuan_group.eyuans = eyuans;
            return eyuan_group;

        },
        parsePocket:function (data) {
            var pocket_group = new _m_pocket_group(),
                pockets = [];
            pocket_group.remain = data.bonus || "0";

            for (var i=0,r=data.info;i<r.length;i++) {
                var pocket = new _m_pocket();
                pocket.date = r[i].createTime.split(" ");
                pocket.expires = r[i].expiryTime.split(" ");
                pocket.type = r[i].type || "";
                pocket.money = r[i].amount || "";
                pocket.status = pocket.expires;
                pockets.push(pocket);
            }

            pocket_group.pockets = pockets;
            return pocket_group;

        },
        // bills
        parseBills:function (data) {
            var bills = [];
            for (var i=0,r=data;i<r.length;i++) {
                var bill = new _m_bill();
                bill.date = r[i].time;
                bill.type = r[i].fundType;
                bill.money = r[i].amount;
            }

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
        parseInvestment:function(data){
            var investment = new _m_investment();
            investment.name = data.productName;
            investment.money = data.investAmount;
            investment.rate = data.annualRate;
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
                Activities.push(activity);
            }
            return activities;
        },
    }
})