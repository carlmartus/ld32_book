var spList;
var spCount, spElems=6, spMax=spElems*200;

function spGlobals() {
	spList = new Float32Array((spMax + 2)*spElems);
	spCount = 0;
}

function spPush(x, y, z, texId, uvMul, size) {
	if (spCount >= spMax) return;

	spList[spCount++] = x;
	spList[spCount++] = y;
	spList[spCount++] = z;

	/*
	var u = (texId % tex0Dim) * tex0DimInv;
	var v = Math.floor(texId / tex0Dim) * tex0DimInv;
	spList[spCount++] = u;
	spList[spCount++] = v;
	spList*/
}

