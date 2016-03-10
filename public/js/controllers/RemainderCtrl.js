angular.module('RemainderCtrl', []).controller('RemainderController', 
								function($scope, 
										 $uibModal,
										 remainderProperties, 
										 clientProperties, 
										 clientService,
										 remainderFactory,
										 smsFactory) {

	/***************************** DATE OPTIONS - START *****************************/
	$scope.format = remainderProperties.getDateFormat();
	$scope.remainDate = new Date();
	$scope.open = function() {
        $scope.status.opened = true;
    };
    $scope.status = {
        opened: false
    };
    $scope.dateOptions = {
		showWeeks: false
	}
	/***************************** DATE OPTIONS - END *****************************/

	/***************************** Pagination - START *****************************/
	$scope.pageSize = remainderProperties.getPageSize();
	/***************************** Pagination - END *****************************/

	$scope.remainderHeading = remainderProperties.getMsgAllRemainders();
	$scope.noRemainders = remainderProperties.getMsgNoRemainders();

	$scope.initalize = function() {
		populateData();
	}

	$scope.initalize();

	/**
        NOTE: When ever income/expense/edit/remainder dialog is been opened make sure you set 
        the currentServiceType in clientService to the service type which you are using.
    */
	$scope.addRemainder = function() {

		clientService.setCurrentServiceType(clientProperties.getRemaindersService());

		smsFactory.GetMobileNum.get({}, function(response) {

			var record = new Object();
			if(response.result === true) {
				record.mobile = response.data.mobile;				
			}
			
			record.serviceType = clientProperties.getRemaindersService();
			record.date = new Date();
			record.headerValue = remainderProperties.getAddRemStr();
			record.myTime = new Date();

			$uibModal.open({
				templateUrl: 'remainder_dialog.html',
				controller: 'ModalController',
				backdrop: 'static',
				resolve: {
					record: record
				}
			}).result.then(function(saveRecord) {
				remainderFactory.AddRemainder.save({}, saveRecord, function(response) {
					if(response.result === true) {
						if(clientService.equals(saveRecord.via, remainderProperties.getSmsStr())) {
							addOrUpdateMobile(saveRecord);
						}
						refreshData();
					} else {
						alertDialog(remainderProperties.getSaveRemFailedStr());
					}
				});
			});
		});
	}

	function refreshData() {
		populateData();
	}

	function populateData() {
		remainderFactory.AllRemainders.query({}, function(data) {
			if(undefined != data && data.length > 0) {
				$scope.records = data;
			} else {
				$scope.records = [];
			}
		});
	}

	$scope.editRemainder = function(editRecord) {

		clientService.setCurrentServiceType(clientProperties.getRemaindersService());
		editRecord.headerValue = remainderProperties.getEditRemStr();
		editRecord.serviceType = clientProperties.getRemaindersService();

		$uibModal.open({
			templateUrl: 'remainder_dialog.html',
			controller: 'ModalController',
			backdrop: 'static',
			resolve: {
				record: editRecord
			}
		}).result.then(function(editedRecord) {
			// save the record which is edited.
			remainderFactory.UpdateByRemId.save({id: editedRecord._id}, editedRecord, function(response) {
				if(clientService.equals(editedRecord.via, remainderProperties.getSmsStr())) {
					addOrUpdateMobile(editedRecord);
				}
				refreshData();
			});
		});	
	}

	$scope.deleteRemainders = function(deleteFlag, record) {
		confirmDelete(clientProperties.getRemaindersService(), deleteFlag, record);
	}

	function confirmDelete(serviceType, deleteFlag, record) {
        var data = new Object();
        data.serviceType = serviceType;
        data.flag = deleteFlag;

        $uibModal.open({
            templateUrl: 'delete_dialog.html',
            controller: 'deleteController',
            backdrop: 'static',
            // keyboard: false,
            resolve: {
                data: data
            }
        }).result.then(function() {
            if(deleteFlag.toUpperCase() === remainderProperties.getAllStr()) {
            	deleteAllRem();
            } else {
            	deleteOneRem(record);
            }
        });	
	}

	function deleteOneRem(deleteRecord) {
		remainderFactory.RemoveRemById.delete({id: deleteRecord._id}, function(response) {
			if(response.result.toUpperCase() === clientProperties.getFailure().toUpperCase()) {
				alertDialog(remainderProperties.getDelRemFailedStr());
			} else{
				refreshData();
			}
		});
	}

	function deleteAllRem() {
		remainderFactory.RemoveAllRem.delete(function(response) {
			if(response.result.toUpperCase() === clientProperties.getFailure().toUpperCase()) {
				alertDialog(remainderProperties.getDelRemFailedStr());
			} else{
				refreshData();
			}
		});
	}

	function alertDialog(actionResultType) {
        var newData = new Object();
        newData.serviceType = clientProperties.getRemaindersService();
        newData.flag = actionResultType;

        $uibModal.open({
            templateUrl: 'alert_dialog.html',
            controller: 'ConfirmController',
            // size: 'sm', // for small window use 'sm'. For large window use 'lg'
            backdrop: 'static',
            // keyboard: false,
            resolve: {
                data: newData
            }
        });
    }

    function addOrUpdateMobile(record) {
    	// also if mobile number is added then add or update it on the phone number colletion.
		smsFactory.AddUpdateMobile.save({}, record, function(response) {
			
		});	
    }

});