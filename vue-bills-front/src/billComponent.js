window.billComponent = Vue.extend({
	template: `
		<div>
			<nav class="navbar-fixed">
				<div class="nav-wrapper">
					<div class="row">
						<div class="col s12">
							<a href="#" class="brand-logo">G Contas</a>
							<a href="#" data-activates="navMobile" class="button-collapse" id="navMobileBtn">
								<i class="material-icons">menu</i>
							</a>
							<ul class="right hide-on-med-and-down">
								<li v-for="menu in menus">
									<a href="!#" v-if="menu.dropdownId" class="dropdownBtn" :data-activates="menu.dropdownId">
										{{ menu.name }}
										<i class="material-icons right">arrow_drop_down</i>
									</a>
									<router-link v-else class="dropdownBtn" :to="{name: menu.routeName}">{{ menu.name }}</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<ul id="navMobile" class="side-nav">
				<li v-for="menu in menus">
					<router-link :to="{name: menu.routeName}">{{ menu.name }}</router-link>
				</li>
			</ul>
			<ul :id="o.id" class="dropdown-content" v-for="o in menusDropdwon">
				<li v-for="menu in o.items">
					<router-link :to="{name: menu.routeName}">{{ menu.name }}</router-link>
				</li>
			</ul>
			<router-view></router-view>
		</div>
	`,
	created(){
		$(document).ready(function($) {
			$("#navMobileBtn").sideNav();
			$(".dropdownBtn").dropdown();
		});
	},
	data(){
		return {
			menus: [
				{ name: "Dashboard", routeName: 'dashboard' },
				{ name: "Contas à pagar", routeName: 'billPay', dropdownId: 'billPayDropdown' },
				{ name: "Contas à receber", routeName: 'billReceive', dropdownId: 'billReceiveDropdown' }
			],
			menusDropdwon:[{
					id: 'billPayDropdown',
					items: [
						{ id:0, name: "Listar contas", routeName: 'billPayList'},
						{ id:1, name: "Criar conta", routeName: 'billPayCreate'}
					]
				},{
					id: 'billReceiveDropdown',
					items: [
						{ id:0, name: "Listar contas", routeName: 'billReceiveList'},
						{ id:1, name: "Criar conta", routeName: 'billReceiveCreate'}
					]
				}
			]
		}
	}
});
