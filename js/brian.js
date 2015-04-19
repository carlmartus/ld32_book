/**
 * This brain walks around his spawn point
 */
function makeBrianSpeaker(cr) {
	return {
		init: function() {
			this.startX = cr.x;
			this.startY = cr.y;
			this.walking = false;
			return this.update();
		},
		update: function() {
			if (plDistance(cr.x, cr.y) < 1.0) {
				cr.faceTowards(plX, plY);
				return 1;
			}

			this.walking = !this.walking;

			if (this.walking) {
				// Returns ETA in time
				return cr.walkTowards(
						this.startX + 0.5*(2.0*Math.random() - 1.0),
						this.startY + 0.5*(2.0*Math.random() - 1.0));
			} else {
				cr.noWalk();
				cr.idle();
			}

			return 0.500 + Math.random()*3.0;
		}
	};
}

/**
 * Standing guard until player comes close then attack
 */
function makeBrianGuard(cr) {
	return {
		init: function() {
			return Math.random();
		},
		update: function() {
			if (cr.getState() == W_DEAD) return 2;

			var distToPlayer = plDistance(cr.x, cr.y);
			if (distToPlayer < 0.2) {
				cr.noWalk();
				cr.attack();
				return 0.5;
			} else if (distToPlayer < 5) {
				cr.setSpeedMul(4.0);
				return cr.walkTowards(plX, plY) * 0.5;
			} else {
				cr.idle();
			}
			return 0.4;
		}
	};
}

