// by dribehance <dribehance.kksdapp.com>
var eyuanMallController = function($scope, mallServices, errorServices, toastServices, localStorageService, config) {
    $scope.filter_category = {
        id:1
    }
    // category;
    $scope.categories = [{
        "id": 1,
        "parentId": null,
        "categoryName": "酒店"
    }, {
        "id": 2,
        "parentId": null,
        "categoryName": "餐厅"
    }, {
        "id": 3,
        "parentId": null,
        "categoryName": "养生会所"
    }, {
        "id": 13,
        "parentId": null,
        "categoryName": "天天向上2"
    }, {
        "id": 14,
        "parentId": null,
        "categoryName": "电子券"
    }, {
        "id": 15,
        "parentId": null,
        "categoryName": "美妆"
    }, {
        "id": 16,
        "parentId": null,
        "categoryName": "生活用品"
    }, {
        "id": 17,
        "parentId": null,
        "categoryName": "基础保养"
    }];
    // mallServices.queryCategory().then(function(data){
    //     if(data.respcode == config.request.SUCCESS ) {
    //         $scope.categories = data.result;   
    //     }
    //     else {
    //         errorServices.autoHide(data.result);
    //     }
    // })
    $scope.categoryFilter = function(item) {
        $scope.filter_category.id = item.id;
    }
    // items;
    $scope.emall_items = [{
        "summary": "尊享深圳希尔顿南海酒店大床房1晚＋1份免费早餐＋免费wifi＋更多优惠! 深圳蛇口希尔顿南海酒店地处南山区望海路",
        "logo": "http://192.168.16.20:80/resources/images/index/1.png",
        "goodsId": 1,
        "category": "酒店",
        "exchangePrice": 100,
        "categoryId": 1,
        "goodsName": "希尔顿南海酒店大床房1晚"
    }, {
        "summary": "天桥配套，免费晚风，免费路人围观，偶尔小费，拼人品，拼实力",
        "logo": "http://192.168.16.20:80/resources/images/index/1.png",
        "goodsId": 2,
        "category": "酒店",
        "exchangePrice": 233,
        "categoryId": 1,
        "goodsName": "二天一夜睡天桥体验"
    }, {
        "summary": "同顶观日出日落，吹自然高风，屏蔽所有信号",
        "logo": "http://192.168.16.20:80/resources/images/index/1.png",
        "goodsId": 3,
        "category": "酒店",
        "exchangePrice": 233,
        "categoryId": 1,
        "goodsName": "二天二夜梧桐山顶住宿"
    }, {
        "summary": "地王大夏，免费楼顶免费睡，深圳蛇口希尔顿南海酒店地处南山区望海路",
        "logo": "http://192.168.16.20:80/resources/images/index/1.png",
        "goodsId": 4,
        "category": "酒店",
        "exchangePrice": 1111,
        "categoryId": 1,
        "goodsName": "二天三夜睡地王"
    }];
    // $scope.emall_items = [];
    // $scope.page = {
    //  number:1,
    //  message:"点击加载更多",
    //  category_id: 1
    // }
    // $scope.loadMore = function() {
    //  if ($scope.no_more) {
    //      return;
    //  }
    //     toastServices.show();
    //     $scope.page.message ="正在加载...";
    //     mallServices.query($scope.page).then(function(data) {
    //         toastServices.hide();
    //         $scope.page.message ="点击加载更多";
    //         if (data.respcode == config.request.SUCCESS) {
    //             $scope.emall_items = $scope.emall_items.concat(data.result);
    //             $scope.no_more = data.result.length == 0;
    //         } else {
    //             errorServices.autoHide(data.message);
    //         }
    //         if ($scope.no_more) {
    //          $scope.page.message = "没有了";
    //         }
    //         $scope.page.number++;
    //     })

    // }
    // $scope.loadMore();
}
