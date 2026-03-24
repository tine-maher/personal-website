/**
 * Ar-o1 — GPU particle shaders. All motion in vertex; no CPU physics.
 */

export const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform vec2 uResolution;

  attribute float aPhase;
  attribute float aScale;

  varying float vAlpha;

  // 2D curl-style flow (no texture fetch)
  vec2 flow(vec2 p) {
    float t = uTime * 0.15;
    float x = p.x * 0.002 + t;
    float y = p.y * 0.002 + t * 0.7;
    return vec2(
      sin(y) * 0.5 + cos(x * 0.7) * 0.3,
      cos(x) * 0.5 + sin(y * 0.7) * 0.3
    );
  }

  void main() {
    vec3 pos = position;
    vec2 uv = (position.xy + 1.0) * 0.5;
    float phase = aPhase * 6.28318;
    float t = uTime + phase;

    // Flow offset (GPU-only)
    vec2 f = flow(pos.xy);
    pos.xy += f * 80.0 * aScale;

    // Subtle mouse attraction
    vec2 m = (uMouse - 0.5) * 2.0;
    vec2 toMouse = m - pos.xy * 0.002;
    float dist = length(toMouse);
    pos.xy += normalize(toMouse) * uMouseInfluence * 30.0 / (1.0 + dist * 2.0);

    // Depth drift for parallax feel
    pos.z += sin(t * 0.5) * 20.0 * aScale;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = 1.2 * (1.0 + 0.3 * sin(t * 0.7)) * aScale;
    gl_PointSize = size;
    vAlpha = 0.4 + 0.3 * sin(t * 0.5);
  }
`;

export const particleFragment = /* glsl */ `
  uniform vec3 uColor;

  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c) * 4.0;
    float a = (1.0 - smoothstep(0.0, 1.0, d)) * vAlpha;
    gl_FragColor = vec4(uColor, a);
  }
`;
