"use strict";

window.billReceiveComponent = Vue.extend({
	components: {},
	template: "\n\t\t<div>\n\t\t\t<div class=\"section\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<h4>{{ title }}</h4>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<router-view></router-view>\n\t\t</div>\n\t",
	data: function data() {
		return {
			title: "Contas a Receber"
		};
	}
});