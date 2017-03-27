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
						<td>{{ bill.value | currency }}</td>
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
	data: function () {
		return {
			bills: []
		}
	},
	created: function(){
		this.updateBillsList();
	},
	methods: {
		updateBillsList: function(){
			var self = this;
			BillReceive.query().then(function(response){
				self.bills = response.data;
			});
		},
		deleteBill: function(id){
			if(confirm('Deseja excluir a conta?')){
				var self = this;
				BillReceive.delete({ id: id }).then(function(response){
					self.updateBillsList();
				});
			}
		},
		toogleReceiveBill: function(id){
			var billObj = {};
			var self = this;
			BillReceive.get({id: id}).then(function(response){
				billObj = response.data;
				billObj.done = !billObj.done;
				BillReceive.update({id: id}, billObj).then(function(){
					self.updateBillsList();
				});
			});
			
		}
	},
	computed: {
		countBills: function(){
			var total= 0;
			var count= 0;
			for(var b in this.bills){
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