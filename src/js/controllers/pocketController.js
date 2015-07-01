var pocketController = function($scope,errorServices,myServices){
	var pocket = new _m_pocket();
	var pocket_group = new _m_pocket_group();
	pocket_group.remain = 0,
	pocket_group.pockets = [pocket];
	console.log(pocket_group)
	$scope.pocket_group = pocket_group;
	// myServices.pocket().then(function(data){
	// 	console.log(data)
	// 	if (data.respcode == config.request.SUCCESS) {

	// 	}
	// 	else {
	// 		errorServices.autoHide(data.message)
	// 	}
	// })
}