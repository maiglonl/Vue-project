'use strict';

window.modalComponent = Vue.extend({
	template: '\n\t\t<div :id="modal.id" class="modal">\n\t\t\t<div class="modal-content">\n\t\t\t\t<slot name="content"></slot>\n\t\t\t</div>\n\t\t\t<div class="modal-footer">\n\t\t\t\t<slot name="footer"></slot>\n\t\t\t</div>\n\t\t</div>\n\t',
	props: ['modal'],
	data: function data() {
		return {
			modal: {
				id: ''
			}
		};
	},
	mounted: function mounted() {
		var id = this.modal.id;
		$(document).ready(function () {
			$('#' + id).modal();
		});
	}
});