<template>
	<div class="container">
		<div class="row">
			<form action="" name="formConta">
				<div class="row">
					<div class="input-field col s6">
						<label class="active">Vencimento:</label>
						<input type="text" v-model="bill.date_due">
					</div>
					<div class="input-field col s6">
						<label class="active">Valor:</label>
						<input type="text" v-model="bill.value">
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6">
						<label class="active">Nome:</label>
						<select v-model="bill.name" id="nameInput" class="browser-default">
							<option disabled>Selecione uma conta</option>
							<option v-for="opt in names" :value="opt">{{ opt }}</option>
						</select>
					</div>
					<div class="input-field col s6">
						<input type="checkbox" v-model="bill.done" id="doneInput"/>
						<label for="doneInput">Recebida</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input type="submit" @click.prevent="submit" class="btn btn-large right">
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { BillReceive } from '../resources.js';
	import { Bill } from '../bill.js';

	const receiveNames = [
		'Salário',
		'Auxilio Educação',
		'Vale Alimentação'
	];

	export default {
		data() {
			return {
				formType: 'insert',
				names: receiveNames,
				bill: new Bill()
			}
		},
		mounted(){
			$("#nameInput").material_select();
			/*$('.datepicker').pickadate({
				selectMonths: true // Creates a dropdown to control month
			});*/
		},
		created(){
			if(this.$route.name == "billReceiveUpdate"){
				this.formType = "update";
				this.selectBill(this.$route.params.id);
			}
		},
		methods: {
			selectBill(id){
				BillReceive.get({id: id}).then((response) => {
					this.bill = new Bill(response.data);
				});
			},
			submit(){
				if(this.formType == 'insert'){	
					BillReceive.save({}, this.bill).then((response) => {
						this.$router.replace({ name: "billReceiveList" });
						Materialize.toast("Conta criada com sucesso!", 3000);
					});
				}else{
					BillReceive.update({id: this.bill.id}, this.bill).then((response) => {
						this.$router.replace({ name: "billReceiveList" });
						Materialize.toast("Conta atualizada com sucesso!", 3000);
					});
				}
			}
		}
	};
</script>