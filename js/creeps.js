var crList;

function crReset() {
	crList = [];
}

function crSpawnMunk(x, y) {
	crList.push(new Creep(x, y, 0.4, 0.4, makeBrianPassive));
}

function crRender() {
	for (var i=0; i<crList.length; i++) crList[i].render();
}

function crFrame(ft) {
	for (var i=0; i<crList.length; i++) crList[i].frame(ft);
}

function Creep(x, y, size, speed, brainMaker) {
	this.x = x;
	this.y = y;
	this.dX = this.dY = 0.0;
	this.rot = Math.random() * 2.0*Math.PI;
	this.size = size;
	this.speed = speed;

	this.walker = new Walker(3.0,
			animation(getTexId(0, 8), 3),
			animation(getTexId(0, 9), 3),
			animation(getTexId(0, 10), 3),
			animation(getTexId(0, 11), 3),
			null, null);

	this.brain = null;
	this.brain = brainMaker(this);
	this.nextAct = this.brain.init();
}

Creep.prototype.walk = function(dX, dY) {
	this.rot = Math.atan2(-dY, -dX);
	this.walker.setState(W_WALK);
	this.dX = dX*this.speed;
	this.dY = dY*this.speed;
	this.walker.refreshDirection(this.rot);
};

Creep.prototype.noWalk = function() {
	this.dX = 0.0;
	this.dY = 0.0;
};

Creep.prototype.idle = function() {
	this.walker.setState(W_IDLE);
};

Creep.prototype.frame = function(ft) {
	this.nextAct -= ft;

	if (this.nextAct <= 0) {
		this.nextAct = this.brain.update();
	}

	if (this.dX || this.dY) {
		var mov = mapsWalk(
				this.x, this.y,
				this.dX*ft, this.dY*ft,
				this.size);
		this.x = mov[0];
		this.y = mov[1];
	}
	this.walker.frame(ft, this.x, this.y, this.rot);
};

Creep.prototype.render = function() {
	this.walker.render(this.size);
};

