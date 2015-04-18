var gl;
var screenW = 400, screenH = 300;

function main() {
	gl = esInitGl('bookCanvas');

	gl.clearColor(0.3, 0.4, 0.5, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	console.log('Main');
}

