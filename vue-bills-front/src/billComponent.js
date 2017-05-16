window.billComponent = Vue.extend({
	template: `
		<div>
			<nav>
				<ul>
					<li v-for="menu in menus">
						<router-link :to="{name: menu.routeName}">{{ menu.name }}</router-link>
					</li>
				</ul>
			</nav>
			<router-view></router-view>
		</div>
	`,
	data(){
		return {
			menus: [
				{ name: "Dashboard", routeName: 'dashboard'},
				{ name: "Contas à pagar", routeName: 'billPay'},
				{ name: "Contas à receber", routeName: 'billReceive'}
			]
		}
	}
});
