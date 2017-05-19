Vue.http.options.root = 'http://localhost:8000/api';

let BillPay = Vue.resource('billsPay{/id}');
let BillReceive = Vue.resource('billsReceive{/id}');

export { BillPay, BillReceive };