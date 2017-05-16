"use strict";

window.billReceiveComponent = Vue.extend({
	components: {
		'billReceiveMenuComponent': billReceiveMenuComponent
	},
	template: "\n\t\t<div>\n\t\t\t<h1>{{ title }}</h1>\t\n\t\t\t<billReceiveMenuComponent></billReceiveMenuComponent>\n\t\t\t<router-view></router-view>\n\t\t</div>\n\t",
	data: function data() {
		return {
			title: "Contas a Receber"
		};
	}
});