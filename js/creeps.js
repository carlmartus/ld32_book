var crList;

function crSpawnMunk(x, y, infoMsg) {
	var cr = new Creep(TEAM_MONK, x, y, 0.4, 0.4, makeBrianSpeaker,
			new Walker(3.0,
				animation(getTexId(0, 8), 3),
				animation(getTexId(0, 9), 3),
				animation(getTexId(0, 10), 3),
				animation(getTexId(0, 11), 3),
				animation(getTexId(0, 12), 3),
				animation(getTexId(0, 13), 3)));
	if (infoMsg) {
		cr.info = infoMsg;
	}
	crList.push(cr);
}

function crSpawnWolf(x, y) {
	crList.push(new Creep(TEAM_NATURE, x, y, 0.4, 0.4, makeBrianGuard,
				new Walker(1.0,
					animation(getTexId(3, 8), 3),
					animation(getTexId(3, 9), 3),
					animation(getTexId(3, 10), 3),
					animation(getTexId(3, 11), 3),
					animation(getTexId(3, 12), 3),
					animation(getTexId(3, 13), 3))));
}

function crReset() {
	crList = [];
}

function crRender() {
	for (var i=0; i<crList.length; i++) crList[i].render();
}

function crFrame(ft) {
	for (var i=0; i<crList.length; i++) crList[i].frame(ft);
}

function Creep(team, x, y, size, speed, brainMaker, walker) {
	this.team = team;
	this.x = x;
	this.y = y;
	this.dX = this.dY = 0.0;
	this.rot = Math.random() * 2.0*Math.PI;
	this.size = size;
	this.speed = speed;
	this.speedMul = 1.0;

	this.walker = walker;

	this.brain = null;
	this.brain = brainMaker(this);
	this.nextAct = this.brain.init();
}

Creep.prototype.faceDirection = function(dX, dY) {
	this.rot = Math.atan2(-dY, -dX);
	this.walker.refreshDirection(this.rot);
};

Creep.prototype.faceTowards = function(x, y) {
	this.faceDirection(
			x - this.x,
			y - this.y);
};

Creep.prototype.walk = function(dX, dY) {
	this.faceDirection(dX, dY);
	this.walker.setState(W_WALK);
	this.dX = dX*this.speed*this.speedMul;
	this.dY = dY*this.speed*this.speedMul;
};

Creep.prototype.walkTowards = function(x, y) {
	var dX = x - this.x;
	var dY = y - this.y;

	var len = Math.sqrt(dX*dX + dY*dY);
	dX = dX / len;
	dY = dY / len;

	this.walk(dX, dY);
	return len / (this.speed * this.speedMul);
};

Creep.prototype.setSpeedMul = function(mul) {
	this.speedMul = mul;
	this.walker.setSpeed(mul);
};

Creep.prototype.noWalk = function() {
	this.dX = 0.0;
	this.dY = 0.0;
};

Creep.prototype.idle = function() {
	this.walker.setState(W_IDLE);
};

Creep.prototype.attack = function() {
	this.walker.setState(W_FIRE);
};

Creep.prototype.die = function() {
	this.walker.setState(W_DEAD);
};

Creep.prototype.getState = function() {
	return this.walker.getState();
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

