
var windImage = new Image();
windImage.src = "lib/wind-arrow.png";
var windPatt = null;

var windAngle = -Math.PI/2;  // always will display this way.

var windCounter = 0;
var windSpeed = 3;

function drawWind(ctx)
{
	ctx.save();
	ctx.globalAlpha = 0.15;
	ctx.fillStyle = windPatt;
	ctx.clearRect(-can.width, -can.height, can.width * 2, can.height * 2);
	ctx.rotate(-windAngle);
    ctx.fillRect(-can.width, -can.height, can.width * 2, can.height * 2);
	ctx.globalAlpha = 1;
	ctx.restore();
}