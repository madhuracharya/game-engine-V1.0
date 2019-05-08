//this is where all the basic setup, variables and events are handlers are created

window.addEventListener("load", ready);
document.getElementById("pause").onclick= function()
{	
	an_flag= !an_flag;
	switch(an_flag)
	{
		case true: {cancelAnimationFrame(ani_id); console.log("paused!"); break;}
		case false: {ani_id= requestAnimationFrame(animate); console.log("playing!"); break;}
	}
};

var an_flag= false, ani_id, context;
var width= document.getElementById("my_canvas").width= 1130;
var height= document.getElementById("my_canvas").height= window.innerHeight;

function ready()
{
	context= document.getElementById("my_canvas").getContext("2d");
	console.log("begin animation!");
	context.translate(width / 2, height / 2);
	context.transform(1, 0, 0, -1, 0, 0)
	//context.transform(1, 0, 0, -1, 0, canvas.height)  for cartecian cordinate system with origin at bottom left of screen
	document.getElementById("my_canvas").addEventListener("mousemove", get_co_ords);
	document.body.addEventListener("keydown", keydown_get_key);
	document.body.addEventListener("keyup", keyup_get_key);
	ani_di= requestAnimationFrame(animate);
}