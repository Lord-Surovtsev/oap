function Spring(particleA, particleB) {
	with (this) {
		this.a = particleA;
		this.b = particleB;
		this.dX = a.x - b.x;
		this.dY = a.y - b.y;
		this.normLen = Math.sqrt(dX * dX + dY * dY);
		this.len = normLen;
		this.diff = 0;
		this.offX = 0;
		this.offY = 0;
	}
	
	this.recalculate = function() {
		with (this) {
			dX = b.x - a.x;
			dY = b.y - a.y;
			len = Math.sqrt(dX * dX + dY * dY);
			diff = normLen - len;
			offX = (diff * dX / len) * 0.1;
			offY = (diff * dY / len) * 0.1;
	
			a.fX -= offX;
			a.fY -= offY;
			b.fX += offX;
			b.fY += offY;
		}
	}
}
