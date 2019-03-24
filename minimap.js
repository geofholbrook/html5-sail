class MiniMap {
    constructor(height, width, canvasElement, boatPos) {
        this.height = height;
        this.width = width;
        this.boatPos = boatPos;
        this.canvasElement = canvasElement;
        this.context = canvasElement.getContext("2d");
        this.context.lineWidth = 5;
        this.context.strokeRect(0, 0, this.height+5, this.width+5);
    }

    setBoatPos(pos) {
        
        let offsetX = this.width/2;
        let offsetY = this.height/2;
        let x = this.boatPos.x/5000;
        let y = -this.boatPos.y/5000;
        this.context.clearRect(offsetX + offsetX*x - 2, offsetY + offsetY*y-2, 10, 10);
        
        this.context.strokeRect(0, 0, this.height+5, this.width+5);
        this.boatPos = pos;
        x = this.boatPos.x/5000;
        y = -this.boatPos.y/5000;
        this.context.fillRect(offsetX + offsetX*x, offsetY + offsetY*y, 5, 5);
    }

    
}