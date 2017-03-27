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
					<tr v-for="(bill,index) in bills">
						<td>{{ index+1 }}</td>
						<td>{{ bill.date_due | dateBr}}</td>
						<td>{{ bill.name }}</td>
						<td>{{ bill.value | currency }}</td>
						<td :class="{ 'success': bill.done, 'error': !bill.done }">
							{{ bill.done | status }}
						</td>
						<td>
							<router-link :to="{ name: 'billReceiveUpdate', params: {id: index}}">Editar</router-link> |
							<a href="#" @click.prevent="deleteBill(index)">Excluir</a> |
							<a href="#" @click.prevent="toogleReceivedBill(index)" v-if="!bill.done">Recebida</a>
							<a href="#" @click.prevent="toogleReceivedBill(index)" v-if="bill.done">Não Recebida</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,
	data: function () {
		return {
			bills: this.$root.$children[0].billsReceive
		}
	},
	methods: {
		deleteBill: function(index){
			if(confirm('Deseja excluir a conta?')){
				this.bills.splice(index,1);
			}
		},
		toogleReceivedBill: function(id){
			var bill = this.bills[id];
			if(this.bills[id].done){
				this.bills[id].done = 0;
			}else{
				this.bills[id].done = 1;
			}
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