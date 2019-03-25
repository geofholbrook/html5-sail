class Wind {
	constructor(canvasElement, windSpeed=3, startAngle=0) {
		this.element = canvasElement;
		this.image = new Image();
		this.image.src = WIND_IMG_SRC;
		this.angle = startAngle;
		this.speed = windSpeed;
		this.ctx = this.element.getContext("2d");
		this.windPatt = null;
		this.image.onload = () => { this.init() };
	}

	init() {
		this.ctx.clearRect(-this.element.width/2, -this.element.height/2, this.element.width, this.element.height);
		this.ctx.translate(this.element.width/2, this.element.height/2);
		this.windPatt = this.ctx.createPattern(this.image,'repeat');
		this.drawWind();
	}

	drawWind() {
		this.ctx.save();
		this.ctx.globalAlpha = 0.15;
		this.ctx.fillStyle = this.windPatt;
		this.ctx.clearRect(-this.element.width, -this.element.height, this.element.width * 2, this.element.height * 2);
		this.ctx.rotate(-this.angle);
		this.ctx.fillRect(-this.element.width, -this.element.height, this.element.width * 2, this.element.height * 2);
		this.ctx.globalAlpha = 1;
		this.ctx.restore();
	}
}