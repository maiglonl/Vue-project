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
	return "" + value + " contas pendentes";
});