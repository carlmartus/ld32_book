var paList;

function paGlobals() {
	paList = [];
}

function paClear() {
	paList = [];
}

function paBloodHit(x, y, hp) {
	paSpriteShower(
			x, y, 0.25,
			Math.round(hp / 10),
			[ TEX_BLOOD0, TEX_BLOOD1, TEX_BLOOD2 ]);
}

function paSpawn(x, y) {
	paSpriteShower(x, y, 0.1, 10, [ TEX_PLASMA ]);
}

function paInfo(x, y) {
	paList.push(new Particle(
				TEX_INFO,
				2.0, x, y, 0.4,
				0.0, 0.0, 0.15,
				0.15, 0.0));
}

function paBlast(x, y, tX, tY) {
	var dX = tX - x;
	var dY = tY - y;
	var dist = dist2(x, y, tX, tY);
	var n = normMul(dX, dY, 5.0);

	paList.push(new Particle(
				TEX_PLASMA,
				dist*0.3, x, y, 0.2,
				n[0], n[1], 0.0,
				0.5, 0.0));
}

function paSpriteShower(x, y, size, amount, sprites) {
	for (var i=0; i<amount; i++) {
		var rX = 3.0*Math.random() - 1.5;
		var rY = 3.0*Math.random() - 1.5;

		paList.push(new Particle(
					sprites[i % sprites.length],
					2.0, x, y, 0.2,
					rX, rY, 1.4,
					size, 4.0));
	}
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

