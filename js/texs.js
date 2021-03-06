var tex0Tile = 16;
var tex0TileInv = 1.0 / tex0Tile;
var tex0Dim = 16;
var tex0DimInv = 1.0 / tex0Dim;

function getTexId(x, y) {
	return y*tex0Dim + x;
}

var TEX_MUNK = getTexId(0, 8);
var TEX_INFO = getTexId(0, 15);
var TEX_BLOOD0 = getTexId(1, 15);
var TEX_BLOOD1 = getTexId(2, 15);
var TEX_BLOOD2 = getTexId(3, 15);
var TEX_PLASMA = getTexId(4, 15);

