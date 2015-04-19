function normMul(x, y, k) {
	var distInv = k / dist2(x, y, 0, 0);
	return [
		x * distInv,
		y * distInv ];
}

function dist2(x0, y0, x1, y1) {
	var dX = x1 - x0;
	var dY = y1 - y0;

	return Math.sqrt(dX*dX + dY*dY);
}

