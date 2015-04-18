var W_IDLE = 1;
var W_WALK = 2;
var W_FIRE = 3;
var W_DEAD = 4;

var D_FRONT = 1;
var D_BACK = 2;
var D_RIGHT = 3;
var D_LEFT = 4;

function animation(start, len) {
	var arr = [];
	for (var i=start; i<start+len; i++) arr.push(i);
	return arr;
}

function Walker(speed, front, back, left, right, attack, dead) {
	this.t = 0.0;
	this.speed = speed;
	this.x = this.y = this.rot = 0.0;

	this.state = W_IDLE;
	this.direction = D_FRONT;

	this.listFront = front;
	this.listBack = back;
	this.listLeft = left;
	this.listRight = right;
	this.listAttack = attack;
	this.listDead = dead;
}

Walker.prototype.setState = function(state) {
	this.state = state;
	this.refreshDirection();
};

Walker.prototype.refreshDirection = function() {
	var tX = this.x - plCamX;
	var tY = this.y - plCamY;
	var tInv = 1.0 / Math.sqrt(tX*tX + tY*tY);
	tX *= tInv;
	tY *= tInv;

	var rX = Math.cos(this.rot);
	var rY = Math.sin(this.rot);

	var dotY = tX*rX + tY*rY;
	var dotX = tY*rX - tX*rY;

	if (Math.abs(dotY) > Math.abs(dotX)) {
		this.direction = dotY > 0.0 ? D_FRONT : D_BACK;
	} else {
		this.direction = dotX > 0.0 ? D_LEFT : D_RIGHT;
	}
};

Walker.prototype.frame = function(ft, x, y, rot) {
	this.x = x;
	this.y = y;
	this.rot = rot;
	this.refreshDirection();

	switch (this.state) {
		case W_IDLE :
		case W_WALK :
			switch (this.direction) {
				default :
				case D_FRONT :	this.active = this.listFront; break;
				case D_BACK :	this.active = this.listBack; break;
				case D_LEFT :	this.active = this.listLeft; break;
				case D_RIGHT :	this.active = this.listRight; break;
			}
			break;

		case W_FIRE :	this.active = this.listAttack; break;
		case W_DEAD :	this.active = this.listDead; break;
	}

	if (this.state == W_IDLE) {
		this.t = 0.0;
	} else {
		this.t += ft * this.speed;
		if (this.t >= this.active.length) {
			this.t = this.t % this.active.length;
		}
	}
};

Walker.prototype.render = function(size) {
	spPush(this.x, this.y, size*0.5,
			this.active[Math.floor(this.t)],
			size, this.direction == D_LEFT);
};

