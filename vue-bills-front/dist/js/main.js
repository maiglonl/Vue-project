'use strict';

var mainComponent = Vue.extend({
	components: {
		'billComponent': billComponent
	},
	template: '<billComponent></billComponent>'
});
var routes = [{
	name: 'billPay',
	path: '/billPay',
	component: billPayComponent,
	children: [{
		name: 'billPayList',
		path: '/',
		component: billPayListComponent
	}, {
		name: 'billPayCreate',
		path: 'create',
		component: billPayCreateComponent
	}, {
		name: 'billPayUpdate',
		path: 'update/:id',
		component: billPayCreateComponent
	}]
}, {
	name: 'billReceive',
	path: '/billReceive',
	component: billReceiveComponent,
	children: [{
		name: 'billReceiveList',
		path: '/',
		component: billReceiveListComponent
	}, {
		name: 'billReceiveCreate',
		path: 'create',
		component: billReceiveCreateComponent
	}, {
		name: 'billReceiveUpdate',
		path: 'update/:id',
		component: billReceiveCreateComponent
	}]
}, {
	name: 'dashboard',
	path: '/dashboard',
	component: billDashboardComponent
}, {
	path: '*',
	redirect: { name: 'dashboard' }
}];
var router = new VueRouter({
	routes: routes
});

var app = new Vue({
	router: router,
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