import { BillPay } from './resources.js';
import { BillReceive } from './resources.js';

export default {
	template: `
		<div>
			<h2>A Pagar: {{ billsToPay | currency }}</h2><br>
			<h2>A Receber: {{ billsToReceive | currency }}</h2>
		</div>
	`,
	data(){
		return {
			billsToPay: 0,
			billsToReceive: 0
		}
	},
	created(){
		this.updateBillsList();
	},
	methods: {
		updateBillsList(){
			BillPay.query().then((response) => {
				let billsPay = response.data;
				let sum = 0;
				billsPay.forEach((bill, index) => {
					if(!bill.done){
						sum += parseInt(bill.value);
					}
				});
				this.billsToPay = sum;
			});
			BillReceive.query().then((response) => {
				let billsReceive = response.data;
				let sum = 0;
				billsReceive.forEach((bill, index) => {
					if(!bill.done){
						sum += parseInt(bill.value);
					}
				});
				this.billsToReceive = sum;
			});
		},
	}
};