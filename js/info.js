var infoLastText = null;
var infoAlive = 0.0;

function infoInfo(msg) {
	infoSetText(msg);
}

function infoSpeech(msg) {
	infoSetText(msg);
}

function infoSetText(msg) {
	if (msg == infoLastText) return;

	infoLastText = msg;

	var el = document.getElementById('bookInfoText');
	el.innerHTML = msg;
	infoAlive = 10.0;
}

function infoClearCounter(ft) {
	if (infoAlive > 0.0) {
		infoAlive -= ft;
		if (infoAlive <= 0.0) {
			infoSetText('');
		}
	}
}

