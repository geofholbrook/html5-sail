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
        let x = this.boatPos.x/(MAP_WIDTH/2);
        let y = -this.boatPos.y/(MAP_HEIGHT/2);
        this.context.clearRect(offsetX + offsetX*x - 5, offsetY + offsetY*y-5, 20, 20);
        
        this.context.strokeRect(0, 0, this.height+5, this.width+5);
        this.boatPos = pos;
        x = this.boatPos.x/(MAP_WIDTH/2);
        y = -this.boatPos.y/(MAP_HEIGHT/2);
        this.context.fillRect(offsetX + offsetX*x, offsetY + offsetY*y, 5, 5);
    }
}