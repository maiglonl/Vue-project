"use strict";

window.billReceiveMenuComponent = Vue.extend({
	template: "\n\t\t<div>\n\t\t\t<nav>\n\t\t\t\t<ul>\n\t\t\t\t\t<li v-for=\"menu in menus\">\n\t\t\t\t\t\t<router-link :to=\"{name: menu.routeName}\">{{ menu.name }}</router-link>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</nav>\n\t\t</div>\n\t",
	data: function data() {
		return {
			menus: [{ id: 0, name: "Listar contas", routeName: 'billReceiveList' }, { id: 1, name: "Criar conta", routeName: 'billReceiveCreate' }]
		};
	}
});