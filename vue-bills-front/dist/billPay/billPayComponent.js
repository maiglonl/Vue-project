"use strict";

window.billPayComponent = Vue.extend({
	components: {
		'billPayMenuComponent': billPayMenuComponent
	},
	template: "\n\t\t<div>\n\t\t\t<h1>{{ title }}</h1>\t\n\t\t\t<billPayMenuComponent></billPayMenuComponent>\n\t\t\t<router-view></router-view>\n\t\t</div>\n\t",
	data: function data() {
		return {
			title: "Contas a pagar"
		};
	}
});