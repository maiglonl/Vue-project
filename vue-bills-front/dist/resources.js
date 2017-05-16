'use strict';

Vue.http.options.root = 'http://localhost:8000/api';
window.BillPay = Vue.resource('billsPay{/id}');
window.BillReceive = Vue.resource('billsReceive{/id}');