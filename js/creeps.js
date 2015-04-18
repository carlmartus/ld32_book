var crList;

function crReset() {
	crList = [];
}

function crSpawnMunk(x, y) {
	crList.push(new Creep(x, y, 0.4));
}

function crRender() {
	for (var i=0; i<crList.length; i++) {
		crList[i].render();
	}
}


function Creep(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
}

Creep.prototype.render = function() {
	spPush(this.x, this.y, this.size*0.5, TEX_MUNK, this.size);
}

