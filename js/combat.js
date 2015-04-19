var TEAM_MONK = 1;
var TEAM_NATURE = 2;

function coInflict(fromTeam, x, y, rad, hp) {
	if (fromTeam != TEAM_MONK) {
		if (plDistance(x, y) <= rad) {
			plHit(x, y, hp);
		}
	}
}

