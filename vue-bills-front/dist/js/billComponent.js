"use strict";

window.billComponent = Vue.extend({
	template: "\n\t\t<div>\n\t\t\t<nav class=\"navbar-fixed\">\n\t\t\t\t<div class=\"nav-wrapper\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col s12\">\n\t\t\t\t\t\t\t<a href=\"#\" class=\"brand-logo\">G Contas</a>\n\t\t\t\t\t\t\t<a href=\"#\" data-activates=\"navMobile\" class=\"button-collapse\" id=\"navMobileBtn\">\n\t\t\t\t\t\t\t\t<i class=\"material-icons\">menu</i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<ul class=\"right hide-on-med-and-down\">\n\t\t\t\t\t\t\t\t<li v-for=\"menu in menus\">\n\t\t\t\t\t\t\t\t\t<a href=\"!#\" v-if=\"menu.dropdownId\" class=\"dropdownBtn\" :data-activates=\"menu.dropdownId\">\n\t\t\t\t\t\t\t\t\t\t{{ menu.name }}\n\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons right\">arrow_drop_down</i>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t<router-link v-else class=\"dropdownBtn\" :to=\"{name: menu.routeName}\">{{ menu.name }}</router-link>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</nav>\n\t\t\t<ul id=\"navMobile\" class=\"side-nav\">\n\t\t\t\t<li v-for=\"menu in menus\">\n\t\t\t\t\t<router-link :to=\"{name: menu.routeName}\">{{ menu.name }}</router-link>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<ul :id=\"o.id\" class=\"dropdown-content\" v-for=\"o in menusDropdwon\">\n\t\t\t\t<li v-for=\"menu in o.items\">\n\t\t\t\t\t<router-link :to=\"{name: menu.routeName}\">{{ menu.name }}</router-link>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<router-view></router-view>\n\t\t</div>\n\t",
	created: function created() {
		$(document).ready(function ($) {
			$("#navMobileBtn").sideNav();
			$(".dropdownBtn").dropdown();
			$('.modal').modal();
		});
	},
	data: function data() {
		return {
			menus: [{ name: "Dashboard", routeName: 'dashboard' }, { name: "Contas à pagar", routeName: 'billPay', dropdownId: 'billPayDropdown' }, { name: "Contas à receber", routeName: 'billReceive', dropdownId: 'billReceiveDropdown' }],
			menusDropdwon: [{
				id: 'billPayDropdown',
				items: [{ id: 0, name: "Listar contas", routeName: 'billPayList' }, { id: 1, name: "Criar conta", routeName: 'billPayCreate' }]
			}, {
				id: 'billReceiveDropdown',
				items: [{ id: 0, name: "Listar contas", routeName: 'billReceiveList' }, { id: 1, name: "Criar conta", routeName: 'billReceiveCreate' }]
			}]
		};
	}
});