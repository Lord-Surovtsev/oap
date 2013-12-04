function Particle(xPos, yPos, st) {
	this.x = xPos;
	this.y = yPos;
	this.oldX = xPos;
	this.oldY = yPos;
	this.fX = 0;
	this.fY = 0;
	this.st = 0;

	/*
	this.setPos = function(xPos, yPos) {
		with(this) {
			x = xPos;
			oldX = xPos;
			y = yPos;
			oldY = yPos;
		}
	}
	*/

	this.refresh = function() {
		if (this.st)
		{
			return;
		}
		with(this) {
			var tempX = x
			  , tempY = y;
			x += x - oldX + fX;
			y += y - oldY + fY;
			oldX = tempX;
			oldY = tempY;
			fX = 0;
			fY = 0;
		}
	}
}
