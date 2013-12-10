function Sphere() {
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.ax = 0;
        this.ay = 0;
        this.radius = radius;

	accelerate = function(delta){
            this.x += this.ax * delta * delta;
            this.y += this.ay * delta * delta;
            this.ax = 0;
            this.ay = 0;
        }
        inertia = function(delta){
            var x = this.x*2 - this.px;
            var y = this.y*2 - this.py;
            this.px = this.x;
            this.py = this.y;
            this.x = x;
            this.y = y;
        }
        draw = function(ctx){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.fill();
        }

}
