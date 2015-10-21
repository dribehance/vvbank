// by dribehance <dribehance.kksdapp.com>
var shoppingcartController = function($scope, $rootScope, $location, shoppingCartServices, errorServices, toastServices, localStorageService, config) {
    $rootScope.page_title = "e圆商城|购物车";
    $scope.input = {};
    toastServices.show();
    shoppingCartServices.query().then(function(data) {
        toastServices.hide()
        if (data.respcode == config.request.SUCCESS) {
            $scope.items = data.result;
            $scope.items = angular.forEach($scope.items, function(item) {
                item.checked = true;
                if (item.status == 1) {
                    item.exchangPrice = 0;
                }
                if (item.goodStatus == '-1') {
                    item.checked = false;
                }
            });
        } else {
            errorServices.autoHide(data.message);
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
                sum += item.exchangPrice * item.carNumber;
            }
        });
        return sum;
    };
    $scope.calculate_price = function(item) {
            return item.exchangPrice * item.carNumber;
        }
        // calculate selected item;
    $scope.selected_items = function() {
        var count = 0;
        angular.forEach($scope.items, function(item) {
            if (item.checked) {
                count++;
            }
        });
        return count;
    };
    // amount control
    $scope.minus = function(item) {
        if (item.carNumber == 1 || item.carNumber < 1 || item.status == "1") {
            return;
        }
        var current = item.carNumber;
        item.carNumber--;
        shoppingCartServices.modify({
            "quantity": item.carNumber,
            "car_id": item.carId,
            "goods_id": item.goodsId
        }).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                // errorServices.autoHide(data.message)        
            } else {
                errorServices.autoHide(data.message);
                item.carNumber = current;
            }
        })
        return item.carNumber;
    }
    $scope.plus = function(item) {
        if (item.carNumber == item.goodsNumber || item.carNumber > item.goodsNumber) {
            errorServices.autoHide("库存上限")
            return;
        }
        if (item.status == "1") return;
        var current = item.carNumber;
        item.carNumber++;
        shoppingCartServices.modify({
            "quantity": item.carNumber,
            "car_id": item.carId,
            "goods_id": item.goodsId
        }).then(function(data) {
            if (data.respcode == config.request.SUCCESS) {
                // errorServices.autoHide(data.message)        
            } else {
                errorServices.autoHide(data.message);
                item.carNumber = current;
            }
        })
        return item.carNumber;
    }
    $scope.remove = function() {
        var car_ids = [];
        car_ids = $scope.items.filter(function(item) {
            return item.checked && item.status != 1;
        }).map(function(item) {
            return item.carId;
        }).join(",");
        if (car_ids.length == 0) {
            errorServices.autoHide("未选中任何商品！")
            return;
        }
        toastServices.show();
        shoppingCartServices.remove({
            car_id: car_ids
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                $scope.items = $scope.items.filter(function(item) {
                    return car_ids.indexOf(item.carId) == -1;
                })
                errorServices.autoHide(data.message)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.removeById = function(item) {
        var car_id = item.carId;
        toastServices.show();
        shoppingCartServices.remove({
            car_id: car_id
        }).then(function(data) {
            toastServices.hide()
            if (data.respcode == config.request.SUCCESS) {
                $scope.items = $scope.items.filter(function(item) {
                    return car_id != item.carId;
                })
                errorServices.autoHide(data.message)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.input.all = true;
    $scope.$watch("input.all", function(n, o) {
        if (n == true) {
            angular.forEach($scope.items, function(item) {
                if (item.goodStatus != -1) {
                    item.checked = true;
                }
            })
        } else {
            angular.forEach($scope.items, function(item) {
                if (item.goodStatus != -1) {
                    item.checked = false;
                }
            })
        }
    }, true)
    $scope.pay = function() {
        var car_ids = [];
        car_ids = $scope.items.filter(function(item) {
            return item.checked;
        }).map(function(item) {
            return item.carId;
        }).join(",");
        var url = "/eyuan_mall/payment?car_ids=" + car_ids;
        if (!car_ids) {
            return;
        }
        $location.url(url)
    }
}
