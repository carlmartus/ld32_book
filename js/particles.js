var paList;

function paGlobals() {
	paList = [];
}

function paBloodHit(x, y, hp) {
}

function paSpawn(x, y) {
}

function paInfo(x, y) {
	paList.push(new Particle(
				TEX_INFO,
				2.0, x, y, 0.4,
				0.0, 0.0, 0.15,
				0.1, 0.0));
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
		this.dz -= this.gravity*ft;
	}

	this.x += this.dX*ft;
	this.y += this.dY*ft;
	this.z += this.dZ*ft;

	return this.ttl > 0.0;
};

Particle.prototype.render = function() {
	spPush(this.x, this.y, this.z, this.texId, this.size);
};

