var app = new Vue({
	el: '#app',
	data: {
		nameField: '',
		title: "Contas a pagar",
		menus: [
			{ id:0, name: "Listar contas" },
			{ id:1, name: "Criar conta" },
		],
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
		showView: function(id){
			this.activedView = id;
			if(id == 1){
				this.formType = 'insert';
			}
		},
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