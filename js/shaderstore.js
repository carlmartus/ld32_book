var _shaderHead = "#version 100\nprecision mediump float;\n\n";
var glslStore;

function shaderFileName(name) {
	return 'glsl/' + name + '.c';
}

function loadShader(verts, frags, bind) {
	var prog = new esProgram(gl);

	var vertSum = _shaderHead;
	for (var i=0; i<verts.length; i++) {
		vertSum += "\n" + glslStore[shaderFileName(verts[i])];
	}
	prog.addShaderText(vertSum, ES_VERTEX);

	var fragSum = _shaderHead;
	for (var i=0; i<frags.length; i++) {
		fragSum += "\n" + glslStore[shaderFileName(frags[i])];
	}
	prog.addShaderText(fragSum, ES_FRAGMENT);

	if (bind) {
		bind(prog);
	}

	prog.link();
	return prog;
}

