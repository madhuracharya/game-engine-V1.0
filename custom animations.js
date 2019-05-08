//This is where all the main animations are created

//here is a basic animation of colored balls moving across the screen
function explosions()
{
	for(var i= 0; i < balls.length; i++)
	{
		context.beginPath();
		context.fillStyle= balls[i].color;
		context.arc(balls[i].position.dx, balls[i].position.dy, balls[i].radius, 0, Math.PI * 2);
		balls[i].update_pos();
		context.fill();
		balls[i].radius= balls[i].radius + 0.25;
		balls[i].velocity.set_angle(balls[i].position.get_angle() - Math.PI / 6);
	}
	
	for(var i= 0; i < balls.length; i++)
	{ 
		if((balls[i].position.dx >= width / 2 + balls[i].radius || balls[i].position.dx <= -width / 2 - balls[i].radius) || (balls[i].position.dy >= height / 2 + balls[i].radius || balls[i].position.dy <= -height / 2 - balls[i].radius))
		{
			balls[i].position.set_dxy(0, 0);
			balls[i].color= getRandomColor();
			balls[i].radius= 1;
			balls[i].velocity.set_mag(Math.random() * 2 + 1.5);
		}
	}
}
