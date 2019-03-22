// BOAT CLASS //

var boatSize = 35; // boat size

var mastHeight = boatSize*1.8;
var sailHeight = mastHeight * 0.95;
var boomLength = boatSize*1.2;
var boomHeight = mastHeight * 0.1;

// xy coords of boat facing East.
var boatCoords = [ 	pol2car(boatSize, 0),
					pol2car(boatSize/2, deg2rad(70)),
					pol2car(boatSize, deg2rad(160)),
					pol2car(boatSize, deg2rad(-160)),
					pol2car(boatSize/2, deg2rad(-70)) ] ;

var mastBase = { x: boatSize/3, y: 0 };

const MAX_RUDDER = Math.PI/4;

// Change in heading at full rudder, speed: 1
const HEADING_DELTA_MAX_RUDDER = Math.PI / 128;

function Boat()
{
	this.angle = Math.PI;
	this.speed = 1;
	this.pos = { x:0, y:0 };
	this.tilt = 0;
	this.color = "#cd4236"
	this.boom = 0;
	this.sheet = Math.PI/2; // The rope controlling the boom
	this.rudder = 0; 
}

Boat.prototype.updatePos = function() {
	let newAngle = this.angle + headingDelta(this.rudder, Math.max(0.1, this.speed));
	let absAngle = Math.abs(newAngle);
	if (absAngle > Math.PI) {
		if (newAngle > 0) {
			newAngle = -(Math.PI - (absAngle % Math.PI));
		} else {
			newAngle = Math.PI - (absAngle % Math.PI);
		}
	}
	this.angle = newAngle;

	this.sheet = this.calculateSheet(this.angle);

	// set the boom angle to the opposite of the boat angle restricted by sheet
	this.boom = clip(-this.angle, -this.sheet, this.sheet);

    this.tilt = Math.cos(this.boom) * Math.sin(this.angle + this.boom) * 0.8;

	this.speed = -(Math.sin(this.boom) * Math.sin(this.angle + this.boom)) * 15;   // wind is always 0

	this.pos.x += Math.cos(this.angle)*this.speed;
	this.pos.y += Math.sin(this.angle)*this.speed;
}


Boat.prototype.drawSail = function (ctx) {
	// calculate positions
	var mastTop = { x: mastBase.x, y: mastBase.y - mastHeight * Math.sin(this.tilt) };
	var mastHead = { x: mastBase.x, y: mastBase.y - sailHeight * Math.sin(this.tilt) };
    var tack = { x: mastBase.x, y: mastBase.y - boomHeight * Math.sin(this.tilt) };
	var clew = { x: mastBase.x - boomLength * Math.cos(-this.boom), 
		         y: mastBase.y - boomLength * Math.sin(-this.boom) * Math.cos(this.tilt)
		        	           - boomHeight * Math.sin(this.tilt) }


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

	var tiltScale = Math.cos (this.tilt);

	ctx.fillStyle = boat.color;
	ctx.strokeStyle = boat.color;

	ctx.lineJoin = "round";
	ctx.lineWidth = Math.abs( boat.tilt / 20 ) + 5;

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
	ctx.rotate(-this.angle);
	this.drawHull(ctx);
	this.drawSail(ctx);
	ctx.restore();
}

Boat.prototype.calculateSheet = function(boatAngle) {
	return relWindToRelBoom(boatAngle);
}

Boat.prototype.moveRudder = function(rudderDelta) {
	let newRudder = this.rudder + rudderDelta;	
	if (newRudder < -MAX_RUDDER) {
		newRudder = -MAX_RUDDER;
	} else if (newRudder > MAX_RUDDER) {
		newRudder = MAX_RUDDER;
	}
	this.rudder = clip(this.rudder + rudderDelta, -MAX_RUDDER, MAX_RUDDER);
}

function relWindToRelBoom(relWind) {
    return (3- 3 * Math.cos(relWind))/4;
}

function headingDelta(rudder, speed) {
	return (rudderPercent(rudder)/100) * speed * HEADING_DELTA_MAX_RUDDER;
}

function rudderPercent(rudder) {
	if (Math.abs(rudder) < 0.001) {
		rudder = 0.001;
	}
	return (rudder / MAX_RUDDER) * 100;
}

function relWindToRelBoom(relWind) {
    return (3- 3 * Math.cos(relWind))/4;
}

