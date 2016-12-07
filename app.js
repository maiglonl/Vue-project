var app = new Vue({
	el: '#app',
	data: {
		title: "Contas a pagar",
		bills: [
			{date_due: '20/0882016', name: 'Conta de luz', value: 30.50, done:1},
			{date_due: '20/0882016', name: 'Conta de água', value: 30.10, done:0},
			{date_due: '20/0882016', name: 'Conta de internet', value: 100, done:0},
			{date_due: '20/0882016', name: 'Conta de Mercado', value: 500, done:0},
			{date_due: '20/0882016', name: 'Cartão de crédito', value: 1000, done:0},
			{date_due: '20/0882016', name: 'Financiamento', value: 850, done:0},
			{date_due: '20/0882016', name: 'Gasolina', value: 500, done:0}
		]
	},
	computed: {
		status: function(){
			var count= 0;
			for(var b in this.bills){
				if(!this.bills[b].done){
					count++;
				}
			}
			return !count ? "Nenhuma conta à pagar" : "Existem "+count+" contas à pagar";
		}
	}
})