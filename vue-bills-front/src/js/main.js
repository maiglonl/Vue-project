import './bootstrap';
import BillPayComponent from './billPay/billPay.vue';
import BillPayListComponent from './billPay/billPayList.vue';
import BillPayCreateComponent from './billPay/billPayCreate.vue';
import BillReceiveComponent from './billReceive/billReceive.vue';
import BillReceiveListComponent from './billReceive/billReceiveList.vue';
import BillReceiveCreateComponent from './billReceive/billReceiveCreate.vue';
import BillDashboardComponent from './billDashboard.vue';
import BillComponent from './bill.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
let mainComponent = Vue.extend({
	components: {
		'billComponent': BillComponent
	},
	template: '<billComponent></billComponent>'
});
let routes = [
	{
		name: 'billPay',
		path: '/billPay',
		component: BillPayComponent,
		children:[
			{ 
				name: 'billPayList',
				path: '/', 
				component: BillPayListComponent 
			},{ 
				name: 'billPayCreate',
				path: 'create', 
				component: BillPayCreateComponent 
			},{ 
				name: 'billPayUpdate',
				path: 'update/:id', 
				component: BillPayCreateComponent 
			}
		]
	},{
		name: 'billReceive',
		path: '/billReceive',
		component: BillReceiveComponent,
		children:[
			{ 
				name: 'billReceiveList',
				path: '/', 
				component: BillReceiveListComponent 
			},{ 
				name: 'billReceiveCreate',
				path: 'create', 
				component: BillReceiveCreateComponent 
			},{ 
				name: 'billReceiveUpdate',
				path: 'update/:id', 
				component: BillReceiveCreateComponent 
			}
		]
	},{ 
		name: 'dashboard',
		path: '/dashboard', 
		component: BillDashboardComponent
	},{ 
		path: '*', 
		redirect: { name: 'dashboard' }
	}
];
let router = new VueRouter({
	routes
});

let app = new Vue({
	template: `<mainComponent></mainComponent>`,
	router,
	el: '#app',
	components: {
		'mainComponent': mainComponent
	}
});
