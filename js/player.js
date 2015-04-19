var plX, plY, plZ, plRx;
var plCamX, plCamY, plCamZ;
var plLookX, plLookY;
var plSideX, plSideY;
var plWalker;
var plHp;

var plHasMana = false;
var plManaCd = 0.0;
var plHasCasted = false;

var plDisabled = 0.0;
var plDisabledDX, plDisabledDY;

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
	plHp = 100;

	paSpawn(plX, plY);
}

function plWeapon(wId) {
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
	if (plDisabled > 0) {
		plDisabled -= ft;

		var aff = mapsWalk(plX, plY, plDisabledDX, plDisabledDY, plSize);
		plX = aff[0];
		plY = aff[1];

		plWalker.frame(ft, plX, plY,
				Math.atan2(-dirY, -dirX));
	} else {
		if (plHp <= 0) {
			mapsRestart();
			return;
		}

		// Spells
		if (plManaCd > 0.0) {
			plManaCd -= ft;
		}
		if (inputState.click && plHasMana && plManaCd <= 0.0) {
			plCastSpell();
		}

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
	}

	plCamX = plX - plLookX * 1.0;
	plCamY = plY - plLookY * 1.0;
	plCamZ = 0.8;

	// Update camera
	esMat4_camera(mvp, 1.0, 1.23, 0.01, 40.0,
			esVec3_parse(plCamX, plCamY, plCamZ),
			esVec3_parse(plX, plY, plZ),
			esVec3_parse(0.0, 0.0, 1.0));
}

function plCastSpell() {
	var msg = null;
	if (!plHasCasted) {
		plHasCasted = true;
		msg = 'With this spell the monks shall rise above all other. One will, our will shall rule the universe';
	}

	var aff = mapsWalk(
			plX, plY,
			plLookX * 0.1,
			plLookY * 0.1,
			plSize);

	paSpawn(aff[0], aff[1]);
	crSpawnMunk(aff[0], aff[1], msg);
	plManaCd = 1.4;
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

function plHit(x, y, hp) {
	plHp -= hp;
	paBloodHit(plX, plY, hp);

	if (plHp <= 0) {
		plDisabled = 4.0;
		plDisabledDX = 0.0;
		plDisabledDY = 0.0;
		plWalker.setState(W_DEAD);

	} else {
		plDisabled = hp*0.005;

		var dX = plX - x;
		var dY = plY - y;
		var lenInv = 1.0 / Math.sqrt(dX*dX + dY*dY);

		plDisabledDX = dX * lenInv * hp*0.001;
		plDisabledDY = dY * lenInv * hp*0.001;
		plWalker.setState(W_IDLE);
	}
}

function plDistance(x, y) {
	var dX = plX - x;
	var dY = plY - y;
	return Math.sqrt(dX*dX + dY*dY);
}

