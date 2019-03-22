function ForwardForce( boat, windAngle )
{
	// determined by this.angle, this.boom, this.tilt, and windAngle 
	var d = radDiff ( boat.boom, windAngle );
	return d;
}