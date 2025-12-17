precision mediump float;

uniform float uTime;
varying vec2 vUv;

void main() {
    // Center the UV coordinates
    vec2 uv = vUv - 0.5;
    float dist = length(uv); // distance from center

    // Animate some subtle color shifting
    float r = 0.4 + 0.6 * sin(uTime * 0.2 + dist * 3.0);
    float g = 0.0 + 0.3 * sin(uTime * 0.3 + dist * 5.0);
    float b = 0.3 + 0.7 * cos(uTime * 0.2 + dist * 4.0);

    // Fade colors outward
    float alpha = smoothstep(0.8, 0.0, dist);

    gl_FragColor = vec4(vec3(r, g, b) * alpha, 1.0);
}