function Duck(){
	this.time = "";
	this.location = "";
	this.quantity = "";
}

Duck.prototype.Create = function(time, location, quantity){
	this.time = time;
	this.location = location;
	this.quantity = quantity;
}

module.exports = {
	Duck: Duck
};