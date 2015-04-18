var crList;

function crReset() {
	crList = [];
}

function crSpawnMunk(x, y) {
	crList.push(new Creep(x, y, 0.2));
}


function Creep(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
}

Creep.prototype.render = function() {
}

