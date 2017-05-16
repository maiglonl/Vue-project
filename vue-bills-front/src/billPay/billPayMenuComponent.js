window.billPayMenuComponent = Vue.extend({
	template: `
		<div>
			<nav>
				<ul>
					<li v-for="menu in menus">
						<router-link :to="{name: menu.routeName}">{{ menu.name }}</router-link>
					</li>
				</ul>
			</nav>
		</div>
	`,
	data(){
		return {
			menus: [
				{ id:0, name: "Listar contas", routeName: 'billPayList'},
				{ id:1, name: "Criar conta", routeName: 'billPayCreate'}
			]
		}
	}
});
