import './bootstrap';
import BillPayComponent from './billPay/billPay.component';
import BillPayListComponent from './billPay/billPayList.component';
import BillPayCreateComponent from './billPay/billPayCreate.component';
import BillReceiveComponent from './billReceive/billReceive.component';
import BillReceiveListComponent from './billReceive/billReceiveList.component';
import BillReceiveCreateComponent from './billReceive/billReceiveCreate.component';
import BillDashboardComponent from './billDashboard.component';
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
