function makeBrianPassive(cr) {
	return {
		init: function() {
			this.startX = cr.x;
			this.startY = cr.y;
			this.walking = false;
			return this.update();
		},
		update: function() {
			this.walking = !this.walking;

			if (this.walking) {
				var nX = this.startX + 0.5*(2.0*Math.random() - 1.0);
				var nY = this.startY + 0.5*(2.0*Math.random() - 1.0);
				var dX = nX - cr.x;
				var dY = nY - cr.y;

				var len = Math.sqrt(dX*dX + dY*dY);
				dX = dX / len;
				dY = dY / len;

				cr.walk(dX, dY);
				return len / cr.speed;
			} else {
				cr.noWalk();
				cr.idle();
			}

			return 0.500 + Math.random()*3.0;
		}
	};
}

