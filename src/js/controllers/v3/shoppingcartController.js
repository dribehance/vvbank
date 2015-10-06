// by dribehance <dribehance.kksdapp.com>
var shoppingcartController = function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    // static
    $scope.items = [{
        "goodsId": 1,
        "carId": 22,
        "exchangPrice": 100,
        "status": "1",
        "carNumber": 1,
        "goodsName": "希尔顿南海酒店大床房1晚"
    }, {
        "goodsId": 1,
        "carId": 26,
        "exchangPrice": 100,
        "status": "0",
        "carNumber": 1,
        "goodsName": "希尔顿南海酒店大床房1晚"
    }]
    $scope.items = angular.forEach($scope.items, function(item) {
        item.amount = 0;
        item.checked = false;
    });
    // toggle check shopping cart item
    $scope.toggle = function(item) {
        return item.checked = !item.checked;
    };
    // calculate total price;
    $scope.sum = function() {
        var sum = 0;
        angular.forEach($scope.items, function(item) {
            if (item.checked) {
                sum += item.exchangPrice;
            }
        });
        return sum;
    };
    // amount control
    $scope.minus = function(item) {
        if (item.amount == 0) {
            return;
        }
        return item.amount--;
    }
    $scope.plus = function(item) {
        return item.amount++;
    }
    $scope.remove = function() {
        var goods_ids = [];
        goods_ids = $scope.items.filter(function(item) {
            return item.checked;
        }).map(function(item) {
            return item.goodsId;
        }).join(",");
        if (goods_ids.length == 0) {
        	errorServices.autoHide("未选中任何商品！")
            return;
        }
        console.log(goods_ids)
    }
    $scope.$watch("input.all", function(n, o) {
    	if (n == true) {
	        angular.forEach($scope.items,function(item) {
	        	item.checked = true;
	        })
    	}
    	else {
    		angular.forEach($scope.items,function(item) {
	        	item.checked = false;
	        })
    	}
    },true)
}
