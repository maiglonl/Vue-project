window.billDashboardComponent = Vue.extend({
	template: `
		<div>
			<h2>A Pagar: {{ billsToPay | currency }}</h2><br>
			<h2>A Receber: {{ billsToReceive | currency }}</h2>
		</div>
	`,
	data: function(){
		return {
			billsToPay: 0,
			billsToReceive: 0
		}
	},
	created: function(){
		this.updateBillsList();
	},
	methods: {
		updateBillsList: function(){
			var self = this;
			BillPay.query().then(function(response){
				var billsPay = response.data;
				var sum = 0;
				billsPay.forEach(function(bill, index){
					if(!bill.done){
						sum += parseInt(bill.value);
					}
				});
				self.billsToPay = sum;
			});
			BillReceive.query().then(function(response){
				var billsReceive = response.data;
				var sum = 0;
				billsReceive.forEach(function(bill, index){
					if(!bill.done){
						sum += parseInt(bill.value);
					}
				});
				self.billsToReceive = sum;
			});
		},
	}
});