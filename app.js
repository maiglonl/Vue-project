var menuComponent = Vue.extend({
	template: `
	<div>
		<nav>
			<ul>
				<li v-for="menu in menus">
					<a href="#" @click.prevent="showView(menu.id)">{{ menu.name }}</a>
				</li>
			</ul>
		</nav>
	</div>
	`,
	data: function(){
		return {
			menus: [
				{ id:0, name: "Listar contas" },
				{ id:1, name: "Criar conta" },
			]
		}
	},
	methods: {
		showView: function(id){
			this.activedView = id;
			if(id == 1){
				this.formType = 'insert';
			}
		}
	}

});
Vue.component('menu-component', menuComponent);

var appComponent = Vue.extend({
	template: `
		<div>
			<style type="text/css">
				.pago{
					color: green;
				}
				.naoPago{
					color: red;
				}
				.nenhumaConta{
					color: gray;
				}
			</style>
			<h1>{{ title }}</h1>	
			<h3 :class="{ 'naoPago': countBills>0, 'pago': countBills==0, 'nenhumaConta': countBills<0 }">{{ countBills | countToString }}</h3>
			<menu-component></menu-component>
			<div v-if="activedView == 0">
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
								<a href="#" @click.prevent="loadBill(bill)">Editar</a> |
								<a href="#" @click.prevent="deleteBill(index)">Excluir</a> |
								<a href="#" v-if="!bill.done" @click.prevent="tooglePayBill(bill)">Paga</a>
								<a href="#" v-if="bill.done" @click.prevent="tooglePayBill(bill)">Não Paga</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-if="activedView == 1">
				<form action="" name="formConta">
					<label>Vencimento:</label>
					<input type="date" v-model="bill.date_due"><br>
					<label>Nome:</label>
					<select v-model="bill.name">
						<option v-for="opt in names" :value="opt">{{ opt }}</option>
					</select><br>
					<label>Valor:</label>
					<input type="text" v-model="bill.value"><br>
					<input type="submit" @click.prevent="submit">
				</form>
			</div>
		</div>
	`,
	data: function(){
		return {
			nameField: '',
			title: "Contas a pagar",
			activedView: 0,
			formType: 'insert',
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			},
			names: [
				'Luz',
				'Água',
				'internet',
				'Mercado',
				'Cartão de crédito',
				'Financiamento', 
				'Gasolina'
			],
			bills: [
				{ date_due: '2016-01-01', name: 'Luz', value: 110, done: 1 },
				{ date_due: '2016-07-20', name: 'Água', value: 110, done: 0 },
				{ date_due: '2016-07-20', name: 'Mercado', value: 110, done: 0 }
			]
		};
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
	},
	methods: {
		submit: function(){
			if(this.formType == 'insert'){
				this.bills.push(this.bill);
			}

			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			};

			this.activedView = 0;
		},
		loadBill: function(bill){
			this.bill = bill;
			this.activedView = 1;
			this.formType = 'update';
		},
		tooglePayBill: function(bill){
			this.bill = bill;
			if(this.bill.done){
				this.bill.done = 0;
			}else{
				this.bill.done = 1;
			}
			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			};
		},
		deleteBill: function(index){
			if(confirm('Deseja excluir a conta?')){
				this.bills.splice(index,1);
			}
		}
	},
	watch: {
		nameField: function(newName, oldName){
			console.log(oldName+" -> "+newName);
		}
	},
	filters: {
		currency: function (value) {
			if (!value) return ''
			return "R$ "+value
		},
		status: function (value) {
			return value == 1 ? "Paga" : "Pendente";
		},
		dateBr: function (value) {
			if (!value) return ''
			date = value.split('-');
			return date[2]+"/"+date[1]+"/"+date[0];
		},
		countToString: function (value) {
			switch(value){
				case -1: return "Nenhuma conta cadastrada"; break;
				case 0: return "Nenhuma conta à pagar"; break;
				default: return "Existem "+value+" contas à pagar"; break
			}
		}
	}
});
Vue.component('app-component', appComponent);
var app = new Vue({
	el: '#app',
});