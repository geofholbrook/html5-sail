window.onload = init;

var can;
var windCan;
var miniMapCanvas;
var ctx;
var windCtx;
var waterImage;
var zoom = 1;
var boat;
var bgPatt = null;
const MAIN_CANVAS_WIDTH = 800;
const MAIN_CANVAS_HEIGHT = 500;
const MINIMAP_CANVAS_WIDTH = 300;
const MINIMAP_CANVAS_HEIGHT = 300;
const MAP_HEIGHT = 10000;
const MAP_WIDTH = 10000;
var minimap = null;
function init() {
    waterImage = new Image();
    waterImage.src = 'lib/water-texture-3.jpg';
    can = document.getElementById("waterCanvas");
    windCan = document.getElementById("windCanvas");
    miniMapCanvas = document.getElementById("miniMapCanvas");
    can.width = MAIN_CANVAS_WIDTH;
    can.height = MAIN_CANVAS_HEIGHT;
    windCan.width = MAIN_CANVAS_WIDTH;
    windCan.height = MAIN_CANVAS_HEIGHT;
    miniMapCanvas.width = MINIMAP_CANVAS_WIDTH + 5;  // padding to simplify drawing
    miniMapCanvas.height = MINIMAP_CANVAS_HEIGHT + 5;
    ctx = can.getContext("2d");
    windCtx = windCan.getContext("2d");
    minimap = new MiniMap(MINIMAP_CANVAS_HEIGHT, MINIMAP_CANVAS_WIDTH, miniMapCanvas, {x: 0,y:0});
    boat = new Boat();
    ctx.clearRect(-can.width/2, -can.height/2, can.width, can.height);
    windCtx.clearRect(-can.width/2, -can.height/2, can.width, can.height);
    ctx.translate(can.width/2, can.height/2);
    windCtx.translate(can.width/2, can.height/2);
    waterImage.onload = waterImageLoaded; 
    windImageLoaded();
    can.addEventListener("mousemove", doMouse, false);
    can.addEventListener("mousedown", clearCanvas, false);
    can.addEventListener("mouseup", doRelease, false);
    can.addEventListener("keydown", doKeyDown, false);
    can.addEventListener("wheel", doMouseWheel, false);
    setInterval(doIdle, 50);
}
    
function waterImageLoaded() {
    bgPatt = ctx.createPattern(waterImage,'repeat');
    can.focus();
    redraw();
}

function windImageLoaded() {
    windPatt = windCtx.createPattern(windImage,'repeat');
    redraw();
    drawWind(windCtx);
}

function leftTurn() {
    boat.angle = modulo(boat.angle + 0.05 + Math.PI, Math.PI*2) - Math.PI;
    boat.sheet = boat.calculateSheet(boat.angle);
}

function doIdle(event) {
    boat.updatePos();
    minimap.setBoatPos(boat.pos);
    redraw();	
}

function clearCanvas(event) {
    ctx.clearRect(-can.width/2, -can.height/2, can.width, can.height);
}

function redraw() {
    clearCanvas();
    drawBG();
    boat.draw(ctx);
    displayInfo(); 
}

function drawBG() {
    ctx.save();
    var w = waterImage.width; var h = waterImage.height;
    var offset = { x: modulo( -boat.pos.x, w ),
                    y: modulo(  boat.pos.y, h )  };	
    ctx.translate( offset.x, offset.y );  // changes reference for water pattern
    ctx.fillStyle = bgPatt;

    // coords adjusted to correspond to canvas
    ctx.fillRect(-can.width/2 - offset.x, -can.height/2 - offset.y, 
                    can.width   + offset.x,  can.height   + offset.y);  
    ctx.restore();
}

function displayInfo() {
    str = "boat angle: " + Math.round( rad2deg( boat.angle )) + 
            "\n | rudder: " + Math.round( rad2deg(boat.rudder )) +
            "\n | tilt: " + Math.round(rad2deg( boat.tilt )) + 
            "\n | boom: " + Math.round(rad2deg(boat.boom)) + 
            "\n | boom-to-wind: " + Math.round(rad2deg( radDiff( boat.angle + boat.boom, windAngle ))) + 
            "\n | forward thrust " + Math.sin (boat.boom) * Math.sin (boat.angle + boat.boom) +
            "\n | speed: " + boat.speed + 
            "\n | windAngle: " + Math.round(rad2deg(windAngle)) + 
            "\n | relativeWind: " + Math.round(rad2deg(boat.relativeWind)) + 
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

function doMouse(event)
{
    var pos = getMousePos(can, event);
    var polar = car2pol( { x: pos.x - (can.width/2), 
                            y: -( pos.y - (can.height/2) ) });
}

function doClick(event)
{
    var pos = getMousePos(can, event);
}

function doRelease(event) {}

function doKeyDown(event) {
    switch(event.keyCode) {
        case 37: // left arrow
        event.preventDefault();
        boat.moveRudder(Math.PI/128);
        // boat.angle = modulo(boat.angle + 0.15 + Math.PI, Math.PI*2) - Math.PI;
        // boat.tilt += -0.1;
        break;

        case 39: // right arrow
        event.preventDefault();
        boat.moveRudder(-Math.PI/128);  
        // boat.angle = modulo(boat.angle - 0.15 + Math.PI, Math.PI*2) - Math.PI;
        // boat.tilt += 0.1;
        break;	
        
        case 38: // up arrow
        //boat.speed += 5; 
        // boat.sheet = clip(boat.sheet+0.05, 0, 1.4);
        windAngle = rotate(windAngle);
        drawWind(windCtx);
        break;
        
        case 40: // down arrow
        windAngle = rotate(windAngle, -Math.PI/128);
        drawWind(windCtx);
        break;	
    }

    boat.sheet = boat.calculateSheet(boat.relativeWind);
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

function doMouseWheel(event) {
    boat.moveRudder(deg2rad(event.deltaY/120));
}