window.billReceiveCreateComponent = Vue.extend({
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
				'Salário',
				'Auxilio Educação',
				'Vale Alimentação'
			],
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			}
		}
	},
	created: function (){
		if(this.$route.name == "billReceiveUpdate"){
			this.formType = "update";
			this.selectBill(this.$route.params.id);
		}
	},
	methods: {
		selectBill: function(id){
			var self = this;
			BillReceive.get({id: id}).then(function(response){
				self.bill = response.data;
			});
		},
		submit: function(){
			if(this.formType == 'insert'){	
				var self = this;
				BillReceive.save({}, this.bill).then(function(response){
					self.$router.replace({ name: "billReceiveList" });
				});
			}else{
				var self = this;
				BillReceive.update({id: this.bill.id}, this.bill).then(function(response){
					self.$router.replace({ name: "billReceiveList" });
				});
			}
		}
	}
});