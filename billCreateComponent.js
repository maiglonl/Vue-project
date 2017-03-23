window.billCreateComponent = Vue.extend({
	template: `
		<form action="" name="formConta">
			<label>Vencimento:</label>
			<input type="date" v-model="bill.date_due"><br>
			<label>Nome:</label>
			<select v-model="bill.name">
				<option v-for="opt in names" :value="opt">{{ opt }}</option>
			</select><br>
			<label>Valor:</label>
			<input type="text" v-model="bill.value"><br>
			<input type="submit" @click.prevent="submit">
		</form>
	`,
	data: function () {
		return {
			formType: 'insert',
			names: [
				'Luz',
				'Água',
				'internet',
				'Mercado',
				'Cartão de crédito',
				'Financiamento', 
				'Gasolina'
			],
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			}
		}
	},
	created: function () {
		eventHub.$on('changeFormType', this.changeFormType);
		eventHub.$on('selectBill', this.selectBill);
		eventHub.$on('resetBill', this.resetBill);
		eventHub.$on('payBill', this.payBill);
	},
	beforeDestroy: function () {
		eventHub.$off('changeFormType', this.changeFormType);
		eventHub.$off('selectBill', this.selectBill);
		eventHub.$off('resetBill', this.resetBill);		
		eventHub.$off('payBill', this.payBill);		
	},
	methods: {
		changeFormType: function(obj){
			this.formType = obj.type;
		},
		selectBill: function(obj){
			this.bill = obj.bill;
		},
		resetBill: function(){
			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			};
		},
		payBill: function(obj){
			this.bill = obj.bill;
			if(this.bill.done){
				this.bill.done = 0;
			}else{
				this.bill.done = 1;
			}
			this.resetBill();
		},
		submit: function(){
			if(this.formType == 'insert'){
				eventHub.$emit("postBill", { bill: this.bill });
			}
			eventHub.$emit("changeView", { view: 0 });
			this.resetBill();
		},
	}
});