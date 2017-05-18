'use strict';

window.billReceiveListComponent = Vue.extend({
	components: {
		'modal': modalComponent
	},
	template: '\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="col s6">\n\t\t\t\t\t<div class="card z-depth-1">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p class="card-title">\n\t\t\t\t\t\t\t\t<i class="material-icons">account_balance</i>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<h4>{{ countBills | countToString }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="col s6">\n\t\t\t\t\t<div class="card z-depth-1">\n\t\t\t\t\t\t<div class="card-content">\n\t\t\t\t\t\t\t<p class="card-title">\n\t\t\t\t\t\t\t\t<i class="material-icons">payment</i>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<h4>{{ billsToReceive | currency }}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<table class="striped highlight bordered centered responsive-table z-depth-5">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>#</th>\n\t\t\t\t\t\t<th>Vencimento</th>\n\t\t\t\t\t\t<th>Nome</th>\n\t\t\t\t\t\t<th>Valor</th>\n\t\t\t\t\t\t<th>Status</th>\n\t\t\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr v-for="(bill, index) in bills">\n\t\t\t\t\t\t<td>{{ bill.id }}</td>\n\t\t\t\t\t\t<td>{{ bill.date_due | dateBr}}</td>\n\t\t\t\t\t\t<td>{{ bill.name }}</td>\n\t\t\t\t\t\t<td>{{ bill.value | currency }}</td>\n\t\t\t\t\t\t<td class="white-text" :class="{ \'green lighten-2\': bill.done, \'red lighten-2\': !bill.done }">\n\t\t\t\t\t\t\t{{ bill.done | status }}\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<router-link :to="{ name: \'billReceiveUpdate\', params: {id: bill.id}}">Editar</router-link> |\n\t\t\t\t\t\t\t<a href="#" @click.prevent="openModalDelete(bill)">Excluir</a>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t<modal :modal="modal">\n\t\t\t\t<div slot="content">\n\t\t\t\t\t<h4>Mensagem de confirma\xE7\xE3o</h4>\n\t\t\t\t\t<p>Deseja excluir a conta?</p>\n\t\t\t\t\t<div class="divider"></div>\n\t\t\t\t\t<p>Nome: <strong>{{ billToDelete.name }}</strong></p>\n\t\t\t\t\t<p>Valor: <strong>{{ billToDelete.value | currency }}</strong></p>\n\t\t\t\t\t<p>Vencimento: <strong>{{ billToDelete.date_due | dateBr }}</strong></p>\n\t\t\t\t\t<div class="divider"></div>\n\t\t\t\t</div>\n\t\t\t\t<div slot="footer">\n\t\t\t\t\t<button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close" @click="deleteBill()">OK</button>\n\t\t\t\t\t<button class="btn btn-flat waves-effect waves-red modal-action modal-close">Cancelar</button>\n\t\t\t\t</div>\n\t\t\t</modal>\n\t\t</div>\n\t',
	data: function data() {
		return {
			bills: [],
			billsToReceive: 0,
			billToDelete: new Bill(),
			modal: {
				id: 'modal-delete'
			}
		};
	},
	created: function created() {
		this.updateBillsList();
	},

	methods: {
		updateBillsList: function updateBillsList() {
			var _this = this;

			BillReceive.query().then(function (response) {
				var billsReceive = response.data;
				var sum = 0;
				billsReceive.forEach(function (bill, index) {
					if (!bill.done) {
						sum += parseInt(bill.value);
					}
				});
				_this.billsToReceive = sum;
				_this.bills = billsReceive;
			});
		},
		deleteBill: function deleteBill() {
			var _this2 = this;

			BillReceive.delete({ id: this.billToDelete.id }).then(function (response) {
				_this2.billToDelete = null;
				_this2.updateBillsList();
				Materialize.toast("Conta excluída com sucesso!", 3000);
			});
		},
		openModalDelete: function openModalDelete(bill) {
			this.billToDelete = bill;
			$('#modal-delete').modal('open');
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