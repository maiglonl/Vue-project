window.billPayCreateComponent = Vue.extend({
	template: `
		<form action="" name="formConta">
			<label>Vencimento:</label>
			<input type="date" v-model="bill.date"><br>
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
				date: '',
				name: '',
				value: 0,
				done: 0
			}
		}
	},
	created: function (){
		if(this.$route.name == "billPayUpdate"){
			this.formType = "update";
			this.selectBill(this.$route.params.id);
			return;
		}
		this.formType = "insert";
	},
	methods: {
		selectBill: function(id){
			var bills = this.$root.$children[0].billsPay;
			this.bill = bills[id];
		},
		submit: function(){
			if(this.formType == 'insert'){
				this.$root.$children[0].billsPay.push(this.bill);
			}
			this.$router.replace({ name: "billPayList" });
		}
	}
});