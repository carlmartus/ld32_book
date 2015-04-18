var gl;
var screenW = 640, screenH = 640;
var blockRender = false;
var tex0;
var tex0Dim = 8;
var mvp = null;

function frame(ft) {
	if (blockRender || ft > 0.3) return;

	gl.clearColor(0.3, 0.4, 0.5, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	mapsRender();
}

function downloaded() {
	mapsGlobals();

	mapsLoad('tex0');

	esNextFrame(frame);
}

function main() {
	gl = esInitGl('bookCanvas');

	mvp = esMat4_create();
	esMat4_camera(mvp, 1.5, 1.33, 0.1, 40.0,
			esVec3_parse(-2.0, -2.0, 2,0),
			esVec3_parse(5.0, 5.0, -1.0),
			esVec3_parse(0.0, 0.0, 1.0));

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

