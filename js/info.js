var infoLastText = null;

function infoSetText(msg) {
	if (msg == infoLastText) return;

	infoLastText = msg;

	var el = document.getElementById('bookInfoText');
	el.innerHTML = msg;
}

