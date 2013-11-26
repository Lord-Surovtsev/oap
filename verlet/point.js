function Point(xPos, yPos) {
	this.x = xPos;
	this.y = yPos;
	this.oldX = xPos;
	this.oldY = yPos;

	this.setPos = function(xPos, yPos) {
		with(this) {
			x = xPos;
			oldX = xPos;
			y = yPos;
			oldY = yPos;
		}
	}

	this.refresh = function() {
		with(this) {
			var tempX = x
			  , tempY = y;
			x += x - oldX;
			y += y - oldY;
			oldX = tempX;
			oldY = tempY;
		}
	}
}
