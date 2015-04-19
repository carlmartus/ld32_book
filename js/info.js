var infoLastText = null;
var infoAlive = 0.0;

function infoImages(notice, speech) {
	var elNotice = document.getElementById('bookInfoImgNotice');
	var elSpeech = document.getElementById('bookInfoImgSpeech');

	elNotice.style.display = notice ? 'block' : 'none';
	elSpeech.style.display = speech ? 'block' : 'none';
}

function infoInfo(msg) {
	infoImages(true, false);
	infoSetText(msg);
}

function infoSpeech(msg) {
	infoImages(false, true);
	infoSetText(msg);
}

function infoSetText(msg) {
	if (msg == infoLastText) return;

	infoLastText = msg;

	var el = document.getElementById('bookInfoText');
	el.innerHTML = msg;
	infoAlive = 10.0;
}

function infoClearText() {
	infoImages(false, false);
	infoSetText('');
}

function infoClearCounter(ft) {
	if (infoAlive > 0.0) {
		infoAlive -= ft;
		if (infoAlive <= 0.0) {
			infoClearText('');
		}
	}
}

