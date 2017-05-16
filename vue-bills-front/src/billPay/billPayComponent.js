window.billPayComponent = Vue.extend({
	components: {
		'billPayMenuComponent': billPayMenuComponent
	},
	template: `
		<div>
			<h1>{{ title }}</h1>	
			<billPayMenuComponent></billPayMenuComponent>
			<router-view></router-view>
		</div>
	`,
	data(){
		return {
			title: "Contas a pagar",
		};
	}
});