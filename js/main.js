var gl;
var screenW = 400, screenH = 300;
var blockRender = false;

function frame(ft) {
	if (blockRender || ft > 0.3) return;

	gl.clearColor(0.3, 0.4, 0.5, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function main() {
	gl = esInitGl('bookCanvas');

	window.onfocus = function() {
		blockRender = false;
	};
	window.onblur = function() {
		blockRender = true;
	};

	esNextFrame(frame);
}

