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
		<div class="container">
			<div class="row">
				<form action="" name="formConta">
					<div class="row">
						<div class="input-field col s4">
							<label>Vencimento:</label>
							<input type="date" class="datepicker" v-model="bill.date_due">
						</div>
						<div class="input-field col s4">
							<label>Valor:</label>
							<input type="text" v-model="bill.value">
						</div>
					</div>
					<div class="row">
						<label>Nome:</label>
						<select v-model="bill.name">
							<option v-for="opt in names" :value="opt">{{ opt }}</option>
						</select>
					</div>
					<div class="row">
					</div>
					<div class="row">
						<input type="submit" @click.prevent="submit">
					</div>
				</form>
			</div>
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
		$(document).ready(function() {
			$('.datepicker').pickadate({
				selectMonths: true // Creates a dropdown to control month
			});
		});
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