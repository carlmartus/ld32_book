var plX, plY, plZ, plRx;
var plCamX, plCamY, plCamZ;
var plLookX, plLookY;
var plSideX, plSideY;
var plWalker;

var plSpeed = 2.0, plSize = 0.2;

function plGlobals() {
	plWalker = new Walker(5.0,
			animation(getTexId(0, 8), 3),
			animation(getTexId(0, 9), 3),
			animation(getTexId(0, 10), 3),
			animation(getTexId(0, 11), 3),
			animation(getTexId(0, 14), 3),
			animation(getTexId(0, 13), 3));
}

function plSpawn(x, y, rot) {
	plX = x;
	plY = y;
	plZ = 0.4;
	inputMouseX = rot;
}

function plUpdateCage() {
	plLookX = Math.cos(plRx);
	plLookY = Math.sin(plRx);
	plSideX = plLookY;
	plSideY = -plLookX;
}

function plFrame(ft) {
	// View angle
	plRx = inputMouseX;
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

		plWalker.setState(W_WALK);

		plWalker.frame(ft, plX, plY,
				Math.atan2(-dirY, -dirX));
		plWalker.refreshDirection();
	} else {
		plWalker.setState(W_IDLE);
		plWalker.frame(ft, plX, plY, plRx + Math.PI);
	}

	plCamX = plX - plLookX * 1.0;
	plCamY = plY - plLookY * 1.0;
	plCamZ = 0.8;

	// Update camera
	esMat4_camera(mvp, 1.0, 1.0, 0.01, 40.0,
			esVec3_parse(plCamX, plCamY, plCamZ),
			esVec3_parse(plX, plY, plZ),
			esVec3_parse(0.0, 0.0, 1.0));
}

function plRender() {
	plWalker.render(0.4);
}

function plHaltControl() {
	inputState.up = false;
	inputState.down = false;
	inputState.right = false;
	inputState.left = false;
	inputState.click = false;
}

