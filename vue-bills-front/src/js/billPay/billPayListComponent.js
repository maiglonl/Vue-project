window.billPayListComponent = Vue.extend({
	components: {
		'modal': modalComponent
	},
	template: `
		<div class="container">
			<div class="row">
				<div class="col s6">
					<div class="card z-depth-1">
						<div class="card-content">
							<p class="card-title">
								<i class="material-icons">account_balance</i>
							</p>
							<h4>{{ countBills | countToString }}</h4>
						</div>
					</div>
				</div>
				<div class="col s6">
					<div class="card z-depth-1">
						<div class="card-content">
							<p class="card-title">
								<i class="material-icons">payment</i>
							</p>
							<h4>{{ billsToPay | currency }}</h4>
						</div>
					</div>
				</div>
			</div>
			<table class="striped highlight bordered centered responsive-table z-depth-5">
				<thead>
					<tr>
						<th>#</th>
						<th>Vencimento</th>
						<th>Nome</th>
						<th>Valor</th>
						<th>Status</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(bill, index) in bills">
						<td>{{ bill.id }}</td>
						<td>{{ bill.date_due | dateBr}}</td>
						<td>{{ bill.name }}</td>
						<td>{{ bill.value | currency }}</td>
						<td class="white-text" :class="{ 'green lighten-2': bill.done, 'red lighten-2': !bill.done }">
							{{ bill.done | status }}
						</td>
						<td>
							<router-link :to="{ name: 'billPayUpdate', params: {id: bill.id}}">Editar</router-link> |
							<a href="#" @click.prevent="openModalDelete(bill)">Excluir</a>
						</td>
					</tr>
				</tbody>
			</table>
			<modal :modal="modal">
				<div slot="content">
					<h4>Mensagem de confirmação</h4>
					<p>Deseja excluir a conta?</p>
					<div class="divider"></div>
					<p>Nome: <strong>{{ billToDelete.name }}</strong></p>
					<p>Valor: <strong>{{ billToDelete.value | currency }}</strong></p>
					<p>Vencimento: <strong>{{ billToDelete.date_due | dateBr }}</strong></p>
					<div class="divider"></div>
				</div>
				<div slot="footer">
					<button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close" @click="deleteBill()">OK</button>
					<button class="btn btn-flat waves-effect waves-red modal-action modal-close">Cancelar</button>
				</div>
			</modal>
		</div>
	`,
	data() {
		return {
			bills: [],
			billsToPay: 0,
			billToDelete: new Bill,
			modal: {
				id: 'modal-delete'
			}
		}
	},
	created(){
		this.updateBillsList();
	},
	methods: {
		updateBillsList(){
			BillPay.query().then((response) => {
				let billsPay = response.data;
				let sum = 0;
				billsPay.forEach((bill, index) => {
					if(!bill.done){
						sum += parseInt(bill.value);
					}
				});
				this.billsToPay = sum;
				this.bills = billsPay;
			});
		},
		deleteBill(){
			BillReceive.delete({ id: this.billToDelete.id }).then((response) => {
				this.billToDelete = null;
				this.updateBillsList();
				Materialize.toast("Conta excluída com sucesso!", 3000);
			});
		},
		openModalDelete(bill){
			this.billToDelete = bill;
			$('#modal-delete').modal('open');
		}
	},
	computed: {
		countBills(){
			let total= 0;
			let count= 0;
			for(let b in this.bills){
				total++;
				if(!this.bills[b].done){
					count++;
				}
			}
			if(total == 0){
				return -1;
			}
			return count;
		}
	}
});