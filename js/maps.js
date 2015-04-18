var TileMaps = {};
var mapName = null;
var mapW, mapH, mapVertCount, mapVertElems=5;

var mapGrid;
var mapVbo = null;
var mapShader = null;
var mapShaderUnMvp = null;

function mapsGlobals() {
	mapShader = loadShader(['test.vert'], ['test.frag'], function (prog) {
		prog.bindAttribute(0, 'atLoc');
		prog.bindAttribute(1, 'atUv');
	});

	mapShader.use();
	mapShaderUnMvp = mapShader.getUniform('unMvp');
	gl.uniform1i(mapShader.getUniform('unTex0'), 0);
}

function mapsLoad(name) {
	var data = TileMaps[name];

	mapName = name;
	mapW = data.width;
	mapH = data.height;

	var grid = data.layers[0].data;
	console.log(data);
	console.log(grid);

	mapGrid = [];
	for (var i=0; i<mapW*mapH; i++) {
		var x = i % mapW;
		var y = Math.floor(i / mapW);
		mapGrid.push(parseMapGrid(grid[i]-1, x, y));
	}

	var verts = [];
	for (var i=0; i<mapGrid.length; i++) {
		mapGrid[i].pushVerts(verts);
	}

	mapVertCount = verts.length / mapVertElems;
	mapVbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mapVbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
}

function mapsRender() {
	if (!mapName) return;

	mapShader.use();
	gl.uniformMatrix4fv(mapShaderUnMvp, false, mvp);

	gl.bindBuffer(gl.ARRAY_BUFFER, mapVbo);
	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, mapVertElems*4, 0);
	gl.vertexAttribPointer(1, 2, gl.FLOAT, false, mapVertElems*4, 12);
	//gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 12, mapVertElems*4);

	gl.drawArrays(gl.TRIANGLES, 0, mapVertCount);

	gl.disableVertexAttribArray(1);
	gl.disableVertexAttribArray(0);
}

function parseMapGrid(num, x, y) {
	return new MapGrid(x, y, 0.0, false, num);
}

function pushMapVert(arr, x, y, texId, offX, offY) {
	// Loc
	arr.push(x + offX);
	arr.push(y + offY);
	arr.push(0.0);

	// Uv
	var tx = texId % tex0Dim;
	var ty = Math.floor(texId / tex0Dim);
	arr.push((tx + offX) * tex0DimInv);
	arr.push((ty + offY) * tex0DimInv);
}

function MapGrid(x, y, tall, blocked, texId) {
	this.x = x;
	this.y = y;
	this.tall = tall;
	this.blocked = blocked;
	this.texId = texId;
}

MapGrid.prototype.pushVerts = function(arr) {
	pushMapVert(arr, this.x, this.y, this.texId, 0.0, 0.0);
	pushMapVert(arr, this.x, this.y, this.texId, 1.0, 0.0);
	pushMapVert(arr, this.x, this.y, this.texId, 0.0, 1.0);

	pushMapVert(arr, this.x, this.y, this.texId, 1.0, 1.0);
	pushMapVert(arr, this.x, this.y, this.texId, 0.0, 1.0);
	pushMapVert(arr, this.x, this.y, this.texId, 1.0, 0.0);
}

