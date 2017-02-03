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
			eventHub.$emit("changeView", { view: id }); // $parent ou $root.$children[0]
			if(id == 1){
				this.$parent.formType = 'insert'; // $parent ou $root.$children[0]
				this.$parent.bill = {
					date_due: '',
					name: '',
					value: 0,
					done: 0
				};
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
							<a href="#" @click.prevent="loadBill(bill)">Editar</a> |
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
	methods: {
		loadBill: function(bill){
			this.$parent.bill = bill;
			this.$parent.activedView = 1;
			this.$parent.formType = 'update';
		},
		tooglePayBill: function(bill){
			this.$parent.bill = bill;
			if(this.$parent.bill.done){
				this.$parent.bill.done = 0;
			}else{
				this.$parent.bill.done = 1;
			}
			this.$parent.bill = {
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
			names: [
				'Luz',
				'Água',
				'internet',
				'Mercado',
				'Cartão de crédito',
				'Financiamento', 
				'Gasolina'
			]
		}
	},
	methods: {
		submit: function(){
			if(this.formType == 'insert'){
				this.$parent.$refs.billList.bills.push(this.bill);
			}

			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			};

			this.$parent.activedView = 0;
		}
	},
	filters: {
		status: function (value) {
			return value == 1 ? "Paga" : "Pendente";
		}
	},
	props: ['bill', 'formType']
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
				<bill-list-component ref="billList"></bill-list-component>
			</div>
			<div v-show="activedView == 1">
				<bill-create-component :bill.sync="bill" :form-type="formType"></bill-create-component>
			</div>
		</div>
	`,
	created: function () {
		eventHub.$on('changeView', this.changeView)
	},
	beforeDestroy: function () {
		eventHub.$off('changeView', this.changeView)
	},
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
			}
		};
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