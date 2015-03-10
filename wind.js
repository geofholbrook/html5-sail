
var windImage = new Image();
windImage.src = "lib/wind-arrow.png";
var windPatt = null;




function drawWind(ctx)
{
	ctx.save();
	ctx.globalAlpha = 0.2;
	ctx.fillStyle = windPatt;

	// coords adjusted to correspond to canvas
    ctx.fillRect(-can.width/2, -can.height/2, can.width, can.height);

    ctx.globalAlpha = 1;
    ctx.restore();

}
