
var windImage = new Image();
windImage.src = "lib/wind-arrow.png";
var windPatt = null;

var windAngle = 0.0;  // always will display this way.

var windCounter = 0;
var windSpeed = 3;

function drawWind(ctx)
{
	ctx.save();
	ctx.globalAlpha = 0.15;
	ctx.fillStyle = windPatt;

	//wind doesn't move, can't figure it out how to make that work
	//windCounter = (windCounter + windSpeed) % 75;

	
    var offset = { x: modulo( -boat.pos.x, windImage.width ),
				   y: modulo(  boat.pos.y, windImage.height )  };		

	// ctx.translate(windCounter + offset.x, offset.y);
	ctx.translate(offset.x, offset.y);
	
	//ctx.rotate(-windAngle);
    

	// made double size so that it fills the screen
    ctx.fillRect(-can.width, -can.height, can.width * 2, can.height * 2);

    ctx.globalAlpha = 1;
    ctx.restore();
}

function angleToSail(boat)
{

}

