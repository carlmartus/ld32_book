var plX, plY, plZ, plRx;
var plLookX, plLookY;

function plSpawn(x, y) {
	plX = x;
	plY = y;
	plZ = 0.4;
	plRx = 0.0;
}

function plUpdateCage() {
	plLookX = Math.cos(plRx);
	plLookY = Math.sin(plRx);
}

function plFrame(ft) {
	plUpdateCage();

	esMat4_camera(mvp, 1.0, 1.0, 0.1, 40.0,
			esVec3_parse(
				plX - plLookX,
				plY - plLookY,
				plZ + 0.1),
			esVec3_parse(plX, plY, plZ),
			esVec3_parse(0.0, 0.0, 1.0));
}

