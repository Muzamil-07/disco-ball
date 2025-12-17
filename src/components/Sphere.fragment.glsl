uniform float uTime;

varying float vHoverArea;

vec3 hsl2rgb(in vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

void main() {
  float timeScaled = uTime * 0.2;
  vec3 baseColour = hsl2rgb(vec3(timeScaled, 0.2, 0.7));
  vec3 hoverColour = hsl2rgb(vec3(0.1, 0.1, 0.9));
  vec3 colour = mix(baseColour, hoverColour,  vHoverArea);

  gl_FragColor = vec4(colour, 1.0);
}