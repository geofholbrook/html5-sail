window.onload = init;

const MAIN_CANVAS_WIDTH = 500;
const MAIN_CANVAS_HEIGHT = 300;

const MINIMAP_CANVAS_WIDTH = 300;
const MINIMAP_CANVAS_HEIGHT = 300;

const WIND_IMG_SRC = "lib/wind-arrow.png";
const WATER_IMG_SRC = 'lib/water-texture-3.jpg';

// dimensions of minimap
const MAP_HEIGHT = 10000;
const MAP_WIDTH = 10000;

var frameRate = 30;

// Scale changes in speed to simulate inertia
const INERTIA = 0.05;  

var minimap, wind, boat, water;

// controls
var stopBtn, resetPosBtn, frameRateDisplay, rudderDisplay, frameRateCtrl, rudderCtrl;
var windCtrl, windDisplay, speedMeter, boatInfoDisplay;

// Time of last animation frame (for controlling framerate)
var lastFrame = Date.now();
var curAnimationFrame;
var stopped = true;

var boatAngleGauge;
var speedGauge;

var speedAverage = 0;
var speedIdx = 0;
const SPEED_AVG_ENTRIES = 10;
var speedEntries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var speedSum = 0;

function init() {
    let waterCanvas = document.getElementById("waterCanvas");
    let windCan = document.getElementById("windCanvas");
    let miniMapCanvas = document.getElementById("miniMapCanvas");

    stopBtn = document.getElementById("stopBtn");
    resetPosBtn = document.getElementById("resetPosBtn");

    frameRateCtrl = document.getElementById("frameRateCtrl");
    frameRateDisplay = document.getElementById("frameRateDisplay");
    frameRateDisplay.value = frameRate;
    frameRateDisplay.disabled = true;

    rudderCtrl = document.getElementById("rudderCtrl");
    rudderDisplay = document.getElementById("rudderDisplay");
    rudderDisplay.disabled = true;
    rudderDisplay.value = 0;

    windCtrl = document.getElementById("windCtrl");
    windDisplay = document.getElementById("windDisplay");
    windDisplay.value = 0;
    windDisplay.disabled = true;

    speedGauge = new SpeedGauge("speedGauge");
    boatInfoDisplay = new BoatInfoDisplay("boatInfoDisplay");
    waterCanvas.width = MAIN_CANVAS_WIDTH;
    waterCanvas.height = MAIN_CANVAS_HEIGHT;
    windCan.width = MAIN_CANVAS_WIDTH;
    windCan.height = MAIN_CANVAS_HEIGHT;

    miniMapCanvas.width = MINIMAP_CANVAS_WIDTH + 5;  // padding to simplify drawing
    miniMapCanvas.height = MINIMAP_CANVAS_HEIGHT + 5;

    wind = new Wind(windCan);
    minimap = new MiniMap(MINIMAP_CANVAS_HEIGHT, MINIMAP_CANVAS_WIDTH, miniMapCanvas, {x: 0,y:0});
    boat = new Boat();
    water = new Water(waterCanvas);

    waterCanvas.addEventListener("keydown", onKeyDown, false);
    waterCanvas.addEventListener("wheel", onMouseWheel, false);
    stopBtn.addEventListener("click", toggleLoop, false);
    resetPosBtn.addEventListener("click", resetPos, false);
    frameRateCtrl.addEventListener("input", onFrameRateInput, false);
    rudderCtrl.addEventListener("input", onRudderInput, false);
    rudderCtrl.addEventListener("mouseup", onRudderMouseup);
    windCtrl.addEventListener("input", onWindInput, false);
    
    toggleLoop();
}

function onFrameRateInput(ev) {
    frameRate = +ev.srcElement.value;
    frameRateDisplay.value = frameRate;
}

function onRudderInput(ev) {
    boat.rudder = -ev.srcElement.value;
    rudderDisplay.value = Math.round(rad2deg(boat.rudder));
}

function onWindInput(ev) {
    wind.angle = +ev.srcElement.value;
    windDisplay.value = Math.round(rad2deg(wind.angle));
    wind.drawWind();
}

function onRudderMouseup(ev) {
    boat.rudder = 0;
    rudderDisplay.value = 0;
    rudderCtrl.value = 0;
}

function toggleLoop() {
    stopped = !stopped;
    if (stopped) {
        stopBtn.innerText = "Start";
        cancelAnimationFrame(curAnimationFrame);
    } else {
        stopBtn.innerText = "Stop";
        curAnimationFrame = requestAnimationFrame(doIdle);
    }
}

function resetPos() {
    boat.pos = {x: 0, y: 0};
}

function doIdle(event) {
    if (stopped) {
        return;
    }

    if (Date.now() - lastFrame > (1000 / frameRate)) {
        lastFrame = Date.now();
        boat.updatePos();
        minimap.setBoatPos(boat.pos);
        redraw();	
    }
    requestAnimationFrame(doIdle);
}

function redraw() {
    water.clearCanvas();
    water.drawBG(boat.pos);
    boat.draw(water.ctx);
    displayInfo(); 
}

function displayInfo() {

    speedGauge.updateValue(boat.speed);

    boatAngleGuage.setAttribute("data-value",-rad2deg(boat.angle - Math.PI/2));

    let relWind = boat.relativeWind;
    boatInfoDisplay.relativeWind = relWind; 
    boatInfoDisplay.drawRelWind();

    let relBoom = boat.boom;
    boatInfoDisplay.relativeBoom = relBoom;
    boatInfoDisplay.drawRelBoom();

    let str = "| tilt: " + Math.round(rad2deg( boat.tilt )) + 
            "\n | boom: " + Math.round(rad2deg(boat.boom)) + 
            "\n | boom-to-wind: " + Math.round(rad2deg( radDiff( boat.angle + boat.boom, wind.angle ))) + 
            "\n | relativeWind: " + Math.round(rad2deg(relWind)) + 
            "\n | sheet: " + Math.round(rad2deg(boat.sheet)) +
            "\n | pos: (" + Math.round(boat.pos.x) + ", " + Math.round(boat.pos.y) + ")";
    document.getElementById("footer").innerText = str;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    } 
};

function onKeyDown(event) {
    switch(event.keyCode) {
        case 37: // left arrow
        event.preventDefault();
        boat.moveRudder(Math.PI/128);
        break;

        case 39: // right arrow
        event.preventDefault();
        boat.moveRudder(-Math.PI/128);  
        break;	
        
        case 38: // up arrow
        wind.angle = rotate(wind.angle);
        wind.drawWind();
        break;
        
        case 40: // down arrow
        wind.angle = rotate(wind.angle, -Math.PI/128);
        wind.drawWind();
        break;	
    }
}

function rotate(curAngle, delta=Math.PI/128) {
    let newAngle = (curAngle + delta);
    if (newAngle > Math.PI) {
        newAngle = (newAngle % Math.PI) - Math.PI;
    } else if (newAngle < -Math.PI) {
        newAngle = Math.PI - (newAngle % Math.PI);
    } 
    return newAngle;
}

function onMouseWheel(event) {
    boat.moveRudder(deg2rad(event.deltaY/120));
}