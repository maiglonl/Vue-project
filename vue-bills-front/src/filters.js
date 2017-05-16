Vue.filter('status', (value) => value == 1 ? "Quitada" : "Pendente" );

Vue.filter('currency', (value) => !value ? '' :  "R$ "+value );

Vue.filter('dateBr', (value) => {
	if (!value) return '';
	let date = value.split('-');
	return date[2]+"/"+date[1]+"/"+date[0];
});

Vue.filter('countToString', (value) => {
	switch(value){
		case -1: return "Nenhuma conta cadastrada"; break;
		case 0: return "Nenhuma conta pendentes"; break;
		default: return "Existem "+value+" contas pendentes"; break
	}
});
