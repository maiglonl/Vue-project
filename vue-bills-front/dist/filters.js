"use strict";

Vue.filter('status', function (value) {
	return value == 1 ? "Quitada" : "Pendente";
});

Vue.filter('currency', function (value) {
	return !value ? '' : "R$ " + value;
});

Vue.filter('dateBr', function (value) {
	if (!value) return '';
	var date = value.split('-');
	return date[2] + "/" + date[1] + "/" + date[0];
});

Vue.filter('countToString', function (value) {
	switch (value) {
		case -1:
			return "Nenhuma conta cadastrada";break;
		case 0:
			return "Nenhuma conta pendentes";break;
		default:
			return "Existem " + value + " contas pendentes";break;
	}
});