angular.module('ExpenseCtrl', []).controller('ExpenseController', 
                    function($scope, $location, $state, $uibModal, $localStorage, 
                             expenseService, clientPropertiesService, expenseFactory, 
                             dateService, loginService, pdfService, modalService) {

    $scope.format = clientPropertiesService.getDateFormat();
    $scope.pageSize = clientPropertiesService.getExpPageSize();

    $scope.open = function() {
        $scope.status.opened = true;
    };

    $scope.status = {
        opened: false
    };

    $scope.initialize = function() {
        if($localStorage.currentReportDate == null) {
            $localStorage.currentReportDate = new Date();
        }

        expenseService.setCurrentReportDate(new Date($localStorage.currentReportDate));
        $scope.reportDate = expenseService.getCurrentReportDate();;
        $scope.report_display_date = $scope.reportDate;

        // save the date in the service as we will be using this in Modal dialog.
        expenseService.saveModalDate($scope.reportDate);
        populateData($scope.report_display_date);

        /* Charts code BEGIN */
        $scope.pieChartOptions = clientPropertiesService.getPieChartOptions();
        $scope.barChartOptions = clientPropertiesService.getBarChartOptions();
        /* Charts code END */
    };

    $scope.initialize();

    $scope.go = function(flag) {
        if(!($scope.report_display_date == undefined || $scope.report_display_date == null)) {
            
            // set the new value to local storage.
            $localStorage.currentReportDate = $scope.reportDate;
            expenseService.setCurrentReportDate(new Date($localStorage.currentReportDate));   

            $scope.report_display_date = expenseService.getCurrentReportDate();

            // When ever date is been refreshed then we need to use the same date in Modal too.
            expenseService.saveModalDate($scope.reportDate);
            populateData($scope.report_display_date);
        }
    };

    function populateData(date) {

        var year = dateService.getYear(date);
        var month = dateService.getMonth(date);

        var sDate = dateService.createDate(year, month, 0);
        var sDate = dateService.setToFirstDayOfMonth(sDate);

        var eDate = dateService.createDate(year, month, 0);

        // load dialog.
        loadingDialog();
        
        expenseFactory.AllTransByDate.query( {sDate : sDate, eDate : eDate}, function(data) {
            if(data && data.length > 0) {
                $scope.records = data;
                setIncomeAndExpense(data);
                setChartData(data);
            } else {
                $scope.totalIncome = 0;
                $scope.totalExpense = 0;
                $scope.records = [];
                setChartData(new Object());
            }
            // stop loading dialog
            modalService.closeAllModal();
        });
        
    }

    function setIncomeAndExpense(data) {
        $scope.totalIncome = expenseService.calIncome(data);
        $scope.totalExpense = expenseService.calExpense(data);
    }

    function setChartData(data) {
        $scope.pieChartData = expenseService.calPieChartData(data);
        $scope.pieApi.refresh(); 

        $scope.barChartData = expenseService.calBarChartData(data);
        $scope.barApi.refresh();
    }

	$scope.openTransactionModal = function(flag) {
        var record = new Object();
        // default value of drop down menu
        record.type = 'Type';
        if(flag === clientPropertiesService.getIncomeStr()) {
            record.incorexp = 'Income';
        } else {
            record.incorexp = 'Expense';
        }

        // set the record date as the expense report month.
        record.date = $scope.report_display_date;

		$uibModal.open({
			templateUrl: 'transaction_dialog.html',
			controller: 'ModalController',
			backdrop: 'static',
            // keyboard: false, 
			resolve: {record: record}
		}).result.then(function(newRecord) {
            if(loginService.getLoginStatus()) {
                saveRecord(newRecord);
            } else {
                $location.url('/login');
            }
        });
	};

    function saveRecord(newRecord) {
        expenseFactory.AddTrans.save({}, newRecord, function(data) {
            populateData($scope.report_display_date);
        }); 
    }

	$scope.openEditModal = function(editRecord) {
		$uibModal.open({
			templateUrl: 'edit_dialog.html',
			controller: 'ModalController',
			backdrop: 'static',
            // keyboard: false,
			resolve: { record: editRecord }
		}).result.then(function(updatedRecord) {
            // angular.extend(editRecord, updatedRecord);
            updateRecord(updatedRecord);
        });
	};

    function updateRecord(updatedRecord) {
        var toUpdateId = updatedRecord._id;
        expenseFactory.UpdateTransById.save({id: toUpdateId}, updatedRecord, function(data) {
        });
    }

    $scope.delete = function(record) {
        $uibModal.open({
            templateUrl: 'delete_dialog.html',
            controller: 'ModalController',
            backdrop: 'static',
            // keyboard: false,
            resolve: {
                record: record
            }
        }).result.then(function() {
            deleteRecord(record._id);
        });
    };

    function deleteRecord(deleteId) {
        expenseFactory.DeleteById.delete({id: deleteId}, function(data) {
            populateData($scope.report_display_date);
        });
    }

    $scope.checkDesc = function(desc) {
        if( desc && desc.trim().length > 0) {
            return true;
        }
        return false;
    };

    $scope.sortColumn = expenseService.getExpSortCol();
    $scope.reverseSort = expenseService.getReverseSort();
    $scope.sortData = function(column) {
        $scope.sortColumn = column;
        expenseService.setExpSortCol(column);
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        expenseService.setReverseSort($scope.reverseSort);
    }

    $scope.getColSortClass = function(column) {
        if($scope.sortColumn == column) {
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up';    
        } else {
            return '';
        }
    }

    function valTransData(record) {
        var date = record.data;
        var amount = record.amount;
        var type = record.type;

        var valObj = new Object();
        valObj.result = true;

        if(date == undefined || date != null || date.trim().length == 0) {
            valObj.result = false;
            valObj.msg = clientPropertiesService.getMsgTransDateMissing();
        }

        if(amount != undefined || amount != null || amount.trim().length == 0) {
            valObj.result = false;
            valObj.msg = clientPropertiesService.getMsgTransAmountMissing();
        }

        if(type != undefined || type != null || type === clientPropertiesService.getDefaultType()) {
            valObj.result = false;
            valObj.msg = clientPropertiesService.getMsgTransTypeMissing();
        }

        return valObj;
    }

    $scope.confirmAction = function(flag) {
        var date = $scope.report_display_date;
        var data = new Object();
        data.flag = flag;
        data.month = dateService.getMonthName( dateService.getMonth(date) );
        data.year = dateService.getYear(date);
        data.email = loginService.getUserEmail();

        $uibModal.open({
            templateUrl: 'confirm_dialog.html',
            controller: 'ConfirmController',
            backdrop: 'static',
            // keyboard: false,
            resolve: {
                data: data
            }
        }).result.then(function() {
            if(flag == clientPropertiesService.getDownloadStr()) {
                downloadPdf();
            } else if(flag == clientPropertiesService.getEmailStr()) {
                sendEmail();
            }
        });
    };

    function downloadPdf() {
        if(loginService.getLoginStatus()) {
            if($scope.records && $scope.records.length > 0) {

                $scope.loading_download = true;

                var hashMap = expenseService.preparePdfMap($scope.report_display_date, $scope.totalIncome, $scope.totalExpense);
                var formatedRecords = expenseService.formatDateColumn($scope.records);
                var doc = pdfService.createPdf(loginService.getUserName(), formatedRecords, hashMap);
                var fileName = "Expense_Reporting_" + hashMap['dateStr'] + '.pdf';

                $scope.loading_download = false;
                // save the output file.
                doc.save(fileName);
            }
        }     
    };

    function sendEmail() {
        if(loginService.getLoginStatus()) {
            if($scope.records && $scope.records.length > 0) {

                $scope.loading_mail = true;

                var hashMap = expenseService.preparePdfMap($scope.report_display_date, $scope.totalIncome, $scope.totalExpense);
                var formatedRecords = expenseService.formatDateColumn($scope.records);
                var doc = pdfService.createPdf(loginService.getUserName(), formatedRecords, hashMap);
                var fileName = "Expense_Reporting_" + hashMap['dateStr'] + '.pdf';

                var uploadData = new Blob([doc.output()], {
                    type: 'application/pdf'
                });

                var formData = new FormData();
                formData.append("pdf", uploadData, fileName);

                formData.append('dateStr', hashMap['dateStr']);
                formData.append('toEmail', loginService.getUserName());

                var request = new XMLHttpRequest();
                request.open("POST", "/mailapi/sendmail");
                request.send(formData);

                request.onreadystatechange = function() {
                    if (request.readyState == 4 && request.status == 200) {
                       $scope.loading_mail = false;                        
                       alertDialog(request.responseText, clientPropertiesService.getEmailStr());
                    }
                };
            }
        }
    }

    function alertDialog(response, type) {

        var newData = new Object();
        newData.flag = clientPropertiesService.getAlertStr();
        newData.status = response;
        newData.type = type;

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
    };


    function loadingDialog() {

        var newData = new Object();
        newData.flag = clientPropertiesService.getLoadingStr();

        $uibModal.open({
            templateUrl: 'loading_dialog.html',
            controller: 'ConfirmController',
            // size: 'sm', // for small window use 'sm'. For large window use 'lg'
            backdrop: 'static',
            keyboard: false,
            resolve: {
                data: newData
            }
        });  
    }
});