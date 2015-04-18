var TileMaps = {};
var mapName = null;
var mapW, mapH, mapVertCount, mapVertElems=5;

var mapGrid;
var mapVbo = null;
var mapShader = null;
var mapShaderUnMvp = null;

var mapWallTiles = {
	1: true,
	2: true
};

var mapWalls = {
	5: 2.0,
	53: 2.0
};


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
	var tilesets = data.tilesets[0];

	mapGrid = [];
	for (var i=0; i<mapW*mapH; i++) {
		var x = i % mapW;
		var y = Math.floor(i / mapW);
		mapGrid.push(parseMapGrid(grid[i]-1, x, y));
	}

	var verts = [];
	for (var i=0; i<mapGrid.length; i++) {
		mapGrid[i].pushVerts(verts, tilesets);
	}

	mapVertCount = verts.length / mapVertElems;
	mapVbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mapVbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

	// Populate map
	var objs = data.layers[1].objects;
	for (var i=0; i<objs.length; i++) {
		var o = objs[i];
		var cx = (o.x + o.width*0.5)*tex0TileInv;
		var cy = (o.y + o.height*0.5)*tex0TileInv;

		switch (o.type) {
			case 'start' :
				plSpawn(cx, cy);
				break;
		}
	}
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
	return new MapGrid(x, y, false, num);
}

function pushMapVert(arr, x, y, z, texId, offX, offY) {
	// Loc
	arr.push(x);
	arr.push(y);
	arr.push(z);

	// Uv
	var tx = texId % tex0Dim;
	var ty = Math.floor(texId / tex0Dim);
	arr.push((tx + offX) * tex0DimInv);
	arr.push((ty + offY) * tex0DimInv);
}

function pushWall(arr, x0, y0, x1, y1, texId) {
	var tall = mapWalls[texId];
	pushMapVert(arr, x0, y0, 0.0, texId, 0.0, 0.0);
	pushMapVert(arr, x1, y1, 0.0, texId, 1.0, 0.0);
	pushMapVert(arr, x0, y0, tall, texId, 0.0, tall);

	pushMapVert(arr, x0, y0, tall, texId, 0.0, tall);
	pushMapVert(arr, x1, y1, 0.0, texId, 1.0, 0.0);
	pushMapVert(arr, x1, y1, tall, texId, 1.0, tall);
}

function MapGrid(x, y, blocked, texId) {
	this.x = x;
	this.y = y;
	this.blocked = blocked;
	this.texId = texId;
}

MapGrid.prototype.pushVerts = function(arr, tilesets) {
	if (!mapWalls[this.texId]) {
		pushMapVert(arr, this.x,	this.y,		0.0, this.texId, 0.0, 0.0);
		pushMapVert(arr, this.x,	this.y+1,	0.0, this.texId, 0.0, 1.0);
		pushMapVert(arr, this.x+1,	this.y,		0.0, this.texId, 1.0, 0.0);

		pushMapVert(arr, this.x+1,	this.y+1,	0.0, this.texId, 1.0, 1.0);
		pushMapVert(arr, this.x+1,	this.y,		0.0, this.texId, 1.0, 0.0);
		pushMapVert(arr, this.x,	this.y+1,	0.0, this.texId, 0.0, 1.0);
	}

	if (tilesets.tiles[this.texId]) {
		var ter = tilesets.tiles[this.texId].terrain;

		if (mapWallTiles[ter[0]] && ter[0] == ter[1]) {
			if (ter[2] != ter[0] || ter[3] != ter[0]) {
				pushWall(arr, this.x, this.y, this.x+1, this.y,
						tilesets.terrains[ter[0]].tile);
			}
		}

		if (mapWallTiles[ter[0]] && ter[0] == ter[2]) {
			if (ter[1] != ter[0] || ter[3] != ter[0]) {
				pushWall(arr, this.x, this.y+1, this.x, this.y,
						tilesets.terrains[ter[0]].tile);
			}
		}

		if (mapWallTiles[ter[3]] && ter[3] == ter[2]) {
			if (ter[3] != ter[0] || ter[3] != ter[1]) {
				pushWall(arr, this.x+1, this.y+1, this.x, this.y+1,
						tilesets.terrains[ter[3]].tile);
			}
		}

		if (mapWallTiles[ter[3]] && ter[3] == ter[1]) {
			if (ter[3] != ter[0] || ter[3] != ter[2]) {
				pushWall(arr, this.x+1, this.y, this.x+1, this.y+1,
						tilesets.terrains[ter[3]].tile);
			}
		}
	}
}

