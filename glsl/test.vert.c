attribute vec3 atLoc;

uniform mat4 unMvp;

void main() {
	gl_Position = unMvp*vec4(atLoc, 1);
}

