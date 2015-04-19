var TEAM_MONK = 1;
var TEAM_NATURE = 2;

function coInflict(fromTeam, x, y, rad, hp) {
	crInflict(fromTeam, x, y, rad, hp);
}

function coFindEnemy(fromTeam, x, y, maxDist) {
	return crCloseEnemy(fromTeam, x, y, maxDist);
}

