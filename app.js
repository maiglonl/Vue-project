var eventHub = new Vue();
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
				{ id:1, name: "Criar conta" }
			]
		}
	},
	methods: {
		showView: function(id){
			eventHub.$emit("changeView", { view: id });
			if(id == 1){
				eventHub.$emit("changeFormType", { type: 'insert' });
				eventHub.$emit("resetBill");
			}
		}
	}
});

var billListComponent = Vue.extend({
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
			bills: [
				{ date_due: '2016-01-01', name: 'Luz', value: 110, done: 1 },
				{ date_due: '2016-07-20', name: 'Água', value: 110, done: 0 },
				{ date_due: '2016-07-20', name: 'Mercado', value: 110, done: 0 }
			]
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
	},
	filters: {
		status: function (value) {
			return value == 1 ? "Paga" : "Pendente";
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

var billCreateComponent = Vue.extend({
	template: `
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
	`,
	data: function () {
		return {
			formType: 'insert',
			names: [
				'Luz',
				'Água',
				'internet',
				'Mercado',
				'Cartão de crédito',
				'Financiamento', 
				'Gasolina'
			],
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			}
		}
	},
	created: function () {
		eventHub.$on('changeFormType', this.changeFormType);
		eventHub.$on('selectBill', this.selectBill);
		eventHub.$on('resetBill', this.resetBill);
		eventHub.$on('payBill', this.payBill);
	},
	beforeDestroy: function () {
		eventHub.$off('changeFormType', this.changeFormType);
		eventHub.$off('selectBill', this.selectBill);
		eventHub.$off('resetBill', this.resetBill);		
		eventHub.$off('payBill', this.payBill);		
	},
	methods: {
		changeFormType: function(obj){
			this.formType = obj.type;
		},
		selectBill: function(obj){
			this.bill = obj.bill;
		},
		resetBill: function(){
			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			};
		},
		payBill: function(obj){
			this.bill = obj.bill;
			if(this.bill.done){
				this.bill.done = 0;
			}else{
				this.bill.done = 1;
			}
			this.resetBill();
		},
		submit: function(){
			if(this.formType == 'insert'){
				eventHub.$emit("postBill", { bill: this.bill });
			}
			eventHub.$emit("changeView", { view: 0 });
			this.resetBill();
		},
	},
	filters: {
		status: function (value) {
			return value == 1 ? "Paga" : "Pendente";
		}
	}
});

var appComponent = Vue.extend({
	components: {
		'menu-component': menuComponent,
		'bill-list-component': billListComponent,
		'bill-create-component': billCreateComponent
	},
	template: `
		<div>
			<h1>{{ title }}</h1>	
			<menu-component></menu-component>
			<div v-show="activedView == 0">
				<bill-list-component></bill-list-component>
			</div>
			<div v-show="activedView == 1">
				<bill-create-component></bill-create-component>
			</div>
		</div>
	`,
	created: function () {
		eventHub.$on('changeView', this.changeView);
	},
	beforeDestroy: function () {
		eventHub.$off('changeView', this.changeView);
	},
	data: function(){
		return {
			title: "Contas a pagar",
			activedView: 0
		};
	},
	filters: {
		currency: function (value) {
			if (!value) return ''
			return "R$ "+value
		},
		dateBr: function (value) {
			if (!value) return ''
			date = value.split('-');
			return date[2]+"/"+date[1]+"/"+date[0];
		}
	},
	methods: {
		changeView: function(obj){
			this.activedView = obj.view;
		}
	}
});
Vue.component('app-component', appComponent);

var app = new Vue({
	el: '#app'
});