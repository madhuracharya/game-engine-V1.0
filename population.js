//this is where all the particles and assets are stored.

var balls= [], number_of_balls= 75;

for(var i= 0; i < number_of_balls; i++)
{
	var bl= new particle(0, 0, (Math.random() * 360) * Math.PI / 180, 10);
		bl.collider_type= "ball";
		bl.radius= 1;
		bl.color= "black";
		bl.particle_type= "rgba(0, 0, 0, 1)";
	balls.push(bl);
}

