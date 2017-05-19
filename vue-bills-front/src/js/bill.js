export class Bill{
	constructor(data = {}){
		this.date_due = '';
		this.name = '';
		this.value = 0;
		this.done = 0;
		Object.assign(this,data);
	}
};
