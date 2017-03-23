window.billReceiveMenuComponent = Vue.extend({
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
	data: function(){
		return {
			menus: [
				{ id:0, name: "Listar contas", routeName: 'billReceiveList'},
				{ id:1, name: "Criar conta", routeName: 'billReceiveCreate'}
			]
		}
	}
});
