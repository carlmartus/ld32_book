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
			if (cr.getState() == W_DEAD) return 1;

			cr.setSpeedMul(1.0);

			if (plDistance(cr.x, cr.y) < 0.4) {
				cr.faceTowards(plX, plY);
				cr.noWalk();
				cr.idle();
				if (cr.info) infoSpeech(cr.info);
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
				if (cr.info) {
					paInfo(cr.x, cr.y);
				}
			}

			return 0.500 + Math.random()*3.0;
		},
		hit: function(x, y, hp) {
			return flinch(cr, x, y, hp);

			cr.faceTowards(x, y);
			cr.noWalk();
			cr.idle();
			return 0.3;
			console.log('Hut monk');
		}
	};
}

/**
 * Standing guard until player comes close then attack
 */
function makeBrianGuard(cr) {
	return {
		swing: false,
		init: function() {
			return Math.random();
		},
		update: function() {
			if (cr.getState() == W_DEAD) return 2;

			if (this.swing) {
				coInflict(TEAM_NATURE, cr.x, cr.y, 0.3, 40);
				this.swing = false;
				cr.noWalk();
				return 0.4 + Math.random()*0.3;
			}

			var close = coFindEnemy(TEAM_NATURE, cr.x, cr.y, 5);
			if (close) {
				var dist = dist2(close[0], close[1], cr.x, cr.y);

				if (dist < 0.21) {
					cr.noWalk();
					cr.attack();
					this.swing = true;
					cr.setSpeedMul(12.0);
					return 0.1;
				}

				cr.setSpeedMul(6.0);
				return cr.walkTowards(close[0], close[1]) * 0.6;
			}

			cr.idle();
			return 0.4;
		},
		hit: function(x, y, hp) {
			console.log('Hut guard');
		}
	};
}

function flinch(cr, x, y, hp) {
	paBloodHit(x, y, hp);
	cr.hp -= hp;

	if (cr.hp <= 0) {
		cr.faceTowards(x, y);
		cr.noWalk();
		cr.die();
		cr.setSpeedMul(4.0);
		return 2.5;
	} else {
		cr.idle();
		cr.setSpeedMul(4.0);
		cr.walkTowards(x, y, -1);
		cr.faceTowards(x, y);
		return 0.3;
	}
}

