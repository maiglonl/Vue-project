window.menuComponent = Vue.extend({
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
				{ id:0, name: "Listar contas", routeName: 'billList'},
				{ id:1, name: "Criar conta", routeName: 'billCreate'}
			]
		}
	}
});
