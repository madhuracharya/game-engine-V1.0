//this is where all the animations and methods are called. All animations should be called within the animate method

var delta= 0;
var bullet_delay= stopwatch();

function animate(timestamp)
{
	delta= calculate_framerate(timestamp);
	context.fillStyle= "black";
	context.fillRect(-width / 2, -height / 2, width, height);

	explosions();

	if(an_flag == false)
		ani_id= requestAnimationFrame(animate);
}
