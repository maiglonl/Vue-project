'use strict';

var receiveNames = ['Salário', 'Auxilio Educação', 'Vale Alimentação'];

window.billReceiveCreateComponent = Vue.extend({
	template: '\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<form action="" name="formConta">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t\t<label class="active">Vencimento:</label>\n\t\t\t\t\t\t\t<input type="text"  v-model="bill.date_due">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t\t<label class="active">Valor:</label>\n\t\t\t\t\t\t\t<input type="text" v-model="bill.value">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t\t<label class="active">Nome:</label>\n\t\t\t\t\t\t\t<select v-model="bill.name" id="nameInput" class="browser-default">\n\t\t\t\t\t\t\t\t<option disabled selected>Selecione uma conta</option>\n\t\t\t\t\t\t\t\t<option v-for="opt in names" :value="opt">{{ opt }}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t\t<input type="checkbox" v-model="bill.done" id="doneInput"/>\n\t\t\t\t\t\t\t<label for="doneInput">Recebida</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="input-field col s12">\n\t\t\t\t\t\t\t<input type="submit" @click.prevent="submit" class="btn btn-large right">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t',
	data: function data() {
		return {
			formType: 'insert',
			names: receiveNames,
			bill: new Bill()
		};
	},
	created: function created() {
		if (this.$route.name == "billReceiveUpdate") {
			this.formType = "update";
			this.selectBill(this.$route.params.id);
		}
	},

	methods: {
		selectBill: function selectBill(id) {
			var _this = this;

			BillReceive.get({ id: id }).then(function (response) {
				_this.bill = new Bill(response.data);
			});
		},
		submit: function submit() {
			var _this2 = this;

			if (this.formType == 'insert') {
				BillReceive.save({}, this.bill).then(function (response) {
					_this2.$router.replace({ name: "billReceiveList" });
					Materialize.toast("Conta criada com sucesso!", 3000);
				});
			} else {
				BillReceive.update({ id: this.bill.id }, this.bill).then(function (response) {
					_this2.$router.replace({ name: "billReceiveList" });
					Materialize.toast("Conta atualizada com sucesso!", 3000);
				});
			}
		}
	}
});