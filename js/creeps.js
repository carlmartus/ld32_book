var crList;

function crReset() {
	crList = [];
}

function crSpawnMunk(x, y) {
	crList.push(new Creep(x, y, 0.4));
}

function crRender() {
	for (var i=0; i<crList.length; i++) crList[i].render();
}

function crFrame(ft) {
	for (var i=0; i<crList.length; i++) crList[i].frame(ft);
}

function Creep(x, y, size) {
	this.x = x;
	this.y = y;
	this.rot = 0.0;
	this.size = size;

	this.walker = new Walker(0.2,
			animation(getTexId(0, 8), 1),
			animation(getTexId(0, 9), 1),
			animation(getTexId(0, 10), 1),
			animation(getTexId(0, 11), 1),
			null, null);
}

Creep.prototype.frame = function(ft) {
	this.walker.frame(ft, this.x, this.y, this.rot);
};

Creep.prototype.render = function() {
	this.walker.render(this.size);
};

