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
	
		id:"",
		title:"",
		tag:"1",
		feature:"1",
		duration:"15",
		limit:"1000",
		percentage:"5.00%",
		addition: "1.00%",
		progress: "60%",
		safety:[],
		total:"",
		remain:0,
		faqiren:"",
		dealer:"",
		exchange:"",
		agency:"",
		code:""
	}
	return product;
}
var _m_group = function () {
	// name: 深圳前海金融资产交易所
	var _m_group = {
		name:"",
		code:"",
		products: []
	};
	return _m_group;
}