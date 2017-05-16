"use strict";

window.billComponent = Vue.extend({
	template: "\n\t\t<div>\n\t\t\t<nav>\n\t\t\t\t<ul>\n\t\t\t\t\t<li v-for=\"menu in menus\">\n\t\t\t\t\t\t<router-link :to=\"{name: menu.routeName}\">{{ menu.name }}</router-link>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</nav>\n\t\t\t<router-view></router-view>\n\t\t</div>\n\t",
	data: function data() {
		return {
			menus: [{ name: "Dashboard", routeName: 'dashboard' }, { name: "Contas à pagar", routeName: 'billPay' }, { name: "Contas à receber", routeName: 'billReceive' }]
		};
	}
});