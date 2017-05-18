window.billPayComponent = Vue.extend({
	components: {
	},
	template: `
		<div>
			<div class="section">
				<div class="container">
					<h4>{{ title }}</h4>
				</div>
			</div>
			<router-view></router-view>
		</div>
	`,
	data(){
		return {
			title: "Contas a pagar",
		};
	}
});