angular.module('ExpenseSrv', []).service('expenseService', ['clientPropertiesService', 'dateService', 'expenseFactory', '$filter', function(clientPropertiesService, dateService, expenseFactory, $filter) {
	
	// Min date and Max date are dependent on the expense top date.
	// Make sure the month limit in modal window same as top date.
	var date_modal;

	this.saveModalDate = function(date) {
		date_modal = date;
	};

	this.getModalDate = function() {
		return date_modal;
	};

	var currentReportsDate = null;
	this.setCurrentReportDate = function(date) {
		currentReportsDate = date;
	};

	this.getCurrentReportDate = function() {
		return currentReportsDate;
	};

	// Get drop down items in modal depending on income or expense
	this.getItems = function(flag) {
		if(flag.toUpperCase() === clientPropertiesService.getIncomeStr().toUpperCase()) {
			return clientPropertiesService.getIncomeItems();
		} else {
			return clientPropertiesService.getExpenseItems();
		}
	};

	// fetch all transactions
	this.fetch = function() {
		expenseFactory.AllTrans.query(function(data) {
			if(data && data.length > 0) {
				console.log(data);
				return data;
			}
		});
	};

	// Income
	this.calIncome = function(data) {
		var totalIncome = 0;
		for(i = 0; i < data.length; i++) {
			if(data[i].incorexp.toUpperCase() === clientPropertiesService.getIncomeStr().toUpperCase()) {
				totalIncome += parseInt(data[i].amount);
			}
		}
		return totalIncome;
	};

	// fetch expense
	this.calExpense = function(data) {
		var totalExpense = 0;
		for(i = 0; i < data.length; i++) {
			if(data[i].incorexp.toUpperCase() === clientPropertiesService.getExpenseStr().toUpperCase()) {
				totalExpense += parseInt(data[i].amount);
			}
		}
		return totalExpense;
	};


	this.calPieChartData = function(data) {
		var pieData = new Array();
		for(i = 0; i < data.length; i++) {
			var success = false;
			if(data[i].incorexp.toUpperCase() === clientPropertiesService.getExpenseStr().toUpperCase()) {
				var key = data[i].type;
				var value = parseInt(data[i].amount);

				/* We need group expense by type. 
				   So we need to check whether it is already present in the chart or not.
				   If present then add the amount to the existing value for this item else create one and push.
				*/
				for(var j = 0; j < pieData.length; j++) {
					if(pieData[j].key.toUpperCase() === key.toUpperCase()) {
						pieData[j].value += value;
						success = true;
						break;
					}
				}
				if(!success) {
					var tempData = {'key' : key, 'value': value};
					pieData.push(tempData);
				}
			}
		}
		return pieData;
	};


	this.calBarChartData = function(data) {
		var chart_income = 0;
		var chart_expense = 0;
		var chart_savings = 0;
		var chart_data = new Array();

		for(i = 0; i < data.length; i++) {
			if(data[i].incorexp.toUpperCase() === clientPropertiesService.getIncomeStr().toUpperCase()) {
				chart_income += parseInt(data[i].amount);
			} else if(data[i].incorexp.toUpperCase() === clientPropertiesService.getExpenseStr().toUpperCase()) {
				chart_expense += parseInt(data[i].amount);
			}
		}
		chart_savings = parseInt(chart_income) - parseInt(chart_expense);
		if(chart_savings < 0) {
			chart_savings = 0;
		}

		chart_data = [
			{
				'key': "Cumulative Return",
				'values': [
					{'label': clientPropertiesService.getIncomeStr(), 'value': chart_income},
					{'label': clientPropertiesService.getExpenseStr(), 'value': chart_expense},
					{'label': clientPropertiesService.getSavingsStr(), 'value': chart_savings}
				]
			}
		];

		return chart_data;
	};


	var expSortColumn = 'date';
	var reverseSort = false;
	this.getExpSortCol = function() {
		return expSortColumn;
	};

	this.setExpSortCol = function(sortCol) {
		expSortColumn = sortCol;
	};

	this.getReverseSort = function() {
		return reverseSort;
	};

	this.setReverseSort = function(revSort) {
		reverseSort = revSort;
	};


	this.validateRecord = function(record) {
		var status = new Object();

		if(record.amount === undefined || record.amount.trim().length == 0) {
			status.msg = 'Amount cannot be empty.';
			status.flag = false;
		} else if(record.type === clientPropertiesService.getDefaultType()) {
			status.msg = 'Please select a valid type from drop down menu.';
			status.flag = false;
		} else {
			status.flag = true;
		}

		return status;
	}

	this.calSavings = function(income, expense) {
		if(income > expense) {
			return income - expense;
		} else {
			return 0;
		}
	}

	this.formatDateColumn = function(records) {
		var formatedRecords = [];

		angular.copy(records, formatedRecords);

		for(i = 0; i < formatedRecords.length; i++) {
			var orgDate = formatedRecords[i].date;
			var formatedDate = $filter('dateFilter')(orgDate);
			formatedRecords[i].date = formatedDate;
		}

		return formatedRecords;
	}

	this.preparePdfMap = function(displayDate, totalIncome, totalExpense) {
        var dateStr = dateService.getMonthName( dateService.getMonth(displayDate) ) + '-' + dateService.getYear(displayDate);

		var hashMap = {};
        hashMap['dateStr'] = dateStr;
        hashMap['totalIncome'] = totalIncome;
        hashMap['totalExpense'] = totalExpense;
        hashMap['totalSaving'] = this.calSavings(totalIncome, totalExpense);

        return hashMap;
	}

	var currentPage = 1;
	this.setCurrentPage = function(pageNo) {
		currentPage = pageNo;
	}

	this.getCurrentPage = function() {
		return currentPage;
	}

}]);