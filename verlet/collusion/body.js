var Body = function(x, y, radius) {
	this.x = x;
	this.y = y;
	this.pX = x;
	this.pY = y;
	this.aX = 0;
	this.aY = 0;
	this.radius = rasdius;
}

accelerate: function(delta) {
	this.x = this.aX * delta * delta;
	this.y = this.aY * delta * delta;
	this.aX = 0;
	this.aY = 0;
}

interia: function(delta) {
	var x = this.x * 2 - this.pX;
	var y = this.y * 2 - this.pY;
	this.pX = this.x;
	this.pY = this.y;
	this.x = x;
	this.y = y;
}

draw: function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	ctx.fill();
}
