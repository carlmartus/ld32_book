var plX, plY, plZ, plRx;
var plCamX, plCamY, plCamZ;
var plLookX, plLookY;
var plSideX, plSideY;

var plSpeed = 2.0, plSize = 0.2;

function plGlobals() {
}

function plSpawn(x, y) {
	plX = x;
	plY = y;
	plZ = 0.4;
	plRx = 0.0;
}

function plUpdateCage() {
	plLookX = Math.cos(plRx);
	plLookY = Math.sin(plRx);
	plSideX = plLookY;
	plSideY = -plLookX;
}

function plFrame(ft) {
	// View angle
	plRx = inputMouseX * 0.02;
	plUpdateCage();

	// Position
	var movX=0.0, movY=0.0;

	if (inputState.up)		movX += 1.0;
	if (inputState.down)	movX -= 1.0;
	if (inputState.left)	movY += 1.0;
	if (inputState.right)	movY -= 1.0;

	if (movX != 0.0 || movY != 0.0) {
		var invLen = 1.0 / Math.sqrt(movX*movX + movY*movY);
		movX *= invLen*plSpeed;
		movY *= invLen*plSpeed;

		var dirX = plLookX*movX + plSideX*movY;
		var dirY = plSideX*movX + plSideY*movY;
		dirX *= ft;
		dirY *= ft;

		var aff = mapsWalk(plX, plY, dirX, dirY, plSize);
		plX = aff[0];
		plY = aff[1];
	}

	plCamX = plX - plLookX * 2.0;
	plCamY = plY - plLookY * 2.0;
	plCamZ = 1.7;

	// Update camera
	esMat4_camera(mvp, 1.0, 1.0, 0.01, 40.0,
			esVec3_parse(plCamX, plCamY, plCamZ),
			esVec3_parse(plX, plY, plZ),
			esVec3_parse(0.0, 0.0, 1.0));
}

function plRender() {
}

