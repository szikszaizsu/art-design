// Nyitókép: pöttyözött (dither) 3D forma, valós időben rajzolva; az egér forgatja és megvilágítja.
(()=>{

const cv=document.getElementById('dither-hero'); if(!cv) return; const gl=cv.getContext('webgl',{antialias:false,premultipliedAlpha:false}); if(!gl) return;
const vs=`attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const fs=`precision highp float;
uniform vec2 R;uniform float T;uniform vec2 M;uniform float PX;uniform float DK;
float bayer(vec2 a){a=floor(a);float m=0.;
 for(int i=0;i<4;i++){vec2 b=mod(a,2.);m=m*4.+ (b.x*2.+b.y*3.-b.x*b.y*4.); a=floor(a/2.);} return m/256.;}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}
float map(vec3 p){
  p.xz*=rot(T*.25+M.x*1.2); p.yz*=rot(.5+M.y*.8+sin(T*.2)*.2);
  float w=sin(p.x*3.+T)*sin(p.y*3.+T*1.3)*sin(p.z*3.+T*.7)*.12;
  float d=sdTorus(p,vec2(1.05,.42))+w;
  return d;}
vec3 nrm(vec3 p){vec2 e=vec2(.002,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
void main(){
  vec2 fc=floor(gl_FragCoord.xy/PX)*PX+PX*.5;
  vec2 uv=(fc-.5*R)/min(R.x,R.y);
  vec3 ro=vec3(0.,0.,5.2),rd=normalize(vec3(uv,-1.75));
  float t=0.;float hit=0.;
  for(int i=0;i<90;i++){float d=map(ro+rd*t);if(d<.001){hit=1.;break;}t+=d*.8;if(t>10.)break;}
  float shade=0.;float rim=0.;
  if(hit>.5){vec3 p=ro+rd*t;vec3 n=nrm(p);vec3 L=normalize(vec3(-.6+M.x,.8-M.y,.9));
    shade=clamp(dot(n,L),0.,1.)*.85+.08; rim=pow(1.-clamp(dot(n,-rd),0.,1.),3.);}
  float th=bayer(gl_FragCoord.xy/PX);
  vec3 ink=mix(vec3(.086,.078,.071),vec3(.945,.925,.902),DK), paper=mix(vec3(1.),vec3(.067,.059,.055),DK), red=mix(vec3(.56,.12,.12),vec3(.82,.30,.27),DK);
  float lum=hit>.5?shade:1.;
  vec3 col=lum>th?paper:ink;
  if(hit>.5 && rim>.55 && rim*0.9>th) col=red;
  gl_FragColor=vec4(col,1.);}`;
function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o}
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr);
const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
const uD=gl.getUniformLocation(pr,'DK'),uR=gl.getUniformLocation(pr,'R'),uT=gl.getUniformLocation(pr,'T'),uM=gl.getUniformLocation(pr,'M'),uP=gl.getUniformLocation(pr,'PX');
let m=[0,0],mt=[0,0];
addEventListener('pointermove',e=>{const b=cv.getBoundingClientRect();mt=[Math.max(-.8,Math.min(.8,(e.clientX-b.left)/b.width-.5)),Math.max(-.8,Math.min(.8,(e.clientY-b.top)/b.height-.5))]});
function size(){const d=Math.min(devicePixelRatio||1,2);cv.width=cv.clientWidth*d;cv.height=cv.clientHeight*d;gl.viewport(0,0,cv.width,cv.height)}
size();addEventListener('resize',size);
const t0=performance.now(); const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
(function f(now){m[0]+=(mt[0]-m[0])*.05;m[1]+=(mt[1]-m[1])*.05;
 gl.uniform1f(uD,document.documentElement.dataset.theme==='dark'?1:0);gl.uniform2f(uR,cv.width,cv.height);gl.uniform1f(uT,still?2:(now-t0)/1000);gl.uniform2f(uM,m[0],m[1]);gl.uniform1f(uP,3.*Math.min(devicePixelRatio||1,2));
 gl.drawArrays(gl.TRIANGLE_STRIP,0,4);requestAnimationFrame(f)})(t0);

})();
