class Water {
    constructor (canvasElement) {
        this.element = canvasElement;
        this.ctx = canvasElement.getContext("2d");
        this.image = new Image();
        this.image.src = WATER_IMG_SRC;
        this.pattern = null;
        
        this.image.onload = () => { this.init(); }; 
    }

    init() {
        this.ctx.clearRect(-this.element.width/2, -this.element.height/2, this.element.width, this.element.height);
        this.ctx.translate(this.element.width/2, this.element.height/2);
        this.pattern = this.ctx.createPattern(this.image,'repeat');
        this.ctx.strokeRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        this.element.focus();
        redraw();
    }

    clearCanvas(event) {
        this.ctx.clearRect(-this.element.width/2, -this.element.height/2, this.element.width, this.element.height);
    }

    drawBG(boatPos) {
        this.ctx.save();
        let w = this.image.width; 
        let h = this.image.height;
        let offset = { x: modulo( -boatPos.x, w ),
                    y: modulo(  boatPos.y, h )  };	
        this.ctx.translate( offset.x, offset.y );  // changes reference for water pattern
        this.ctx.fillStyle = this.pattern;
        
        // coords adjusted to correspond to canvas
        this.ctx.fillRect(-this.element.width/2 - offset.x, -this.element.height/2 - offset.y, 
            this.element.width + offset.x, this.element.height + offset.y);  
        
        this.ctx.restore();

        // Add boundary line in zoom view
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(-((MAP_WIDTH/2) + boatPos.x), -((MAP_HEIGHT/2)-boatPos.y), MAP_WIDTH, MAP_HEIGHT);
    }
}