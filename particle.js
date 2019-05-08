//This is where all the custom particles and assets are defined.

var particle= function(x, y, direction, speed, xlr8= 0, friction= 0)
{
	this.collider_type= "ball"
	this.radius= null;
	this.width= null;
	this.height= null;
	this.color= "#000000";

	this.position= new vector(x, y);
	this.velocity= new vector(0, 0);
	this.velocity.set_mag(speed);
	this.velocity.set_angle(direction);
	this.acceleration= new vector(0, 0);
	this.acceleration.set_mag(xlr8);

	this.update_pos= function()
	{
		var temp= new vector(0, 0);

		if(delta == 0 || delta == undefined || delta == null);
			this.position.add(this.velocity);
		else
		{
			temp.set_mag(this.velocity.get_mag() * (60 / delta));
			temp.set_angle(this.velocity.get_angle());
			this.position.add(temp);
		}
	}

	this.accelerate= function(decelerate= false)
	{
		this.velocity.add(this.acceleration);
		if(this.velocity.get_mag() > this.topspeed)
			this.velocity.set_mag(this.topspeed);
	}

	this.apply_friction= function(){his.velocity.multiply(friction);}
}
