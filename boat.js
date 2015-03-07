

// BOAT CLASS //

var bs = 35; // boat size

var mastHeight = bs*1.8;
var sailHeight = mastHeight * 0.95;
var boomLength = bs*1.2;
var boomHeight = mastHeight * 0.1;

// xy coords of boat facing East.
var boatCoords = [ 	pol2car(bs, 0),
					pol2car(bs/2, deg2rad(70)),
					pol2car(bs, deg2rad(160)),
					pol2car(bs, deg2rad(-160)),
					pol2car(bs/2, deg2rad(-70)) ] ;

var mastBase = { x: bs/3, y: 0 };

function Boat()
{
	this.angle = 0;
	this.speed = 0;
	this.pos = { x:0, y:0 };
	this.tilt = 0;
	this.color = "#cd4236"

	this.boom = 0;
}

Boat.prototype.updatePos = function() {
	this.pos.x += Math.cos(deg2rad(this.angle))*this.speed;
	this.pos.y -= Math.sin(deg2rad(this.angle))*this.speed;
}


Boat.prototype.drawSail = function (ctx) {

	// calculate positions
	
	var mastTop = { x: mastBase.x, y: mastBase.y - mastHeight * Math.sin(deg2rad(this.tilt)) };
	var mastHead = { x: mastBase.x, y: mastBase.y - sailHeight * Math.sin(deg2rad(this.tilt)) };
    var tack = { x: mastBase.x, y: mastBase.y - boomHeight * Math.sin(deg2rad(this.tilt)) };
	var clew = { x: mastBase.x - boomLength * Math.cos(deg2rad(this.boom)), 
		         y: mastBase.y - boomLength * Math.sin(deg2rad(this.boom)) * Math.cos(deg2rad(this.tilt))
		        	           - boomHeight * Math.sin(deg2rad(this.tilt)) }


	// boom
    ctx.strokeStyle = "#590000";
    ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo (tack.x, tack.y);
	ctx.lineTo (clew.x, clew.y);
	ctx.closePath();	
	ctx.stroke();

    // sail
    ctx.fillStyle = "#fff";
	ctx.strokeStyle = "#fff";
	ctx.lineWidth = 2;
    ctx.beginPath();
	ctx.moveTo (tack.x, tack.y);
	ctx.lineTo (clew.x, clew.y);
	ctx.lineTo (mastHead.x, mastHead.y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	// mast
	ctx.strokeStyle = "#590000";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo (mastBase.x, mastBase.y);
	ctx.lineTo (mastTop.x, mastTop.y);
	ctx.closePath();
	ctx.stroke(); 




}

Boat.prototype.drawHull = function (ctx) {

	var tiltScale = Math.cos (deg2rad(this.tilt));

	ctx.fillStyle = boat.color;
	ctx.strokeStyle = boat.color;
	ctx.lineWidth = Math.abs( boat.tilt / 20 );

	ctx.beginPath();

	ctx.moveTo (boatCoords[0].x, boatCoords[0].y * tiltScale);
	ctx.lineTo (boatCoords[1].x, boatCoords[1].y * tiltScale);
	ctx.lineTo (boatCoords[2].x, boatCoords[2].y * tiltScale);
	ctx.lineTo (boatCoords[3].x, boatCoords[3].y * tiltScale);
	ctx.lineTo (boatCoords[4].x, boatCoords[4].y * tiltScale);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

Boat.prototype.draw = function (ctx) {

	ctx.save();
	ctx.rotate(deg2rad(this.angle));

	this.drawHull(ctx);
	this.drawSail(ctx);

	ctx.restore();

}

