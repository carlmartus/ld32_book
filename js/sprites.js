var spList;
var spCount, spElems=6, spMax=spElems*200;
var spShader, spShaderUnMvp, spShaderUnKMul;
var spVbo;

function spGlobals() {
	spList = new Float32Array((spMax + 2)*spElems);
	spCount = 0;
	/*
	spList[spCount++] = 2.0;
	spList[spCount++] = 2.0;
	spList[spCount++] = 0.2;
	spList[spCount++] = 0.4;
	spList[spCount++] = 0;
	spList[spCount++] = 8;*/

	spVbo = gl.createBuffer(gl.ARRAY_BUFFER);
	gl.bindBuffer(gl.ARRAY_BUFFER, spVbo);
	gl.bufferData(gl.ARRAY_BUFFER, spList, gl.STREAM_DRAW);

	spShader = loadShader(['sprite.vert'], ['sprite.frag'], function (prog) {
		prog.bindAttribute(0, 'atLoc');
		prog.bindAttribute(1, 'atSize');
	});
	spShader.use();
	spShaderUnMvp = spShader.getUniform('unMvp');
	spShaderUnKMul = spShader.getUniform('unKMul');
	gl.uniform1i(spShader.getUniform('unTex0'), 0);
	gl.uniform1f(spShader.getUniform('unInvUvMul'), tex0DimInv);
}

function spPush(x, y, z, texId, size) {
	if (spCount >= spMax) return;

	var u = texId % tex0Dim;
	var v = Math.floor(texId / tex0Dim);

	spList[spCount++] = x;
	spList[spCount++] = y;
	spList[spCount++] = z;
	spList[spCount++] = size;
	spList[spCount++] = u;
	spList[spCount++] = v;

	/*
	spList[spCount++] = x;
	spList[spCount++] = y;
	spList[spCount++] = z;
	spList[spCount++] = 1.0;

	var u = (texId % tex0Dim) * tex0DimInv;
	var v = Math.floor(texId / tex0Dim) * tex0DimInv;
	spList[spCount++] = u;
	spList[spCount++] = v;
	spList*/
}

function spRender() {
	spShader.use();
	gl.uniformMatrix4fv(spShaderUnMvp, false, mvp);
	gl.uniform1f(spShaderUnKMul, 550.0);

	gl.bindBuffer(gl.ARRAY_BUFFER, spVbo);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, spList.subarray(0, spCount));

	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	gl.enableVertexAttribArray(2);

	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 4*spElems, 0);
	gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 4*spElems, 12);
	gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 4*spElems, 16);

	gl.drawArrays(gl.POINTS, 0, spCount / spElems);

	gl.disableVertexAttribArray(0);
	gl.disableVertexAttribArray(1);
	gl.disableVertexAttribArray(2);

	spCount = 0;
}

