window.billReceiveComponent = Vue.extend({
	components: {
		'billReceiveMenuComponent': billReceiveMenuComponent
	},
	template: `
		<div>
			<h1>{{ title }}</h1>	
			<billReceiveMenuComponent></billReceiveMenuComponent>
			<router-view></router-view>
		</div>
	`,
	data: function(){
		return {
			title: "Contas a Receber",
		};
	}
});