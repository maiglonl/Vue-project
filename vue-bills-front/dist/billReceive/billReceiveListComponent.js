'use strict';

window.billReceiveListComponent = Vue.extend({
	template: '\n\t\t<div>\n\t\t\t<h3 :class="{ \'error\': countBills>0, \'success\': countBills==0, \'disabled\': countBills<0 }">{{ countBills | countToString }}</h3>\n\t\t\t<table border="1" cellpadding="10">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>#</th>\n\t\t\t\t\t\t<th>Vencimento</th>\n\t\t\t\t\t\t<th>Nome</th>\n\t\t\t\t\t\t<th>Valor</th>\n\t\t\t\t\t\t<th>Status</th>\n\t\t\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr v-for="(bill, index) in bills">\n\t\t\t\t\t\t<td>{{ bill.id }}</td>\n\t\t\t\t\t\t<td>{{ bill.date_due | dateBr}}</td>\n\t\t\t\t\t\t<td>{{ bill.name }}</td>\n\t\t\t\t\t\t<td>{{ bill.value | numberFormat }}</td>\n\t\t\t\t\t\t<td :class="{ \'success\': bill.done, \'error\': !bill.done }">\n\t\t\t\t\t\t\t{{ bill.done | status }}\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<router-link :to="{ name: \'billReceiveUpdate\', params: {id: bill.id}}">Editar</router-link> |\n\t\t\t\t\t\t\t<a href="#" @click.prevent="deleteBill(bill.id)">Excluir</a> |\n\t\t\t\t\t\t\t<a href="#" @click.prevent="toogleReceiveBill(bill.id)" v-if="!bill.done">Recebida</a>\n\t\t\t\t\t\t\t<a href="#" @click.prevent="toogleReceiveBill(bill.id)" v-if="bill.done">N\xE3o Recebida</a>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\t',
	data: function data() {
		return {
			bills: []
		};
	},
	created: function created() {
		this.updateBillsList();
	},

	methods: {
		updateBillsList: function updateBillsList() {
			var _this = this;

			BillReceive.query().then(function (response) {
				_this.bills = response.data;
			});
		},
		deleteBill: function deleteBill(id) {
			var _this2 = this;

			if (confirm('Deseja excluir a conta?')) {
				BillReceive.delete({ id: id }).then(function (response) {
					_this2.updateBillsList();
				});
			}
		},
		toogleReceiveBill: function toogleReceiveBill(id) {
			var _this3 = this;

			var billObj = {};
			BillReceive.get({ id: id }).then(function (response) {
				billObj = response.data;
				billObj.done = !billObj.done;
				BillReceive.update({ id: id }, billObj).then(function () {
					_this3.updateBillsList();
				});
			});
		}
	},
	computed: {
		countBills: function countBills() {
			var total = 0;
			var count = 0;
			for (var b in this.bills) {
				total++;
				if (!this.bills[b].done) {
					count++;
				}
			}
			if (total == 0) {
				return -1;
			}
			return count;
		}
	}
});