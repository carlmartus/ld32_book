var tex0Tile = 16;
var tex0TileInv = 1.0 / tex0Tile;
var tex0Dim = 16;
var tex0DimInv = 1.0 / tex0Dim;

function getTexId(x, y) {
	return y*tex0Dim + x;
}

var TEX_MUNK = getTexId(0, 8);

