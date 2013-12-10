$(function(){
    var Body = function(x, y, radius){
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.ax = 0;
        this.ay = 0;
        this.radius = radius;
    }

    Body.prototype = {
        accelerate: function(delta){
            this.x += this.ax * delta * delta;
            this.y += this.ay * delta * delta;
            this.ax = 0;
            this.ay = 0;
        },
        inertia: function(delta){
            var x = this.x*2 - this.px;
            var y = this.y*2 - this.py;
            this.px = this.x;
            this.py = this.y;
            this.x = x;
            this.y = y;
        },
        draw: function(ctx){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.fill();
        },
    }

    var Simulation = function(ctx){
        var bodies = this.bodies = [];
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        var interval;

        while(bodies.length < 30){
            var body = new Body(
                Math.random() * (ctx.canvas.width-50) + 25,
                Math.random() * (ctx.canvas.height-50) + 25,
                Math.random() * 20 + 5
            );
            var collides = false;
            for(var i=0, l=bodies.length; i<l; i++){
                var other = bodies[i];
                var x = other.x - body.x;
                var y = other.y - body.y;
                var length = Math.sqrt(x*x+y*y);
                if(length < other.radius + body.radius){
                    collides = true;
                    break;
                }
            }
            if(!collides){
                bodies.push(body);
            }
        }
        
        var collide = function(){
            for(var i=0, l=bodies.length; i<l; i++){
                var body1 = bodies[i];
                for(var j=i+1; j<l; j++){
                    var body2 = bodies[j];
                    var x = body1.x - body2.x;
                    var y = body1.y - body2.y;
                    var slength = x*x+y*y;
                    var length = Math.sqrt(slength);
                    var target = body1.radius + body2.radius;

                    if(length < target){
                        var factor = (length-target)/length;
                        body1.x -= x*factor*0.5;
                        body1.y -= y*factor*0.5;
                        body2.x += x*factor*0.5;
                        body2.y += y*factor*0.5;
                    }
                }
            }
        }

        var border_collide = function(){
            for(var i=0, l=bodies.length; i<l; i++){
                var body = bodies[i];
                var radius = body.radius;
                var x = body.x;
                var y = body.y;

                if(x-radius < 0){
                    body.x = radius;
                }
                else if(x + radius > width){
                    body.x = width-radius;
                }
                if(y-radius < 0){
                    body.y = radius;
                }
                else if(y + radius > height){
                    body.y = height-radius;
                }
            }
        }

        var draw = function(){
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillStyle = 'rgba(234, 151, 43, 1.0)';
            for(var i=0, l=bodies.length; i<l; i++){
                bodies[i].draw(ctx);
            }
        }

        var gravity = function(){
            for(var i=0, l=bodies.length; i<l; i++){
                bodies[i].ay += 0.5;
            }
        }

        var accelerate = function(delta){
            for(var i=0, l=bodies.length; i<l; i++){
                bodies[i].accelerate(delta);
            }
        }
        
        var inertia = function(delta){
            for(var i=0, l=bodies.length; i<l; i++){
                bodies[i].inertia(delta);
            }
        }

        var step = function(){
            var steps = 2;
            var delta = 1/steps;
            for(var i=0; i<steps; i++){
                gravity();
                accelerate(delta);
                collide();
                border_collide();
                inertia(delta);
            }
            draw();
        }

        this.start = function(){
            interval = setInterval(function(){
                step();
            }, 30);
        }

        this.stop = function(){
            if(interval){
                clearInterval(interval);
                interval = null;
            }
        }

        draw();
    }

    var canvas = $('#verlet_only')
        .click(function(event){
            var offset = $(this).offset();
            var x = event.pageX - offset.left;
            var y = event.pageY - offset.top;
            simulation.bodies.push(new Body(
                x,
                y,
                Math.random() * 20 + 5
            ));
        })
        .hover(
            function(){
                simulation.start();
            },
            function(){
                simulation.stop();
            }
        )[0];
    
    $('<button>reset</button>')
        .insertBefore(canvas)
        .click(function(){
            simulation = new Simulation(ctx);
        });

    var ctx = canvas.getContext('2d');
    var simulation = new Simulation(ctx);
});
