var TileMaps = {};
var mapName = null;
var mapW, mapH, mapVertCount;

var mapGrid;
var mapVbo = null;
var mapShader = null;
var mapShaderUnMvp = null;

function mapsGlobals() {
	mapShader = loadShader(['test.vert'], ['test.frag'], function (prog) {
		prog.bindAttribute(0, 'atLoc');
	});

	mapShader.use();
	mapShaderUnMvp = mapShader.getUniform('unMvp');
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
	for (var i=0; i<grid.length; i++) {
		var x = i % mapW;
		var y = Math.floor(i / mapW);
		mapGrid.push(parseMapGrid(grid[i]-1, x, y));
	}

	var verts = [];
	for (var i=0; i<mapGrid.length; i++) {
		mapGrid[i].pushVerts(verts);
	}

	mapVertCount = verts.length;
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
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLES, 0, mapVertCount / 2);

	gl.disableVertexAttribArray(0);
}

function parseMapGrid(num, x, y) {
	return new MapGrid(x, y, 0.0, false, 0);
}

function pushMapVert(arr, x, y) {
	arr.push(x);
	arr.push(y);
}

function MapGrid(x, y, tall, blocked, texId) {
	this.x = x;
	this.y = y;
	this.tall = tall;
	this.blocked = blocked;
	this.texId = texId;
}

MapGrid.prototype.pushVerts = function(arr) {
	pushMapVert(arr, this.x, this.y);
	pushMapVert(arr, this.x+1.0, this.y);
	pushMapVert(arr, this.x, this.y+1.0);
}

