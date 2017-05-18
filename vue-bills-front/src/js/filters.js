Vue.filter('status', (value) => value == 1 ? "Quitada" : "Pendente" );

Vue.filter('currency', (value) => !value ? '' :  "R$ "+value );

Vue.filter('dateBr', (value) => {
	if (!value) return '';
	let date = value.split('-');
	return date[2]+"/"+date[1]+"/"+date[0];
});

Vue.filter('countToString', (value) => {
	return ""+value+" contas pendentes";
});
