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
    return {
        // product parser
        parseProduct: function(data) {
            var product = new _m_product();
            product.id = data.productId;
            product.title = data.productName + data.productCode;
            product.tag = "1";
            product.feature = feature_parser(data.repaymentType);
            product.duration = data.investPeriod || "";
            product.limit = data.minInvestAmount + "元";
            product.percentage = data.annualRate + "%";
            product.addition = data.addRate || "";
            product.progress = data.totalInvestAmount / data.amount * 100 + "%";
            product.safety = safety_parser(data.safety);
            product.total = data.amount || "";
            product.remain = parseInt(data.amount) - parseInt(data.totalInvestAmount);
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
                var project = new _m_product();
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
            user.id = data.id || "",
            user.username = data.username || "",
            user.nickname = data.nickName || "",
            user.realname = data.realName || "",
            user.avatar = data.userImg || "",

            user.total = data.netAsset || "0",
            user.earning = data.incomeAmount || "0",
            user.frozen = data.frozenAmount || "0",

            user.identify = "",
            user.telephone = "",
            user.email = "",

            user.sex = this.parseSex(data.sex),
            user.birthday = "1990-01-01",
            user.degree = "小学毕业",
            user.address = "",
            user.industry = "",
            user.scale = "",
            user.job = "",
            user.income = ""
        },
        parseSex:function(sex){
            var sex = {
                "1":"男",
                "2":"女"
            }
            return sex[sex]
        }
    }
})
