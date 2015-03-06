

// BOAT CLASS //

var bs = 35; // boat size

// xy coords of boat facing East.
var boatCoords = [ 	pol2car(bs, 0),
					pol2car(bs/2, deg2rad(70)),
					pol2car(bs, deg2rad(160)),
					pol2car(bs, deg2rad(-160)),
					pol2car(bs/2, deg2rad(-70)) ] ;


function Boat()
{
	this.angle = 0;
	this.speed = 0;
	this.pos = { x:0, y:0 };
	this.tilt = 0;
	this.color = "#cd4236"
}

Boat.prototype.updatePos = function() {
	this.pos.x += Math.cos(deg2rad(this.angle))*this.speed;
	this.pos.y -= Math.sin(deg2rad(this.angle))*this.speed;
}


Boat.prototype.draw = function (ctx) {

	ctx.save();
	ctx.rotate(deg2rad(this.angle));

	ctx.fillStyle = boat.color;
	
	ctx.beginPath();
	ctx.moveTo (boatCoords[0].x, boatCoords[0].y);
	ctx.lineTo (boatCoords[1].x, boatCoords[1].y);
	ctx.lineTo (boatCoords[2].x, boatCoords[2].y);
	ctx.lineTo (boatCoords[3].x, boatCoords[3].y);
	ctx.lineTo (boatCoords[4].x, boatCoords[4].y);
	ctx.closePath();
	ctx.fill();

	ctx.restore();

}

