"use strict";

window.billDashboardComponent = Vue.extend({
	template: "\n\t\t<div>\n\t\t\t<h2>A Pagar: {{ billsToPay | currency }}</h2><br>\n\t\t\t<h2>A Receber: {{ billsToReceive | currency }}</h2>\n\t\t</div>\n\t",
	data: function data() {
		return {
			billsToPay: 0,
			billsToReceive: 0
		};
	},
	created: function created() {
		this.updateBillsList();
	},

	methods: {
		updateBillsList: function updateBillsList() {
			var _this = this;

			BillPay.query().then(function (response) {
				var billsPay = response.data;
				var sum = 0;
				billsPay.forEach(function (bill, index) {
					if (!bill.done) {
						sum += parseInt(bill.value);
					}
				});
				_this.billsToPay = sum;
			});
			BillReceive.query().then(function (response) {
				var billsReceive = response.data;
				var sum = 0;
				billsReceive.forEach(function (bill, index) {
					if (!bill.done) {
						sum += parseInt(bill.value);
					}
				});
				_this.billsToReceive = sum;
			});
		}
	}
});