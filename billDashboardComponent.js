window.billDashboardComponent = Vue.extend({
	template: `
		<div>
			<h2>A Pagar: {{ billsToPay | currency }}</h2><br>
			<h2>A Receber: {{ billsToReceive | currency }}</h2>
		</div>
	`,
	data: function(){
		return {
			billsPay: this.$root.$children[0].billsPay,
			billsReceive: this.$root.$children[0].billsReceive
		}
	},
	computed: {
		billsToPay: function(){
			var bills = this.billsPay;
			var sum = 0;
			bills.forEach(function(bill, index){
				if(!bill.done){
					sum += bill.value;
				}
			});
			return sum;
		},
		billsToReceive: function(){
			var bills = this.billsReceive;
			var sum = 0;
			bills.forEach(function(bill, index){
				if(!bill.done){
					sum += bill.value;
				}
			});
			return sum;
		}
	}
});