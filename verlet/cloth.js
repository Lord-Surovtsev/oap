function Cloth(cols, rows, width, height, ctx, withDiagSprings) {
	var FILL_STYLE = "orange";
	var STROKE_STYLE = "green";
	ctx.fillStyle = FILL_STYLE;
	ctx.strokeStyle = STROKE_STYLE;

	var diffX = width / cols;
	var diffY = height / rows;

	this.iteration = 0;

	this.particles = new Array(cols * rows)
	, this.springs = new Array((cols - 1) * rows + cols * (rows - 1) + (withDiagSprings != 0 ? 1 : 0) * 2 * (cols - 1) * (rows - 1));

	var i = 0;
	for (var r = 0; r < rows; r++) {
		for (var c = 0; c < cols; c++) {
			this.particles[r * cols + c] = new Particle(c * diffX, r * diffY);
			if (c > 0) {
				this.springs[i++] = new Spring(this.particles[r * cols + c - 1], this.particles[r * cols + c]);
			}
			if (r > 0) {
				this.springs[i++] = new Spring(this.particles[r * cols + c], this.particles[(r - 1)* cols + c]);
			}
			if (withDiagSprings && c > 0 && r > 0)
			{
				this.springs[i++] = new Spring(this.particles[r * cols + c], this.particles[(r - 1) * cols + c - 1]);
				this.springs[i++] = new Spring(this.particles[r * cols + c -1], this.particles[(r - 1) * cols + c]);
			}
		}
	}
	this.particles[0].st = 1;
	this.particles[cols - 1].st = 1;

	this.clearContext = function() {
		ctx.fillRect(0, 0, canv.width, canv.height);
	}

	this.drawScene = function() {
		this.clearContext();
		ctx.beginPath();
		s = this.springs.length;
		for (i = 0; i < s; i++) {
			var spring = this.springs[i];
			ctx.moveTo(spring.a.x + diffX, spring.a.y + diffY);
			ctx.lineTo(spring.b.x + diffX, spring.b.y + diffY);
		}
		ctx.stroke();
	}

	this.updateScene = function() {
		var i = 0;
		var t = this.springs.length;
		for (i = 0; i < t; i++) {
			this.springs[i].recalculate();
		}

		t = this.particles.length
		for (i = 0; i < t; i++) {
			this.particles[i].fY += 0.01;
			this.particles[i].inercia();
		}
		this.iteration++;
		console.log("iteration " + this.iteration);
		this.drawScene();
	}
}
