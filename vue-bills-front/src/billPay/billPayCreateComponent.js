const payNames = [
	'Luz',
	'Água',
	'internet',
	'Mercado',
	'Cartão de crédito',
	'Financiamento', 
	'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
	template: `
		<div>
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
		</div>
	`,
	data() {
		return {
			formType: 'insert',
			names: payNames,
			bill: new Bill()
		}
	},
	created(){
		if(this.$route.name == "billPayUpdate"){
			this.formType = "update";
			this.selectBill(this.$route.params.id);
		}
	},
	methods: {
		selectBill(id){
			BillPay.get({id: id}).then((response) => {
				this.bill = new Bill(response.data);
			});
		},
		submit(){
			if(this.formType == 'insert'){	
				BillPay.save({}, this.bill).then((response) => {
					this.$router.replace({ name: "billPayList" });
				});
			}else{
				BillPay.update({id: this.bill.id}, this.bill).then((response) => {
					this.$router.replace({ name: "billPayList" });
				});
			}
		}
	}
});