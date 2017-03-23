window.billListComponent = Vue.extend({
	template: `
		<div>
			<h3 :class="{ 'naoPago': countBills>0, 'pago': countBills==0, 'nenhumaConta': countBills<0 }">{{ countBills | countToString }}</h3>
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
						<td :class="{ 'pago': bill.done, 'naoPago': !bill.done }">
							{{ bill.done | status }}
						</td>
						<td>
							<a href="#" @click.prevent="editBill(bill)">Editar</a> |
							<a href="#" @click.prevent="deleteBill(index)">Excluir</a> |
							<a href="#" v-if="!bill.done" @click.prevent="tooglePayBill(bill)">Paga</a>
							<a href="#" v-if="bill.done" @click.prevent="tooglePayBill(bill)">Não Paga</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,
	data: function () {
		return {
			bills: this.$root.$children[0].bills
		}
	},
	created: function () {
		eventHub.$on('postBill', this.postBill)
	},
	beforeDestroy: function () {
		eventHub.$off('postBill', this.postBill)
	},
	methods: {
		editBill: function(bill){
			eventHub.$emit("selectBill", { bill: bill });
			eventHub.$emit("changeView", { view: 1 });
			eventHub.$emit("changeFormType", { type: 'update' });
		},
		tooglePayBill: function(bill){
			eventHub.$emit("payBill", { bill: bill });
		},
		deleteBill: function(index){
			if(confirm('Deseja excluir a conta?')){
				this.bills.splice(index,1);
			}
		},
		postBill: function(obj){
			this.bills.push(obj.bill);
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