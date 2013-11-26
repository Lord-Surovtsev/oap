function Stick(pointA, pointB) {
	with (this) {
		this.a = pointA;
		this.b = pointB;
		this.dX = a.x - b.x;
		this.dY = a.y - b.y;
		this.hypotenuse = Math.sqrt(dX * dX + dY * dY);
		this.h = hypotenuse;
		this.diff = 0;
		this.offX = 0;
		this.offY = 0;
	}
	
	this.contract = function() {
		with (this) {
			dX = b.x - a.x;
			dY = b.y - a.y;
			h = Math.sqrt(dX * dX + dY * dY);
			diff = hypotenuse - h;
			offX = (diff * dX / h) / 2;
			offY = (diff * dY / h) / 2;
	
			a.x -= offX;
			a.y -= offY;
			b.x += offX;
			b.y += offY;
		}
	}
}
