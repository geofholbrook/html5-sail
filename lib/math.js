

function dist(pos1, pos2) {
return Math.sqrt(
    Math.pow(pos1.x - pos2.x, 2) + 
    Math.pow(pos1.y - pos2.y, 2) )
}	

function rrnd(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min
}

		//! make rgb string
		function rgbString(r, g, b){
 		 return "rgb("+r+","+g+","+b+")";
		}

function scale(num, minin, minout, maxin, maxout) {
    return maxin + ( (num - minin) * ( (maxout-maxin) / (minout-minin) ) );
}

function pol2car (dist, azi)
{   return { x:dist*Math.cos(azi),
             y:dist*Math.sin(azi)  }   }

function car2pol (xy)
{   return { dist: dist( { x:0, y:0 }, xy), azi: Math.atan2(xy.y, xy.x) } }

function rad2deg (rad) { return rad / 180 * Math.PI }

function deg2rad (deg) { return deg / Math.PI * 180 }


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}