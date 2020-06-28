#define OCTAVES 5

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

// refs https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float fbm( in vec3 p ){
	float s = 0.0;
	float m = 0.0;
	float a = 0.5;
	
	for( int i=0; i<OCTAVES; i++ ){
		s += a * noise(p);
		m += a;
		a *= 0.5;
		p *= 2.0;
	}
	return s/m;
}

// domain warp
float dw (in vec2 st)  {
  vec3 p = vec3(st, u_time);
  return fbm(p+fbm(p+fbm(p + vec3(0, u_time*2., 0))));
}

void main() {
  vec2 st = v_uv.xy;

  // make normal map
  float n = dw(st);
  float d = 0.01;
  float r = dw(st+vec2(d, 0));
  vec3 rd = normalize(vec3(d,0,r-n));
  float b = dw(st+vec2(0, d));
  vec3 bd = normalize(vec3(0,d,b-n));
  vec3 normal = 1.-cross(bd, rd);
  gl_FragColor=vec4(normal*.5,1.0);
}