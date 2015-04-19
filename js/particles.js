var paList;

function paGlobals() {
	paList = [];
}

function paBloodHit(x, y, hp) {
	var amount = Math.round(hp / 10);
	var sprites = [ TEX_BLOOD0, TEX_BLOOD1 ];

	for (var i=0; i<amount; i++) {
		var rX = 3.0*Math.random() - 1.5;
		var rY = 3.0*Math.random() - 1.5;

		paList.push(new Particle(
					sprites[i % sprites.length],
					2.0, x, y, 0.4,
					rX, rY, 0.15,
					0.25, 4.0));
	}
}

function paSpawn(x, y) {
}

function paInfo(x, y) {
	paList.push(new Particle(
				TEX_INFO,
				2.0, x, y, 0.4,
				0.0, 0.0, 0.15,
				0.15, 0.0));
}

function paFrameRender(ft) {
	for (var i=0; i<paList.length; i++) {
		if (!paList[i].frame(ft)) {
			paList.splice(i, 1);
			i--;
		} else {
			paList[i].render();
		}
	}
}

function Particle(texId, ttl, x, y, z, dX, dY, dZ, size, gravity) {
	this.texId = texId;
	this.ttl = ttl;
	this.x = x;
	this.y = y;
	this.z = z;
	this.dX = dX;
	this.dY = dY;
	this.dZ = dZ;
	this.size = size;
	this.gravity = gravity;
}

Particle.prototype.frame = function(ft) {
	this.ttl -= ft;

	if (this.gravity) {
		this.dZ -= this.gravity*ft;
	}

	this.x += this.dX*ft;
	this.y += this.dY*ft;
	this.z += this.dZ*ft;

	return this.ttl > 0.0;
};

Particle.prototype.render = function() {
	spPush(this.x, this.y, this.z, this.texId, this.size);
};

