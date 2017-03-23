var eventHub = new Vue();

var mainComponent = Vue.extend({
	components: {
		'app-component': appComponent
	},
	template: '<app-component></app-component>',
	data: function(){
		return {
			bills: [
				{ date_due: '2016-01-01', name: 'Luz', value: 110, done: 1 },
				{ date_due: '2016-07-20', name: 'Água', value: 110, done: 0 },
				{ date_due: '2016-07-20', name: 'Mercado', value: 110, done: 0 }
			]
		}
	}
});
var routes = [
	{ 
		name: 'billList',
		path: '/bills', 
		component: billListComponent 
	},{ 
		name: 'billCreate',
		path: '/bill/create', 
		component: billCreateComponent 
	},{ 
		path: '*', 
		redirect: '/bills' 
	},
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