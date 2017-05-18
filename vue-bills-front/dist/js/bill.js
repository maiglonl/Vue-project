'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bill = function Bill() {
	var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	_classCallCheck(this, Bill);

	this.date_due = '';
	this.name = '';
	this.value = 0;
	this.done = 0;
	Object.assign(this, data);
};