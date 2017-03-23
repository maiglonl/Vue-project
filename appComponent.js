window.appComponent = Vue.extend({
	components: {
		'menu-component': menuComponent,
		'bill-list-component': billListComponent,
		'bill-create-component': billCreateComponent
	},
	template: `
		<div>
			<h1>{{ title }}</h1>	
			<menu-component></menu-component>
			<router-view></router-view>
		</div>
	`,
	data: function(){
		return {
			title: "Contas a pagar",
		};
	}
});