'use strict';

var receiveNames = ['Salário', 'Auxilio Educação', 'Vale Alimentação'];

window.billReceiveCreateComponent = Vue.extend({
	template: '\n\t\t<form action="" name="formConta">\n\t\t\t<label>Vencimento:</label>\n\t\t\t<input type="date" v-model="bill.date_due"><br>\n\t\t\t<label>Nome:</label>\n\t\t\t<select v-model="bill.name">\n\t\t\t\t<option v-for="opt in names" :value="opt">{{ opt }}</option>\n\t\t\t</select><br>\n\t\t\t<label>Valor:</label>\n\t\t\t<input type="text" v-model="bill.value"><br>\n\t\t\t<input type="submit" @click.prevent="submit">\n\t\t</form>\n\t',
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
				});
			} else {
				BillReceive.update({ id: this.bill.id }, this.bill).then(function (response) {
					_this2.$router.replace({ name: "billReceiveList" });
				});
			}
		}
	}
});