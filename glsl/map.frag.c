varying vec2 vaUv;

uniform sampler2D unTex0;

void main() {
	gl_FragColor = texture2D(unTex0, vaUv);
}

