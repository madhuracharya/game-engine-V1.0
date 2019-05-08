function getRandomColor() 
{
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) 
	color += letters[Math.floor(Math.random() * 16)];
		return color;
}
//------------------------------------------------------------------------
var lastTime= 0, fps, delta;
function calculate_framerate(timestamp)
{
	fps= Math.round(1000 / (timestamp - lastTime));
	lastTime= timestamp;
	document.getElementById("framerate").innerHTML= "FPS: " + fps;
    return fps;
}
//------------------------------------------------------------------------
function stopwatch()
{
	var start= Date.now();
	function get_duration()
	{
		var d= Date.now() - start;
		return d;
	}
	return get_duration;
}
//------------------------------------------------------------------------
var mouse_x, mouse_y;
function get_co_ords(event)
{
	mouse_x= event.offsetX;
	mouse_y= event.offsetY;
}
//------------------------------------------------------------------------
var up= false,
	down= false,
	left= false,
	right= false;
	jump= false;
var keycode_up, key_up;
function keyup_get_key(event)
{
	keycode_up= event.keyCode;
	key_up= event.key;
	switch(keycode_up)
	{
		case 38 : {up= false; break;}
		case 40 : {down= false; break;} 
		case 37 : {left= false; break;} 
		case 39 : {right= false; break;} 
		case 32 : {jump= false; break;}
	}
}

var keycode_down, key_down;
function keydown_get_key(event)
{
	keycode_down= event.keyCode;
	key_down= event.key;
	switch(keycode_down)
	{
		case 38 : {up= true; break;}
		case 40 : {down= true; break;} 
		case 37 : {left= true; break;} 
		case 39 : {right= true; break;} 
		case 32 : {jump= true; break;}
	}
}
//------------------------------------------------------------------------
function draw_vector(pos, vel= pos, color= "red")
{
	context.save();
	context.beginPath();
	context.strokeStyle= color;
	context.translate(pos.dx, pos.dy);
	context.rotate(vel.get_angle());
	context.moveTo(0, 0);
	context.lineTo(30, 0);
	context.lineTo(23, -5);
	context.moveTo(30, 0);
	context.lineTo(23, 5);
	context.stroke();
	context.restore();
}
//------------------------------------------------------------------------
function clone_particle(original)
{
	var clone= new particle(0, 0, 0, 0);
		clone.position.dx= original.position.dx + 0;
		clone.position.dy= original.position.dy + 0;
		clone.velocity.set_mag(original.velocity.get_mag() + 0);
		clone.velocity.set_angle(original.velocity.get_angle() + 0);
		clone.collider_type= original.collider_type;
		clone.radius= original.radius;
		clone.width= original.width;
		clone.height= original.height;
		clone.color= original.color;

	return clone;
}
//------------------------------------------------------------------------
function check_b2b_collision(b1, b2)
{
	var dx= Math.abs(b1.position.dx - b2.position.dx);
	var dy= Math.abs(b1.position.dy - b2.position.dy);
	return (((dx * dx) + (dy * dy)) <= ((b1.radius + b2.radius) * (b1.radius + b2.radius)));
}
//------------------------------------------------------------------------
function check_x2x_collision(x1, x2)
{
	return (x1.position.dx >= x2.position.dx - x2.width && x1.position.dx <= x2.position.dx + x2.width && x1.position.dy >= x2.position.dy - x2.height && x1.position.dy <= x2.position.dy + x2.height) ;
}
//------------------------------------------------------------------------
function check_wall_collision(ref)
{
	let w= ref.collider_type == "ball" ? ref.radius : (ref.type == "box" ? ref.width : 0);
	let h= ref.collider_type == "ball" ? ref.radius : (ref.type == "box" ? ref.height : 0);
	return ((ref.position.dx >= width / 2 - w || ref.position.dx <= -width / 2 + w) || (ref.position.dy >= height / 2 - h || ref.position.dy <= -height / 2 + h));
}

function p2wall_collision(ref, inprison= false, stick= false)
{
	let d, flag= false;

	let position= new vector(ref.position.dx, ref.position.dy);

	let w= ref.collider_type == "ball" ? ref.radius : (ref.type == "box" ? ref.width : 0);
	let h= ref.collider_type == "ball" ? ref.radius : (ref.type == "box" ? ref.height : 0);

	if(ref.position.dx >= width / 2 - w || ref.position.dx <= -width / 2 + w)
	{
		position.dx= Math.sign(ref.position.dx) * (width / 2) + (Math.sign(ref.position.dx) * -1 * (w + 0)); 
		flag= true;
	}

	if(ref.position.dy >= height / 2 - h || ref.position.dy <= -height / 2 + h)
	{
		position.dy= Math.sign(ref.position.dy) * (height / 2) + (Math.sign(ref.position.dy) * -1 * (h + 0));
		flag= true;
	}
	
	if(flag === true)
	{
		if(inprison === true)
			ref.position.set_vect(position);
		if(stick === true)
			ref.velocity.set_mag(0);
		return position;
	}
	else
		return false; 
}
//------------------------------------------------------------------------
function uncolide(pt1, pt2)
{
	var nudge= new vector(0, 0);
	nudge.set_mag(1);
	var tta= Math.atan2(pt1.position.dy - pt2.position.dy, pt1.position.dx - pt2.position.dx);
	//nudge.set_angle(tta);
	//pt1.position.add(nudge);
	nudge.set_angle(tta + Math.PI);
	pt2.position.add(nudge);
}
//------------------------------------------------------------------------
function unstack_particles(array, type)
{
	for(var e1= 0; e1 < array.length; e1++)
		for(var e2= e1; e2 < array.length ; e2++)
		{
			if(e1 == e2) continue;
			if(type == "ball")
				while(check_b2b_collision(array[e1], array[e2])){uncolide(array[e1], array[e2]);}
			else if(type == "box")
				while(check_x2x_collision(array[e1], array[e2])){uncolide(array[e1], array[e2]);}
		}
}
//------------------------------------------------------------------------
function wrapp_around(ref)
{
	let d, flag= false;

	let w= ref.collider_type == "ball" ? ref.radius : (ref.type == "box" ? ref.width : 0);
	let h= ref.collider_type == "ball" ? ref.radius : (ref.type == "box" ? ref.height : 0);

	if(ref.position.dx >= width / 2 - w || ref.position.dx <= -width / 2 + w)
	{
		ref.position.dx= Math.sign(ref.position.dx) * (-width / 2) + (Math.sign(ref.position.dx) * 1 * (w + 0)); 
	}

	if(ref.position.dy >= height / 2 - h || ref.position.dy <= -height / 2 + h)
	{
		ref.position.dy= Math.sign(ref.position.dy) * (-height / 2) + (Math.sign(ref.position.dy) * 1 * (h + 0));
	}
}
//------------------------------------------------------------------------
function draw_object(pos, ang= 0, image, w, h)
{
	if(w === undefined && h === undefined)
	{
		w= 50;
		h= w * (image.height / image.width);
	}
	else
	{
		if(w === undefined)
			w= h * (image.width / image.height);
		if(h === undefined)
			h= w * (image.height / image.width);
	}

	context.save();
	context.translate(pos.dx, pos.dy);
	context.rotate(ang);	
	context.drawImage(image, -w / 2, -h / 2, w, h);
	context.restore();
}
//------------------------------------------------------------------------