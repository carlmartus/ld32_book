var TileMaps = {};
var mapName = null;
var mapW, mapH, mapVertCount, mapVertElems=5;

var mapGrid;
var mapVbo = null;
var mapShader = null;
var mapShaderUnMvp = null;

var mapWallTiles = {
	1: true,
	2: true,
	5: true,
	6: true,
	8: true
};

var mapWalls = {
	5: 2.0,
	53: 2.0,
	14: 2.0,
	78: 2.0,
	23: 2.0
};

function mapsPopulate(obj, cx, cy) {
	switch (obj.type) {
		case 'start' :
			var rot = obj.rotation * Math.PI / 180.0;
			plSpawn(cx, cy, rot);
			break;

		case 'munk' :
			var info = obj.name == '' ? null : obj.name;
			crSpawnMunk(cx, cy, info);
			break;

		case 'wolf' :
			crSpawnWolf(cx, cy);
			break;

		case 'spider' :
			crSpawnSpider(cx, cy);
			break;

		case 'info' :
			mapProxies.push(new Proxy(obj, function(obj) {
				infoInfo(obj.name);
			})); break;

		case 'activate' :
			mapProxies.push(new Proxy(obj, function(obj) {
				plHasMana = true;
			})); break;
			break;

		case 'end' :
			mapProxies.push(new Proxy(obj, function(obj) {
				gl.clearColor(0.7, 0.7, 0.9, 1.0);
				mapsLoad(obj.name);
			})); break;
	}
}



function mapsGlobals() {
	mapShader = loadShader(['map.vert'], ['map.frag'], function (prog) {
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
		mapGrid.push(
				new MapGrid(x, y, false, grid[i]-1, tilesets));
	}

	var verts = [];
	for (var i=0; i<mapGrid.length; i++) {
		mapGrid[i].pushVerts(verts, tilesets);
	}

	mapVertCount = verts.length / mapVertElems;
	mapVbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mapVbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

	plHaltControl();
	paClear();
	crReset();
	infoClearText();

	mapProxies = [];

	// Populate map
	var objs = data.layers[1].objects;
	for (var i=0; i<objs.length; i++) {
		var o = objs[i];
		var cx = (o.x + o.width*0.5)*tex0TileInv;
		var cy = (o.y + o.height*0.5)*tex0TileInv;

		mapsPopulate(o, cx, cy);
	}
}

function mapsRestart() {
	mapsLoad(mapName);
}

function mapsProxTest() {
	for (var i=0; i<mapProxies.length; i++) {
		var p = mapProxies[i];
		if (
				plX >= p.x0 && plX <= p.x1 &&
				plY >= p.y0 && plY <= p.y1) {
			p.execute();
		}
	}
}

function mapsWalk(x, y, dx, dy, size) {
	var cellId = Math.floor(y)*mapW + Math.floor(x);

	x += dx;
	y += dy;

	if (cellId >= 0 && cellId < mapGrid.length) {
		var cell = mapGrid[cellId];

		if (cell.planes) {
			for (var i=0; i<cell.planes.length; i++) {
				var dist = cell.planes[i].dist(x, y);
				if (dist < size) {
					var mov = cell.planes[i].move(x, y, size);
					x = mov[0];
					y = mov[1];
				}
			}
		}
	}

	return [ x, y ];
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

function MapGrid(x, y, blocked, texId, tilesets) {
	this.x = x;
	this.y = y;
	this.blocked = blocked;
	this.texId = texId;

	if (tilesets.tiles[this.texId]) {
		var ter = tilesets.tiles[this.texId].terrain;
		var block = [
			mapWallTiles[ter[0]],
			mapWallTiles[ter[1]],
			mapWallTiles[ter[2]],
			mapWallTiles[ter[3]] ];

		if (
				!(block[0] && block[1] && block[2] && block[3]) &&
				 (block[0] || block[1] || block[2] || block[3])) {
			this.block = block;
			this.planes = makeColPlanes(block, x, y);
		}
	}
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

// Mathematical 2D plane
function Plane(nx, ny, x, y) {
	var lenInv = Math.sqrt(nx*nx + ny*ny);
	this.a = nx * lenInv;
	this.b = ny * lenInv;
	this.c = -(this.a*x + this.b*y);
}

Plane.prototype.dist = function(x, y) {
	return this.a*x + this.b*y + this.c;
}

Plane.prototype.move = function(x, y, space) {
	var dist = this.dist(x, y);
	x += this.a*(space - dist);
	y += this.b*(space - dist);
	return [ x, y ];
}

function makeColPlanes(block, x, y) {
	var planes = [];

	if (block[0] && block[2])
		planes.push(new Plane(1, 0, x, y));

	if (block[1] && block[3])
		planes.push(new Plane(-1, 0, x+1, y));

	if (block[0] && block[1])
		planes.push(new Plane(0, 1, x, y));

	if (block[2] && block[3])
		planes.push(new Plane(0, -1, x, y+1));

	if (block[0])
		planes.push(new Plane(1, 1, x, y));

	if (block[1])
		planes.push(new Plane(-1, 1, x+1, y));

	if (block[2])
		planes.push(new Plane(1, -1, x, y+1));

	if (block[3])
		planes.push(new Plane(-1, -1, x+1, y+1));

	return planes;
}

function Proxy(obj, cb) {
	this.x0 = obj.x * tex0TileInv;
	this.y0 = obj.y * tex0TileInv;
	this.x1 = this.x0 + obj.width * tex0TileInv;
	this.y1 = this.y0 + obj.height * tex0TileInv;
	this.obj = obj;
	this.cb = cb;
}

Proxy.prototype.execute = function() {
	this.cb(this.obj);
}

