var gl;
var screenW = 640, screenH = 640;
var blockRender = false;
var tex0;
var mvp = null;
var proxTest = 0.0;

var inputMouseX = 0;
var inputMouseY = 0;
var inputMouseLock = false;
var inputState = {
	click: false,
	up: false,
	down: false,
	left: false,
	right: false
};

function frame(ft) {
	if (blockRender || ft > 0.3) return;

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	plFrame(ft);
	mapsRender();
	crFrame(ft);
	crRender();
	plRender();
	spRender();

	proxTest -= ft;
	if (proxTest <= 0.0) {
		proxTest = 0.3;
		mapsProxTest();
	}
}

function downloaded() {

	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	mapsGlobals();
	plGlobals();
	spGlobals();

	gl.bindTexture(gl.TEXTURE_2D, tex0);

	mapsLoad('tex0');

	esNextFrame(frame);
}

function main() {
	gl = esInitGl('bookCanvas', { antialias: false });
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	//gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);

	// HTML events
	document.addEventListener('keydown', function(event) {
		keyListener(event, true);
	});
	document.addEventListener('keyup', function(event) {
		keyListener(event, false);
	});

	listenMouse();
	lockMouse();

	mvp = esMat4_create();
	/*
	esMat4_camera(mvp, 1.0, 1.0, 0.1, 40.0,
			esVec3_parse(-3.0, -1.0, 5,0),
			esVec3_parse(5.0, 5.0, -1.0),
			esVec3_parse(0.0, 0.0, 1.0));*/

	window.onfocus = function() {
		blockRender = false;
	};
	window.onblur = function() {
		blockRender = true;
	};

	var lod = new esLoad();
	tex0 = lod.loadTexture(gl, 'tex0.png', gl.NEAREST, gl.LINEAR);
	lod.downloadWithGlScreen(gl, downloaded);
}

function getCanvasElement() {
	return document.getElementById('bookCanvas');
}

function mouseLockChange(event) {
	var can = getCanvasElement();
	if (
			document.pointerLockElement === can ||
			document.mozPointerLockElement === can ||
			document.webkitPointerLockElement === can) {
		inputMouseLock = true;
	} else {
		inputMouseLock = false;
	}
}

function listenMouse() {
	document.addEventListener('pointerlockchange', mouseLockChange, false);
	document.addEventListener('mozpointerlockchange', mouseLockChange, false);
	document.addEventListener('webkitpointerlockchange', mouseLockChange, false);

	document.addEventListener('mousemove', function(event) {
		if (!inputMouseLock) return;

		var movementX =
			event.movementX ||
			event.mozMovementX ||
			event.webkitMovementX ||
			0;
		var movementY =
			event.movementY ||
			event.mozMovementY ||
			event.webkitMovementY ||
			0;

		inputMouseX += movementX * 0.5;
		inputMouseY += movementY * 0.5;
	}, false);
	document.addEventListener('mousedown', function(event) {
		if (inputMouseLock) {
			inputState.click = true;
		} else {
			lockMouse();
		}
	}, false);
	document.addEventListener('mouseup', function(event) {
		inputState.click = false;
	}, false);
}

function lockMouse() {
	var havePointerLock = 'pointerLockElement' in document ||
		'mozPointerLockElement' in document ||
		'webkitPointerLockElement' in document;

	if (havePointerLock) {
		var el = getCanvasElement();

		el.requestPointerLock =
			el.requestPointerLock ||
			el.mozRequestPointerLock ||
			el.webkitRequestPointerLock;

		// Ask the browser to lock the pointer
		el.requestPointerLock();
	}
}

function keyListener(event, down) {
	switch (event.keyCode) {
		case 37 :	inputState.left = down; break;
		case 38 :	inputState.up = down; break;
		case 39 :	inputState.right = down; break;
		case 40 :	inputState.down = down; break;
		case 77 : if (down) {
			lockMouse();
		} break;
	}
}

