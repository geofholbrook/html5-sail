class SpeedGauge {
    constructor(elementName) {
        this.gaugeValue = 0;
        this.gauge = new RadialGauge({
            renderTo: elementName, type:"radialGauge", animationRule:"quad",
            width:170, height:170, animatedValue:true, borderRadius:0, borders:0, barBeginCircle:0,
            minorTicks:10, value:15, minValue:0, maxValue:15, title:"KNOTS", majorTicks:[1,5,10,15],
            ticksWidth:1, ticksWidthVinor:7.5, barWidth:5, highlights:false, colorValueBoxShadow:false,
            valueBoxStroke:0, valueBox:true, colorValueBoxBackground:false, valueInt:1, valueDec:2,
            animationDuration:100
        }).draw();

        this.gauge.on("animationEnd", () => {this.updateGaugeElement();});

        this.updateValue(0);
        this.gauge.value = 0;

    }

    updateGaugeElement() {
        this.gauge.value = this.gaugeValue;
    }

    updateValue(val) {
        this.gaugeValue = val;
    }
}