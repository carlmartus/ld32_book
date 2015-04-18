var gl;
var screenW = 640, screenH = 640;
var blockRender = false;
var tex0;
var tex0Tile = 16;
var tex0TileInv = 1.0 / tex0Tile;
var tex0Dim = 16;
var tex0DimInv = 1.0 / tex0Dim;
var mvp = null;

var inputMouseX = 0;
var inputMouseY = 0;
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

function keyListener(event, down) {
	switch (event.keyCode) {
		case 37 :	inputState.left = down; break;
		case 38 :	inputState.up = down; break;
		case 39 :	inputState.right = down; break;
		case 40 :	inputState.down = down; break;
	}
}

function main() {
	gl = esInitGl('bookCanvas', { antialias: false });
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);

	// HTML events
	document.addEventListener('keydown', function(event) {
		keyListener(event, true);
	});
	document.addEventListener('keyup', function(event) {
		keyListener(event, false);
	});

	var can = document.getElementById('bookCanvas');
	can.addEventListener('mousemove', function(event) {
		inputMouseX = event.clientX - can.offsetLeft;
		inputMouseY = event.clientY - can.offsetTop;
	}, false);
	can.addEventListener('mousedown', function(event) {
		inputState.click = true;
	}, false);
	can.addEventListener('mouseup', function(event) {
		inputState.click = false;
	}, false);


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

