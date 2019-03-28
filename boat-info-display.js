class BoatInfoDisplay {
    constructor(selector) {
        this.containerDiv = null;
        this.hullElement = null;
        this.hullCtx = null;
        this.relWindElement = null;
        this.relWindCtx = null;
        this.relBoomElement = null;
        this.relBoomCtx = null;
        this.init(selector);
        this.relWind = 0;
        this.relBoom = 3.14;
        this.drawBoat();
        this.ctx.save();
    }

    init(selector) {
        this.containerDiv = document.getElementById(selector);
        this.hullElement = document.getElementById("hull");
        this.ctx = this.hullElement.getContext("2d");
        this.relWindElement = document.getElementById("relWind");
        this.relWindCtx = this.relWindElement.getContext("2d");
        this.relBoomElement = document.getElementById("relBoom");
        this.relBoomCtx = this.relBoomElement.getContext("2d");
        this.hullElement.width = 170;
        this.hullElement.height = 170;
        this.relWindElement.width = 170;
        this.relWindElement.height = 170;
        this.relBoomElement.width = 170;
        this.relBoomElement.height = 170;
    }

    set relativeWind(value) {
        this.relWind = value;
    }

    set relativeBoom(value) {
        this.relBoom = value;
    }

    drawBoat() {
        let boatSize = 40;
        // xy coords of boat facing East.
        let boatCoords = [ 	pol2car(boatSize, 0),
            pol2car(boatSize/2, deg2rad(-70)),
            pol2car(boatSize, deg2rad(-160)),
            pol2car(boatSize, deg2rad(160)),
            pol2car(boatSize/2, deg2rad(70)) ] ;
        let tiltScale = 1;
        this.ctx.save();
        // var tiltScale = Math.cos (this.tilt);
        this.ctx.translate(this.hullElement.width/2, this.hullElement.height/2);
		this.ctx.fillStyle = BOAT_COLOR;
		this.ctx.strokeStyle = BOAT_COLOR;

		this.ctx.lineJoin = "round";
		this.ctx.lineWidth = 1;
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
        this.ctx.restore();
    }

    drawRelWind() {
        this.relWindCtx.save();
        this.relWindCtx.clearRect(0, 0, this.relWindElement.width, this.relWindElement.height);
        this.relWindCtx.translate(this.relWindElement.width/2+5, this.relWindElement.height/2);
        let windColor = "rgb(36, 100, 160)";

		this.relWindCtx.lineJoin = "round";
		this.relWindCtx.lineWidth = 2;
        this.relWindCtx.strokeStyle = windColor;
        
        this.relWindCtx.rotate(deg2rad(-90));
        this.relWindCtx.beginPath();
        
        let mainLineAngle = this.relWind + Math.PI/2;
        let arrowSideAngle = Math.PI/16;
        this.relWindCtx.rotate(mainLineAngle);
        
        // long arrow line
        this.relWindCtx.moveTo(0, -20);
        this.relWindCtx.lineTo(0, -80);
        this.relWindCtx.moveTo(0, -20);

        // left arrow side
        this.relWindCtx.rotate(arrowSideAngle);
        this.relWindCtx.lineTo(0, -30);
        this.relWindCtx.rotate(-arrowSideAngle);
        this.relWindCtx.moveTo(0, -20);
        
        // right arrow side
        this.relWindCtx.rotate(-arrowSideAngle);
        this.relWindCtx.lineTo(0, -30);
        
        this.relWindCtx.stroke();
        this.relWindCtx.restore();
    }

    drawRelBoom() {
        this.relBoomCtx.save();
        this.relBoomCtx.clearRect(0, 0, this.relBoomElement.width, this.relBoomElement.height);
        this.relBoomCtx.translate(this.relBoomElement.width/2, this.relBoomElement.height/2);
        let boomColor = "rgb(137, 73, 9)";

		this.relBoomCtx.lineJoin = "round";
		this.relBoomCtx.lineWidth = 5;
        this.relBoomCtx.strokeStyle = boomColor;
        this.relBoomCtx.rotate(deg2rad(90));
        let theBoomAngle = -this.relBoom + Math.PI/2;
        this.relBoomCtx.rotate(theBoomAngle);
        this.relBoomCtx.beginPath();
        
        // long arrow line
        this.relBoomCtx.moveTo(0, 0);
        this.relBoomCtx.lineTo(0, -70);
        
        this.relBoomCtx.stroke();
        this.relBoomCtx.restore();
    }
}