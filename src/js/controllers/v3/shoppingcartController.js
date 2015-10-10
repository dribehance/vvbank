// by dribehance <dribehance.kksdapp.com>
var shoppingcartController = function($scope, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    toastServices.show();
    shoppingCartServices.query().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.items = data.result;
            $scope.items = angular.forEach($scope.items, function(item) {
                item.checked = false;
            });
        } else {
            errorServices.autoHide("服务器错误");
        }
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
    // calculate selected item;
    $scope.selected_items = function() {
            var count = 0;
            angular.forEach($scope.items, function(item) {
                if (item.checked) {
                    count++;
                }
            });
            return count;
        }
        // amount control
    $scope.minus = function(item) {
        if (item.carNumber == 0) {
            return;
        }
        return item.carNumber--;
    }
    $scope.plus = function(item) {
        if (item.carNumber == item.goodsNumber || item.carNumber > item.goodsNumber) {
            errorServices.autoHide("库存上限")
            return;
        }
        return item.carNumber++;
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
        toastServices.show();
        shoppingCartServices.remove({
            car_id:goods_ids
        }).then(function(data){
            toastServices.hide()
            if(data.respcode == config.request.SUCCESS) {
                errorServices.autoHide(data.message)       
            }
            else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.$watch("input.all", function(n, o) {
        if (n == true) {
            angular.forEach($scope.items, function(item) {
                item.checked = true;
            })
        } else {
            angular.forEach($scope.items, function(item) {
                item.checked = false;
            })
        }
    }, true)
}
