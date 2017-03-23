var mainComponent = Vue.extend({
	components: {
		'billComponent': billComponent
	},
	template: '<billComponent></billComponent>',
	data: function(){
		return {
			billsPay: [
				{ date: '2016-01-01', name: 'Luz', value: 110, done: 1 },
				{ date: '2016-07-20', name: 'Água', value: 110, done: 0 },
				{ date: '2016-07-20', name: 'Mercado', value: 110, done: 0 }
			],
			billsReceive: [
				{ date: '2016-01-01', name: 'Salário', value: 3000, done: 1 },
				{ date: '2016-07-20', name: 'Auxilio Educação', value: 200, done: 0 },
				{ date: '2016-07-20', name: 'Vale Alimentação', value: 700, done: 0 }
			]
		}
	}
});
var routes = [
	{
		name: 'billPay',
		path: '/billPay',
		component: billPayComponent,
		children:[
			{ 
				name: 'billPayList',
				path: '/', 
				component: billPayListComponent 
			},{ 
				name: 'billPayCreate',
				path: '/create', 
				component: billPayCreateComponent 
			},{ 
				name: 'billPayUpdate',
				path: '/update/:id', 
				component: billPayCreateComponent 
			}
		]
	},{
		name: 'billReceive',
		path: '/billReceive',
		component: billReceiveComponent,
		children:[
			{ 
				name: 'billReceiveList',
				path: '/', 
				component: billReceiveListComponent 
			},{ 
				name: 'billReceiveCreate',
				path: '/create', 
				component: billReceiveCreateComponent 
			},{ 
				name: 'billReceiveUpdate',
				path: '/update/:id', 
				component: billReceiveCreateComponent 
			}
		]
	},{ 
		name: 'dashboard',
		path: '/dashboard', 
		component: billDashboardComponent
	},{ 
		path: '*', 
		redirect: { name: 'dashboard' }
	}
];
var router = new VueRouter({
	routes
});

var app = new Vue({
	router,
	el: '#app',
	components: {
		'main-component': mainComponent
	}
});
/*
const app = new Vue({
	router
}).$mount('#app');
*/