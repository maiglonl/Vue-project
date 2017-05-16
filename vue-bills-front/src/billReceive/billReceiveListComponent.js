window.billReceiveListComponent = Vue.extend({
	template: `
		<div>
			<h3 :class="{ 'error': countBills>0, 'success': countBills==0, 'disabled': countBills<0 }">{{ countBills | countToString }}</h3>
			<table border="1" cellpadding="10">
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
						<td>{{ bill.value | numberFormat }}</td>
						<td :class="{ 'success': bill.done, 'error': !bill.done }">
							{{ bill.done | status }}
						</td>
						<td>
							<router-link :to="{ name: 'billReceiveUpdate', params: {id: bill.id}}">Editar</router-link> |
							<a href="#" @click.prevent="deleteBill(bill.id)">Excluir</a> |
							<a href="#" @click.prevent="toogleReceiveBill(bill.id)" v-if="!bill.done">Recebida</a>
							<a href="#" @click.prevent="toogleReceiveBill(bill.id)" v-if="bill.done">Não Recebida</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,
	data() {
		return {
			bills: []
		}
	},
	created(){
		this.updateBillsList();
	},
	methods: {
		updateBillsList(){
			BillReceive.query().then((response) => {
				this.bills = response.data;
			});
		},
		deleteBill(id){
			if(confirm('Deseja excluir a conta?')){
				BillReceive.delete({ id: id }).then((response) => {
					this.updateBillsList();
				});
			}
		},
		toogleReceiveBill(id){
			let billObj = {};
			BillReceive.get({id: id}).then((response) => {
				billObj = response.data;
				billObj.done = !billObj.done;
				BillReceive.update({id: id}, billObj).then(() => {
					this.updateBillsList();
				});
			});
			
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