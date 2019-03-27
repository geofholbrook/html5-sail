class BoatInfoDisplay {
    constructor(selector) {
        this.canvasElement = null;
        this.ctx = null;
        this.init(selector);
        this.draw();
    }

    init(selector) {
        this.canvasElement = document.getElementById(selector);
        this.canvasElement.width = 170;
        this.canvasElement.height = 170;
        this.ctx = this.canvasElement.getContext("2d"); 
        this.ctx.width = 100;
    }

    draw() {
        let boatSize = 35;
        // xy coords of boat facing East.
        let boatCoords = [ 	pol2car(boatSize, 0),
            pol2car(boatSize/2, deg2rad(-70)),
            pol2car(boatSize, deg2rad(-160)),
            pol2car(boatSize, deg2rad(160)),
            pol2car(boatSize/2, deg2rad(70)) ] ;
        let tiltScale = 1;
        let windColor = "green";
        let windAngle = Math.PI/4;
        this.ctx.save();
        // var tiltScale = Math.cos (this.tilt);
        this.ctx.translate(this.canvasElement.width/2, this.canvasElement.height/2);
		this.ctx.fillStyle = BOAT_COLOR;
		this.ctx.strokeStyle = BOAT_COLOR;

		this.ctx.lineJoin = "round";
		this.ctx.lineWidth = Math.abs( tiltScale / 20 ) + 5;
        this.ctx.rotate(-Math.PI/2);
		this.ctx.beginPath();

		this.ctx.moveTo (boatCoords[0].x, boatCoords[0].y * tiltScale);
		this.ctx.lineTo (boatCoords[1].x, boatCoords[1].y * tiltScale);
		this.ctx.lineTo (boatCoords[2].x, boatCoords[2].y * tiltScale);
		this.ctx.lineTo (boatCoords[3].x, boatCoords[3].y * tiltScale);
		this.ctx.lineTo (boatCoords[4].x, boatCoords[4].y * tiltScale);
        
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.rotate(Math.PI/2);
        this.ctx.strokeStyle = windColor;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.rotate(windAngle);
        this.ctx.lineTo(0, 100);
        
		this.ctx.stroke();
        this.ctx.restore();
    }
}