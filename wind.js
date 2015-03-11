
var windImage = new Image();
windImage.src = "lib/wind-arrow.png";
var windPatt = null;

var windAngle = 0.2;

var windCounter = 0;
var windSpeed = 3;

function drawWind(ctx)
{
	ctx.save();
	ctx.globalAlpha = 0.15;
	ctx.fillStyle = windPatt;

	windCounter = (windCounter + windSpeed) % 75;

	ctx.rotate(windAngle);

	var offset = { x: modulo( -boat.pos.x, windImage.width ),
				   y: modulo(  boat.pos.y, windImage.height )  };		

	ctx.translate(windCounter + offset.x, offset.y);
	
	// made double size so that it fills the screen
    ctx.fillRect(-can.width, -can.height, can.width * 2, can.height * 2);

    ctx.globalAlpha = 1;
    ctx.restore();
}
