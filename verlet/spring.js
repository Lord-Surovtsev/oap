function Spring(particleA, particleB) {
	with (this) {
		this.a = particleA;
		this.b = particleB;
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
			offX = (diff * dX / h) * 0.1;
			offY = (diff * dY / h) * 0.1;
	
			a.fX -= offX;
			a.fY -= offY;
			b.fX += offX;
			b.fY += offY;
		}
	}
}
