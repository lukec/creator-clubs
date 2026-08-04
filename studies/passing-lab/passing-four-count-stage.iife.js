(()=>{/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var hu=0,vl=1,uu=2;var ts=1,du=2,Hs=3,hi=0,tn=1,Jn=2,Kn=0,Zi=1,Ml=2,Sl=3,bl=4,fu=5;var Pi=100,pu=101,mu=102,gu=103,_u=104,xu=200,yu=201,vu=202,Mu=203,Ua=204,Fa=205,Su=206,bu=207,wu=208,Eu=209,Tu=210,Au=211,Ru=212,Cu=213,Pu=214,Oa=0,Ba=1,za=2,Ji=3,ka=4,Va=5,Ha=6,Ga=7,wl=0,Iu=1,Lu=2,Dn=0,El=1,Tl=2,Al=3,Ur=4,Rl=5,Cl=6,Pl=7;var Il=300,Ui=301,ns=302,vo=303,Mo=304,Fr=306,Wa=1e3,qn=1001,Xa=1002,Bt=1003,Du=1004;var Or=1005;var Gt=1006,So=1007;var Fi=1008;var on=1009,Ll=1010,Dl=1011,Gs=1012,bo=1013,Nn=1014,Un=1015,jn=1016,wo=1017,Eo=1018,Ws=1020,Nl=35902,Ul=35899,Fl=1021,Ol=1022,yn=1023,Yn=1026,Oi=1027,Bl=1028,To=1029,Bi=1030,Ao=1031;var Ro=1033,Br=33776,zr=33777,kr=33778,Vr=33779,Co=35840,Po=35841,Io=35842,Lo=35843,Do=36196,No=37492,Uo=37496,Fo=37488,Oo=37489,Hr=37490,Bo=37491,zo=37808,ko=37809,Vo=37810,Ho=37811,Go=37812,Wo=37813,Xo=37814,qo=37815,Yo=37816,$o=37817,Zo=37818,Jo=37819,Ko=37820,jo=37821,Qo=36492,ec=36494,tc=36495,nc=36283,ic=36284,Gr=36285,sc=36286;var dr=2300,qa=2301,Na=2302,hl=2303,ul=2400,dl=2401,fl=2402;var Nu=3200;var rc=0,Uu=1,mi="",en="srgb",fr="srgb-linear",pr="linear",et="srgb";var Yi=7680;var pl=519,Fu=512,Ou=513,Bu=514,ac=515,zu=516,ku=517,oc=518,Vu=519,ml=35044;var zl="300 es",Pn=2e3,Ns=2001;function bf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function wf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function mr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Hu(){let n=mr("canvas");return n.style.display="block",n}var zh={},Us=null;function kl(...n){let e="THREE."+n.shift();Us?Us("log",e,...n):console.log(e,...n)}function Gu(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Re(...n){n=Gu(n);let e="THREE."+n.shift();if(Us)Us("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Le(...n){n=Gu(n);let e="THREE."+n.shift();if(Us)Us("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function $i(...n){let e=n.join(" ");e in zh||(zh[e]=!0,Re(...n))}function Wu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Xu={[Oa]:Ba,[za]:Ha,[ka]:Ga,[Ji]:Va,[Ba]:Oa,[Ha]:za,[Ga]:ka,[Va]:Ji},$n=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kh=1234567,hr=Math.PI/180,Ki=180/Math.PI;function Xs(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function Vl(n,e){return(n%e+e)%e}function Ef(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Tf(n,e,t){return n!==e?(t-n)/(e-n):0}function ur(n,e,t){return(1-t)*n+t*e}function Af(n,e,t,i){return ur(n,e,1-Math.exp(-t*i))}function Rf(n,e=1){return e-Math.abs(Vl(n,e*2)-e)}function Cf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Pf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function If(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Lf(n,e){return n+Math.random()*(e-n)}function Df(n){return n*(.5-Math.random())}function Nf(n){n!==void 0&&(kh=n);let e=kh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Uf(n){return n*hr}function Ff(n){return n*Ki}function Of(n){return(n&n-1)===0&&n!==0}function Bf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function zf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function kf(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),h=a((e+i)/2),d=r((e-i)/2),u=a((e-i)/2),p=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*h,c*d,c*u,o*l);break;case"YZY":n.set(c*u,o*h,c*d,o*l);break;case"ZXZ":n.set(c*d,c*u,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*p,o*l);break;case"YXY":n.set(c*p,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*p,o*h,o*l);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ls(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Qt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var zi={DEG2RAD:hr,RAD2DEG:Ki,generateUUID:Xs,clamp:Ge,euclideanModulo:Vl,mapLinear:Ef,inverseLerp:Tf,lerp:ur,damp:Af,pingpong:Rf,smoothstep:Cf,smootherstep:Pf,randInt:If,randFloat:Lf,randFloatSpread:Df,seededRandom:Nf,degToRad:Uf,radToDeg:Ff,isPowerOfTwo:Of,ceilPowerOfTwo:Bf,floorPowerOfTwo:zf,setQuaternionFromProperEuler:kf,normalize:Qt,denormalize:Ls},ql=class ql{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ql.prototype.isVector2=!0;var Oe=ql,Zn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],p=r[a+1],g=r[a+2],M=r[a+3];if(d!==M||c!==u||l!==p||h!==g){let m=c*u+l*p+h*g+d*M;m<0&&(u=-u,p=-p,g=-g,M=-M,m=-m);let f=1-o;if(m<.9995){let S=Math.acos(m),T=Math.sin(S);f=Math.sin(f*S)/T,o=Math.sin(o*S)/T,c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+M*o}else{c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+M*o;let S=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=S,l*=S,h*=S,d*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*d+c*p-l*u,e[t+1]=c*g+h*u+l*d-o*p,e[t+2]=l*g+h*p+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),d=o(r/2),u=c(i/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Yl=class Yl{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+c*l+a*d-o*h,this.y=i+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vc.copy(this).projectOnVector(e),this.sub(Vc)}reflect(e){return this.sub(Vc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yl.prototype.isVector3=!0;var F=Yl,Vc=new F,Vh=new Zn,$l=class $l{constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],p=i[5],g=i[8],M=s[0],m=s[3],f=s[6],S=s[1],T=s[4],v=s[7],E=s[2],b=s[5],R=s[8];return r[0]=a*M+o*S+c*E,r[3]=a*m+o*T+c*b,r[6]=a*f+o*v+c*R,r[1]=l*M+h*S+d*E,r[4]=l*m+h*T+d*b,r[7]=l*f+h*v+d*R,r[2]=u*M+p*S+g*E,r[5]=u*m+p*T+g*b,r[8]=u*f+p*v+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,p=l*r-a*c,g=t*d+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return e[0]=d*M,e[1]=(s*l-h*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(h*t-s*c)*M,e[5]=(s*r-o*t)*M,e[6]=p*M,e[7]=(i*c-l*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return $i("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hc.makeScale(e,t)),this}rotate(e){return $i("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hc.makeRotation(-e)),this}translate(e,t){return $i("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};$l.prototype.isMatrix3=!0;var Fe=$l,Hc=new Fe,Hh=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gh=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vf(){let n={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===et&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(s.r=Ds(s.r),s.g=Ds(s.g),s.b=Ds(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return $i("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return $i("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[fr]:{primaries:e,whitePoint:i,transfer:pr,toXYZ:Hh,fromXYZ:Gh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:e,whitePoint:i,transfer:et,toXYZ:Hh,fromXYZ:Gh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),n}var Ye=Vf();function li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ds(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var vs,Ya=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{vs===void 0&&(vs=mr("canvas")),vs.width=e.width,vs.height=e.height;let s=vs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=vs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=mr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(li(t[i]/255)*255):t[i]=li(t[i]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Hf=0,Fs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=Xs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Gc(s[a].image)):r.push(Gc(s[a]))}else r=Gc(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Gc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ya.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}var Gf=0,Wc=new F,rn=class n extends $n{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=qn,s=qn,r=Gt,a=Fi,o=yn,c=on,l=n.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Xs(),this.name="",this.source=new Fs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wc).x}get height(){return this.source.getSize(Wc).y}get depth(){return this.source.getSize(Wc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wa:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case Xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wa:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case Xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Il;rn.DEFAULT_ANISOTROPY=1;var Zl=class Zl{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],M=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,v=(p+1)/2,E=(f+1)/2,b=(h+u)/4,R=(d+M)/4,x=(g+m)/4;return T>v&&T>E?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=b/i,r=R/i):v>E?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=b/s,r=x/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=R/r,s=x/r),this.set(i,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-M)/S,this.z=(u-h)/S,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Zl.prototype.isVector4=!0;var gt=Zl,$a=class extends $n{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new rn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Fs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},fn=class extends $a{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},gr=class extends rn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Za=class extends rn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yo=class yo{constructor(e,t,i,s,r,a,o,c,l,h,d,u,p,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,h,d,u,p,g,M,m)}set(e,t,i,s,r,a,o,c,l,h,d,u,p,g,M,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=M,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yo().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/Ms.setFromMatrixColumn(e,0).length(),r=1/Ms.setFromMatrixColumn(e,1).length(),a=1/Ms.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,p=a*d,g=o*h,M=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=u-M*l,t[9]=-o*c,t[2]=M-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,p=c*d,g=l*h,M=l*d;t[0]=u+M*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=M+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,p=c*d,g=l*h,M=l*d;t[0]=u-M*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=M-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,p=a*d,g=o*h,M=o*d;t[0]=c*h,t[4]=g*l-p,t[8]=u*l+M,t[1]=c*d,t[5]=M*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,p=a*l,g=o*c,M=o*l;t[0]=c*h,t[4]=M-u*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+g,t[10]=u-M*d}else if(e.order==="XZY"){let u=a*c,p=a*l,g=o*c,M=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+M,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=M*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wf,e,Xf)}lookAt(e,t,i){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),bi.crossVectors(i,hn),bi.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),bi.crossVectors(i,hn)),bi.normalize(),da.crossVectors(hn,bi),s[0]=bi.x,s[4]=da.x,s[8]=hn.x,s[1]=bi.y,s[5]=da.y,s[9]=hn.y,s[2]=bi.z,s[6]=da.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],p=i[13],g=i[2],M=i[6],m=i[10],f=i[14],S=i[3],T=i[7],v=i[11],E=i[15],b=s[0],R=s[4],x=s[8],w=s[12],C=s[1],P=s[5],D=s[9],W=s[13],q=s[2],z=s[6],O=s[10],L=s[14],X=s[3],te=s[7],Q=s[11],ce=s[15];return r[0]=a*b+o*C+c*q+l*X,r[4]=a*R+o*P+c*z+l*te,r[8]=a*x+o*D+c*O+l*Q,r[12]=a*w+o*W+c*L+l*ce,r[1]=h*b+d*C+u*q+p*X,r[5]=h*R+d*P+u*z+p*te,r[9]=h*x+d*D+u*O+p*Q,r[13]=h*w+d*W+u*L+p*ce,r[2]=g*b+M*C+m*q+f*X,r[6]=g*R+M*P+m*z+f*te,r[10]=g*x+M*D+m*O+f*Q,r[14]=g*w+M*W+m*L+f*ce,r[3]=S*b+T*C+v*q+E*X,r[7]=S*R+T*P+v*z+E*te,r[11]=S*x+T*D+v*O+E*Q,r[15]=S*w+T*W+v*L+E*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],M=e[7],m=e[11],f=e[15],S=c*p-l*u,T=o*p-l*d,v=o*u-c*d,E=a*p-l*h,b=a*u-c*h,R=a*d-o*h;return t*(M*S-m*T+f*v)-i*(g*S-m*E+f*b)+s*(g*T-M*E+f*R)-r*(g*v-M*b+m*R)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-i*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],M=e[13],m=e[14],f=e[15],S=t*o-i*a,T=t*c-s*a,v=t*l-r*a,E=i*c-s*o,b=i*l-r*o,R=s*l-r*c,x=h*M-d*g,w=h*m-u*g,C=h*f-p*g,P=d*m-u*M,D=d*f-p*M,W=u*f-p*m,q=S*W-T*D+v*P+E*C-b*w+R*x;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/q;return e[0]=(o*W-c*D+l*P)*z,e[1]=(s*D-i*W-r*P)*z,e[2]=(M*R-m*b+f*E)*z,e[3]=(u*b-d*R-p*E)*z,e[4]=(c*C-a*W-l*w)*z,e[5]=(t*W-s*C+r*w)*z,e[6]=(m*v-g*R-f*T)*z,e[7]=(h*R-u*v+p*T)*z,e[8]=(a*D-o*C+l*x)*z,e[9]=(i*C-t*D-r*x)*z,e[10]=(g*b-M*v+f*S)*z,e[11]=(d*v-h*b-p*S)*z,e[12]=(o*w-a*P-c*x)*z,e[13]=(t*P-i*w+s*x)*z,e[14]=(M*T-g*E-m*S)*z,e[15]=(h*E-d*T+u*S)*z,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,p=r*h,g=r*d,M=a*h,m=a*d,f=o*d,S=c*l,T=c*h,v=c*d,E=i.x,b=i.y,R=i.z;return s[0]=(1-(M+f))*E,s[1]=(p+v)*E,s[2]=(g-T)*E,s[3]=0,s[4]=(p-v)*b,s[5]=(1-(u+f))*b,s[6]=(m+S)*b,s[7]=0,s[8]=(g+T)*R,s[9]=(m-S)*R,s[10]=(1-(u+M))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Ms.set(s[0],s[1],s[2]).length(),o=Ms.set(s[4],s[5],s[6]).length(),c=Ms.set(s[8],s[9],s[10]).length();r<0&&(a=-a),An.copy(this);let l=1/a,h=1/o,d=1/c;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=d,An.elements[9]*=d,An.elements[10]*=d,t.setFromRotationMatrix(An),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=Pn,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s),g,M;if(c)g=r/(a-r),M=a*r/(a-r);else if(o===Pn)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Ns)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Pn,c=!1){let l=this.elements,h=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s),g,M;if(c)g=1/(a-r),M=a/(a-r);else if(o===Pn)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===Ns)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};yo.prototype.isMatrix4=!0;var mt=yo,Ms=new F,An=new mt,Wf=new F(0,0,0),Xf=new F(1,1,1),bi=new F,da=new F,hn=new F,Wh=new mt,Xh=new Zn,ui=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Wh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xh.setFromEuler(this),this.setFromQuaternion(Xh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ui.DEFAULT_ORDER="XYZ";var _r=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},qf=0,qh=new F,Ss=new Zn,si=new mt,fa=new F,rr=new F,Yf=new F,$f=new Zn,Yh=new F(1,0,0),$h=new F(0,1,0),Zh=new F(0,0,1),Jh={type:"added"},Zf={type:"removed"},bs={type:"childadded",child:null},Xc={type:"childremoved",child:null},Dt=class n extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new F,t=new ui,i=new Zn,s=new F(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new Fe}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _r,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Yh,e)}rotateY(e){return this.rotateOnAxis($h,e)}rotateZ(e){return this.rotateOnAxis(Zh,e)}translateOnAxis(e,t){return qh.copy(e).applyQuaternion(this.quaternion),this.position.add(qh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yh,e)}translateY(e){return this.translateOnAxis($h,e)}translateZ(e){return this.translateOnAxis(Zh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fa.copy(e):fa.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(rr,fa,this.up):si.lookAt(fa,rr,this.up),this.quaternion.setFromRotationMatrix(si),s&&(si.extractRotation(s.matrixWorld),Ss.setFromRotationMatrix(si),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jh),bs.child=e,this.dispatchEvent(bs),bs.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zf),Xc.child=e,this.dispatchEvent(Xc),Xc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jh),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,e,Yf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,$f,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};Dt.DEFAULT_UP=new F(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var In=class extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Jf={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new In,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new In,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new In,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let M of e.hand.values()){let m=t.getJointPose(M,i),f=this._getHandJoint(l,M);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new In;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},pa={h:0,s:0,l:0};function qc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ue=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=Vl(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=qc(a,r,e+1/3),this.g=qc(a,r,e),this.b=qc(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=en){function i(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){let i=qu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return Ye.workingToColorSpace($t.copy(this),e),Math.round(Ge($t.r*255,0,255))*65536+Math.round(Ge($t.g*255,0,255))*256+Math.round(Ge($t.b*255,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace($t.copy(this),t);let i=$t.r,s=$t.g,r=$t.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=en){Ye.workingToColorSpace($t.copy(this),e);let t=$t.r,i=$t.g,s=$t.b;return e!==en?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+t,wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(wi),e.getHSL(pa);let i=ur(wi.h,pa.h,t),s=ur(wi.s,pa.s,t),r=ur(wi.l,pa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ue;Ue.NAMES=qu;var xr=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},yr=class extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new F,ri=new F,Yc=new F,ai=new F,ws=new F,Es=new F,Kh=new F,$c=new F,Zc=new F,Jc=new F,Kc=new gt,jc=new gt,Qc=new gt,Ci=class n{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Rn.subVectors(e,t),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Rn.subVectors(s,t),ri.subVectors(i,t),Yc.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(ri),c=Rn.dot(Yc),l=ri.dot(ri),h=ri.dot(Yc),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ai.x),c.addScaledVector(a,ai.y),c.addScaledVector(o,ai.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return Kc.setScalar(0),jc.setScalar(0),Qc.setScalar(0),Kc.fromBufferAttribute(e,t),jc.fromBufferAttribute(e,i),Qc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Kc,r.x),a.addScaledVector(jc,r.y),a.addScaledVector(Qc,r.z),a}static isFrontFacing(e,t,i,s){return Rn.subVectors(i,t),ri.subVectors(e,t),Rn.cross(ri).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),Rn.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;ws.subVectors(s,i),Es.subVectors(r,i),$c.subVectors(e,i);let c=ws.dot($c),l=Es.dot($c);if(c<=0&&l<=0)return t.copy(i);Zc.subVectors(e,s);let h=ws.dot(Zc),d=Es.dot(Zc);if(h>=0&&d<=h)return t.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(ws,a);Jc.subVectors(e,r);let p=ws.dot(Jc),g=Es.dot(Jc);if(g>=0&&p<=g)return t.copy(r);let M=p*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(Es,o);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Kh.subVectors(r,s),o=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(Kh,o);let f=1/(m+M+u);return a=M*f,o=u*f,t.copy(i).addScaledVector(ws,a).addScaledVector(Es,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ii=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Cn):Cn.fromBufferAttribute(r,a),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ma.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ma.copy(i.boundingBox)),ma.applyMatrix4(e.matrixWorld),this.union(ma)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ar),ga.subVectors(this.max,ar),Ts.subVectors(e.a,ar),As.subVectors(e.b,ar),Rs.subVectors(e.c,ar),Ei.subVectors(As,Ts),Ti.subVectors(Rs,As),Gi.subVectors(Ts,Rs);let t=[0,-Ei.z,Ei.y,0,-Ti.z,Ti.y,0,-Gi.z,Gi.y,Ei.z,0,-Ei.x,Ti.z,0,-Ti.x,Gi.z,0,-Gi.x,-Ei.y,Ei.x,0,-Ti.y,Ti.x,0,-Gi.y,Gi.x,0];return!el(t,Ts,As,Rs,ga)||(t=[1,0,0,0,1,0,0,0,1],!el(t,Ts,As,Rs,ga))?!1:(_a.crossVectors(Ei,Ti),t=[_a.x,_a.y,_a.z],el(t,Ts,As,Rs,ga))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},oi=[new F,new F,new F,new F,new F,new F,new F,new F],Cn=new F,ma=new Ii,Ts=new F,As=new F,Rs=new F,Ei=new F,Ti=new F,Gi=new F,ar=new F,ga=new F,_a=new F,Wi=new F;function el(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Wi.fromArray(n,r);let o=s.x*Math.abs(Wi.x)+s.y*Math.abs(Wi.y)+s.z*Math.abs(Wi.z),c=e.dot(Wi),l=t.dot(Wi),h=i.dot(Wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Pt=new F,xa=new Oe,Kf=0,dn=class extends $n{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ml,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xa.fromBufferAttribute(this,t),xa.applyMatrix3(e),this.setXY(t,xa.x,xa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ls(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Qt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ls(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ls(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ls(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ls(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),i=Qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),i=Qt(i,this.array),s=Qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),i=Qt(i,this.array),s=Qt(s,this.array),r=Qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ml&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var vr=class extends dn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Mr=class extends dn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var st=class extends dn{constructor(e,t,i){super(new Float32Array(e),t,i)}},jf=new Ii,or=new F,tl=new F,ji=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):jf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;or.subVectors(e,this.center);let t=or.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(or,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(or.copy(e.center).add(tl)),this.expandByPoint(or.copy(e.center).sub(tl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Qf=0,xn=new mt,nl=new Dt,Cs=new F,un=new Ii,cr=new Ii,Ot=new F,Zt=class n extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=Xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bf(e)?Mr:vr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Fe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,i){return xn.makeTranslation(e,t,i),this.applyMatrix4(xn),this}scale(e,t,i){return xn.makeScale(e,t,i),this.applyMatrix4(xn),this}lookAt(e){return nl.lookAt(e),nl.updateMatrix(),this.applyMatrix4(nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new st(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ii);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ji);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){let i=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];cr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(un.min,cr.min),un.expandByPoint(Ot),Ot.addVectors(un.max,cr.max),un.expandByPoint(Ot)):(un.expandByPoint(cr.min),un.expandByPoint(cr.max))}un.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ot.fromBufferAttribute(o,l),c&&(Cs.fromBufferAttribute(e,l),Ot.add(Cs)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new dn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new F,c[x]=new F;let l=new F,h=new F,d=new F,u=new Oe,p=new Oe,g=new Oe,M=new F,m=new F;function f(x,w,C){l.fromBufferAttribute(i,x),h.fromBufferAttribute(i,w),d.fromBufferAttribute(i,C),u.fromBufferAttribute(r,x),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,C),h.sub(l),d.sub(l),p.sub(u),g.sub(u);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[x].add(M),o[w].add(M),o[C].add(M),c[x].add(m),c[w].add(m),c[C].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let x=0,w=S.length;x<w;++x){let C=S[x],P=C.start,D=C.count;for(let W=P,q=P+D;W<q;W+=3)f(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let T=new F,v=new F,E=new F,b=new F;function R(x){E.fromBufferAttribute(s,x),b.copy(E);let w=o[x];T.copy(w),T.sub(E.multiplyScalar(E.dot(w))).normalize(),v.crossVectors(b,w);let P=v.dot(c[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,P)}for(let x=0,w=S.length;x<w;++x){let C=S[x],P=C.start,D=C.count;for(let W=P,q=P+D;W<q;W+=3)R(e.getX(W+0)),R(e.getX(W+1)),R(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);let s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,h=new F,d=new F;if(e)for(let u=0,p=e.count;u<p;u+=3){let g=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,M),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h),p=0,g=0;for(let M=0,m=c.length;M<m;M++){o.isInterleavedBufferAttribute?p=c[M]*o.data.stride+o.offset:p=c[M]*h;for(let f=0;f<h;f++)u[g++]=l[p++]}return new dn(u,h,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,i);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let u=l[h],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ep=0,di=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Xs(),this.name="",this.type="Material",this.blending=Zi,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ua,this.blendDst=Fa,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(i.blending=this.blending),this.side!==hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ua&&(i.blendSrc=this.blendSrc),this.blendDst!==Fa&&(i.blendDst=this.blendDst),this.blendEquation!==Pi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ji&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ue().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ci=new F,il=new F,ya=new F,Ai=new F,sl=new F,va=new F,rl=new F,Sr=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){il.copy(e).add(t).multiplyScalar(.5),ya.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(il);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ya),o=Ai.dot(this.direction),c=-Ai.dot(ya),l=Ai.lengthSq(),h=Math.abs(1-a*a),d,u,p,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){let M=1/h;d*=M,u*=M,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(il).addScaledVector(ya,u),p}intersectSphere(e,t){ci.subVectors(e.center,this.origin);let i=ci.dot(this.direction),s=ci.dot(ci)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,i,s,r){sl.subVectors(t,e),va.subVectors(i,e),rl.crossVectors(sl,va);let a=this.direction.dot(rl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ai.subVectors(this.origin,e);let c=o*this.direction.dot(va.crossVectors(Ai,va));if(c<0)return null;let l=o*this.direction.dot(sl.cross(Ai));if(l<0||c+l>a)return null;let h=-o*Ai.dot(rl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},br=class extends di{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},jh=new mt,Xi=new Sr,Ma=new ji,Qh=new F,Sa=new F,ba=new F,wa=new F,al=new F,Ea=new F,eu=new F,Ta=new F,tt=class extends Dt{constructor(e=new Zt,t=new br){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ea.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(al.fromBufferAttribute(d,e),a?Ea.addScaledVector(al,h):Ea.addScaledVector(al.sub(t),h))}t.add(Ea)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ma.copy(i.boundingSphere),Ma.applyMatrix4(r),Xi.copy(e.ray).recast(e.near),!(Ma.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Ma,Qh)===null||Xi.origin.distanceToSquared(Qh)>(e.far-e.near)**2))&&(jh.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(jh),!(i.boundingBox!==null&&Xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){let m=u[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,E=T;v<E;v+=3){let b=o.getX(v),R=o.getX(v+1),x=o.getX(v+2);s=Aa(this,f,e,i,l,h,d,b,R,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let m=g,f=M;m<f;m+=3){let S=o.getX(m),T=o.getX(m+1),v=o.getX(m+2);s=Aa(this,a,e,i,l,h,d,S,T,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){let m=u[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,E=T;v<E;v+=3){let b=v,R=v+1,x=v+2;s=Aa(this,f,e,i,l,h,d,b,R,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),M=Math.min(c.count,p.start+p.count);for(let m=g,f=M;m<f;m+=3){let S=m,T=m+1,v=m+2;s=Aa(this,a,e,i,l,h,d,S,T,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function tp(n,e,t,i,s,r,a,o){let c;if(e.side===tn?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===hi,o),c===null)return null;Ta.copy(o),Ta.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Ta);return l<t.near||l>t.far?null:{distance:l,point:Ta.clone(),object:n}}function Aa(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,Sa),n.getVertexPosition(c,ba),n.getVertexPosition(l,wa);let h=tp(n,e,t,i,Sa,ba,wa,eu);if(h){let d=new F;Ci.getBarycoord(eu,Sa,ba,wa,d),s&&(h.uv=Ci.getInterpolatedAttribute(s,o,c,l,d,new Oe)),r&&(h.uv1=Ci.getInterpolatedAttribute(r,o,c,l,d,new Oe)),a&&(h.normal=Ci.getInterpolatedAttribute(a,o,c,l,d,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new F,materialIndex:0};Ci.getNormal(Sa,ba,wa,u.normal),h.face=u,h.barycoord=d}return h}var Ja=class extends rn{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Bt,h=Bt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ol=new F,np=new F,ip=new Fe,Xn=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=ol.subVectors(i,t).cross(np.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(ol),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||ip.getNormalMatrix(e),s=this.coplanarPoint(ol).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},qi=new ji,sp=new Oe(.5,.5),Ra=new F,Bs=class{constructor(e=new Xn,t=new Xn,i=new Xn,s=new Xn,r=new Xn,a=new Xn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Pn,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],M=r[9],m=r[10],f=r[11],S=r[12],T=r[13],v=r[14],E=r[15];if(s[0].setComponents(l-a,p-h,f-g,E-S).normalize(),s[1].setComponents(l+a,p+h,f+g,E+S).normalize(),s[2].setComponents(l+o,p+d,f+M,E+T).normalize(),s[3].setComponents(l-o,p-d,f-M,E-T).normalize(),i)s[4].setComponents(c,u,m,v).normalize(),s[5].setComponents(l-c,p-u,f-m,E-v).normalize();else if(s[4].setComponents(l-c,p-u,f-m,E-v).normalize(),t===Pn)s[5].setComponents(l+c,p+u,f+m,E+v).normalize();else if(t===Ns)s[5].setComponents(c,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){qi.center.set(0,0,0);let t=sp.distanceTo(e.center);return qi.radius=.7071067811865476+t,qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Ra.x=s.normal.x>0?e.max.x:e.min.x,Ra.y=s.normal.y>0?e.max.y:e.min.y,Ra.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ra)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var wr=class extends di{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ka=new F,ja=new F,tu=new mt,lr=new Sr,Ca=new ji,cl=new F,nu=new F,Qa=class extends Dt{constructor(e=new Zt,t=new wr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ka.fromBufferAttribute(t,s-1),ja.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ka.distanceTo(ja);e.setAttribute("lineDistance",new st(i,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ca.copy(i.boundingSphere),Ca.applyMatrix4(s),Ca.radius+=r,e.ray.intersectsSphere(Ca)===!1)return;tu.copy(s).invert(),lr.copy(e.ray).applyMatrix4(tu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=p,m=g-1;M<m;M+=l){let f=h.getX(M),S=h.getX(M+1),T=Pa(this,e,lr,c,f,S,M);T&&t.push(T)}if(this.isLineLoop){let M=h.getX(g-1),m=h.getX(p),f=Pa(this,e,lr,c,M,m,g-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=p,m=g-1;M<m;M+=l){let f=Pa(this,e,lr,c,M,M+1,M);f&&t.push(f)}if(this.isLineLoop){let M=Pa(this,e,lr,c,g-1,p,g-1);M&&t.push(M)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Pa(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(Ka.fromBufferAttribute(o,s),ja.fromBufferAttribute(o,r),t.distanceSqToSegment(Ka,ja,cl,nu)>i)return;cl.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(cl);if(!(l<e.near||l>e.far))return{distance:l,point:nu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var iu=new F,su=new F,eo=class extends Qa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)iu.fromBufferAttribute(t,s),su.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+iu.distanceTo(su);e.setAttribute("lineDistance",new st(i,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Er=class extends rn{constructor(e=[],t=Ui,i,s,r,a,o,c,l,h){super(e,t,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var fi=class extends rn{constructor(e,t,i=Nn,s,r,a,o=Bt,c=Bt,l,h=Yn,d=1){if(h!==Yn&&h!==Oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},to=class extends fi{constructor(e,t=Nn,i=Ui,s,r,a=Bt,o=Bt,c,l=Yn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Tr=class extends rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ln=class n extends Zt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(d,2));function g(M,m,f,S,T,v,E,b,R,x,w){let C=v/R,P=E/x,D=v/2,W=E/2,q=b/2,z=R+1,O=x+1,L=0,X=0,te=new F;for(let Q=0;Q<O;Q++){let ce=Q*P-W;for(let ye=0;ye<z;ye++){let Xe=ye*C-D;te[M]=Xe*S,te[m]=ce*T,te[f]=q,l.push(te.x,te.y,te.z),te[M]=0,te[m]=0,te[f]=b>0?1:-1,h.push(te.x,te.y,te.z),d.push(ye/R),d.push(1-Q/x),L+=1}}for(let Q=0;Q<x;Q++)for(let ce=0;ce<R;ce++){let ye=u+ce+z*Q,Xe=u+ce+z*(Q+1),dt=u+(ce+1)+z*(Q+1),Ie=u+(ce+1)+z*Q;c.push(ye,Xe,Ie),c.push(Xe,dt,Ie),X+=6}o.addGroup(p,X,w),p+=X,u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Ar=class n extends Zt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],c=[],l=[],h=t/2,d=Math.PI/2*e,u=t,p=2*d+u,g=i*2+r,M=s+1,m=new F,f=new F;for(let S=0;S<=g;S++){let T=0,v=0,E=0,b=0;if(S<=i){let w=S/i,C=w*Math.PI/2;v=-h-e*Math.cos(C),E=e*Math.sin(C),b=-e*Math.cos(C),T=w*d}else if(S<=i+r){let w=(S-i)/r;v=-h+w*t,E=e,b=0,T=d+w*u}else{let w=(S-i-r)/i,C=w*Math.PI/2;v=h+e*Math.sin(C),E=e*Math.cos(C),b=e*Math.sin(C),T=d+u+w*d}let R=Math.max(0,Math.min(1,T/p)),x=0;S===0?x=.5/s:S===g&&(x=-.5/s);for(let w=0;w<=s;w++){let C=w/s,P=C*Math.PI*2,D=Math.sin(P),W=Math.cos(P);f.x=-E*W,f.y=v,f.z=E*D,o.push(f.x,f.y,f.z),m.set(-E*W,b,E*D),m.normalize(),c.push(m.x,m.y,m.z),l.push(C+x,R)}if(S>0){let w=(S-1)*M;for(let C=0;C<s;C++){let P=w+C,D=w+C+1,W=S*M+C,q=S*M+C+1;a.push(P,D,W),a.push(D,q,W)}}}this.setIndex(a),this.setAttribute("position",new st(o,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var Qi=class n extends Zt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],g=0,M=[],m=i/2,f=0;S(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(p,2));function S(){let v=new F,E=new F,b=0,R=(t-e)/i;for(let x=0;x<=r;x++){let w=[],C=x/r,P=C*(t-e)+e;for(let D=0;D<=s;D++){let W=D/s,q=W*c+o,z=Math.sin(q),O=Math.cos(q);E.x=P*z,E.y=-C*i+m,E.z=P*O,d.push(E.x,E.y,E.z),v.set(z,R,O).normalize(),u.push(v.x,v.y,v.z),p.push(W,1-C),w.push(g++)}M.push(w)}for(let x=0;x<s;x++)for(let w=0;w<r;w++){let C=M[w][x],P=M[w+1][x],D=M[w+1][x+1],W=M[w][x+1];(e>0||w!==0)&&(h.push(C,P,W),b+=3),(t>0||w!==r-1)&&(h.push(P,D,W),b+=3)}l.addGroup(f,b,0),f+=b}function T(v){let E=g,b=new Oe,R=new F,x=0,w=v===!0?e:t,C=v===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,m*C,0),u.push(0,C,0),p.push(.5,.5),g++;let P=g;for(let D=0;D<=s;D++){let q=D/s*c+o,z=Math.cos(q),O=Math.sin(q);R.x=w*O,R.y=m*C,R.z=w*z,d.push(R.x,R.y,R.z),u.push(0,C,0),b.x=z*.5+.5,b.y=O*.5*C+.5,p.push(b.x,b.y),g++}for(let D=0;D<s;D++){let W=E+D,q=P+D;v===!0?h.push(q,q+1,W):h.push(q+1,q,W),x+=3}l.addGroup(f,x,v===!0?1:2),f+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Rr=class n extends Zt{constructor(e=[new Oe(0,-.5),new Oe(.5,0),new Oe(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=Ge(s,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,d=new F,u=new Oe,p=new F,g=new F,M=new F,m=0,f=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:m=e[S+1].x-e[S].x,f=e[S+1].y-e[S].y,p.x=f*1,p.y=-m,p.z=f*0,M.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(M.x,M.y,M.z);break;default:m=e[S+1].x-e[S].x,f=e[S+1].y-e[S].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=M.x,p.y+=M.y,p.z+=M.z,p.normalize(),c.push(p.x,p.y,p.z),M.copy(g)}for(let S=0;S<=t;S++){let T=i+S*h*s,v=Math.sin(T),E=Math.cos(T);for(let b=0;b<=e.length-1;b++){d.x=e[b].x*v,d.y=e[b].y,d.z=e[b].x*E,a.push(d.x,d.y,d.z),u.x=S/t,u.y=b/(e.length-1),o.push(u.x,u.y);let R=c[3*b+0]*v,x=c[3*b+1],w=c[3*b+0]*E;l.push(R,x,w)}}for(let S=0;S<t;S++)for(let T=0;T<e.length-1;T++){let v=T+S*e.length,E=v,b=v+e.length,R=v+e.length+1,x=v+1;r.push(E,b,x),r.push(R,x,b)}this.setIndex(r),this.setAttribute("position",new st(a,3)),this.setAttribute("uv",new st(o,2)),this.setAttribute("normal",new st(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.points,e.segments,e.phiStart,e.phiLength)}};var es=class n extends Zt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,p=[],g=[],M=[],m=[];for(let f=0;f<h;f++){let S=f*u-a;for(let T=0;T<l;T++){let v=T*d-r;g.push(v,-S,0),M.push(0,0,1),m.push(T/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<o;S++){let T=S+l*f,v=S+l*(f+1),E=S+1+l*(f+1),b=S+1+l*f;p.push(T,v,b),p.push(v,E,b)}this.setIndex(p),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(M,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var pi=class n extends Zt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new F,u=new F,p=[],g=[],M=[],m=[];for(let f=0;f<=i;f++){let S=[],T=f/i,v=a+T*o,E=e*Math.cos(v),b=Math.sqrt(e*e-E*E),R=0;f===0&&a===0?R=.5/t:f===i&&c===Math.PI&&(R=-.5/t);for(let x=0;x<=t;x++){let w=x/t,C=s+w*r;d.x=-b*Math.cos(C),d.y=E,d.z=b*Math.sin(C),g.push(d.x,d.y,d.z),u.copy(d).normalize(),M.push(u.x,u.y,u.z),m.push(w+R,1-T),S.push(l++)}h.push(S)}for(let f=0;f<i;f++)for(let S=0;S<t;S++){let T=h[f][S+1],v=h[f][S],E=h[f+1][S],b=h[f+1][S+1];(f!==0||a>0)&&p.push(T,v,b),(f!==i-1||c<Math.PI)&&p.push(v,E,b)}this.setIndex(p),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(M,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function is(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(ru(s))s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(ru(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Jt(n){let e={};for(let t=0;t<n.length;t++){let i=is(n[t]);for(let s in i)e[s]=i[s]}return e}function ru(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function rp(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Hl(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}var Yu={clone:is,merge:Jt},ap=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pn=class extends di{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ap,this.fragmentShader=op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=is(e.uniforms),this.uniformsGroups=rp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ue().setHex(s.value);break;case"v2":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"v3":this.uniforms[i].value=new F().fromArray(s.value);break;case"v4":this.uniforms[i].value=new gt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Fe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new mt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},no=class extends pn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},an=class extends di{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cr=class extends an{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var io=class extends di{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},so=class extends di{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ia(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var Li=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ro=class extends Li{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ul,endingEnd:ul}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case dl:r=e,o=2*t-i;break;case fl:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case dl:a=e,c=2*i-t;break;case fl:a=1,c=i+s[1]-s[0];break;default:a=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(i-t)/(s-t),M=g*g,m=M*g,f=-u*m+2*u*M-u*g,S=(1+u)*m+(-1.5-2*u)*M+(-.5+u)*g+1,T=(-1-p)*m+(1.5+p)*M+.5*g,v=p*m-p*M;for(let E=0;E!==o;++E)r[E]=f*a[h+E]+S*a[l+E]+T*a[c+E]+v*a[d+E];return r}},ao=class extends Li{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(i-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}},oo=class extends Li{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},co=class extends Li{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(i-t)/(s-t),M=1-g;for(let m=0;m!==o;++m)r[m]=a[l+m]*M+a[c+m]*g;return r}let u=o*2,p=e-1;for(let g=0;g!==o;++g){let M=a[l+g],m=a[c+g],f=p*u+g*2,S=d[f],T=d[f+1],v=e*u+g*2,E=h[v],b=h[v+1],R=(i-t)/(s-t),x,w,C,P,D;for(let W=0;W<8;W++){x=R*R,w=x*R,C=1-R,P=C*C,D=P*C;let z=D*t+3*P*R*S+3*C*x*E+w*s-i;if(Math.abs(z)<1e-10)break;let O=3*P*(S-t)+6*C*R*(E-S)+3*x*(s-E);if(Math.abs(O)<1e-10)break;R=R-z/O,R=Math.max(0,Math.min(1,R))}r[g]=D*M+3*P*R*T+3*C*x*b+w*m}return r}},mn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ia(t,this.TimeBufferType),this.values=Ia(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ia(e.times,Array),values:Ia(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new co(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case dr:t=this.InterpolantFactoryMethodDiscrete;break;case qa:t=this.InterpolantFactoryMethodLinear;break;case Na:t=this.InterpolantFactoryMethodSmooth;break;case hl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Re("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dr;case this.InterpolantFactoryMethodLinear:return qa;case this.InterpolantFactoryMethodSmooth:return Na;case this.InterpolantFactoryMethodBezier:return hl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Le("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Le("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Le("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Le("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&wf(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Le("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Na,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*i,u=d-i,p=d+i;for(let g=0;g!==i;++g){let M=t[d+g];if(M!==t[u+g]||M!==t[p+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*i,u=a*i;for(let p=0;p!==i;++p)t[u+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};mn.prototype.ValueTypeName="";mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=qa;var Di=class extends mn{constructor(e,t,i){super(e,t,i)}};Di.prototype.ValueTypeName="bool";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=dr;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var lo=class extends mn{constructor(e,t,i,s){super(e,t,i,s)}};lo.prototype.ValueTypeName="color";var ho=class extends mn{constructor(e,t,i,s){super(e,t,i,s)}};ho.prototype.ValueTypeName="number";var uo=class extends Li{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)Zn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Pr=class extends mn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new uo(this.times,this.values,this.getValueSize(),e)}};Pr.prototype.ValueTypeName="quaternion";Pr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends mn{constructor(e,t,i){super(e,t,i)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=dr;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var fo=class extends mn{constructor(e,t,i,s){super(e,t,i,s)}};fo.prototype.ValueTypeName="vector";var po=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},$u=new po,mo=class{constructor(e){this.manager=e!==void 0?e:$u,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};mo.DEFAULT_MATERIAL_NAME="__DEFAULT";var zs=class extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ir=class extends zs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ll=new mt,au=new F,ou=new F,go=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bs,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;au.setFromMatrixPosition(e.matrixWorld),t.position.copy(au),ou.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ou),t.updateMatrixWorld(),ll.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ns||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ll)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},La=new F,Da=new Zn,Wn=new F,Lr=class extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(La,Da,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(La,Da,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(La,Da,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(La,Da,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ri=new F,cu=new Oe,lu=new Oe,Ht=class extends Lr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ki*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ki*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z)}getViewSize(e,t){return this.getViewBounds(e,cu,lu),t.subVectors(lu,cu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(hr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},gl=class extends go{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=Ki*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ks=class extends zs{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new gl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}};var Vs=class extends Lr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},_l=class extends go{constructor(){super(new Vs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Dr=class extends zs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new _l}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ps=-90,Is=1,_o=class extends Dt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ht(Ps,Is,e,t);s.layers=this.layers,this.add(s);let r=new Ht(Ps,Is,e,t);r.layers=this.layers,this.add(r);let a=new Ht(Ps,Is,e,t);a.layers=this.layers,this.add(a);let o=new Ht(Ps,Is,e,t);o.layers=this.layers,this.add(o);let c=new Ht(Ps,Is,e,t);c.layers=this.layers,this.add(c);let l=new Ht(Ps,Is,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Pn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},xo=class extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Gl="\\[\\]\\.:\\/",cp=new RegExp("["+Gl+"]","g"),Wl="[^"+Gl+"]",lp="[^"+Gl.replace("\\.","")+"]",hp=/((?:WC+[\/:])*)/.source.replace("WC",Wl),up=/(WCOD+)?/.source.replace("WCOD",lp),dp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),fp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),pp=new RegExp("^"+hp+up+dp+fp+"$"),mp=["material","materials","bones","map"],xl=class{constructor(e,t,i){let s=i||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ft=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(cp,"")}static parseTrackName(e){let t=pp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);mp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Le("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ft.Composite=xl;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Dy=new Float32Array(1);var Jl=class Jl{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};Jl.prototype.isMatrix2=!0;var yl=Jl;var Nr=class extends eo{constructor(e=10,t=10,i=4473924,s=8947848){i=new Ue(i),s=new Ue(s);let r=t/2,a=e/t,o=e/2,c=[],l=[];for(let u=0,p=0,g=-o;u<=t;u++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);let M=u===r?i:s;M.toArray(l,p),p+=3,M.toArray(l,p),p+=3,M.toArray(l,p),p+=3,M.toArray(l,p),p+=3}let h=new Zt;h.setAttribute("position",new st(c,3)),h.setAttribute("color",new st(l,3));let d=new wr({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};function Xl(n,e,t,i){let s=gp(i);switch(t){case Fl:return n*e;case Bl:return n*e/s.components*s.byteLength;case To:return n*e/s.components*s.byteLength;case Bi:return n*e*2/s.components*s.byteLength;case Ao:return n*e*2/s.components*s.byteLength;case Ol:return n*e*3/s.components*s.byteLength;case yn:return n*e*4/s.components*s.byteLength;case Ro:return n*e*4/s.components*s.byteLength;case Br:case zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case kr:case Vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Po:case Lo:return Math.max(n,16)*Math.max(e,8)/4;case Co:case Io:return Math.max(n,8)*Math.max(e,8)/2;case Do:case No:case Fo:case Oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Uo:case Hr:case Bo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ko:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Vo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Go:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Xo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case qo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Yo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case $o:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Zo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Jo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case jo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Qo:case ec:case tc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case nc:case ic:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Gr:case sc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gp(n){switch(n){case on:case Ll:return{byteLength:1,components:1};case Gs:case Dl:case jn:return{byteLength:2,components:1};case wo:case Eo:return{byteLength:2,components:4};case Nn:case bo:case Un:return{byteLength:4,components:1};case Nl:case Ul:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function _d(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function _p(n){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,d=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){let h=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){let g=d[u],M=d[p];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,d[u]=M)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){let M=d[p];n.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ep=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ip=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Lp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Vp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Hp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$p="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Kp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,jp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,em=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,am=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,hm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_m=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ym=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Mm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Am=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Rm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Im=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Om=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ym=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$m=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,tg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ng=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ig=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ag=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,og=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ug=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_g=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Eg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Tg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ag=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ug=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Og=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Gg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$g=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:xp,alphahash_pars_fragment:yp,alphamap_fragment:vp,alphamap_pars_fragment:Mp,alphatest_fragment:Sp,alphatest_pars_fragment:bp,aomap_fragment:wp,aomap_pars_fragment:Ep,batching_pars_vertex:Tp,batching_vertex:Ap,begin_vertex:Rp,beginnormal_vertex:Cp,bsdfs:Pp,iridescence_fragment:Ip,bumpmap_pars_fragment:Lp,clipping_planes_fragment:Dp,clipping_planes_pars_fragment:Np,clipping_planes_pars_vertex:Up,clipping_planes_vertex:Fp,color_fragment:Op,color_pars_fragment:Bp,color_pars_vertex:zp,color_vertex:kp,common:Vp,cube_uv_reflection_fragment:Hp,defaultnormal_vertex:Gp,displacementmap_pars_vertex:Wp,displacementmap_vertex:Xp,emissivemap_fragment:qp,emissivemap_pars_fragment:Yp,colorspace_fragment:$p,colorspace_pars_fragment:Zp,envmap_fragment:Jp,envmap_common_pars_fragment:Kp,envmap_pars_fragment:jp,envmap_pars_vertex:Qp,envmap_physical_pars_fragment:hm,envmap_vertex:em,fog_vertex:tm,fog_pars_vertex:nm,fog_fragment:im,fog_pars_fragment:sm,gradientmap_pars_fragment:rm,lightmap_pars_fragment:am,lights_lambert_fragment:om,lights_lambert_pars_fragment:cm,lights_pars_begin:lm,lights_toon_fragment:um,lights_toon_pars_fragment:dm,lights_phong_fragment:fm,lights_phong_pars_fragment:pm,lights_physical_fragment:mm,lights_physical_pars_fragment:gm,lights_fragment_begin:_m,lights_fragment_maps:xm,lights_fragment_end:ym,lightprobes_pars_fragment:vm,logdepthbuf_fragment:Mm,logdepthbuf_pars_fragment:Sm,logdepthbuf_pars_vertex:bm,logdepthbuf_vertex:wm,map_fragment:Em,map_pars_fragment:Tm,map_particle_fragment:Am,map_particle_pars_fragment:Rm,metalnessmap_fragment:Cm,metalnessmap_pars_fragment:Pm,morphinstance_vertex:Im,morphcolor_vertex:Lm,morphnormal_vertex:Dm,morphtarget_pars_vertex:Nm,morphtarget_vertex:Um,normal_fragment_begin:Fm,normal_fragment_maps:Om,normal_pars_fragment:Bm,normal_pars_vertex:zm,normal_vertex:km,normalmap_pars_fragment:Vm,clearcoat_normal_fragment_begin:Hm,clearcoat_normal_fragment_maps:Gm,clearcoat_pars_fragment:Wm,iridescence_pars_fragment:Xm,opaque_fragment:qm,packing:Ym,premultiplied_alpha_fragment:$m,project_vertex:Zm,dithering_fragment:Jm,dithering_pars_fragment:Km,roughnessmap_fragment:jm,roughnessmap_pars_fragment:Qm,shadowmap_pars_fragment:eg,shadowmap_pars_vertex:tg,shadowmap_vertex:ng,shadowmask_pars_fragment:ig,skinbase_vertex:sg,skinning_pars_vertex:rg,skinning_vertex:ag,skinnormal_vertex:og,specularmap_fragment:cg,specularmap_pars_fragment:lg,tonemapping_fragment:hg,tonemapping_pars_fragment:ug,transmission_fragment:dg,transmission_pars_fragment:fg,uv_pars_fragment:pg,uv_pars_vertex:mg,uv_vertex:gg,worldpos_vertex:_g,background_vert:xg,background_frag:yg,backgroundCube_vert:vg,backgroundCube_frag:Mg,cube_vert:Sg,cube_frag:bg,depth_vert:wg,depth_frag:Eg,distance_vert:Tg,distance_frag:Ag,equirect_vert:Rg,equirect_frag:Cg,linedashed_vert:Pg,linedashed_frag:Ig,meshbasic_vert:Lg,meshbasic_frag:Dg,meshlambert_vert:Ng,meshlambert_frag:Ug,meshmatcap_vert:Fg,meshmatcap_frag:Og,meshnormal_vert:Bg,meshnormal_frag:zg,meshphong_vert:kg,meshphong_frag:Vg,meshphysical_vert:Hg,meshphysical_frag:Gg,meshtoon_vert:Wg,meshtoon_frag:Xg,points_vert:qg,points_frag:Yg,shadow_vert:$g,shadow_frag:Zg,sprite_vert:Jg,sprite_frag:Kg},fe={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},ei={basic:{uniforms:Jt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Jt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Jt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Jt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Jt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Jt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Jt([fe.points,fe.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Jt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Jt([fe.common,fe.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Jt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Jt([fe.sprite,fe.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:Jt([fe.common,fe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:Jt([fe.lights,fe.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ei.physical={uniforms:Jt([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};var cc={r:0,b:0,g:0},jg=new mt,xd=new Fe;xd.set(-1,0,0,0,1,0,0,0,1);function Qg(n,e,t,i,s,r){let a=new Ue(0),o=s===!0?0:1,c,l,h=null,d=0,u=null;function p(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){let v=S.backgroundBlurriness>0;T=e.get(T,v)}return T}function g(S){let T=!1,v=p(S);v===null?m(a,o):v&&v.isColor&&(m(v,1),T=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(S,T){let v=p(T);v&&(v.isCubeTexture||v.mapping===Fr)?(l===void 0&&(l=new tt(new Ln(1,1,1),new pn({name:"BackgroundCubeMaterial",uniforms:is(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(jg.makeRotationFromEuler(T.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xd),l.material.toneMapped=Ye.getTransfer(v.colorSpace)!==et,(h!==v||d!==v.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new tt(new es(2,2),new pn({name:"BackgroundMaterial",uniforms:is(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(v.colorSpace)!==et,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,T){S.getRGB(cc,Hl(n)),t.buffers.color.setClear(cc.r,cc.g,cc.b,T,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:M,dispose:f}}function e0(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(P,D,W,q,z){let O=!1,L=d(P,q,W,D);r!==L&&(r=L,l(r.object)),O=p(P,q,W,z),O&&g(P,q,W,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,v(P,D,W,q),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return n.createVertexArray()}function l(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function d(P,D,W,q){let z=q.wireframe===!0,O=i[D.id];O===void 0&&(O={},i[D.id]=O);let L=P.isInstancedMesh===!0?P.id:0,X=O[L];X===void 0&&(X={},O[L]=X);let te=X[W.id];te===void 0&&(te={},X[W.id]=te);let Q=te[z];return Q===void 0&&(Q=u(c()),te[z]=Q),Q}function u(P){let D=[],W=[],q=[];for(let z=0;z<t;z++)D[z]=0,W[z]=0,q[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:W,attributeDivisors:q,object:P,attributes:{},index:null}}function p(P,D,W,q){let z=r.attributes,O=D.attributes,L=0,X=W.getAttributes();for(let te in X)if(X[te].location>=0){let ce=z[te],ye=O[te];if(ye===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(ye=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(ye=P.instanceColor)),ce===void 0||ce.attribute!==ye||ye&&ce.data!==ye.data)return!0;L++}return r.attributesNum!==L||r.index!==q}function g(P,D,W,q){let z={},O=D.attributes,L=0,X=W.getAttributes();for(let te in X)if(X[te].location>=0){let ce=O[te];ce===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor));let ye={};ye.attribute=ce,ce&&ce.data&&(ye.data=ce.data),z[te]=ye,L++}r.attributes=z,r.attributesNum=L,r.index=q}function M(){let P=r.newAttributes;for(let D=0,W=P.length;D<W;D++)P[D]=0}function m(P){f(P,0)}function f(P,D){let W=r.newAttributes,q=r.enabledAttributes,z=r.attributeDivisors;W[P]=1,q[P]===0&&(n.enableVertexAttribArray(P),q[P]=1),z[P]!==D&&(n.vertexAttribDivisor(P,D),z[P]=D)}function S(){let P=r.newAttributes,D=r.enabledAttributes;for(let W=0,q=D.length;W<q;W++)D[W]!==P[W]&&(n.disableVertexAttribArray(W),D[W]=0)}function T(P,D,W,q,z,O,L){L===!0?n.vertexAttribIPointer(P,D,W,z,O):n.vertexAttribPointer(P,D,W,q,z,O)}function v(P,D,W,q){M();let z=q.attributes,O=W.getAttributes(),L=D.defaultAttributeValues;for(let X in O){let te=O[X];if(te.location>=0){let Q=z[X];if(Q===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor)),Q!==void 0){let ce=Q.normalized,ye=Q.itemSize,Xe=e.get(Q);if(Xe===void 0)continue;let dt=Xe.buffer,Ie=Xe.type,Z=Xe.bytesPerElement,ae=Ie===n.INT||Ie===n.UNSIGNED_INT||Q.gpuType===bo;if(Q.isInterleavedBufferAttribute){let ne=Q.data,Ne=ne.stride,Be=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let Ce=0;Ce<te.locationSize;Ce++)f(te.location+Ce,ne.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ce=0;Ce<te.locationSize;Ce++)m(te.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,dt);for(let Ce=0;Ce<te.locationSize;Ce++)T(te.location+Ce,ye/te.locationSize,Ie,ce,Ne*Z,(Be+ye/te.locationSize*Ce)*Z,ae)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<te.locationSize;ne++)f(te.location+ne,Q.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<te.locationSize;ne++)m(te.location+ne);n.bindBuffer(n.ARRAY_BUFFER,dt);for(let ne=0;ne<te.locationSize;ne++)T(te.location+ne,ye/te.locationSize,Ie,ce,ye*Z,ye/te.locationSize*ne*Z,ae)}}else if(L!==void 0){let ce=L[X];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(te.location,ce);break;case 3:n.vertexAttrib3fv(te.location,ce);break;case 4:n.vertexAttrib4fv(te.location,ce);break;default:n.vertexAttrib1fv(te.location,ce)}}}}S()}function E(){w();for(let P in i){let D=i[P];for(let W in D){let q=D[W];for(let z in q){let O=q[z];for(let L in O)h(O[L].object),delete O[L];delete q[z]}}delete i[P]}}function b(P){if(i[P.id]===void 0)return;let D=i[P.id];for(let W in D){let q=D[W];for(let z in q){let O=q[z];for(let L in O)h(O[L].object),delete O[L];delete q[z]}}delete i[P.id]}function R(P){for(let D in i){let W=i[D];for(let q in W){let z=W[q];if(z[P.id]===void 0)continue;let O=z[P.id];for(let L in O)h(O[L].object),delete O[L];delete z[P.id]}}}function x(P){for(let D in i){let W=i[D],q=P.isInstancedMesh===!0?P.id:0,z=W[q];if(z!==void 0){for(let O in z){let L=z[O];for(let X in L)h(L[X].object),delete L[X];delete z[O]}delete W[q],Object.keys(W).length===0&&delete i[D]}}}function w(){C(),a=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:M,enableAttribute:m,disableUnusedAttributes:S}}function t0(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function n0(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==yn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let x=R===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==on&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Un&&!x)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Re("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:v,maxSamples:E,samples:b}}function i0(n){let e=this,t=null,i=0,s=!1,r=!1,a=new Xn,o=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){let g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let S=r?0:i,T=S*4,v=f.clippingState||null;c.value=v,v=h(g,u,T,p);for(let E=0;E!==T;++E)v[E]=t[E];f.clippingState=v,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,g){let M=d!==null?d.length:0,m=null;if(M!==0){if(m=c.value,g!==!0||m===null){let f=p+M*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,v=p;T!==M;++T,v+=4)a.copy(d[T]).applyMatrix4(S,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}var ki=4,Zu=[.125,.215,.35,.446,.526,.582],ss=20,s0=256,Wr=new Vs,Ju=new Ue,Kl=null,jl=0,Ql=0,eh=!1,r0=new F,hc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=r0}=r;Kl=this._renderer.getRenderTarget(),jl=this._renderer.getActiveCubeFace(),Ql=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kl,jl,Ql),this._renderer.xr.enabled=eh,e.scissorTest=!1,qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kl=this._renderer.getRenderTarget(),jl=this._renderer.getActiveCubeFace(),Ql=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:jn,format:yn,colorSpace:fr,depthBuffer:!1},s=Ku(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ku(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=a0(r)),this._blurMaterial=c0(r,e,t),this._ggxMaterial=o0(r,e,t)}return s}_compileMaterial(e){let t=new tt(new Zt,e);this._renderer.compile(t,Wr)}_sceneToCubeUV(e,t,i,s,r){let c=new Ht(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Ju),d.toneMapping=Dn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new tt(new Ln,new br({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let M=this._backgroundBox,m=M.material,f=!1,S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,f=!0):(m.color.copy(Ju),f=!0);for(let T=0;T<6;T++){let v=T%3;v===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[T],r.y,r.z)):v===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[T]));let E=this._cubeSize;qs(s,v*E,T>2?E:0,E,E),d.setRenderTarget(s),f&&d.render(M,c),d.render(e,c)}d.toneMapping=p,d.autoClear=u,e.background=S}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Ui||e.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ju());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;qs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Wr)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,p=d*u,{_lodMax:g}=this,M=this._sizeLods[i],m=3*M*(i>g-ki?i-g+ki:0),f=4*(this._cubeSize-M);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,qs(r,m,f,3*M,2*M),s.setRenderTarget(r),s.render(o,Wr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,qs(e,m,f,3*M,2*M),s.setRenderTarget(e),s.render(o,Wr)}_blur(e,t,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Le("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=l;let u=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ss-1),M=r/g,m=isFinite(r)?1+Math.floor(h*M):ss;m>ss&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ss}`);let f=[],S=0;for(let R=0;R<ss;++R){let x=R/M,w=Math.exp(-x*x/2);f.push(w),R===0?S+=w:R<m&&(S+=2*w)}for(let R=0;R<f.length;R++)f[R]=f[R]/S;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:T}=this;u.dTheta.value=g,u.mipInt.value=T-i;let v=this._sizeLods[s],E=3*v*(s>T-ki?s-T+ki:0),b=4*(this._cubeSize-v);qs(t,E,b,3*v,2*v),c.setRenderTarget(t),c.render(d,Wr)}};function a0(n){let e=[],t=[],i=[],s=n,r=n-ki+1+Zu.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>n-ki?c=Zu[a-n+ki-1]:a===0&&(c=0),t.push(c);let l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,M=3,m=2,f=1,S=new Float32Array(M*g*p),T=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let b=0;b<p;b++){let R=b%3*2/3-1,x=b>2?0:-1,w=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];S.set(w,M*g*b),T.set(u,m*g*b);let C=[b,b,b,b,b,b];v.set(C,f*g*b)}let E=new Zt;E.setAttribute("position",new dn(S,M)),E.setAttribute("uv",new dn(T,m)),E.setAttribute("faceIndex",new dn(v,f)),i.push(new tt(E,null)),s>ki&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ku(n,e,t){let i=new fn(n,e,t);return i.texture.mapping=Fr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function o0(n,e,t){return new pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:s0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function c0(n,e,t){let i=new Float32Array(ss),s=new F(0,1,0);return new pn({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function ju(){return new pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Qu(){return new pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function pc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var uc=class extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Er(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ln(5,5,5),r=new pn({name:"CubemapFromEquirect",uniforms:is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:Kn});r.uniforms.tEquirect.value=t;let a=new tt(s,r),o=t.minFilter;return t.minFilter===Fi&&(t.minFilter=Gt),new _o(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function l0(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===vo||p===Mo)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let M=new uc(g.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",l),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let p=u.mapping,g=p===vo||p===Mo,M=p===Ui||p===ns;if(g||M){let m=t.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new hc(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let S=u.image;return g&&S&&S.height>0||M&&S&&c(S)?(i===null&&(i=new hc(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===vo?u.mapping=Ui:p===Mo&&(u.mapping=ns),u}function c(u){let p=0,g=6;for(let M=0;M<g;M++)u[M]!==void 0&&p++;return p===g}function l(u){let p=u.target;p.removeEventListener("dispose",l);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function h0(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&$i("WebGLRenderer: "+i+" extension not supported."),s}}}function u0(n,e,t,i){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){let u=d.attributes;for(let p in u)e.update(u[p],n.ARRAY_BUFFER)}function l(d){let u=[],p=d.index,g=d.attributes.position,M=0;if(g===void 0)return;if(p!==null){let S=p.array;M=p.version;for(let T=0,v=S.length;T<v;T+=3){let E=S[T+0],b=S[T+1],R=S[T+2];u.push(E,b,b,R,R,E)}}else{let S=g.array;M=g.version;for(let T=0,v=S.length/3-1;T<v;T+=3){let E=T+0,b=T+1,R=T+2;u.push(E,b,b,R,R,E)}}let m=new(g.count>=65535?Mr:vr)(u,1);m.version=M;let f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function d0(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){n.drawElements(i,u,r,d*a),t.update(u,i,1)}function l(d,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,d*a,p),t.update(u,i,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,p);let M=0;for(let m=0;m<p;m++)M+=u[m];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function f0(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Le("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function p0(n,e,t){let i=new WeakMap,s=new gt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let w=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),M===!0&&(T=3);let v=o.attributes.position.count*T,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let b=new Float32Array(v*E*4*d),R=new gr(b,v,E,d);R.type=Un,R.needsUpdate=!0;let x=T*4;for(let C=0;C<d;C++){let P=m[C],D=f[C],W=S[C],q=v*E*4*C;for(let z=0;z<P.count;z++){let O=z*x;p===!0&&(s.fromBufferAttribute(P,z),b[q+O+0]=s.x,b[q+O+1]=s.y,b[q+O+2]=s.z,b[q+O+3]=0),g===!0&&(s.fromBufferAttribute(D,z),b[q+O+4]=s.x,b[q+O+5]=s.y,b[q+O+6]=s.z,b[q+O+7]=0),M===!0&&(s.fromBufferAttribute(W,z),b[q+O+8]=s.x,b[q+O+9]=s.y,b[q+O+10]=s.z,b[q+O+11]=W.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new Oe(v,E)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<l.length;M++)p+=l[M];let g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function m0(n,e,t,i,s){let r=new WeakMap;function a(l){let h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var g0={[El]:"LINEAR_TONE_MAPPING",[Tl]:"REINHARD_TONE_MAPPING",[Al]:"CINEON_TONE_MAPPING",[Ur]:"ACES_FILMIC_TONE_MAPPING",[Cl]:"AGX_TONE_MAPPING",[Pl]:"NEUTRAL_TONE_MAPPING",[Rl]:"CUSTOM_TONE_MAPPING"};function _0(n,e,t,i,s,r){let a=new fn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new fi(e,t):void 0}),o=new fn(e,t,{type:jn,depthBuffer:!1,stencilBuffer:!1}),c=new Zt;c.setAttribute("position",new st([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new st([0,2,0,0,2,0],2));let l=new no({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new tt(c,l),d=new Vs(-1,1,1,-1,0,1),u=null,p=null,g=!1,M,m=null,f=[],S=!1;this.setSize=function(T,v){a.setSize(T,v),o.setSize(T,v);for(let E=0;E<f.length;E++){let b=f[E];b.setSize&&b.setSize(T,v)}},this.setEffects=function(T){f=T,S=f.length>0&&f[0].isRenderPass===!0;let v=a.width,E=a.height;for(let b=0;b<f.length;b++){let R=f[b];R.setSize&&R.setSize(v,E)}},this.begin=function(T,v){if(g||T.toneMapping===Dn&&f.length===0)return!1;if(m=v,v!==null){let E=v.width,b=v.height;(a.width!==E||a.height!==b)&&this.setSize(E,b)}return S===!1&&T.setRenderTarget(a),M=T.toneMapping,T.toneMapping=Dn,!0},this.hasRenderPass=function(){return S},this.end=function(T,v){T.toneMapping=M,g=!0;let E=a,b=o;for(let R=0;R<f.length;R++){let x=f[R];if(x.enabled!==!1&&(x.render(T,b,E,v),x.needsSwap!==!1)){let w=E;E=b,b=w}}if(u!==T.outputColorSpace||p!==T.toneMapping){u=T.outputColorSpace,p=T.toneMapping,l.defines={},Ye.getTransfer(u)===et&&(l.defines.SRGB_TRANSFER="");let R=g0[p];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,T.setRenderTarget(m),T.render(h,d),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}var yd=new rn,ih=new fi(1,1),vd=new gr,Md=new Za,Sd=new Er,ed=[],td=[],nd=new Float32Array(16),id=new Float32Array(9),sd=new Float32Array(4);function $s(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=ed[s];if(r===void 0&&(r=new Float32Array(s),ed[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function mc(n,e){let t=td[e];t===void 0&&(t=new Int32Array(e),td[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function x0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function y0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function v0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function M0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function S0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;sd.set(i),n.uniformMatrix2fv(this.addr,!1,sd),Ut(t,i)}}function b0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;id.set(i),n.uniformMatrix3fv(this.addr,!1,id),Ut(t,i)}}function w0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;nd.set(i),n.uniformMatrix4fv(this.addr,!1,nd),Ut(t,i)}}function E0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function T0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function A0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function R0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function C0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function P0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function I0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function L0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function D0(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ih.compareFunction=t.isReversedDepthBuffer()?oc:ac,r=ih):r=yd,t.setTexture2D(e||r,s)}function N0(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Md,s)}function U0(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Sd,s)}function F0(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||vd,s)}function O0(n){switch(n){case 5126:return x0;case 35664:return y0;case 35665:return v0;case 35666:return M0;case 35674:return S0;case 35675:return b0;case 35676:return w0;case 5124:case 35670:return E0;case 35667:case 35671:return T0;case 35668:case 35672:return A0;case 35669:case 35673:return R0;case 5125:return C0;case 36294:return P0;case 36295:return I0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return N0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return F0}}function B0(n,e){n.uniform1fv(this.addr,e)}function z0(n,e){let t=$s(e,this.size,2);n.uniform2fv(this.addr,t)}function k0(n,e){let t=$s(e,this.size,3);n.uniform3fv(this.addr,t)}function V0(n,e){let t=$s(e,this.size,4);n.uniform4fv(this.addr,t)}function H0(n,e){let t=$s(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function G0(n,e){let t=$s(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function W0(n,e){let t=$s(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function X0(n,e){n.uniform1iv(this.addr,e)}function q0(n,e){n.uniform2iv(this.addr,e)}function Y0(n,e){n.uniform3iv(this.addr,e)}function $0(n,e){n.uniform4iv(this.addr,e)}function Z0(n,e){n.uniform1uiv(this.addr,e)}function J0(n,e){n.uniform2uiv(this.addr,e)}function K0(n,e){n.uniform3uiv(this.addr,e)}function j0(n,e){n.uniform4uiv(this.addr,e)}function Q0(n,e,t){let i=this.cache,s=e.length,r=mc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ih:a=yd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function e_(n,e,t){let i=this.cache,s=e.length,r=mc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Md,r[a])}function t_(n,e,t){let i=this.cache,s=e.length,r=mc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Sd,r[a])}function n_(n,e,t){let i=this.cache,s=e.length,r=mc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||vd,r[a])}function i_(n){switch(n){case 5126:return B0;case 35664:return z0;case 35665:return k0;case 35666:return V0;case 35674:return H0;case 35675:return G0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return q0;case 35668:case 35672:return Y0;case 35669:case 35673:return $0;case 5125:return Z0;case 36294:return J0;case 36295:return K0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return Q0;case 35679:case 36299:case 36307:return e_;case 35680:case 36300:case 36308:case 36293:return t_;case 36289:case 36303:case 36311:case 36292:return n_}}var sh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=O0(t.type)}},rh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=i_(t.type)}},ah=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},th=/(\w+)(\])?(\[|\.)?/g;function rd(n,e){n.seq.push(e),n.map[e.id]=e}function s_(n,e,t){let i=n.name,s=i.length;for(th.lastIndex=0;;){let r=th.exec(i),a=th.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){rd(t,l===void 0?new sh(o,n,e):new rh(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new ah(o),rd(t,d)),t=d}}}var Ys=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);s_(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function ad(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var r_=37297,a_=0;function o_(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var od=new Fe;function c_(n){Ye._getMatrix(od,Ye.workingColorSpace,n);let e=`mat3( ${od.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case pr:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function cd(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+o_(n.getShaderSource(e),o)}else return r}function l_(n,e){let t=c_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var h_={[El]:"Linear",[Tl]:"Reinhard",[Al]:"Cineon",[Ur]:"ACESFilmic",[Cl]:"AgX",[Pl]:"Neutral",[Rl]:"Custom"};function u_(n,e){let t=h_[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var lc=new F;function d_(){Ye.getLuminanceCoefficients(lc);let n=lc.x.toFixed(4),e=lc.y.toFixed(4),t=lc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function f_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function p_(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function m_(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function qr(n){return n!==""}function ld(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var g_=/^[ \t]*#include +<([\w\d./]+)>/gm;function oh(n){return n.replace(g_,x_)}var __=new Map;function x_(n,e){let t=Ve[e];if(t===void 0){let i=__.get(e);if(i!==void 0)t=Ve[i],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return oh(t)}var y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ud(n){return n.replace(y_,v_)}function v_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function dd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var M_={[ts]:"SHADOWMAP_TYPE_PCF",[Hs]:"SHADOWMAP_TYPE_VSM"};function S_(n){return M_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var b_={[Ui]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE",[Fr]:"ENVMAP_TYPE_CUBE_UV"};function w_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":b_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var E_={[ns]:"ENVMAP_MODE_REFRACTION"};function T_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":E_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var A_={[wl]:"ENVMAP_BLENDING_MULTIPLY",[Iu]:"ENVMAP_BLENDING_MIX",[Lu]:"ENVMAP_BLENDING_ADD"};function R_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":A_[n.combine]||"ENVMAP_BLENDING_NONE"}function C_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function P_(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=S_(t),l=w_(t),h=T_(t),d=R_(t),u=C_(t),p=f_(t),g=p_(r),M=s.createProgram(),m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),f.length>0&&(f+=`
`)):(m=[dd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),f=[dd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dn?"#define TONE_MAPPING":"",t.toneMapping!==Dn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Dn?u_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,l_("linearToOutputTexel",t.outputColorSpace),d_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qr).join(`
`)),a=oh(a),a=ld(a,t),a=hd(a,t),o=oh(o),o=ld(o,t),o=hd(o,t),a=ud(a),o=ud(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=S+m+a,v=S+f+o,E=ad(s,s.VERTEX_SHADER,T),b=ad(s,s.FRAGMENT_SHADER,v);s.attachShader(M,E),s.attachShader(M,b),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function R(P){if(n.debug.checkShaderErrors){let D=s.getProgramInfoLog(M)||"",W=s.getShaderInfoLog(E)||"",q=s.getShaderInfoLog(b)||"",z=D.trim(),O=W.trim(),L=q.trim(),X=!0,te=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,b);else{let Q=cd(s,E,"vertex"),ce=cd(s,b,"fragment");Le("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+Q+`
`+ce)}else z!==""?Re("WebGLProgram: Program Info Log:",z):(O===""||L==="")&&(te=!1);te&&(P.diagnostics={runnable:X,programLog:z,vertexShader:{log:O,prefix:m},fragmentShader:{log:L,prefix:f}})}s.deleteShader(E),s.deleteShader(b),x=new Ys(s,M),w=m_(s,M)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(M,r_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=a_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=b,this}var I_=0,ch=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new lh(e),t.set(e,i)),i}},lh=class{constructor(e){this.id=I_++,this.code=e,this.usedTimes=0}};function L_(n){return n===Bi||n===Hr||n===Gr}function D_(n,e,t,i,s,r){let a=new _r,o=new ch,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function M(x,w,C,P,D,W){let q=P.fog,z=D.geometry,O=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,L=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,X=e.get(x.envMap||O,L),te=X&&X.mapping===Fr?X.image.height:null,Q=p[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Re("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let ce=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ye=ce!==void 0?ce.length:0,Xe=0;z.morphAttributes.position!==void 0&&(Xe=1),z.morphAttributes.normal!==void 0&&(Xe=2),z.morphAttributes.color!==void 0&&(Xe=3);let dt,Ie,Z,ae;if(Q){let Me=ei[Q];dt=Me.vertexShader,Ie=Me.fragmentShader}else{dt=x.vertexShader,Ie=x.fragmentShader;let Me=o.getVertexShaderStage(x),vt=o.getFragmentShaderStage(x);o.update(x,Me,vt),Z=Me.id,ae=vt.id}let ne=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),Be=D.isInstancedMesh===!0,Ce=D.isBatchedMesh===!0,Et=!!x.map,qe=!!x.matcap,at=!!X,je=!!x.aoMap,Ze=!!x.lightMap,Rt=!!x.bumpMap&&x.wireframe===!1,Lt=!!x.normalMap,Ft=!!x.displacementMap,Vt=!!x.emissiveMap,yt=!!x.metalnessMap,Ct=!!x.roughnessMap,N=x.anisotropy>0,sn=x.clearcoat>0,nt=x.dispersion>0,A=x.iridescence>0,_=x.sheen>0,B=x.transmission>0,H=N&&!!x.anisotropyMap,Y=sn&&!!x.clearcoatMap,ie=sn&&!!x.clearcoatNormalMap,oe=sn&&!!x.clearcoatRoughnessMap,$=A&&!!x.iridescenceMap,j=A&&!!x.iridescenceThicknessMap,le=_&&!!x.sheenColorMap,we=_&&!!x.sheenRoughnessMap,de=!!x.specularMap,he=!!x.specularColorMap,Ae=!!x.specularIntensityMap,Pe=B&&!!x.transmissionMap,ze=B&&!!x.thicknessMap,I=!!x.gradientMap,re=!!x.alphaMap,K=x.alphaTest>0,ue=!!x.alphaHash,ge=!!x.extensions,ee=Dn;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ee=n.toneMapping);let be={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:dt,fragmentShader:Ie,defines:x.defines,customVertexShaderID:Z,customFragmentShaderID:ae,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Ce,batchingColor:Ce&&D._colorsTexture!==null,instancing:Be,instancingColor:Be&&D.instanceColor!==null,instancingMorph:Be&&D.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Et,matcap:qe,envMap:at,envMapMode:at&&X.mapping,envMapCubeUVHeight:te,aoMap:je,lightMap:Ze,bumpMap:Rt,normalMap:Lt,displacementMap:Ft,emissiveMap:Vt,normalMapObjectSpace:Lt&&x.normalMapType===Uu,normalMapTangentSpace:Lt&&x.normalMapType===rc,packedNormalMap:Lt&&x.normalMapType===rc&&L_(x.normalMap.format),metalnessMap:yt,roughnessMap:Ct,anisotropy:N,anisotropyMap:H,clearcoat:sn,clearcoatMap:Y,clearcoatNormalMap:ie,clearcoatRoughnessMap:oe,dispersion:nt,iridescence:A,iridescenceMap:$,iridescenceThicknessMap:j,sheen:_,sheenColorMap:le,sheenRoughnessMap:we,specularMap:de,specularColorMap:he,specularIntensityMap:Ae,transmission:B,transmissionMap:Pe,thicknessMap:ze,gradientMap:I,opaque:x.transparent===!1&&x.blending===Zi&&x.alphaToCoverage===!1,alphaMap:re,alphaTest:K,alphaHash:ue,combine:x.combine,mapUv:Et&&g(x.map.channel),aoMapUv:je&&g(x.aoMap.channel),lightMapUv:Ze&&g(x.lightMap.channel),bumpMapUv:Rt&&g(x.bumpMap.channel),normalMapUv:Lt&&g(x.normalMap.channel),displacementMapUv:Ft&&g(x.displacementMap.channel),emissiveMapUv:Vt&&g(x.emissiveMap.channel),metalnessMapUv:yt&&g(x.metalnessMap.channel),roughnessMapUv:Ct&&g(x.roughnessMap.channel),anisotropyMapUv:H&&g(x.anisotropyMap.channel),clearcoatMapUv:Y&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:le&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(x.sheenRoughnessMap.channel),specularMapUv:de&&g(x.specularMap.channel),specularColorMapUv:he&&g(x.specularColorMap.channel),specularIntensityMapUv:Ae&&g(x.specularIntensityMap.channel),transmissionMapUv:Pe&&g(x.transmissionMap.channel),thicknessMapUv:ze&&g(x.thicknessMap.channel),alphaMapUv:re&&g(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Lt||N),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!z.attributes.uv&&(Et||re),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&Lt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ne,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Xe,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:Et&&x.map.isVideoTexture===!0&&Ye.getTransfer(x.map.colorSpace)===et,decodeVideoTextureEmissive:Vt&&x.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(x.emissiveMap.colorSpace)===et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Jn,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ge&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&x.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return be.vertexUv1s=c.has(1),be.vertexUv2s=c.has(2),be.vertexUv3s=c.has(3),c.clear(),be}function m(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)w.push(C),w.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(f(w,x),S(w,x),w.push(n.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function S(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function T(x){let w=p[x.type],C;if(w){let P=ei[w];C=Yu.clone(P.uniforms)}else C=x.uniforms;return C}function v(x,w){let C=h.get(w);return C!==void 0?++C.usedTimes:(C=new P_(n,w,x,s),l.push(C),h.set(w,C)),C}function E(x){if(--x.usedTimes===0){let w=l.indexOf(x);l[w]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function R(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:T,acquireProgram:v,releaseProgram:E,releaseShaderCache:b,programs:l,dispose:R}}function N_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function U_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function fd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function pd(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,M,m,f){let S=n[e];return S===void 0?(S={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:f},n[e]=S):(S.id=u.id,S.object=u,S.geometry=p,S.material=g,S.materialVariant=a(u),S.groupOrder=M,S.renderOrder=u.renderOrder,S.z=m,S.group=f),e++,S}function c(u,p,g,M,m,f){let S=o(u,p,g,M,m,f);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):t.push(S)}function l(u,p,g,M,m,f){let S=o(u,p,g,M,m,f);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function h(u,p,g){t.length>1&&t.sort(u||U_),i.length>1&&i.sort(p||fd),s.length>1&&s.sort(p||fd),g&&(t.reverse(),i.reverse(),s.reverse())}function d(){for(let u=e,p=n.length;u<p;u++){let g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function F_(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new pd,n.set(i,[a])):s>=r.length?(a=new pd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function O_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ue};break;case"SpotLight":t={position:new F,direction:new F,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function B_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var z_=0;function k_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function V_(n){let e=new O_,t=B_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);let s=new F,r=new mt,a=new mt;function o(l){let h=0,d=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,M=0,m=0,f=0,S=0,T=0,v=0,E=0,b=0,R=0;l.sort(k_);for(let w=0,C=l.length;w<C;w++){let P=l[w],D=P.color,W=P.intensity,q=P.distance,z=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Bi?z=P.shadow.map.texture:z=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=D.r*W,d+=D.g*W,u+=D.b*W;else if(P.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(P.sh.coefficients[O],W);R++}else if(P.isDirectionalLight){let O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let L=P.shadow,X=t.get(P);X.shadowIntensity=L.intensity,X.shadowBias=L.bias,X.shadowNormalBias=L.normalBias,X.shadowRadius=L.radius,X.shadowMapSize=L.mapSize,i.directionalShadow[p]=X,i.directionalShadowMap[p]=z,i.directionalShadowMatrix[p]=P.shadow.matrix,S++}i.directional[p]=O,p++}else if(P.isSpotLight){let O=e.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(D).multiplyScalar(W),O.distance=q,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,i.spot[M]=O;let L=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,L.updateMatrices(P),P.castShadow&&b++),i.spotLightMatrix[M]=L.matrix,P.castShadow){let X=t.get(P);X.shadowIntensity=L.intensity,X.shadowBias=L.bias,X.shadowNormalBias=L.normalBias,X.shadowRadius=L.radius,X.shadowMapSize=L.mapSize,i.spotShadow[M]=X,i.spotShadowMap[M]=z,v++}M++}else if(P.isRectAreaLight){let O=e.get(P);O.color.copy(D).multiplyScalar(W),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=O,m++}else if(P.isPointLight){let O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),O.distance=P.distance,O.decay=P.decay,P.castShadow){let L=P.shadow,X=t.get(P);X.shadowIntensity=L.intensity,X.shadowBias=L.bias,X.shadowNormalBias=L.normalBias,X.shadowRadius=L.radius,X.shadowMapSize=L.mapSize,X.shadowCameraNear=L.camera.near,X.shadowCameraFar=L.camera.far,i.pointShadow[g]=X,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=P.shadow.matrix,T++}i.point[g]=O,g++}else if(P.isHemisphereLight){let O=e.get(P);O.skyColor.copy(P.color).multiplyScalar(W),O.groundColor.copy(P.groundColor).multiplyScalar(W),i.hemi[f]=O,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let x=i.hash;(x.directionalLength!==p||x.pointLength!==g||x.spotLength!==M||x.rectAreaLength!==m||x.hemiLength!==f||x.numDirectionalShadows!==S||x.numPointShadows!==T||x.numSpotShadows!==v||x.numSpotMaps!==E||x.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=M,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=v+E-b,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=R,x.directionalLength=p,x.pointLength=g,x.spotLength=M,x.rectAreaLength=m,x.hemiLength=f,x.numDirectionalShadows=S,x.numPointShadows=T,x.numSpotShadows=v,x.numSpotMaps=E,x.numLightProbes=R,i.version=z_++)}function c(l,h){let d=0,u=0,p=0,g=0,M=0,m=h.matrixWorldInverse;for(let f=0,S=l.length;f<S;f++){let T=l[f];if(T.isDirectionalLight){let v=i.directional[d];v.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(T.isSpotLight){let v=i.spot[p];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(T.isRectAreaLight){let v=i.rectArea[g];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(T.width*.5,0,0),v.halfHeight.set(0,T.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){let v=i.point[u];v.position.setFromMatrixPosition(T.matrixWorld),v.position.applyMatrix4(m),u++}else if(T.isHemisphereLight){let v=i.hemi[M];v.direction.setFromMatrixPosition(T.matrixWorld),v.direction.transformDirection(m),M++}}}return{setup:o,setupView:c,state:i}}function md(n){let e=new V_(n),t=[],i=[],s=[];function r(u){d.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function H_(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new md(n),e.set(s,[o])):r>=a.length?(o=new md(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var G_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,W_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,X_=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],q_=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],gd=new mt,Xr=new F,nh=new F;function Y_(n,e,t){let i=new Bs,s=new Oe,r=new Oe,a=new gt,o=new io,c=new so,l={},h=t.maxTextureSize,d={[hi]:tn,[tn]:hi,[Jn]:Jn},u=new pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:G_,fragmentShader:W_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new Zt;g.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new tt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ts;let f=this.type;this.render=function(b,R,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===du&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ts);let w=n.getRenderTarget(),C=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Kn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let W=f!==this.type;W&&R.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(z=>z.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,z=b.length;q<z;q++){let O=b[q],L=O.shadow;if(L===void 0){Re("WebGLShadowMap:",O,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;s.copy(L.mapSize);let X=L.getFrameExtents();s.multiply(X),r.copy(L.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,L.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,L.mapSize.y=r.y));let te=n.state.buffers.depth.getReversed();if(L.camera._reversedDepth=te,L.map===null||W===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Hs){if(O.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new fn(s.x,s.y,{format:Bi,type:jn,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),L.map.texture.name=O.name+".shadowMap",L.map.depthTexture=new fi(s.x,s.y,Un),L.map.depthTexture.name=O.name+".shadowMapDepth",L.map.depthTexture.format=Yn,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Bt,L.map.depthTexture.magFilter=Bt}else O.isPointLight?(L.map=new uc(s.x),L.map.depthTexture=new to(s.x,Nn)):(L.map=new fn(s.x,s.y),L.map.depthTexture=new fi(s.x,s.y,Nn)),L.map.depthTexture.name=O.name+".shadowMap",L.map.depthTexture.format=Yn,this.type===ts?(L.map.depthTexture.compareFunction=te?oc:ac,L.map.depthTexture.minFilter=Gt,L.map.depthTexture.magFilter=Gt):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Bt,L.map.depthTexture.magFilter=Bt);L.camera.updateProjectionMatrix()}let Q=L.map.isWebGLCubeRenderTarget?6:1;for(let ce=0;ce<Q;ce++){if(L.map.isWebGLCubeRenderTarget)n.setRenderTarget(L.map,ce),n.clear();else{ce===0&&(n.setRenderTarget(L.map),n.clear());let ye=L.getViewport(ce);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),D.viewport(a)}if(O.isPointLight){let ye=L.camera,Xe=L.matrix,dt=O.distance||ye.far;dt!==ye.far&&(ye.far=dt,ye.updateProjectionMatrix()),Xr.setFromMatrixPosition(O.matrixWorld),ye.position.copy(Xr),nh.copy(ye.position),nh.add(X_[ce]),ye.up.copy(q_[ce]),ye.lookAt(nh),ye.updateMatrixWorld(),Xe.makeTranslation(-Xr.x,-Xr.y,-Xr.z),gd.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),L._frustum.setFromProjectionMatrix(gd,ye.coordinateSystem,ye.reversedDepth)}else L.updateMatrices(O);i=L.getFrustum(),v(R,x,L.camera,O,this.type)}L.isPointLightShadow!==!0&&this.type===Hs&&S(L,x),L.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,C,P)};function S(b,R){let x=e.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new fn(s.x,s.y,{format:Bi,type:jn})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(R,null,x,u,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(R,null,x,p,M,null)}function T(b,R,x,w){let C=null,P=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)C=P;else if(C=x.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let D=C.uuid,W=R.uuid,q=l[D];q===void 0&&(q={},l[D]=q);let z=q[W];z===void 0&&(z=C.clone(),q[W]=z,R.addEventListener("dispose",E)),C=z}if(C.visible=R.visible,C.wireframe=R.wireframe,w===Hs?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:d[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let D=n.properties.get(C);D.light=x}return C}function v(b,R,x,w,C){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===Hs)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);let W=e.update(b),q=b.material;if(Array.isArray(q)){let z=W.groups;for(let O=0,L=z.length;O<L;O++){let X=z[O],te=q[X.materialIndex];if(te&&te.visible){let Q=T(b,te,w,C);b.onBeforeShadow(n,b,R,x,W,Q,X),n.renderBufferDirect(x,null,W,Q,b,X),b.onAfterShadow(n,b,R,x,W,Q,X)}}}else if(q.visible){let z=T(b,q,w,C);b.onBeforeShadow(n,b,R,x,W,z,null),n.renderBufferDirect(x,null,W,z,b,null),b.onAfterShadow(n,b,R,x,W,z,null)}}let D=b.children;for(let W=0,q=D.length;W<q;W++)v(D[W],R,x,w,C)}function E(b){b.target.removeEventListener("dispose",E);for(let x in l){let w=l[x],C=b.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function $_(n,e){function t(){let I=!1,re=new gt,K=null,ue=new gt(0,0,0,0);return{setMask:function(ge){K!==ge&&!I&&(n.colorMask(ge,ge,ge,ge),K=ge)},setLocked:function(ge){I=ge},setClear:function(ge,ee,be,Me,vt){vt===!0&&(ge*=Me,ee*=Me,be*=Me),re.set(ge,ee,be,Me),ue.equals(re)===!1&&(n.clearColor(ge,ee,be,Me),ue.copy(re))},reset:function(){I=!1,K=null,ue.set(-1,0,0,0)}}}function i(){let I=!1,re=!1,K=null,ue=null,ge=null;return{setReversed:function(ee){if(re!==ee){let be=e.get("EXT_clip_control");ee?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),re=ee;let Me=ge;ge=null,this.setClear(Me)}},getReversed:function(){return re},setTest:function(ee){ee?ne(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(ee){K!==ee&&!I&&(n.depthMask(ee),K=ee)},setFunc:function(ee){if(re&&(ee=Xu[ee]),ue!==ee){switch(ee){case Oa:n.depthFunc(n.NEVER);break;case Ba:n.depthFunc(n.ALWAYS);break;case za:n.depthFunc(n.LESS);break;case Ji:n.depthFunc(n.LEQUAL);break;case ka:n.depthFunc(n.EQUAL);break;case Va:n.depthFunc(n.GEQUAL);break;case Ha:n.depthFunc(n.GREATER);break;case Ga:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=ee}},setLocked:function(ee){I=ee},setClear:function(ee){ge!==ee&&(ge=ee,re&&(ee=1-ee),n.clearDepth(ee))},reset:function(){I=!1,K=null,ue=null,ge=null,re=!1}}}function s(){let I=!1,re=null,K=null,ue=null,ge=null,ee=null,be=null,Me=null,vt=null;return{setTest:function(ht){I||(ht?ne(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(ht){re!==ht&&!I&&(n.stencilMask(ht),re=ht)},setFunc:function(ht,Vn,Hn){(K!==ht||ue!==Vn||ge!==Hn)&&(n.stencilFunc(ht,Vn,Hn),K=ht,ue=Vn,ge=Hn)},setOp:function(ht,Vn,Hn){(ee!==ht||be!==Vn||Me!==Hn)&&(n.stencilOp(ht,Vn,Hn),ee=ht,be=Vn,Me=Hn)},setLocked:function(ht){I=ht},setClear:function(ht){vt!==ht&&(n.clearStencil(ht),vt=ht)},reset:function(){I=!1,re=null,K=null,ue=null,ge=null,ee=null,be=null,Me=null,vt=null}}}let r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap,h={},d={},u={},p=new WeakMap,g=[],M=null,m=!1,f=null,S=null,T=null,v=null,E=null,b=null,R=null,x=new Ue(0,0,0),w=0,C=!1,P=null,D=null,W=null,q=null,z=null,O=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,X=0,te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(te)[1]),L=X>=1):te.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),L=X>=2);let Q=null,ce={},ye=n.getParameter(n.SCISSOR_BOX),Xe=n.getParameter(n.VIEWPORT),dt=new gt().fromArray(ye),Ie=new gt().fromArray(Xe);function Z(I,re,K,ue){let ge=new Uint8Array(4),ee=n.createTexture();n.bindTexture(I,ee),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<K;be++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,ue,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(re+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return ee}let ae={};ae[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),ae[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ae[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(Ji),Rt(!1),Lt(vl),ne(n.CULL_FACE),je(Kn);function ne(I){h[I]!==!0&&(n.enable(I),h[I]=!0)}function Ne(I){h[I]!==!1&&(n.disable(I),h[I]=!1)}function Be(I,re){return u[I]!==re?(n.bindFramebuffer(I,re),u[I]=re,I===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=re),I===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=re),!0):!1}function Ce(I,re){let K=g,ue=!1;if(I){K=p.get(re),K===void 0&&(K=[],p.set(re,K));let ge=I.textures;if(K.length!==ge.length||K[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,be=ge.length;ee<be;ee++)K[ee]=n.COLOR_ATTACHMENT0+ee;K.length=ge.length,ue=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,ue=!0);ue&&n.drawBuffers(K)}function Et(I){return M!==I?(n.useProgram(I),M=I,!0):!1}let qe={[Pi]:n.FUNC_ADD,[pu]:n.FUNC_SUBTRACT,[mu]:n.FUNC_REVERSE_SUBTRACT};qe[gu]=n.MIN,qe[_u]=n.MAX;let at={[xu]:n.ZERO,[yu]:n.ONE,[vu]:n.SRC_COLOR,[Ua]:n.SRC_ALPHA,[Tu]:n.SRC_ALPHA_SATURATE,[wu]:n.DST_COLOR,[Su]:n.DST_ALPHA,[Mu]:n.ONE_MINUS_SRC_COLOR,[Fa]:n.ONE_MINUS_SRC_ALPHA,[Eu]:n.ONE_MINUS_DST_COLOR,[bu]:n.ONE_MINUS_DST_ALPHA,[Au]:n.CONSTANT_COLOR,[Ru]:n.ONE_MINUS_CONSTANT_COLOR,[Cu]:n.CONSTANT_ALPHA,[Pu]:n.ONE_MINUS_CONSTANT_ALPHA};function je(I,re,K,ue,ge,ee,be,Me,vt,ht){if(I===Kn){m===!0&&(Ne(n.BLEND),m=!1);return}if(m===!1&&(ne(n.BLEND),m=!0),I!==fu){if(I!==f||ht!==C){if((S!==Pi||E!==Pi)&&(n.blendEquation(n.FUNC_ADD),S=Pi,E=Pi),ht)switch(I){case Zi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ml:n.blendFunc(n.ONE,n.ONE);break;case Sl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Le("WebGLState: Invalid blending: ",I);break}else switch(I){case Zi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ml:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Sl:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bl:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",I);break}T=null,v=null,b=null,R=null,x.set(0,0,0),w=0,f=I,C=ht}return}ge=ge||re,ee=ee||K,be=be||ue,(re!==S||ge!==E)&&(n.blendEquationSeparate(qe[re],qe[ge]),S=re,E=ge),(K!==T||ue!==v||ee!==b||be!==R)&&(n.blendFuncSeparate(at[K],at[ue],at[ee],at[be]),T=K,v=ue,b=ee,R=be),(Me.equals(x)===!1||vt!==w)&&(n.blendColor(Me.r,Me.g,Me.b,vt),x.copy(Me),w=vt),f=I,C=!1}function Ze(I,re){I.side===Jn?Ne(n.CULL_FACE):ne(n.CULL_FACE);let K=I.side===tn;re&&(K=!K),Rt(K),I.blending===Zi&&I.transparent===!1?je(Kn):je(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let ue=I.stencilWrite;o.setTest(ue),ue&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Vt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(I){P!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),P=I)}function Lt(I){I!==hu?(ne(n.CULL_FACE),I!==D&&(I===vl?n.cullFace(n.BACK):I===uu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),D=I}function Ft(I){I!==W&&(L&&n.lineWidth(I),W=I)}function Vt(I,re,K){I?(ne(n.POLYGON_OFFSET_FILL),(q!==re||z!==K)&&(q=re,z=K,a.getReversed()&&(re=-re),n.polygonOffset(re,K))):Ne(n.POLYGON_OFFSET_FILL)}function yt(I){I?ne(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function Ct(I){I===void 0&&(I=n.TEXTURE0+O-1),Q!==I&&(n.activeTexture(I),Q=I)}function N(I,re,K){K===void 0&&(Q===null?K=n.TEXTURE0+O-1:K=Q);let ue=ce[K];ue===void 0&&(ue={type:void 0,texture:void 0},ce[K]=ue),(ue.type!==I||ue.texture!==re)&&(Q!==K&&(n.activeTexture(K),Q=K),n.bindTexture(I,re||ae[I]),ue.type=I,ue.texture=re)}function sn(){let I=ce[Q];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function nt(){try{n.compressedTexImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function _(){try{n.texSubImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function B(){try{n.texSubImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function ie(){try{n.texStorage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function oe(){try{n.texStorage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function $(){try{n.texImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function j(){try{n.texImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function le(I){return d[I]!==void 0?d[I]:n.getParameter(I)}function we(I,re){d[I]!==re&&(n.pixelStorei(I,re),d[I]=re)}function de(I){dt.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),dt.copy(I))}function he(I){Ie.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Ie.copy(I))}function Ae(I,re){let K=l.get(re);K===void 0&&(K=new WeakMap,l.set(re,K));let ue=K.get(I);ue===void 0&&(ue=n.getUniformBlockIndex(re,I.name),K.set(I,ue))}function Pe(I,re){let ue=l.get(re).get(I);c.get(re)!==ue&&(n.uniformBlockBinding(re,ue,I.__bindingPointIndex),c.set(re,ue))}function ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,ce={},u={},p=new WeakMap,g=[],M=null,m=!1,f=null,S=null,T=null,v=null,E=null,b=null,R=null,x=new Ue(0,0,0),w=0,C=!1,P=null,D=null,W=null,q=null,z=null,dt.set(0,0,n.canvas.width,n.canvas.height),Ie.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:Ne,bindFramebuffer:Be,drawBuffers:Ce,useProgram:Et,setBlending:je,setMaterial:Ze,setFlipSided:Rt,setCullFace:Lt,setLineWidth:Ft,setPolygonOffset:Vt,setScissorTest:yt,activeTexture:Ct,bindTexture:N,unbindTexture:sn,compressedTexImage2D:nt,compressedTexImage3D:A,texImage2D:$,texImage3D:j,pixelStorei:we,getParameter:le,updateUBOMapping:Ae,uniformBlockBinding:Pe,texStorage2D:ie,texStorage3D:oe,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:de,viewport:he,reset:ze}}function Z_(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Oe,h=new WeakMap,d=new Set,u,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(A,_){return g?new OffscreenCanvas(A,_):mr("canvas")}function m(A,_,B){let H=1,Y=nt(A);if((Y.width>B||Y.height>B)&&(H=B/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let ie=Math.floor(H*Y.width),oe=Math.floor(H*Y.height);u===void 0&&(u=M(ie,oe));let $=_?M(ie,oe):u;return $.width=ie,$.height=oe,$.getContext("2d").drawImage(A,0,0,ie,oe),Re("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ie+"x"+oe+")."),$}else return"data"in A&&Re("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),A;return A}function f(A){return A.generateMipmaps}function S(A){n.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(A,_,B,H,Y,ie=!1){if(A!==null){if(n[A]!==void 0)return n[A];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let oe;H&&(oe=e.get("EXT_texture_norm16"),oe||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===n.RED&&(B===n.FLOAT&&($=n.R32F),B===n.HALF_FLOAT&&($=n.R16F),B===n.UNSIGNED_BYTE&&($=n.R8),B===n.UNSIGNED_SHORT&&oe&&($=oe.R16_EXT),B===n.SHORT&&oe&&($=oe.R16_SNORM_EXT)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&($=n.R8UI),B===n.UNSIGNED_SHORT&&($=n.R16UI),B===n.UNSIGNED_INT&&($=n.R32UI),B===n.BYTE&&($=n.R8I),B===n.SHORT&&($=n.R16I),B===n.INT&&($=n.R32I)),_===n.RG&&(B===n.FLOAT&&($=n.RG32F),B===n.HALF_FLOAT&&($=n.RG16F),B===n.UNSIGNED_BYTE&&($=n.RG8),B===n.UNSIGNED_SHORT&&oe&&($=oe.RG16_EXT),B===n.SHORT&&oe&&($=oe.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&($=n.RG8UI),B===n.UNSIGNED_SHORT&&($=n.RG16UI),B===n.UNSIGNED_INT&&($=n.RG32UI),B===n.BYTE&&($=n.RG8I),B===n.SHORT&&($=n.RG16I),B===n.INT&&($=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&($=n.RGB8UI),B===n.UNSIGNED_SHORT&&($=n.RGB16UI),B===n.UNSIGNED_INT&&($=n.RGB32UI),B===n.BYTE&&($=n.RGB8I),B===n.SHORT&&($=n.RGB16I),B===n.INT&&($=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&($=n.RGBA8UI),B===n.UNSIGNED_SHORT&&($=n.RGBA16UI),B===n.UNSIGNED_INT&&($=n.RGBA32UI),B===n.BYTE&&($=n.RGBA8I),B===n.SHORT&&($=n.RGBA16I),B===n.INT&&($=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_SHORT&&oe&&($=oe.RGB16_EXT),B===n.SHORT&&oe&&($=oe.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),_===n.RGBA){let j=ie?pr:Ye.getTransfer(Y);B===n.FLOAT&&($=n.RGBA32F),B===n.HALF_FLOAT&&($=n.RGBA16F),B===n.UNSIGNED_BYTE&&($=j===et?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&oe&&($=oe.RGBA16_EXT),B===n.SHORT&&oe&&($=oe.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function E(A,_){let B;return A?_===null||_===Nn||_===Ws?B=n.DEPTH24_STENCIL8:_===Un?B=n.DEPTH32F_STENCIL8:_===Gs&&(B=n.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Nn||_===Ws?B=n.DEPTH_COMPONENT24:_===Un?B=n.DEPTH_COMPONENT32F:_===Gs&&(B=n.DEPTH_COMPONENT16),B}function b(A,_){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==Bt&&A.minFilter!==Gt?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function R(A){let _=A.target;_.removeEventListener("dispose",R),w(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function x(A){let _=A.target;_.removeEventListener("dispose",x),P(_)}function w(A){let _=i.get(A);if(_.__webglInit===void 0)return;let B=A.source,H=p.get(B);if(H){let Y=H[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&C(A),Object.keys(H).length===0&&p.delete(B)}i.remove(A)}function C(A){let _=i.get(A);n.deleteTexture(_.__webglTexture);let B=A.source,H=p.get(B);delete H[_.__cacheKey],a.memory.textures--}function P(A){let _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let Y=0;Y<_.__webglFramebuffer[H].length;Y++)n.deleteFramebuffer(_.__webglFramebuffer[H][Y]);else n.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)n.deleteFramebuffer(_.__webglFramebuffer[H]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=A.textures;for(let H=0,Y=B.length;H<Y;H++){let ie=i.get(B[H]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(B[H])}i.remove(A)}let D=0;function W(){D=0}function q(){return D}function z(A){D=A}function O(){let A=D;return A>=s.maxTextures&&Re("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),D+=1,A}function L(A){let _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function X(A,_){let B=i.get(A);if(A.isVideoTexture&&N(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&B.__version!==A.version){let H=A.image;if(H===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(B,A,_);return}}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function te(A,_){let B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Ne(B,A,_);return}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function Q(A,_){let B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Ne(B,A,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function ce(A,_){let B=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&B.__version!==A.version){Be(B,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}let ye={[Wa]:n.REPEAT,[qn]:n.CLAMP_TO_EDGE,[Xa]:n.MIRRORED_REPEAT},Xe={[Bt]:n.NEAREST,[Du]:n.NEAREST_MIPMAP_NEAREST,[Or]:n.NEAREST_MIPMAP_LINEAR,[Gt]:n.LINEAR,[So]:n.LINEAR_MIPMAP_NEAREST,[Fi]:n.LINEAR_MIPMAP_LINEAR},dt={[Fu]:n.NEVER,[Vu]:n.ALWAYS,[Ou]:n.LESS,[ac]:n.LEQUAL,[Bu]:n.EQUAL,[oc]:n.GEQUAL,[zu]:n.GREATER,[ku]:n.NOTEQUAL};function Ie(A,_){if(_.type===Un&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Gt||_.magFilter===So||_.magFilter===Or||_.magFilter===Fi||_.minFilter===Gt||_.minFilter===So||_.minFilter===Or||_.minFilter===Fi)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ye[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ye[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ye[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,Xe[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,Xe[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,dt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Bt||_.minFilter!==Or&&_.minFilter!==Fi||_.type===Un&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Z(A,_){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",R));let H=_.source,Y=p.get(H);Y===void 0&&(Y={},p.set(H,Y));let ie=L(_);if(ie!==A.__cacheKey){Y[ie]===void 0&&(Y[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Y[ie].usedTimes++;let oe=Y[A.__cacheKey];oe!==void 0&&(Y[A.__cacheKey].usedTimes--,oe.usedTimes===0&&C(_)),A.__cacheKey=ie,A.__webglTexture=Y[ie].texture}return B}function ae(A,_,B){return Math.floor(Math.floor(A/B)/_)}function ne(A,_,B,H){let ie=A.updateRanges;if(ie.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,H,_.data);else{ie.sort((we,de)=>we.start-de.start);let oe=0;for(let we=1;we<ie.length;we++){let de=ie[oe],he=ie[we],Ae=de.start+de.count,Pe=ae(he.start,_.width,4),ze=ae(de.start,_.width,4);he.start<=Ae+1&&Pe===ze&&ae(he.start+he.count-1,_.width,4)===Pe?de.count=Math.max(de.count,he.start+he.count-de.start):(++oe,ie[oe]=he)}ie.length=oe+1;let $=t.getParameter(n.UNPACK_ROW_LENGTH),j=t.getParameter(n.UNPACK_SKIP_PIXELS),le=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let we=0,de=ie.length;we<de;we++){let he=ie[we],Ae=Math.floor(he.start/4),Pe=Math.ceil(he.count/4),ze=Ae%_.width,I=Math.floor(Ae/_.width),re=Pe,K=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,ze,I,re,K,B,H,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,$),t.pixelStorei(n.UNPACK_SKIP_PIXELS,j),t.pixelStorei(n.UNPACK_SKIP_ROWS,le)}}function Ne(A,_,B){let H=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=n.TEXTURE_3D);let Y=Z(A,_),ie=_.source;t.bindTexture(H,A.__webglTexture,n.TEXTURE0+B);let oe=i.get(ie);if(ie.version!==oe.__version||Y===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let K=Ye.getPrimaries(Ye.workingColorSpace),ue=_.colorSpace===mi?null:Ye.getPrimaries(_.colorSpace),ge=_.colorSpace===mi||K===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let j=m(_.image,!1,s.maxTextureSize);j=sn(_,j);let le=r.convert(_.format,_.colorSpace),we=r.convert(_.type),de=v(_.internalFormat,le,we,_.normalized,_.colorSpace,_.isVideoTexture);Ie(H,_);let he,Ae=_.mipmaps,Pe=_.isVideoTexture!==!0,ze=oe.__version===void 0||Y===!0,I=ie.dataReady,re=b(_,j);if(_.isDepthTexture)de=E(_.format===Oi,_.type),ze&&(Pe?t.texStorage2D(n.TEXTURE_2D,1,de,j.width,j.height):t.texImage2D(n.TEXTURE_2D,0,de,j.width,j.height,0,le,we,null));else if(_.isDataTexture)if(Ae.length>0){Pe&&ze&&t.texStorage2D(n.TEXTURE_2D,re,de,Ae[0].width,Ae[0].height);for(let K=0,ue=Ae.length;K<ue;K++)he=Ae[K],Pe?I&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,he.width,he.height,le,we,he.data):t.texImage2D(n.TEXTURE_2D,K,de,he.width,he.height,0,le,we,he.data);_.generateMipmaps=!1}else Pe?(ze&&t.texStorage2D(n.TEXTURE_2D,re,de,j.width,j.height),I&&ne(_,j,le,we)):t.texImage2D(n.TEXTURE_2D,0,de,j.width,j.height,0,le,we,j.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Pe&&ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,de,Ae[0].width,Ae[0].height,j.depth);for(let K=0,ue=Ae.length;K<ue;K++)if(he=Ae[K],_.format!==yn)if(le!==null)if(Pe){if(I)if(_.layerUpdates.size>0){let ge=Xl(he.width,he.height,_.format,_.type);for(let ee of _.layerUpdates){let be=he.data.subarray(ee*ge/he.data.BYTES_PER_ELEMENT,(ee+1)*ge/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,ee,he.width,he.height,1,le,be)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,he.width,he.height,j.depth,le,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,de,he.width,he.height,j.depth,0,he.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,he.width,he.height,j.depth,le,we,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,de,he.width,he.height,j.depth,0,le,we,he.data)}else{Pe&&ze&&t.texStorage2D(n.TEXTURE_2D,re,de,Ae[0].width,Ae[0].height);for(let K=0,ue=Ae.length;K<ue;K++)he=Ae[K],_.format!==yn?le!==null?Pe?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,he.width,he.height,le,he.data):t.compressedTexImage2D(n.TEXTURE_2D,K,de,he.width,he.height,0,he.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?I&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,he.width,he.height,le,we,he.data):t.texImage2D(n.TEXTURE_2D,K,de,he.width,he.height,0,le,we,he.data)}else if(_.isDataArrayTexture)if(Pe){if(ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,de,j.width,j.height,j.depth),I)if(_.layerUpdates.size>0){let K=Xl(j.width,j.height,_.format,_.type);for(let ue of _.layerUpdates){let ge=j.data.subarray(ue*K/j.data.BYTES_PER_ELEMENT,(ue+1)*K/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ue,j.width,j.height,1,le,we,ge)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,le,we,j.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,de,j.width,j.height,j.depth,0,le,we,j.data);else if(_.isData3DTexture)Pe?(ze&&t.texStorage3D(n.TEXTURE_3D,re,de,j.width,j.height,j.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,le,we,j.data)):t.texImage3D(n.TEXTURE_3D,0,de,j.width,j.height,j.depth,0,le,we,j.data);else if(_.isFramebufferTexture){if(ze)if(Pe)t.texStorage2D(n.TEXTURE_2D,re,de,j.width,j.height);else{let K=j.width,ue=j.height;for(let ge=0;ge<re;ge++)t.texImage2D(n.TEXTURE_2D,ge,de,K,ue,0,le,we,null),K>>=1,ue>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let K=n.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),j.parentNode!==K){K.appendChild(j),d.add(_),K.onpaint=ue=>{let ge=ue.changedElements;for(let ee of d)ge.includes(ee.image)&&(ee.needsUpdate=!0)},K.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,j);else{let ge=n.RGBA,ee=n.RGBA,be=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ge,ee,be,j)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Pe&&ze){let K=nt(Ae[0]);t.texStorage2D(n.TEXTURE_2D,re,de,K.width,K.height)}for(let K=0,ue=Ae.length;K<ue;K++)he=Ae[K],Pe?I&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,le,we,he):t.texImage2D(n.TEXTURE_2D,K,de,le,we,he);_.generateMipmaps=!1}else if(Pe){if(ze){let K=nt(j);t.texStorage2D(n.TEXTURE_2D,re,de,K.width,K.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le,we,j)}else t.texImage2D(n.TEXTURE_2D,0,de,le,we,j);f(_)&&S(H),oe.__version=ie.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Be(A,_,B){if(_.image.length!==6)return;let H=Z(A,_),Y=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+B);let ie=i.get(Y);if(Y.version!==ie.__version||H===!0){t.activeTexture(n.TEXTURE0+B);let oe=Ye.getPrimaries(Ye.workingColorSpace),$=_.colorSpace===mi?null:Ye.getPrimaries(_.colorSpace),j=_.colorSpace===mi||oe===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let le=_.isCompressedTexture||_.image[0].isCompressedTexture,we=_.image[0]&&_.image[0].isDataTexture,de=[];for(let ee=0;ee<6;ee++)!le&&!we?de[ee]=m(_.image[ee],!0,s.maxCubemapSize):de[ee]=we?_.image[ee].image:_.image[ee],de[ee]=sn(_,de[ee]);let he=de[0],Ae=r.convert(_.format,_.colorSpace),Pe=r.convert(_.type),ze=v(_.internalFormat,Ae,Pe,_.normalized,_.colorSpace),I=_.isVideoTexture!==!0,re=ie.__version===void 0||H===!0,K=Y.dataReady,ue=b(_,he);Ie(n.TEXTURE_CUBE_MAP,_);let ge;if(le){I&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,ze,he.width,he.height);for(let ee=0;ee<6;ee++){ge=de[ee].mipmaps;for(let be=0;be<ge.length;be++){let Me=ge[be];_.format!==yn?Ae!==null?I?K&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Me.width,Me.height,Ae,Me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,ze,Me.width,Me.height,0,Me.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,0,0,Me.width,Me.height,Ae,Pe,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be,ze,Me.width,Me.height,0,Ae,Pe,Me.data)}}}else{if(ge=_.mipmaps,I&&re){ge.length>0&&ue++;let ee=nt(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,ze,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(we){I?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,de[ee].width,de[ee].height,Ae,Pe,de[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,ze,de[ee].width,de[ee].height,0,Ae,Pe,de[ee].data);for(let be=0;be<ge.length;be++){let vt=ge[be].image[ee].image;I?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,vt.width,vt.height,Ae,Pe,vt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,ze,vt.width,vt.height,0,Ae,Pe,vt.data)}}else{I?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ae,Pe,de[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,ze,Ae,Pe,de[ee]);for(let be=0;be<ge.length;be++){let Me=ge[be];I?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,0,0,Ae,Pe,Me.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,be+1,ze,Ae,Pe,Me.image[ee])}}}f(_)&&S(n.TEXTURE_CUBE_MAP),ie.__version=Y.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Ce(A,_,B,H,Y,ie){let oe=r.convert(B.format,B.colorSpace),$=r.convert(B.type),j=v(B.internalFormat,oe,$,B.normalized,B.colorSpace),le=i.get(_),we=i.get(B);if(we.__renderTarget=_,!le.__hasExternalTextures){let de=Math.max(1,_.width>>ie),he=Math.max(1,_.height>>ie);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,ie,j,de,he,_.depth,0,oe,$,null):t.texImage2D(Y,ie,j,de,he,0,oe,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Ct(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,Y,we.__webglTexture,0,yt(_)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,Y,we.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Et(A,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){let H=_.depthTexture,Y=H&&H.isDepthTexture?H.type:null,ie=E(_.stencilBuffer,Y),oe=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ct(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt(_),ie,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt(_),ie,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ie,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,A)}else{let H=_.textures;for(let Y=0;Y<H.length;Y++){let ie=H[Y],oe=r.convert(ie.format,ie.colorSpace),$=r.convert(ie.type),j=v(ie.internalFormat,oe,$,ie.normalized,ie.colorSpace);Ct(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt(_),j,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt(_),j,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,j,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function qe(A,_,B){let H=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,_.depthTexture);let le=r.convert(_.depthTexture.format),we=r.convert(_.depthTexture.type),de;_.depthTexture.format===Yn?de=n.DEPTH_COMPONENT24:_.depthTexture.format===Oi&&(de=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,de,_.width,_.height,0,le,we,null)}}else X(_.depthTexture,0);let ie=Y.__webglTexture,oe=yt(_),$=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,j=_.depthTexture.format===Oi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Yn)Ct(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,ie,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,ie,0);else if(_.depthTexture.format===Oi)Ct(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,ie,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function at(A){let _=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){let H=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){let Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=H}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let H=0;H<6;H++)qe(_.__webglFramebuffer[H],A,H);else{let H=A.texture.mipmaps;H&&H.length>0?qe(_.__webglFramebuffer[0],A,0):qe(_.__webglFramebuffer,A,0)}else if(B){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=n.createRenderbuffer(),Et(_.__webglDepthbuffer[H],A,!1);else{let Y=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,ie)}}else{let H=A.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Et(_.__webglDepthbuffer,A,!1);else{let Y=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,ie)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function je(A,_,B){let H=i.get(A);_!==void 0&&Ce(H.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&at(A)}function Ze(A){let _=A.texture,B=i.get(A),H=i.get(_);A.addEventListener("dispose",x);let Y=A.textures,ie=A.isWebGLCubeRenderTarget===!0,oe=Y.length>1;if(oe||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=_.version,a.memory.textures++),ie){B.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[$]=[];for(let j=0;j<_.mipmaps.length;j++)B.__webglFramebuffer[$][j]=n.createFramebuffer()}else B.__webglFramebuffer[$]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)B.__webglFramebuffer[$]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(oe)for(let $=0,j=Y.length;$<j;$++){let le=i.get(Y[$]);le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ct(A)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let $=0;$<Y.length;$++){let j=Y[$];B.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[$]);let le=r.convert(j.format,j.colorSpace),we=r.convert(j.type),de=v(j.internalFormat,le,we,j.normalized,j.colorSpace,A.isXRRenderTarget===!0),he=yt(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,de,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,B.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Et(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)Ce(B.__webglFramebuffer[$][j],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,j);else Ce(B.__webglFramebuffer[$],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);f(_)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let $=0,j=Y.length;$<j;$++){let le=Y[$],we=i.get(le),de=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,we.__webglTexture),Ie(de,le),Ce(B.__webglFramebuffer,A,le,n.COLOR_ATTACHMENT0+$,de,0),f(le)&&S(de)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,H.__webglTexture),Ie($,_),_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)Ce(B.__webglFramebuffer[j],A,_,n.COLOR_ATTACHMENT0,$,j);else Ce(B.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,$,0);f(_)&&S($),t.unbindTexture()}A.depthBuffer&&at(A)}function Rt(A){let _=A.textures;for(let B=0,H=_.length;B<H;B++){let Y=_[B];if(f(Y)){let ie=T(A),oe=i.get(Y).__webglTexture;t.bindTexture(ie,oe),S(ie),t.unbindTexture()}}}let Lt=[],Ft=[];function Vt(A){if(A.samples>0){if(Ct(A)===!1){let _=A.textures,B=A.width,H=A.height,Y=n.COLOR_BUFFER_BIT,ie=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(A),$=_.length>1;if($)for(let le=0;le<_.length;le++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);let j=A.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let le=0;le<_.length;le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);let we=i.get(_[le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,we,0)}n.blitFramebuffer(0,0,B,H,0,0,B,H,Y,n.NEAREST),c===!0&&(Lt.length=0,Ft.length=0,Lt.push(n.COLOR_ATTACHMENT0+le),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Lt.push(ie),Ft.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ft)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Lt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let le=0;le<_.length;le++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);let we=i.get(_[le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,we,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function yt(A){return Math.min(s.maxSamples,A.samples)}function Ct(A){let _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(A){let _=a.render.frame;h.get(A)!==_&&(h.set(A,_),A.update())}function sn(A,_){let B=A.colorSpace,H=A.format,Y=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==fr&&B!==mi&&(Ye.getTransfer(B)===et?(H!==yn||Y!==on)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",B)),_}function nt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=W,this.getTextureUnits=q,this.setTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=te,this.setTexture3D=Q,this.setTextureCube=ce,this.rebindTextures=je,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function J_(n,e){function t(i,s=mi){let r,a=Ye.getTransfer(s);if(i===on)return n.UNSIGNED_BYTE;if(i===wo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Eo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Nl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ul)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ll)return n.BYTE;if(i===Dl)return n.SHORT;if(i===Gs)return n.UNSIGNED_SHORT;if(i===bo)return n.INT;if(i===Nn)return n.UNSIGNED_INT;if(i===Un)return n.FLOAT;if(i===jn)return n.HALF_FLOAT;if(i===Fl)return n.ALPHA;if(i===Ol)return n.RGB;if(i===yn)return n.RGBA;if(i===Yn)return n.DEPTH_COMPONENT;if(i===Oi)return n.DEPTH_STENCIL;if(i===Bl)return n.RED;if(i===To)return n.RED_INTEGER;if(i===Bi)return n.RG;if(i===Ao)return n.RG_INTEGER;if(i===Ro)return n.RGBA_INTEGER;if(i===Br||i===zr||i===kr||i===Vr)if(a===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Br)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Br)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Co||i===Po||i===Io||i===Lo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Co)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Io)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Lo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Do||i===No||i===Uo||i===Fo||i===Oo||i===Hr||i===Bo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Do||i===No)return a===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Uo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Fo)return r.COMPRESSED_R11_EAC;if(i===Oo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Hr)return r.COMPRESSED_RG11_EAC;if(i===Bo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===zo||i===ko||i===Vo||i===Ho||i===Go||i===Wo||i===Xo||i===qo||i===Yo||i===$o||i===Zo||i===Jo||i===Ko||i===jo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===zo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ko)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ho)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Go)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$o)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ko)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Qo||i===ec||i===tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Qo)return a===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===nc||i===ic||i===Gr||i===sc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===nc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Gr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ws?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var K_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,j_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,hh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Tr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new pn({vertexShader:K_,fragmentShader:j_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new es(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},uh=class extends $n{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null,M=typeof XRWebGLBinding<"u",m=new hh,f={},S=t.getContextAttributes(),T=null,v=null,E=[],b=[],R=new Oe,x=null,w=new Ht;w.viewport=new gt;let C=new Ht;C.viewport=new gt;let P=[w,C],D=new xo,W=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ae=E[Z];return ae===void 0&&(ae=new Os,E[Z]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Z){let ae=E[Z];return ae===void 0&&(ae=new Os,E[Z]=ae),ae.getGripSpace()},this.getHand=function(Z){let ae=E[Z];return ae===void 0&&(ae=new Os,E[Z]=ae),ae.getHandSpace()};function z(Z){let ae=b.indexOf(Z.inputSource);if(ae===-1)return;let ne=E[ae];ne!==void 0&&(ne.update(Z.inputSource,Z.frame,l||a),ne.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",L);for(let Z=0;Z<E.length;Z++){let ae=b[Z];ae!==null&&(b[Z]=null,E[Z].disconnect(ae))}W=null,q=null,m.reset();for(let Z in f)delete f[Z];e.setRenderTarget(T),p=null,u=null,d=null,s=null,v=null,Ie.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",O),s.addEventListener("inputsourceschange",L),S.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,Ne=null,Be=null;S.depth&&(Be=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=S.stencil?Oi:Yn,Ne=S.stencil?Ws:Nn);let Ce={colorFormat:t.RGBA8,depthFormat:Be,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new fn(u.textureWidth,u.textureHeight,{format:yn,type:on,depthTexture:new fi(u.textureWidth,u.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ne={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new fn(p.framebufferWidth,p.framebufferHeight,{format:yn,type:on,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ie.setContext(s),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function L(Z){for(let ae=0;ae<Z.removed.length;ae++){let ne=Z.removed[ae],Ne=b.indexOf(ne);Ne>=0&&(b[Ne]=null,E[Ne].disconnect(ne))}for(let ae=0;ae<Z.added.length;ae++){let ne=Z.added[ae],Ne=b.indexOf(ne);if(Ne===-1){for(let Ce=0;Ce<E.length;Ce++)if(Ce>=b.length){b.push(ne),Ne=Ce;break}else if(b[Ce]===null){b[Ce]=ne,Ne=Ce;break}if(Ne===-1)break}let Be=E[Ne];Be&&Be.connect(ne)}}let X=new F,te=new F;function Q(Z,ae,ne){X.setFromMatrixPosition(ae.matrixWorld),te.setFromMatrixPosition(ne.matrixWorld);let Ne=X.distanceTo(te),Be=ae.projectionMatrix.elements,Ce=ne.projectionMatrix.elements,Et=Be[14]/(Be[10]-1),qe=Be[14]/(Be[10]+1),at=(Be[9]+1)/Be[5],je=(Be[9]-1)/Be[5],Ze=(Be[8]-1)/Be[0],Rt=(Ce[8]+1)/Ce[0],Lt=Et*Ze,Ft=Et*Rt,Vt=Ne/(-Ze+Rt),yt=Vt*-Ze;if(ae.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(yt),Z.translateZ(Vt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Be[10]===-1)Z.projectionMatrix.copy(ae.projectionMatrix),Z.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{let Ct=Et+Vt,N=qe+Vt,sn=Lt-yt,nt=Ft+(Ne-yt),A=at*qe/N*Ct,_=je*qe/N*Ct;Z.projectionMatrix.makePerspective(sn,nt,A,_,Ct,N),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ce(Z,ae){ae===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ae.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ae=Z.near,ne=Z.far;m.texture!==null&&(m.depthNear>0&&(ae=m.depthNear),m.depthFar>0&&(ne=m.depthFar)),D.near=C.near=w.near=ae,D.far=C.far=w.far=ne,(W!==D.near||q!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),W=D.near,q=D.far),D.layers.mask=Z.layers.mask|6,w.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;let Ne=Z.parent,Be=D.cameras;ce(D,Ne);for(let Ce=0;Ce<Be.length;Ce++)ce(Be[Ce],Ne);Be.length===2?Q(D,w,C):D.projectionMatrix.copy(w.projectionMatrix),ye(Z,D,Ne)};function ye(Z,ae,ne){ne===null?Z.matrix.copy(ae.matrixWorld):(Z.matrix.copy(ne.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ae.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ae.projectionMatrix),Z.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ki*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(Z){c=Z,u!==null&&(u.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(Z){return f[Z]};let Xe=null;function dt(Z,ae){if(h=ae.getViewerPose(l||a),g=ae,h!==null){let ne=h.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let Ne=!1;ne.length!==D.cameras.length&&(D.cameras.length=0,Ne=!0);for(let qe=0;qe<ne.length;qe++){let at=ne[qe],je=null;if(p!==null)je=p.getViewport(at);else{let Rt=d.getViewSubImage(u,at);je=Rt.viewport,qe===0&&(e.setRenderTargetTextures(v,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(v))}let Ze=P[qe];Ze===void 0&&(Ze=new Ht,Ze.layers.enable(qe),Ze.viewport=new gt,P[qe]=Ze),Ze.matrix.fromArray(at.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(at.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(je.x,je.y,je.width,je.height),qe===0&&(D.matrix.copy(Ze.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ne===!0&&D.cameras.push(Ze)}let Be=s.enabledFeatures;if(Be&&Be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();let qe=d.getDepthInformation(ne[0]);qe&&qe.isValid&&qe.texture&&m.init(qe,s.renderState)}if(Be&&Be.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let qe=0;qe<ne.length;qe++){let at=ne[qe].camera;if(at){let je=f[at];je||(je=new Tr,f[at]=je);let Ze=d.getCameraImage(at);je.sourceTexture=Ze}}}}for(let ne=0;ne<E.length;ne++){let Ne=b[ne],Be=E[ne];Ne!==null&&Be!==void 0&&Be.update(Ne,ae,l||a)}Xe&&Xe(Z,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),g=null}let Ie=new _d;Ie.setAnimationLoop(dt),this.setAnimationLoop=function(Z){Xe=Z},this.dispose=function(){}}},Q_=new mt,bd=new Fe;bd.set(-1,0,0,0,1,0,0,0,1);function ex(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Hl(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,S,T,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),M(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,S,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===tn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===tn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let S=e.get(f),T=S.envMap,v=S.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(Q_.makeRotationFromEuler(v)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(bd),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,S,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=T*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===tn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function M(m,f){let S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function tx(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,E){let b=E.program;i.uniformBlockBinding(v,b)}function l(v,E){let b=s[v.id];b===void 0&&(m(v),b=h(v),s[v.id]=b,v.addEventListener("dispose",S));let R=E.program;i.updateUBOMapping(v,R);let x=e.render.frame;r[v.id]!==x&&(u(v),r[v.id]=x)}function h(v){let E=d();v.__bindingPointIndex=E;let b=n.createBuffer(),R=v.__size,x=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,R,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,b),b}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let E=s[v.id],b=v.uniforms,R=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let x=0,w=b.length;x<w;x++){let C=b[x];if(Array.isArray(C))for(let P=0,D=C.length;P<D;P++)p(C[P],x,P,R);else p(C,x,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,E,b,R){if(M(v,E,b,R)===!0){let x=v.__offset,w=v.value;if(Array.isArray(w)){let C=0;for(let P=0;P<w.length;P++){let D=w[P],W=f(D);g(D,v.__data,C),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(C+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,v.__data)}}function g(v,E,b){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,b)}function M(v,E,b,R){let x=v.value,w=E+"_"+b;if(R[w]===void 0)return typeof x=="number"||typeof x=="boolean"?R[w]=x:ArrayBuffer.isView(x)?R[w]=x.slice():R[w]=x.clone(),!0;{let C=R[w];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return R[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function m(v){let E=v.uniforms,b=0,R=16;for(let w=0,C=E.length;w<C;w++){let P=Array.isArray(E[w])?E[w]:[E[w]];for(let D=0,W=P.length;D<W;D++){let q=P[D],z=Array.isArray(q.value)?q.value:[q.value];for(let O=0,L=z.length;O<L;O++){let X=z[O],te=f(X),Q=b%R,ce=Q%te.boundary,ye=Q+ce;b+=ce,ye!==0&&R-ye<te.storage&&(b+=R-ye),q.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=b,b+=te.storage}}}let x=b%R;return x>0&&(b+=R-x),v.__size=b,v.__cache={},this}function f(v){let E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",v),E}function S(v){let E=v.target;E.removeEventListener("dispose",S);let b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function T(){for(let v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:c,update:l,dispose:T}}var nx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Qn=null;function ix(){return Qn===null&&(Qn=new Ja(nx,16,16,Bi,jn),Qn.name="DFG_LUT",Qn.minFilter=Gt,Qn.magFilter=Gt,Qn.wrapS=qn,Qn.wrapT=qn,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}var dc=class{constructor(e={}){let{canvas:t=Hu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=on}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let M=p,m=new Set([Ro,Ao,To]),f=new Set([on,Nn,Gs,Ws,wo,Eo]),S=new Uint32Array(4),T=new Int32Array(4),v=new F,E=null,b=null,R=[],x=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,P=!1,D=null,W=null,q=null,z=null;this._outputColorSpace=en;let O=0,L=0,X=null,te=-1,Q=null,ce=new gt,ye=new gt,Xe=null,dt=new Ue(0),Ie=0,Z=t.width,ae=t.height,ne=1,Ne=null,Be=null,Ce=new gt(0,0,Z,ae),Et=new gt(0,0,Z,ae),qe=!1,at=new Bs,je=!1,Ze=!1,Rt=new mt,Lt=new F,Ft=new gt,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function Ct(){return X===null?ne:1}let N=i;function sn(y,U){return t.getContext(y,U)}try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",vt,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",Vn,!1),N===null){let U="webgl2";if(N=sn(U,y),N===null)throw sn(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw Le("WebGLRenderer: "+y.message),y}let nt,A,_,B,H,Y,ie,oe,$,j,le,we,de,he,Ae,Pe,ze,I,re,K,ue,ge,ee;function be(){nt=new h0(N),nt.init(),ue=new J_(N,nt),A=new n0(N,nt,e,ue),_=new $_(N,nt),A.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),W=N.createFramebuffer(),q=N.createFramebuffer(),z=N.createFramebuffer(),B=new f0(N),H=new N_,Y=new Z_(N,nt,_,H,A,ue,B),ie=new l0(C),oe=new _p(N),ge=new e0(N,oe),$=new u0(N,oe,B,ge),j=new m0(N,$,oe,ge,B),I=new p0(N,A,Y),Ae=new i0(H),le=new D_(C,ie,nt,A,ge,Ae),we=new ex(C,H),de=new F_,he=new H_(nt),ze=new Qg(C,ie,_,j,g,c),Pe=new Y_(C,j,A),ee=new tx(N,B,A,_),re=new t0(N,nt,B),K=new d0(N,nt,B),B.programs=le.programs,C.capabilities=A,C.extensions=nt,C.properties=H,C.renderLists=de,C.shadowMap=Pe,C.state=_,C.info=B}be(),M!==on&&(w=new _0(M,t.width,t.height,o,s,r));let Me=new uh(C,N);this.xr=Me,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let y=nt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=nt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(y){y!==void 0&&(ne=y,this.setSize(Z,ae,!1))},this.getSize=function(y){return y.set(Z,ae)},this.setSize=function(y,U,G=!0){if(Me.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=y,ae=U,t.width=Math.floor(y*ne),t.height=Math.floor(U*ne),G===!0&&(t.style.width=y+"px",t.style.height=U+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(Z*ne,ae*ne).floor()},this.setDrawingBufferSize=function(y,U,G){Z=y,ae=U,ne=G,t.width=Math.floor(y*G),t.height=Math.floor(U*G),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(M===on){Le("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(ce)},this.getViewport=function(y){return y.copy(Ce)},this.setViewport=function(y,U,G,k){y.isVector4?Ce.set(y.x,y.y,y.z,y.w):Ce.set(y,U,G,k),_.viewport(ce.copy(Ce).multiplyScalar(ne).round())},this.getScissor=function(y){return y.copy(Et)},this.setScissor=function(y,U,G,k){y.isVector4?Et.set(y.x,y.y,y.z,y.w):Et.set(y,U,G,k),_.scissor(ye.copy(Et).multiplyScalar(ne).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(y){_.setScissorTest(qe=y)},this.setOpaqueSort=function(y){Ne=y},this.setTransparentSort=function(y){Be=y},this.getClearColor=function(y){return y.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,G=!0){let k=0;if(y){let V=!1;if(X!==null){let me=X.texture.format;V=m.has(me)}if(V){let me=X.texture.type,xe=f.has(me),pe=ze.getClearColor(),Se=ze.getClearAlpha(),Ee=pe.r,ke=pe.g,He=pe.b;xe?(S[0]=Ee,S[1]=ke,S[2]=He,S[3]=Se,N.clearBufferuiv(N.COLOR,0,S)):(T[0]=Ee,T[1]=ke,T[2]=He,T[3]=Se,N.clearBufferiv(N.COLOR,0,T))}else k|=N.COLOR_BUFFER_BIT}U&&(k|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),D=y},this.dispose=function(){t.removeEventListener("webglcontextlost",vt,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),ze.dispose(),de.dispose(),he.dispose(),H.dispose(),ie.dispose(),j.dispose(),ge.dispose(),ee.dispose(),le.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",Ih),Me.removeEventListener("sessionend",Lh),Hi.stop()};function vt(y){y.preventDefault(),kl("WebGLRenderer: Context Lost."),P=!0}function ht(){kl("WebGLRenderer: Context Restored."),P=!1;let y=B.autoReset,U=Pe.enabled,G=Pe.autoUpdate,k=Pe.needsUpdate,V=Pe.type;be(),B.autoReset=y,Pe.enabled=U,Pe.autoUpdate=G,Pe.needsUpdate=k,Pe.type=V}function Vn(y){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Hn(y){let U=y.target;U.removeEventListener("dispose",Hn),gf(U)}function gf(y){_f(y),H.remove(y)}function _f(y){let U=H.get(y).programs;U!==void 0&&(U.forEach(function(G){le.releaseProgram(G)}),y.isShaderMaterial&&le.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,G,k,V,me){U===null&&(U=Vt);let xe=V.isMesh&&V.matrixWorld.determinantAffine()<0,pe=vf(y,U,G,k,V);_.setMaterial(k,xe);let Se=G.index,Ee=1;if(k.wireframe===!0){if(Se=$.getWireframeAttribute(G),Se===void 0)return;Ee=2}let ke=G.drawRange,He=G.attributes.position,Te=ke.start*Ee,it=(ke.start+ke.count)*Ee;me!==null&&(Te=Math.max(Te,me.start*Ee),it=Math.min(it,(me.start+me.count)*Ee)),Se!==null?(Te=Math.max(Te,0),it=Math.min(it,Se.count)):He!=null&&(Te=Math.max(Te,0),it=Math.min(it,He.count));let Tt=it-Te;if(Tt<0||Tt===1/0)return;ge.setup(V,k,pe,G,Se);let Mt,ot=re;if(Se!==null&&(Mt=oe.get(Se),ot=K,ot.setIndex(Mt)),V.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*Ct()),ot.setMode(N.LINES)):ot.setMode(N.TRIANGLES);else if(V.isLine){let qt=k.linewidth;qt===void 0&&(qt=1),_.setLineWidth(qt*Ct()),V.isLineSegments?ot.setMode(N.LINES):V.isLineLoop?ot.setMode(N.LINE_LOOP):ot.setMode(N.LINE_STRIP)}else V.isPoints?ot.setMode(N.POINTS):V.isSprite&&ot.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))ot.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let qt=V._multiDrawStarts,_e=V._multiDrawCounts,ln=V._multiDrawCount,Je=Se?oe.get(Se).bytesPerElement:1,_n=H.get(k).currentProgram.getUniforms();for(let Gn=0;Gn<ln;Gn++)_n.setValue(N,"_gl_DrawID",Gn),ot.render(qt[Gn]/Je,_e[Gn])}else if(V.isInstancedMesh)ot.renderInstances(Te,Tt,V.count);else if(G.isInstancedBufferGeometry){let qt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,_e=Math.min(G.instanceCount,qt);ot.renderInstances(Te,Tt,_e)}else ot.render(Te,Tt)};function Ph(y,U,G){y.transparent===!0&&y.side===Jn&&y.forceSinglePass===!1?(y.side=tn,y.needsUpdate=!0,ua(y,U,G),y.side=hi,y.needsUpdate=!0,ua(y,U,G),y.side=Jn):ua(y,U,G)}this.compile=function(y,U,G=null){G===null&&(G=y),b=he.get(G),b.init(U),x.push(b),G.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),y!==G&&y.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),b.setupLights();let k=new Set;return y.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let me=V.material;if(me)if(Array.isArray(me))for(let xe=0;xe<me.length;xe++){let pe=me[xe];Ph(pe,G,V),k.add(pe)}else Ph(me,G,V),k.add(me)}),b=x.pop(),k},this.compileAsync=function(y,U,G=null){let k=this.compile(y,U,G);return new Promise(V=>{function me(){if(k.forEach(function(xe){H.get(xe).currentProgram.isReady()&&k.delete(xe)}),k.size===0){V(y);return}setTimeout(me,10)}nt.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let zc=null;function xf(y){zc&&zc(y)}function Ih(){Hi.stop()}function Lh(){Hi.start()}let Hi=new _d;Hi.setAnimationLoop(xf),typeof self<"u"&&Hi.setContext(self),this.setAnimationLoop=function(y){zc=y,Me.setAnimationLoop(y),y===null?Hi.stop():Hi.start()},Me.addEventListener("sessionstart",Ih),Me.addEventListener("sessionend",Lh),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(y,U);let G=Me.enabled===!0&&Me.isPresenting===!0,k=w!==null&&(X===null||G)&&w.begin(C,X);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(U),U=Me.getCamera()),y.isScene===!0&&y.onBeforeRender(C,y,U,X),b=he.get(y,x.length),b.init(U),b.state.textureUnits=Y.getTextureUnits(),x.push(b),Rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),at.setFromProjectionMatrix(Rt,Pn,U.reversedDepth),Ze=this.localClippingEnabled,je=Ae.init(this.clippingPlanes,Ze),E=de.get(y,R.length),E.init(),R.push(E),Me.enabled===!0&&Me.isPresenting===!0){let xe=C.xr.getDepthSensingMesh();xe!==null&&kc(xe,U,-1/0,C.sortObjects)}kc(y,U,0,C.sortObjects),E.finish(),C.sortObjects===!0&&E.sort(Ne,Be,U.reversedDepth),yt=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,yt&&ze.addToRenderList(E,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),je===!0&&Ae.beginShadows();let V=b.state.shadowsArray;if(Pe.render(V,y,U),je===!0&&Ae.endShadows(),(k&&w.hasRenderPass())===!1){let xe=E.opaque,pe=E.transmissive;if(b.setupLights(),U.isArrayCamera){let Se=U.cameras;if(pe.length>0)for(let Ee=0,ke=Se.length;Ee<ke;Ee++){let He=Se[Ee];Nh(xe,pe,y,He)}yt&&ze.render(y);for(let Ee=0,ke=Se.length;Ee<ke;Ee++){let He=Se[Ee];Dh(E,y,He,He.viewport)}}else pe.length>0&&Nh(xe,pe,y,U),yt&&ze.render(y),Dh(E,y,U)}X!==null&&L===0&&(Y.updateMultisampleRenderTarget(X),Y.updateRenderTargetMipmap(X)),k&&w.end(C),y.isScene===!0&&y.onAfterRender(C,y,U),ge.resetDefaultState(),te=-1,Q=null,x.pop(),x.length>0?(b=x[x.length-1],Y.setTextureUnits(b.state.textureUnits),je===!0&&Ae.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?E=R[R.length-1]:E=null,D!==null&&D.renderEnd()};function kc(y,U,G,k){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)G=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||at.intersectsSprite(y)){k&&Ft.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Rt);let xe=j.update(y),pe=y.material;pe.visible&&E.push(y,xe,pe,G,Ft.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||at.intersectsObject(y))){let xe=j.update(y),pe=y.material;if(k&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ft.copy(y.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Ft.copy(xe.boundingSphere.center)),Ft.applyMatrix4(y.matrixWorld).applyMatrix4(Rt)),Array.isArray(pe)){let Se=xe.groups;for(let Ee=0,ke=Se.length;Ee<ke;Ee++){let He=Se[Ee],Te=pe[He.materialIndex];Te&&Te.visible&&E.push(y,xe,Te,G,Ft.z,He)}}else pe.visible&&E.push(y,xe,pe,G,Ft.z,null)}}let me=y.children;for(let xe=0,pe=me.length;xe<pe;xe++)kc(me[xe],U,G,k)}function Dh(y,U,G,k){let{opaque:V,transmissive:me,transparent:xe}=y;b.setupLightsView(G),je===!0&&Ae.setGlobalState(C.clippingPlanes,G),k&&_.viewport(ce.copy(k)),V.length>0&&ha(V,U,G),me.length>0&&ha(me,U,G),xe.length>0&&ha(xe,U,G),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Nh(y,U,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[k.id]===void 0){let Te=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[k.id]=new fn(1,1,{generateMipmaps:!0,type:Te?jn:on,minFilter:Fi,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}let me=b.state.transmissionRenderTarget[k.id],xe=k.viewport||ce;me.setSize(xe.z*C.transmissionResolutionScale,xe.w*C.transmissionResolutionScale);let pe=C.getRenderTarget(),Se=C.getActiveCubeFace(),Ee=C.getActiveMipmapLevel();C.setRenderTarget(me),C.getClearColor(dt),Ie=C.getClearAlpha(),Ie<1&&C.setClearColor(16777215,.5),C.clear(),yt&&ze.render(G);let ke=C.toneMapping;C.toneMapping=Dn;let He=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),b.setupLightsView(k),je===!0&&Ae.setGlobalState(C.clippingPlanes,k),ha(y,G,k),Y.updateMultisampleRenderTarget(me),Y.updateRenderTargetMipmap(me),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let it=0,Tt=U.length;it<Tt;it++){let Mt=U[it],{object:ot,geometry:qt,material:_e,group:ln}=Mt;if(_e.side===Jn&&ot.layers.test(k.layers)){let Je=_e.side;_e.side=tn,_e.needsUpdate=!0,Uh(ot,G,k,qt,_e,ln),_e.side=Je,_e.needsUpdate=!0,Te=!0}}Te===!0&&(Y.updateMultisampleRenderTarget(me),Y.updateRenderTargetMipmap(me))}C.setRenderTarget(pe,Se,Ee),C.setClearColor(dt,Ie),He!==void 0&&(k.viewport=He),C.toneMapping=ke}function ha(y,U,G){let k=U.isScene===!0?U.overrideMaterial:null;for(let V=0,me=y.length;V<me;V++){let xe=y[V],{object:pe,geometry:Se,group:Ee}=xe,ke=xe.material;ke.allowOverride===!0&&k!==null&&(ke=k),pe.layers.test(G.layers)&&Uh(pe,U,G,Se,ke,Ee)}}function Uh(y,U,G,k,V,me){y.onBeforeRender(C,U,G,k,V,me),y.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),V.onBeforeRender(C,U,G,k,y,me),V.transparent===!0&&V.side===Jn&&V.forceSinglePass===!1?(V.side=tn,V.needsUpdate=!0,C.renderBufferDirect(G,U,k,V,y,me),V.side=hi,V.needsUpdate=!0,C.renderBufferDirect(G,U,k,V,y,me),V.side=Jn):C.renderBufferDirect(G,U,k,V,y,me),y.onAfterRender(C,U,G,k,V,me)}function ua(y,U,G){U.isScene!==!0&&(U=Vt);let k=H.get(y),V=b.state.lights,me=b.state.shadowsArray,xe=V.state.version,pe=le.getParameters(y,V.state,me,U,G,b.state.lightProbeGridArray),Se=le.getProgramCacheKey(pe),Ee=k.programs;k.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,k.fog=U.fog;let ke=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;k.envMap=ie.get(y.envMap||k.environment,ke),k.envMapRotation=k.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ee===void 0&&(y.addEventListener("dispose",Hn),Ee=new Map,k.programs=Ee);let He=Ee.get(Se);if(He!==void 0){if(k.currentProgram===He&&k.lightsStateVersion===xe)return Oh(y,pe),He}else pe.uniforms=le.getUniforms(y),D!==null&&y.isNodeMaterial&&D.build(y,G,pe),y.onBeforeCompile(pe,C),He=le.acquireProgram(pe,Se),Ee.set(Se,He),k.uniforms=pe.uniforms;let Te=k.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Te.clippingPlanes=Ae.uniform),Oh(y,pe),k.needsLights=Sf(y),k.lightsStateVersion=xe,k.needsLights&&(Te.ambientLightColor.value=V.state.ambient,Te.lightProbe.value=V.state.probe,Te.directionalLights.value=V.state.directional,Te.directionalLightShadows.value=V.state.directionalShadow,Te.spotLights.value=V.state.spot,Te.spotLightShadows.value=V.state.spotShadow,Te.rectAreaLights.value=V.state.rectArea,Te.ltc_1.value=V.state.rectAreaLTC1,Te.ltc_2.value=V.state.rectAreaLTC2,Te.pointLights.value=V.state.point,Te.pointLightShadows.value=V.state.pointShadow,Te.hemisphereLights.value=V.state.hemi,Te.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Te.spotLightMatrix.value=V.state.spotLightMatrix,Te.spotLightMap.value=V.state.spotLightMap,Te.pointShadowMatrix.value=V.state.pointShadowMatrix),k.lightProbeGrid=b.state.lightProbeGridArray.length>0,k.currentProgram=He,k.uniformsList=null,He}function Fh(y){if(y.uniformsList===null){let U=y.currentProgram.getUniforms();y.uniformsList=Ys.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Oh(y,U){let G=H.get(y);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function yf(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;v.setFromMatrixPosition(U.matrixWorld);for(let G=0,k=y.length;G<k;G++){let V=y[G];if(V.texture!==null&&V.boundingBox.containsPoint(v))return V}return null}function vf(y,U,G,k,V){U.isScene!==!0&&(U=Vt),Y.resetTextureUnits();let me=U.fog,xe=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?U.environment:null,pe=X===null?C.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Ye.workingColorSpace,Se=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ee=ie.get(k.envMap||xe,Se),ke=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,He=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Te=!!G.morphAttributes.position,it=!!G.morphAttributes.normal,Tt=!!G.morphAttributes.color,Mt=Dn;k.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Mt=C.toneMapping);let ot=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,qt=ot!==void 0?ot.length:0,_e=H.get(k),ln=b.state.lights;if(je===!0&&(Ze===!0||y!==Q)){let ut=y===Q&&k.id===te;Ae.setState(k,y,ut)}let Je=!1;k.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==ln.state.version||_e.outputColorSpace!==pe||V.isBatchedMesh&&_e.batching===!1||!V.isBatchedMesh&&_e.batching===!0||V.isBatchedMesh&&_e.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&_e.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&_e.instancing===!1||!V.isInstancedMesh&&_e.instancing===!0||V.isSkinnedMesh&&_e.skinning===!1||!V.isSkinnedMesh&&_e.skinning===!0||V.isInstancedMesh&&_e.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&_e.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&_e.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&_e.instancingMorph===!1&&V.morphTexture!==null||_e.envMap!==Ee||k.fog===!0&&_e.fog!==me||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ae.numPlanes||_e.numIntersection!==Ae.numIntersection)||_e.vertexAlphas!==ke||_e.vertexTangents!==He||_e.morphTargets!==Te||_e.morphNormals!==it||_e.morphColors!==Tt||_e.toneMapping!==Mt||_e.morphTargetsCount!==qt||!!_e.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,_e.__version=k.version);let _n=_e.currentProgram;Je===!0&&(_n=ua(k,U,V),D&&k.isNodeMaterial&&D.onUpdateProgram(k,_n,_e));let Gn=!1,vi=!1,xs=!1,ct=_n.getUniforms(),At=_e.uniforms;if(_.useProgram(_n.program)&&(Gn=!0,vi=!0,xs=!0),k.id!==te&&(te=k.id,vi=!0),_e.needsLights){let ut=yf(b.state.lightProbeGridArray,V);_e.lightProbeGrid!==ut&&(_e.lightProbeGrid=ut,vi=!0)}if(Gn||Q!==y){_.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ct.setValue(N,"projectionMatrix",y.projectionMatrix),ct.setValue(N,"viewMatrix",y.matrixWorldInverse);let Si=ct.map.cameraPosition;Si!==void 0&&Si.setValue(N,Lt.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&ct.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ct.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),Q!==y&&(Q=y,vi=!0,xs=!0)}if(_e.needsLights&&(ln.state.directionalShadowMap.length>0&&ct.setValue(N,"directionalShadowMap",ln.state.directionalShadowMap,Y),ln.state.spotShadowMap.length>0&&ct.setValue(N,"spotShadowMap",ln.state.spotShadowMap,Y),ln.state.pointShadowMap.length>0&&ct.setValue(N,"pointShadowMap",ln.state.pointShadowMap,Y)),V.isSkinnedMesh){ct.setOptional(N,V,"bindMatrix"),ct.setOptional(N,V,"bindMatrixInverse");let ut=V.skeleton;ut&&(ut.boneTexture===null&&ut.computeBoneTexture(),ct.setValue(N,"boneTexture",ut.boneTexture,Y))}V.isBatchedMesh&&(ct.setOptional(N,V,"batchingTexture"),ct.setValue(N,"batchingTexture",V._matricesTexture,Y),ct.setOptional(N,V,"batchingIdTexture"),ct.setValue(N,"batchingIdTexture",V._indirectTexture,Y),ct.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&ct.setValue(N,"batchingColorTexture",V._colorsTexture,Y));let Mi=G.morphAttributes;if((Mi.position!==void 0||Mi.normal!==void 0||Mi.color!==void 0)&&I.update(V,G,_n),(vi||_e.receiveShadow!==V.receiveShadow)&&(_e.receiveShadow=V.receiveShadow,ct.setValue(N,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&U.environment!==null&&(At.envMapIntensity.value=U.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=ix()),vi){if(ct.setValue(N,"toneMappingExposure",C.toneMappingExposure),_e.needsLights&&Mf(At,xs),me&&k.fog===!0&&we.refreshFogUniforms(At,me),we.refreshMaterialUniforms(At,k,ne,ae,b.state.transmissionRenderTarget[y.id]),_e.needsLights&&_e.lightProbeGrid){let ut=_e.lightProbeGrid;At.probesSH.value=ut.texture,At.probesMin.value.copy(ut.boundingBox.min),At.probesMax.value.copy(ut.boundingBox.max),At.probesResolution.value.copy(ut.resolution)}Ys.upload(N,Fh(_e),At,Y)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ys.upload(N,Fh(_e),At,Y),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ct.setValue(N,"center",V.center),ct.setValue(N,"modelViewMatrix",V.modelViewMatrix),ct.setValue(N,"normalMatrix",V.normalMatrix),ct.setValue(N,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){let ut=k.uniformsGroups;for(let Si=0,ys=ut.length;Si<ys;Si++){let Bh=ut[Si];ee.update(Bh,_n),ee.bind(Bh,_n)}}return _n}function Mf(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Sf(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(y,U,G){let k=H.get(y);k.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),H.get(y.texture).__webglTexture=U,H.get(y.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){let G=H.get(y);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,G=0){X=y,O=U,L=G;let k=null,V=!1,me=!1;if(y){let pe=H.get(y);if(pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,pe.__webglFramebuffer),ce.copy(y.viewport),ye.copy(y.scissor),Xe=y.scissorTest,_.viewport(ce),_.scissor(ye),_.setScissorTest(Xe),te=-1;return}else if(pe.__webglFramebuffer===void 0)Y.setupRenderTarget(y);else if(pe.__hasExternalTextures)Y.rebindTextures(y,H.get(y.texture).__webglTexture,H.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let ke=y.depthTexture;if(pe.__boundDepthTexture!==ke){if(ke!==null&&H.has(ke)&&(y.width!==ke.image.width||y.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(y)}}let Se=y.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(me=!0);let Ee=H.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ee[U])?k=Ee[U][G]:k=Ee[U],V=!0):y.samples>0&&Y.useMultisampledRTT(y)===!1?k=H.get(y).__webglMultisampledFramebuffer:Array.isArray(Ee)?k=Ee[G]:k=Ee,ce.copy(y.viewport),ye.copy(y.scissor),Xe=y.scissorTest}else ce.copy(Ce).multiplyScalar(ne).floor(),ye.copy(Et).multiplyScalar(ne).floor(),Xe=qe;if(G!==0&&(k=W),_.bindFramebuffer(N.FRAMEBUFFER,k)&&_.drawBuffers(y,k),_.viewport(ce),_.scissor(ye),_.setScissorTest(Xe),V){let pe=H.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,G)}else if(me){let pe=U;for(let Se=0;Se<y.textures.length;Se++){let Ee=H.get(y.textures[Se]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,G,pe)}}else if(y!==null&&G!==0){let pe=H.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pe.__webglTexture,G)}te=-1},this.readRenderTargetPixels=function(y,U,G,k,V,me,xe,pe=0){if(!(y&&y.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&xe!==void 0&&(Se=Se[xe]),Se){_.bindFramebuffer(N.FRAMEBUFFER,Se);try{let Ee=y.textures[pe],ke=Ee.format,He=Ee.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!A.textureFormatReadable(ke)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(He)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-k&&G>=0&&G<=y.height-V&&N.readPixels(U,G,k,V,ue.convert(ke),ue.convert(He),me)}finally{let Ee=X!==null?H.get(X).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(y,U,G,k,V,me,xe,pe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&xe!==void 0&&(Se=Se[xe]),Se)if(U>=0&&U<=y.width-k&&G>=0&&G<=y.height-V){_.bindFramebuffer(N.FRAMEBUFFER,Se);let Ee=y.textures[pe],ke=Ee.format,He=Ee.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pe),!A.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Te=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Te),N.bufferData(N.PIXEL_PACK_BUFFER,me.byteLength,N.STREAM_READ),N.readPixels(U,G,k,V,ue.convert(ke),ue.convert(He),0);let it=X!==null?H.get(X).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,it);let Tt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Wu(N,Tt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Te),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,me),N.deleteBuffer(Te),N.deleteSync(Tt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,G=0){let k=Math.pow(2,-G),V=Math.floor(y.image.width*k),me=Math.floor(y.image.height*k),xe=U!==null?U.x:0,pe=U!==null?U.y:0;Y.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,xe,pe,V,me),_.unbindTexture()},this.copyTextureToTexture=function(y,U,G=null,k=null,V=0,me=0){let xe,pe,Se,Ee,ke,He,Te,it,Tt,Mt=y.isCompressedTexture?y.mipmaps[me]:y.image;if(G!==null)xe=G.max.x-G.min.x,pe=G.max.y-G.min.y,Se=G.isBox3?G.max.z-G.min.z:1,Ee=G.min.x,ke=G.min.y,He=G.isBox3?G.min.z:0;else{let At=Math.pow(2,-V);xe=Math.floor(Mt.width*At),pe=Math.floor(Mt.height*At),y.isDataArrayTexture?Se=Mt.depth:y.isData3DTexture?Se=Math.floor(Mt.depth*At):Se=1,Ee=0,ke=0,He=0}k!==null?(Te=k.x,it=k.y,Tt=k.z):(Te=0,it=0,Tt=0);let ot=ue.convert(U.format),qt=ue.convert(U.type),_e;U.isData3DTexture?(Y.setTexture3D(U,0),_e=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Y.setTexture2DArray(U,0),_e=N.TEXTURE_2D_ARRAY):(Y.setTexture2D(U,0),_e=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);let ln=_.getParameter(N.UNPACK_ROW_LENGTH),Je=_.getParameter(N.UNPACK_IMAGE_HEIGHT),_n=_.getParameter(N.UNPACK_SKIP_PIXELS),Gn=_.getParameter(N.UNPACK_SKIP_ROWS),vi=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,Mt.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Mt.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Ee),_.pixelStorei(N.UNPACK_SKIP_ROWS,ke),_.pixelStorei(N.UNPACK_SKIP_IMAGES,He);let xs=y.isDataArrayTexture||y.isData3DTexture,ct=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){let At=H.get(y),Mi=H.get(U),ut=H.get(At.__renderTarget),Si=H.get(Mi.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,ut.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,Si.__webglFramebuffer);for(let ys=0;ys<Se;ys++)xs&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(y).__webglTexture,V,He+ys),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(U).__webglTexture,me,Tt+ys)),N.blitFramebuffer(Ee,ke,xe,pe,Te,it,xe,pe,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||y.isRenderTargetTexture||H.has(y)){let At=H.get(y),Mi=H.get(U);_.bindFramebuffer(N.READ_FRAMEBUFFER,q),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,z);for(let ut=0;ut<Se;ut++)xs?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,At.__webglTexture,V,He+ut):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,At.__webglTexture,V),ct?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mi.__webglTexture,me,Tt+ut):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mi.__webglTexture,me),V!==0?N.blitFramebuffer(Ee,ke,xe,pe,Te,it,xe,pe,N.COLOR_BUFFER_BIT,N.NEAREST):ct?N.copyTexSubImage3D(_e,me,Te,it,Tt+ut,Ee,ke,xe,pe):N.copyTexSubImage2D(_e,me,Te,it,Ee,ke,xe,pe);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ct?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(_e,me,Te,it,Tt,xe,pe,Se,ot,qt,Mt.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(_e,me,Te,it,Tt,xe,pe,Se,ot,Mt.data):N.texSubImage3D(_e,me,Te,it,Tt,xe,pe,Se,ot,qt,Mt):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,me,Te,it,xe,pe,ot,qt,Mt.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,me,Te,it,Mt.width,Mt.height,ot,Mt.data):N.texSubImage2D(N.TEXTURE_2D,me,Te,it,xe,pe,ot,qt,Mt);_.pixelStorei(N.UNPACK_ROW_LENGTH,ln),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Je),_.pixelStorei(N.UNPACK_SKIP_PIXELS,_n),_.pixelStorei(N.UNPACK_SKIP_ROWS,Gn),_.pixelStorei(N.UNPACK_SKIP_IMAGES,vi),me===0&&U.generateMipmaps&&N.generateMipmap(_e),_.unbindTexture()},this.initRenderTarget=function(y){H.get(y).__webglFramebuffer===void 0&&Y.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Y.setTextureCube(y,0):y.isData3DTexture?Y.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Y.setTexture2DArray(y,0):Y.setTexture2D(y,0),_.unbindTexture()},this.resetState=function(){O=0,L=0,X=null,_.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}};var Ed=Object.freeze({lengthMm:515,widthMm:82,balanceFromKnobMm:280,balanceY:.225}),dh=Object.freeze({knob:Object.freeze([[-2.575,0],[-2.551,.14],[-2.492,.182],[-2.443,.186],[-2.394,.182],[-2.345,.165],[-2.296,.119],[-2.29,0]].map(Object.freeze)),shell:Object.freeze([[-2.305,0],[-2.296,.119],[-2.199,.109],[-1.71,.121],[-1.222,.13],[-.733,.137],[-.244,.149],[-.098,.156],[0,.165],[.122,.179],[.244,.205],[.366,.231],[.489,.249],[.611,.273],[.733,.298],[.855,.321],[.977,.342],[1.099,.368],[1.222,.387],[1.344,.405],[1.466,.41],[1.588,.408],[1.71,.391],[1.832,.366],[1.954,.335],[2.077,.303],[2.199,.273],[2.321,.238],[2.42,.207],[2.43,0]].map(Object.freeze)),cap:Object.freeze([[2.405,0],[2.405,.201],[2.43,.211],[2.535,.211],[2.565,.202],[2.575,.19],[2.575,0]].map(Object.freeze))}),fh=(n,e)=>new Rr(n.map(([t,i])=>new Oe(i,t)),e);var Td=({segments:n=96}={})=>Object.freeze({shell:fh(dh.shell,n),knob:fh(dh.knob,Math.max(32,Math.round(n*.66))),cap:fh(dh.cap,Math.max(32,Math.round(n*.66)))});var ti=n=>Object.freeze(n),Yr=ti(["left","right"]),sx=new Set(["hold","pass","self"]),gc=n=>{if(!Yr.includes(n))throw new RangeError(`unknown passing hand ${n}`);return n==="left"?"right":"left"},ni=(n,e)=>`${n}:${e}`;function Ad(n){let e=new Set(n.performers.map(i=>i.id)),t=new Set;if(n.events.forEach(i=>{if(!Number.isInteger(i.beat)||i.beat<0||i.beat>=n.loopBeats)throw new RangeError(`${n.id}: event beat ${i.beat} is outside its loop`);if(!e.has(i.juggler))throw new RangeError(`${n.id}: unknown juggler ${i.juggler}`);if(!sx.has(i.kind))throw new RangeError(`${n.id}: unknown action ${i.kind}`);if(!Yr.includes(i.hand)||!Yr.includes(i.catchHand))throw new RangeError(`${n.id}: every action needs explicit throw and catch hands`);if(i.kind!=="hold"&&!e.has(i.target))throw new RangeError(`${n.id}: unknown target ${i.target}`);let s=`${i.beat}:${i.juggler}`;if(t.has(s))throw new RangeError(`${n.id}: ${i.juggler} has more than one action on beat ${i.beat+1}`);t.add(s)}),n.inventoryMode!=="visual-study")for(let i=0;i<n.loopBeats;i+=1)n.performers.forEach(s=>{if(!t.has(`${i}:${s.id}`))throw new RangeError(`${n.id}: ${s.id} has no action on beat ${i+1}`)})}function Rd(n,e){let t=new Map(n.performers.flatMap(i=>Yr.map(s=>[ni(i.id,s),0])));return e.forEach(i=>{i.kind!=="hold"&&(t.set(ni(i.juggler,i.hand),t.get(ni(i.juggler,i.hand))-1),t.set(ni(i.target,i.catchHand),t.get(ni(i.target,i.catchHand))+1))}),t}var Cd=n=>[...n.values()].every(e=>e===0);function rx(n){if(n.inventoryAllocation)return Object.fromEntries(n.performers.map(i=>[i.id,n.inventoryAllocation[i.id]||0]));let e=Math.floor(n.clubCount/n.performers.length),t=n.clubCount%n.performers.length;return Object.fromEntries(n.performers.map((i,s)=>[i.id,e+(s<t?1:0)]))}function ax(n){if(n.inventoryMode==="visual-study")return ti({});let e=new Map(n.performers.flatMap(r=>Yr.map(a=>[ni(r.id,a),0]))),t=new Map(e);for(let r=0;r<n.loopBeats;r+=1){let a=n.events.filter(o=>o.beat===r&&o.kind!=="hold");a.forEach(o=>{let c=ni(o.juggler,o.hand),l=e.get(c)-1;e.set(c,l),t.set(c,Math.max(t.get(c),-l))}),a.forEach(o=>{let c=ni(o.target,o.catchHand);e.set(c,e.get(c)+1)})}let i=rx(n),s={};return n.performers.forEach(r=>{let a={left:t.get(ni(r.id,"left")),right:t.get(ni(r.id,"right"))},o=i[r.id]-a.left-a.right;if(o<0)throw new RangeError(`${n.id}: ${r.id} needs at least ${a.left+a.right} clubs to execute the declared hand schedule`);for(;o>0;){let c=a.left<=a.right?"left":"right";a[c]+=1,o-=1}s[r.id]=ti(a)}),ti(s)}function ox(n,e){return ti({...n,beat:n.beat+e,hand:gc(n.hand),catchHand:gc(n.catchHand)})}function Zs(n){let e=n.loopBeats,t=n.events.map(c=>ti({...c})),i=t,s=e,r=1,a={...n,events:t};Ad(a),n.inventoryMode!=="visual-study"&&!Cd(Rd(a,t))?(i=ti([...t,...t.map(c=>ox(c,e))]),s=e*2,r=2):i=ti(t);let o={...n,loopBeats:s,events:i};if(Ad(o),o.inventoryMode!=="visual-study"&&!Cd(Rd(o,o.events)))throw new RangeError(`${o.id}: mirrored continuation does not produce periodic hand flow`);return ti({...o,executionPlan:ti({compilerVersion:1,sourceLoopBeats:e,handPeriodMultiplier:r,handFlow:o.inventoryMode==="visual-study"?"visual-study":"periodic",initialHandAllocation:ax(o)})})}var _t=n=>Object.freeze(n),ph=(n,e,t)=>_t({name:n,beat:e,durationBeats:1,description:t}),$r=_t([ph("Sky",-2,"Raise clubs; starts may be slightly staggered."),ph("Earth",-1,"Lower together to a head-down side position."),ph("Pass",0,"Start the scheduled pattern together.")]),zt=(n,e,t,i,s)=>_t({id:n,name:e,x:t,z:i,facing:s}),lt=(n,e,t,i,s,r={})=>_t({beat:n,juggler:e,hand:t,kind:i,target:s||null,catchHand:r.catchHand||gc(t),path:r.path||(i==="pass"?"straight":"self"),flightBeats:r.flightBeats??1,spins:r.spins??(i==="pass"?1.5:1),startPose:r.startPose||"side-head-down",catchPose:r.catchPose||"shoulder-club-up",note:r.note||""}),Zr=(n,e)=>_t({summary:n,references:e.map(t=>_t(t))}),Bn=_t([_t({title:"Modern Passing \u2014 Basic Sync",url:"https://modernpassing.com/2b-basic-sync.html",use:"terminology and timing research only"}),_t({title:"2-count/4-count Feed",url:"https://www.jugglingpatterns.de/wiki/2-count_4-count_Feed",use:"feed timing research only"}),_t({title:"Modern Passing \u2014 Feeds",url:"https://modernpassing.com/5b-feeds.html",use:"feed-role research only"}),_t({title:"Passing Patterns Compendium",url:"https://www.jugglingedge.com/pdf/passingpatternscompendium.pdf",use:"timing and terminology research only"})]);function vn(n,e,t,i,s,r="easy",a="source-backed"){let o=[zt("left","Left",-2.25,1.4,90),zt("right","Right",2.25,1.4,-90)],c=t.flatMap(({kind:l,hand:h},d)=>o.map((u,p)=>lt(d,u.id,h,l,l==="pass"?o[1-p].id:u.id,{path:l==="pass"?"straight":"self"})));return Zs({id:n,title:e,peopleCount:2,formation:"facing pair",clubCount:6,summary:i,tempo:108,loopBeats:t.length,performers:o,events:c,countIn:$r,terminology:s,difficulty:r,basis:a,startingPhase:"synchronised",provenance:Zr("Original event schedule using independently researched common count terminology; verify preferred local teaching style at the jam.",[Bn[0]])})}function mh(n,e,t,i,s,r={}){let a=i.map((c,l)=>zt(`p${l+1}`,`P${l+1}`,...c)),o=a.map((c,l)=>lt(0,c.id,l%2?"right":"left","pass",a[(l+1)%a.length].id,{path:"crossing"}));return Zs({id:n,title:e,peopleCount:t,formation:`${t}-person round`,clubCount:t*3,summary:s,tempo:100,loopBeats:1,performers:a,events:o,countIn:$r,terminology:r.terminology||"one-count round",difficulty:r.difficulty||"medium",basis:r.basis||"original schedule study",startingPhase:r.startingPhase||"synchronised",provenance:Zr(r.provenance||"Original all-pass round schedule; the name is a concise community-terminology label, not copied teaching material.",r.references||Bn)})}var Fn=_t([zt("a","A",-2.7,.5,55),zt("b","B",2.7,.5,-55),zt("c","C",2.7,2.7,-125),zt("d","D",-2.7,2.7,125)]),On=_t([zt("a","A",0,3.25,180),zt("b","B",-3.1,2,126),zt("c","C",-1.9,-.15,36),zt("d","D",1.9,-.15,-36),zt("e","E",3.1,2,-126)]),J=(n,e,t,i={})=>({kind:n,target:e,hand:t,...i});function ii({id:n,title:e,people:t,formation:i,clubCount:s,tempo:r=100,rows:a,summary:o,terminology:c,difficulty:l="medium",basis:h="original schedule study",references:d=[],startingPhase:u="documented convention",inventoryAllocation:p,inventoryMode:g}){let M=a.flatMap((m,f)=>Object.entries(m).map(([S,T])=>lt(f,S,T.hand,T.kind,T.target||S,{path:T.path||(T.kind==="pass"?"straight":"self"),note:T.note||"",flightBeats:T.flightBeats,spins:T.spins,catchHand:T.catchHand})));return Zs({id:n,title:e,peopleCount:t.length,formation:i,clubCount:s,summary:o,tempo:r,loopBeats:a.length,performers:t,events:_t(M),countIn:$r,terminology:c,difficulty:l,basis:h,startingPhase:u,inventoryAllocation:p,inventoryMode:g,provenance:Zr(h==="source-backed"?"Original event schedule based on independently researched timing facts; no source prose, diagrams, graphics, code, or bulk data copied.":"Original explicit schedule study. It is a reviewable convention, not a claim of a canonical published start.",d)})}function St({id:n,title:e,people:t,formation:i,sequence:s,step:r=1,summary:a,terminology:o,difficulty:c="medium",basis:l="original schedule study",references:h=[]}){let d=s.map(({kind:u,hand:p},g)=>Object.fromEntries(t.map((M,m)=>[M.id,J(u,u==="pass"?t[(m+r+t.length)%t.length].id:M.id,p||((g+m)%2?"right":"left"),{path:u==="pass"?Math.abs(r)>1?"crossing":"straight":"self"})])));return ii({id:n,title:e,people:t,formation:i,clubCount:t.length*3,rows:d,summary:a,terminology:o,difficulty:c,basis:l,references:h})}var _c=_t([zt("feeder","Feeder",-3.15,1.1,24),zt("receiver-a","Receiver A",1.9,.35,-150),zt("receiver-b","Receiver B",2.85,2.05,-145)]),rs=_t([zt("a","A",0,2.6,180),zt("b","B",-2.35,.55,60),zt("c","C",2.35,.55,-60)]),cx=_t([lt(0,"feeder","left","pass","receiver-a",{path:"straight",note:"Opening feed to nearer audience-right receiver."}),lt(0,"receiver-a","left","hold","receiver-a",{flightBeats:0,spins:0,note:"Receive opening feed."}),lt(0,"receiver-b","left","self","receiver-b",{path:"self",note:"Opening self-throw: left."}),lt(1,"feeder","right","pass","receiver-a",{path:"straight",note:"Second opening feed."}),lt(1,"receiver-a","right","hold","receiver-a",{flightBeats:0,spins:0}),lt(1,"receiver-b","right","self","receiver-b",{path:"self",note:"Opening self-throw: right."}),lt(2,"feeder","left","pass","receiver-b",{path:"straight",note:"Feed changes to deeper audience-right receiver."}),lt(2,"receiver-a","left","self","receiver-a",{path:"self"}),lt(2,"receiver-b","left","hold","receiver-b",{flightBeats:0,spins:0}),lt(3,"feeder","right","pass","receiver-a",{path:"straight"}),lt(3,"receiver-a","right","hold","receiver-a",{flightBeats:0,spins:0}),lt(3,"receiver-b","right","self","receiver-b",{path:"self"})]),Pd=_t([vn("one-count","1-count \xB7 Ultimates",[{kind:"pass",hand:"right"},{kind:"pass",hand:"left"}],"A facing-pair all-pass schedule; both pass right, then left.","1-count / Ultimates"),vn("two-count","2-count \xB7 Everies",[{kind:"pass",hand:"right"},{kind:"self",hand:"left"}],"A facing-pair schedule: a same-hand pass followed by a self-throw.","2-count / Everies"),vn("three-count","3-count \xB7 Waltz",[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"},{kind:"pass",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"}],"A facing-pair waltz schedule: pass, self, self, with alternating pass hands across six beats.","3-count / Waltz"),vn("four-count","4-count \xB7 Every Others",[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"}],"A facing-pair schedule with a one-sided pass followed by three self-throws.","4-count / Every Others"),vn("pps","PPS",[{kind:"pass",hand:"right"},{kind:"pass",hand:"left"},{kind:"self",hand:"right"}],"A compact facing-pair pass, pass, self schedule.","PPS","medium"),vn("bookends","Bookends",[{kind:"pass",hand:"right"},{kind:"pass",hand:"left"},{kind:"self",hand:"right"},{kind:"pass",hand:"left"},{kind:"self",hand:"right"}],"A five-beat facing-pair schedule with paired pass beats framing the self work.","Bookends","medium"),vn("countdown","Countdown",[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"},{kind:"pass",hand:"left"},{kind:"self",hand:"right"},{kind:"pass",hand:"left"},{kind:"pass",hand:"right"},{kind:"self",hand:"left"}],"An eight-beat facing-pair schedule that contracts self spacing into paired passes.","Countdown","hard"),vn("one-count-left","1-count \xB7 left-start practice",[{kind:"pass",hand:"left"},{kind:"pass",hand:"right"}],"A start-phase practice variation of 1-count; the event truth begins on the left hand.","1-count practice variation","easy","original schedule study"),vn("two-count-left","2-count \xB7 left-start practice",[{kind:"pass",hand:"left"},{kind:"self",hand:"right"}],"A start-phase practice variation of 2-count; the event truth begins on the left hand.","2-count practice variation","easy","original schedule study"),vn("three-count-left","3-count \xB7 left-start practice",[{kind:"pass",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"},{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],"A start-phase practice variation of the waltz schedule.","3-count practice variation","medium","original schedule study"),vn("four-count-left","4-count \xB7 left-start practice",[{kind:"pass",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],"A start-phase practice variation of Every Others.","4-count practice variation","easy","original schedule study"),vn("pps-left","PPS \xB7 left-start practice",[{kind:"pass",hand:"left"},{kind:"pass",hand:"right"},{kind:"self",hand:"left"}],"A start-phase practice variation of PPS.","PPS practice variation","medium","original schedule study"),Zs({id:"v-feed-2-4",title:"V feed \u2014 2-count / 4-count",peopleCount:3,formation:"V",clubCount:9,summary:"Canonical three-person feed clock: Feeder exchanges with Receiver A, then enters Receiver B two beats later while the other receiver self-throws.",tempo:92,loopBeats:4,performers:_c,events:_t([lt(0,"feeder","right","pass","receiver-a",{path:"straight",note:"Opening feed exchange."}),lt(0,"receiver-a","right","pass","feeder",{path:"straight",note:"Opening feed exchange."}),lt(0,"receiver-b","right","self","receiver-b",{path:"self"}),lt(1,"feeder","left","self","feeder",{path:"self"}),lt(1,"receiver-a","left","self","receiver-a",{path:"self"}),lt(1,"receiver-b","left","self","receiver-b",{path:"self"}),lt(2,"feeder","right","pass","receiver-b",{path:"straight",note:"Feed enters Receiver B."}),lt(2,"receiver-a","right","self","receiver-a",{path:"self"}),lt(2,"receiver-b","right","pass","feeder",{path:"straight",note:"Feed return."}),lt(3,"feeder","left","self","feeder",{path:"self"}),lt(3,"receiver-a","left","self","receiver-a",{path:"self"}),lt(3,"receiver-b","left","self","receiver-b",{path:"self"})]),countIn:$r,terminology:"V formation; 2-count / 4-count feed",difficulty:"medium",basis:"source-backed",startingPhase:"synchronised documented feed start",provenance:Zr("Original schedule transcription from independently researched timing facts; no source diagrams or prose copied.",[Bn[1],Bn[2]])}),Zs({id:"stage-v-opening",title:"Stage V opening \u2014 visual variant",peopleCount:3,formation:"V",clubCount:3,summary:"The established Stage Lab opening: two feeds to Receiver A while Receiver B self-throws left/right, then the feeder alternates targets.",tempo:92,loopBeats:4,performers:_c,events:cx,countIn:$r,inventoryAllocation:_t({feeder:1,"receiver-a":1,"receiver-b":1}),inventoryMode:"visual-study",terminology:"staged V-feed variant",difficulty:"medium",basis:"user-specified visual variant",startingPhase:"Sky/Earth/Pass stage opening",provenance:Zr("User-specified Stage Lab choreography. It intentionally alternates the feeder's hands and is not labelled canonical 2-count/4-count feed.",[])}),ii({id:"directed-triangle-waltz",title:"Directed 3-count triangle",people:rs,formation:"triangle",clubCount:10,tempo:100,summary:"A three-person PSS triangle clock with staggered pass phases A\u2192B\u2192C\u2192A.",terminology:"3-count triangle",difficulty:"medium",basis:"source-backed",references:[Bn[1]],inventoryAllocation:_t({a:4,b:3,c:3}),rows:[{a:J("pass","b","right"),b:J("self","b","right"),c:J("self","c","right")},{a:J("self","a","left"),b:J("pass","c","right"),c:J("self","c","left")},{a:J("self","a","right"),b:J("self","b","left"),c:J("pass","a","right")}]}),ii({id:"v-one-half-feed-study",title:"V 1/2 feed \xB7 schedule study",people:_c,formation:"V",clubCount:9,tempo:96,summary:"A clear alternating feeder study: the feeder passes A then B while the active receiver returns and the other self-throws.",terminology:"1/2 feed",difficulty:"medium",rows:[{feeder:J("pass","receiver-a","right"),"receiver-a":J("pass","feeder","right"),"receiver-b":J("self","receiver-b","right")},{feeder:J("pass","receiver-b","left"),"receiver-a":J("self","receiver-a","left"),"receiver-b":J("pass","feeder","left")}]}),ii({id:"v-pps-feed-study",title:"V PPS / 3-count feed \xB7 schedule study",people:_c,formation:"V",clubCount:9,tempo:92,summary:"A three-beat feeder study: pass A, pass B, self; the receivers use staggered PSS response rows.",terminology:"PPS / 3-count feed",difficulty:"hard",rows:[{feeder:J("pass","receiver-a","right"),"receiver-a":J("pass","feeder","right"),"receiver-b":J("self","receiver-b","right")},{feeder:J("pass","receiver-b","left"),"receiver-a":J("self","receiver-a","left"),"receiver-b":J("pass","feeder","left")},{feeder:J("self","feeder","right"),"receiver-a":J("self","receiver-a","right"),"receiver-b":J("self","receiver-b","right")}]}),St({id:"inside-triangle-study",title:"Inside 3-count triangle \xB7 schedule study",people:rs,formation:"triangle",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],step:-1,summary:"An original PSS triangle schedule with the short/inside directional route shown consistently.",terminology:"inside 3-count triangle",difficulty:"medium"}),St({id:"outside-triangle-study",title:"Outside 3-count triangle \xB7 schedule study",people:rs,formation:"triangle",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],step:1,summary:"An original PSS triangle schedule with the opposite/outside directional route shown consistently.",terminology:"outside 3-count triangle",difficulty:"medium"}),ii({id:"triangle-pair-self-study",title:"Triangle pair / self \xB7 schedule study",people:rs,formation:"triangle",clubCount:9,tempo:96,summary:"A simple triangle study: one pair exchanges while the third juggler self-throws, then roles rotate.",terminology:"triangle pair / self",difficulty:"easy",rows:[{a:J("pass","b","right"),b:J("pass","a","right"),c:J("self","c","right")},{a:J("self","a","left"),b:J("pass","c","left"),c:J("pass","b","left")},{a:J("pass","c","right"),b:J("self","b","right"),c:J("pass","a","right")}]}),St({id:"three-feast-one-study",title:"3-person feast \xB7 1-count convention",people:rs,formation:"triangle",sequence:[{kind:"pass",hand:"right"}],summary:"An explicit all-pass ring convention for reviewing a three-person feast-style clock.",terminology:"three-person feast",difficulty:"medium"}),St({id:"three-feast-three-study",title:"3-person feast \xB7 3-count convention",people:rs,formation:"triangle",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],summary:"An explicit PSS ring convention for reviewing a three-person feast-style clock.",terminology:"three-person feast",difficulty:"hard"}),St({id:"triangle-all-pass-reverse-study",title:"Triangle all-pass reverse \xB7 study",people:rs,formation:"triangle",sequence:[{kind:"pass",hand:"left"}],step:-1,summary:"A mirrored three-person all-pass convention with an explicit reverse target order.",terminology:"triangle all-pass reverse",difficulty:"easy"}),mh("three-round","3-person all-pass round \xB7 study",3,[[0,2.6,180],[-2.35,.55,60],[2.35,.55,-60]],"An original all-pass round study, included as a clear 3-person formation example."),mh("four-round","4-person all-pass round \xB7 study",4,[[0,3.05,180],[-3.05,1.45,90],[0,-.15,0],[3.05,1.45,-90]],"An original all-pass round study, included as a clear 4-person formation example."),ii({id:"double-pps-cross-feed",title:"Double PPS cross feed",people:Fn,formation:"square",clubCount:12,tempo:104,summary:"A four-person PPS cross-feed clock with two alternating target relationships shown as a stable square convention.",terminology:"PPS cross feed / double 3-count",difficulty:"hard",basis:"source-backed",references:[Bn[3]],rows:[{a:J("pass","c","right"),b:J("pass","d","right"),c:J("pass","a","right"),d:J("pass","b","right")},{a:J("pass","b","left"),b:J("self","b","left"),c:J("pass","d","left"),d:J("self","d","left")},{a:J("self","a","right"),b:J("pass","a","right"),c:J("self","c","right"),d:J("pass","c","right")}]}),ii({id:"three-count-accommodation",title:"3-count Accommodation \xB7 mixed-count square",people:Fn,formation:"square",clubCount:12,tempo:96,summary:"A six-beat square schedule with explicit mixed roles: 3-count, PPS, right-hand 2-count, and left-hand 2-count.",terminology:"3-count Accommodation",difficulty:"hard",basis:"source-backed",references:[Bn[3]],rows:[{a:J("pass","c","right"),b:J("self","b","right"),c:J("pass","a","right"),d:J("self","d","right")},{a:J("self","a","left"),b:J("pass","d","left"),c:J("self","c","left"),d:J("pass","b","left")},{a:J("self","a","right"),b:J("pass","c","right"),c:J("pass","b","right"),d:J("self","d","right")},{a:J("pass","d","left"),b:J("self","b","left"),c:J("self","c","left"),d:J("pass","a","left")},{a:J("self","a","right"),b:J("pass","c","right"),c:J("pass","b","right"),d:J("self","d","right")},{a:J("self","a","left"),b:J("pass","d","left"),c:J("self","c","left"),d:J("pass","b","left")}]}),ii({id:"one-count-feeder-study",title:"One-count feeder + three 3-count feedees \xB7 study",people:Fn,formation:"fan",clubCount:12,tempo:96,summary:"A rate-balanced feeder study: A passes every beat through B/C/D while the three feedees use phase-offset PSS rows.",terminology:"one-count feeder / three 3-count feedees",difficulty:"hard",rows:[{a:J("pass","b","right"),b:J("pass","a","right"),c:J("self","c","right"),d:J("self","d","right")},{a:J("pass","c","left"),b:J("self","b","left"),c:J("pass","a","left"),d:J("self","d","left")},{a:J("pass","d","right"),b:J("self","b","right"),c:J("self","c","right"),d:J("pass","a","right")}]}),St({id:"four-feast-one-study",title:"4-person feast \xB7 1-count convention",people:Fn,formation:"square",sequence:[{kind:"pass",hand:"right"}],summary:"An explicit all-pass square convention for reviewing a four-person feast-style clock.",terminology:"four-person feast",difficulty:"medium"}),St({id:"four-feast-two-study",title:"4-person feast \xB7 2-count convention",people:Fn,formation:"square",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"}],summary:"An explicit pass/self square convention for reviewing a four-person feast-style clock.",terminology:"four-person feast",difficulty:"medium"}),St({id:"four-feast-three-study",title:"4-person feast \xB7 3-count convention",people:Fn,formation:"square",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],summary:"An explicit PSS square convention for reviewing a four-person feast-style clock.",terminology:"four-person feast",difficulty:"hard"}),St({id:"square-waltz-study",title:"Square 3-count circuit \xB7 study",people:Fn,formation:"square",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],summary:"An original clockwise PSS square circuit with a clearly defined target order.",terminology:"square 3-count circuit",difficulty:"medium"}),St({id:"square-waltz-reverse-study",title:"Square 3-count reverse circuit \xB7 study",people:Fn,formation:"square",sequence:[{kind:"pass",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"}],step:-1,summary:"The mirrored/reverse explicit PSS square convention.",terminology:"square 3-count reverse circuit",difficulty:"medium"}),ii({id:"square-pair-relay-study",title:"Square pair relay \xB7 study",people:Fn,formation:"square",clubCount:12,tempo:98,summary:"Pairs exchange on one beat while the other pair self-throws; the active pair rotates around the square.",terminology:"square pair relay",difficulty:"easy",rows:[{a:J("pass","b","right"),b:J("pass","a","right"),c:J("self","c","right"),d:J("self","d","right")},{a:J("self","a","left"),b:J("pass","c","left"),c:J("pass","b","left"),d:J("self","d","left")},{a:J("self","a","right"),b:J("self","b","right"),c:J("pass","d","right"),d:J("pass","c","right")},{a:J("pass","d","left"),b:J("self","b","left"),c:J("self","c","left"),d:J("pass","a","left")}]}),St({id:"square-all-pass-reverse-study",title:"Square all-pass reverse \xB7 study",people:Fn,formation:"square",sequence:[{kind:"pass",hand:"left"}],step:-1,summary:"A mirrored all-pass square convention with an explicit reverse target order.",terminology:"square all-pass reverse",difficulty:"easy"}),St({id:"square-four-count-study",title:"Square 4-count circuit \xB7 study",people:Fn,formation:"square",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"}],summary:"An original PSSS square circuit with its route and hand sequence explicitly shown.",terminology:"square 4-count circuit",difficulty:"medium"}),mh("five-round","5-person all-pass round \xB7 study",5,[[0,3.25,180],[-3.1,2,126],[-1.9,-.15,36],[1.9,-.15,-36],[3.1,2,-126]],"An original all-pass round study, included as a clear 5-person formation example."),St({id:"five-star-one",title:"5-person star \xB7 1-count",people:On,formation:"star",sequence:[{kind:"pass",hand:"right"}],step:2,summary:"A one-count pentagram route. The data order is A\u2192C\u2192E\u2192B\u2192D\u2192A.",terminology:"1-count star",difficulty:"medium",basis:"source-backed",references:[Bn[3]]}),St({id:"five-star-two",title:"5-person star \xB7 2-count",people:On,formation:"star",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"}],step:2,summary:"A pass/self pentagram route using the explicit A\u2192C\u2192E\u2192B\u2192D\u2192A target order.",terminology:"2-count star",difficulty:"medium",basis:"source-backed",references:[Bn[3]]}),St({id:"five-star-three",title:"5-person star \xB7 3-count",people:On,formation:"star",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],step:2,summary:"A PSS pentagram route using the explicit A\u2192C\u2192E\u2192B\u2192D\u2192A target order.",terminology:"3-count star",difficulty:"hard",basis:"source-backed",references:[Bn[3]]}),St({id:"five-star-four",title:"5-person star \xB7 4-count",people:On,formation:"star",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"}],step:2,summary:"A PSSS pentagram route using the explicit A\u2192C\u2192E\u2192B\u2192D\u2192A target order.",terminology:"4-count star",difficulty:"hard",basis:"source-backed",references:[Bn[3]]}),St({id:"five-feast-one-study",title:"5-person feast \xB7 1-count convention",people:On,formation:"pentagon",sequence:[{kind:"pass",hand:"right"}],summary:"An explicit all-pass five-person ring convention for feast-style review.",terminology:"five-person feast",difficulty:"medium"}),St({id:"five-feast-two-study",title:"5-person feast \xB7 2-count convention",people:On,formation:"pentagon",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"}],summary:"An explicit pass/self five-person ring convention for feast-style review.",terminology:"five-person feast",difficulty:"medium"}),St({id:"five-feast-three-study",title:"5-person feast \xB7 3-count convention",people:On,formation:"pentagon",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"}],summary:"An explicit PSS five-person ring convention for feast-style review.",terminology:"five-person feast",difficulty:"hard"}),St({id:"five-feast-four-study",title:"5-person feast \xB7 4-count convention",people:On,formation:"pentagon",sequence:[{kind:"pass",hand:"right"},{kind:"self",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"}],summary:"An explicit PSSS five-person ring convention for feast-style review.",terminology:"five-person feast",difficulty:"hard"}),St({id:"five-pentagon-waltz-reverse-study",title:"5-person reverse 3-count circuit \xB7 study",people:On,formation:"pentagon",sequence:[{kind:"pass",hand:"left"},{kind:"self",hand:"right"},{kind:"self",hand:"left"}],step:-1,summary:"A mirrored PSS pentagon convention with a stable reverse target order.",terminology:"five-person 3-count circuit",difficulty:"medium"}),St({id:"five-pentagon-all-pass-reverse-study",title:"5-person all-pass reverse \xB7 study",people:On,formation:"pentagon",sequence:[{kind:"pass",hand:"left"}],step:-1,summary:"A mirrored all-pass pentagon convention with a stable reverse target order.",terminology:"five-person all-pass circuit",difficulty:"easy"}),ii({id:"five-pentagon-pair-relay-study",title:"5-person pentagon pair relay \xB7 study",people:On,formation:"pentagon",clubCount:15,tempo:94,summary:"An original five-person relay convention: one passing pair steps around the pentagon while the remaining players self-throw.",terminology:"pentagon pair relay",difficulty:"medium",rows:[{a:J("pass","b","right"),b:J("pass","a","right"),c:J("self","c","right"),d:J("self","d","right"),e:J("self","e","right")},{a:J("self","a","left"),b:J("pass","c","left"),c:J("pass","b","left"),d:J("self","d","left"),e:J("self","e","left")},{a:J("self","a","right"),b:J("self","b","right"),c:J("pass","d","right"),d:J("pass","c","right"),e:J("self","e","right")},{a:J("self","a","left"),b:J("self","b","left"),c:J("self","c","left"),d:J("pass","e","left"),e:J("pass","d","left")},{a:J("pass","e","right"),b:J("self","b","right"),c:J("self","c","right"),d:J("self","d","right"),e:J("pass","a","right")}]})]),cb=_t([_t({peopleCount:5,formation:"pentagon",title:"Chocolate Box",difficulty:"hard",reason:"Named pattern retained for later: its exact event routing/start convention has not been independently verified for this library yet."}),_t({peopleCount:3,formation:"triangle",title:"Triangle circuit / pair / self",difficulty:"medium",reason:"Keep as a future named card once its preferred community start convention is independently validated."})]);function Js(n){return Pd.find(e=>e.id===n)||Pd[0]}function gh(n,e){let t=(Math.floor(e)%n.loopBeats+n.loopBeats)%n.loopBeats;return n.events.filter(i=>i.beat===t)}var tr="four-count",bc=Object.freeze(["one-count","two-count","three-count",tr]),lx=16,gi=9.80665,Kr=1.7526,hx=.052,wc=Kr-hx,ux=.5485,Ud=1.1,vh=.75,Fd=.96,Ec=1.44,dx=Ec+.2515,Tc=.5,as=Object.freeze({catch:.12,return:.28,ready:.12,forwardLoad:.48}),ps=3,Od=(n,e)=>{let t=Math.sqrt(2*gi*(wc-n));return(t+Math.sqrt(t**2-2*gi*(e-n)))/gi},Qs=Od(Ud,Fd),xc=Qs/((Qs+Tc)/ps),ms=(Qs+Tc)/ps,fx=60/ms,Ac=Tc*as.forwardLoad,Mh=Ac/ms,ub=Math.sqrt(2*gi*(wc-vh)),Rc=Od(vh,dx),yc=Rc/ms;var px=ps*ms,db=Object.freeze([.25,.5,1]),mx=Math.PI*3;var gx=Math.PI*2,cs=Object.freeze({id:"passing-four-count-diagonal-grip-v1",units:"metres-radians",clubAxis:"local +Y, knob/handle toward cap/body",grip:"handle/knob seam; palm centre contacts this seam with no gap",knobTipFromBalanceMetres:.28,gripFromBalanceMetres:.2515,capTipFromBalanceMetres:.235,elevationRadians:Math.PI/4,crossBodyYawRadians:Math.PI/4,spinSemantics:"selfs retain their signed local diagonal handling track; each pass begins body-down, spins a signed 3pi in its real path-aligned vertical plane, and arrives body-up at the receiver seam catch without an airborne frame blend or reversal",rationale:"The requested 3pi airborne count remains intact. A pass uses the actual partner path for its end-over-end plane, so the vertical-up catch follows from the physical rotation rather than a hidden receiver-frame snap."}),ls=Kr/1.965/10,Bd=(16.55-.5)*ls,_x=16.55*ls,xx=ls,yx=(.7+(.58-.7)*((Ec-Bd)/xx))*ls,Ks=Object.freeze({id:"passing-four-count-clavicle-acromion-shoulders-v1",units:"metres",scope:"schematic rendered shoulder anatomy guard; not a biomechanical measurement",shoulderJointRadiusMetres:.062,upperArmShoulderRadiusMetres:.052,upperArmElbowRadiusMetres:.0468,shoulderCentreSideMetres:.23,shoulderCentreForwardMetres:-.015,shoulderCentreHeightMetres:Ec,neckBaseHeightMetres:Bd,neckCentreHeightMetres:_x,neckFrontSilhouetteMetres:yx,upperTorsoTopHeightMetres:(10.8+6.2/2+1.8)*ls,upperTorsoOuterHalfWidthMetres:1.92*ls,upperTorsoFrontSilhouetteMetres:1.8*ls,maximumShoulderCentreForwardMetres:0,maximumShoulderSurfacePastNeckMetres:0,minimumAcromionTorsoOverlapMetres:.002,maximumAcromionTorsoOverlapMetres:.03,minimumAcromionVerticalOverlapMetres:.01,maximumAcromionVerticalOverlapMetres:.04,maximumShoulderCentreHeightFromNeckBaseMetres:.02,policy:"shoulder centres flank the base of the neck at the top/outer torso, remain torso-owned and quiet, and never project their rendered surface ahead of the neck silhouette"}),$e=Object.freeze({units:"metres",stageWidth:7.2,stageDepth:4.8,prosceniumHeight:3.8,adultJugglerHeightMetres:Kr,personRigScale:Kr/1.965,shoulderHeightMetres:Ks.shoulderCentreHeightMetres,shoulderSideMetres:Ks.shoulderCentreSideMetres,shoulderForwardMetres:Ks.shoulderCentreForwardMetres,readySideMetres:.54,readyForwardMetres:.36,throwReleaseSideMetres:.4,throwReleaseForwardMetres:.62,passThrowReleaseSideMetres:.14,passCatchSideMetres:.34,throwReleaseBalanceHeightMetres:Ud,passThrowReleaseBalanceHeightMetres:vh,selfCatchSideMetres:.42,selfCatchForwardMetres:.56,selfCatchBalanceHeightMetres:Fd,cascadePlaneDepthMetres:.17,selfFrontSweepMetres:.15,readyBalanceHeightMetres:ux,balanceApexHeightMetres:wc,selfFlightSeconds:Qs,passFlightSeconds:Rc,passCatchForwardMetres:.3048,cascadeOriginY:1.248,people:Object.freeze([Object.freeze({id:"left",name:"Left / A",position:Object.freeze({x:-1.375,y:0,z:0}),headingRadians:Math.PI/2}),Object.freeze({id:"right",name:"Right / B",position:Object.freeze({x:1.375,y:0,z:0}),headingRadians:-Math.PI/2})])}),jr=Object.freeze({units:"metres",clubKnobReachMetres:.28,clubCapReachMetres:.235,clubOuterRadiusMetres:.045,requiredClearanceMetres:.025,torsoCapsule:Object.freeze({bottomHeightMetres:.58,topHeightMetres:1.4,radiusMetres:.2}),headSphere:Object.freeze({centerHeightMetres:1.61,radiusMetres:.165})}),js=Object.freeze({id:"passing-four-count-human-anchor-v1",seed:"passing-four-count-human-anchor-v1",units:"metres",maximumAnchorOffsetMetres:.052,torsoMaximumMetres:.018,handMaximumMetres:.038,clubMaximumMetres:.008,periodsBeats:Object.freeze([11,13,17]),method:"deterministic smooth periodic sine/cosine components keyed by performer, hand, and club; no frame-random noise"}),vx=Object.freeze({id:"passing-four-count-body-side-elbows-v2",units:"metres-radians",scope:"schematic rendered-arm readability guard; not biomechanical measurement",waistSideRest:Object.freeze({outwardMetres:.305,forwardMetres:-.05,heightMetres:.985}),independentExcursion:Object.freeze({lateralMetres:.01,forwardMetres:.004,verticalMetres:.016}),elbowJointRadiusMetres:.049,maximumVisibleElbowFrontMetres:.005,minElbowFrontMetres:-.054,maxElbowFrontMetres:-.046,minElbowOutwardMetres:.295,maxElbowOutwardMetres:.315,minElbowHeightMetres:.969,maxElbowHeightMetres:1.001,maximumElbowExcursionFromRestMetres:.024,maximumUpperArmVisualMetres:.51,maximumForearmVisualMetres:.8,maximumElbowExtensionRadians:2.6,policy:"elbows remain at the body sides near waist height, with only a tiny torso-owned excursion; hands and forearms perform the juggling stroke"}),Cc=Object.freeze({id:"passing-four-count-whole-arm-sky-earth-v15",units:"metres-beats-radians",skyStaggerBeats:.075,skyTravelBeats:.78,skyLiftMetres:.58,skySideInwardMetres:.07,skyForwardMetres:.045,swingArcForwardMetres:.175,swingArcSideMetres:.06,skyElbowOutwardMetres:.415,skyElbowForwardMetres:.175,skyElbowHeightMetres:1.345,maximumSkyElbowExcursionMetres:.55,maximumSecondaryBundleGripOffsetMetres:.055,policy:"Sky raises with a small per-person stagger; Earth descends in one synchronized whole-arm swing; the forward load begins from the same down-side seam pose"}),Mx=Object.freeze(["count-in","ready","forward-load","release","flight","catch","return"]),gn=Math.PI*2,It=Object.freeze({x:0,y:1,z:0}),Ke=Object.freeze({x:0,y:-1,z:0}),se=n=>Object.freeze(n),nr=(n,e=0)=>Number.isFinite(Number(n))?Number(n):e,xt=(n,e,t)=>Math.max(e,Math.min(t,n)),_h=(n,e)=>(n%e+e)%e,os=(n,e,t)=>n+(e-n)*t,Jr=n=>{let e=xt(n,0,1);return e*e*(3-2*e)},Id=n=>{let e=xt(n,0,1);return e**3*(e*(e*6-15)+10)},Qe=(n=0,e=0,t=0)=>({x:n,y:e,z:t}),ve=(n,e)=>Qe(n.x+e.x,n.y+e.y,n.z+e.z),bt=(n,e)=>Qe(n.x-e.x,n.y-e.y,n.z-e.z),De=(n,e)=>Qe(n.x*e,n.y*e,n.z*e),Kt=(n,e)=>n.x*e.x+n.y*e.y+n.z*e.z,Qr=(n,e)=>Qe(n.y*e.z-n.z*e.y,n.z*e.x-n.x*e.z,n.x*e.y-n.y*e.x),zn=n=>Math.hypot(n.x,n.y,n.z),pt=(n,e=It)=>{let t=zn(n);return t>1e-9?De(n,1/t):{...e}},hs=(n,e,t)=>Qe(os(n.x,e.x,t),os(n.y,e.y,t),os(n.z,e.z,t)),rt=n=>Qe(n.x,n.y,n.z),kt=new Map($e.people.map(n=>[n.id,n])),Sx=n=>n==="left"?"right":"left";function Pc(n){let e=typeof n=="string"?kt.get(n):n;if(!e||!kt.has(e.id))throw new RangeError("known four-count participant is required");let t=kt.get(Sx(e.id)),i=pt(bt(t.position,e.position),Qe(Math.sin(e.headingRadians),0,-Math.cos(e.headingRadians))),s=pt(Qr(i,It),Qe(Math.cos(e.headingRadians),0,Math.sin(e.headingRadians))),r=Math.atan2(i.x,-i.z);return se({personId:e.id,partnerId:t.id,forward:se(rt(i)),right:se(rt(s)),headingRadians:r,visualYawRadians:-r})}var Wt=n=>Pc(n).forward,Mn=n=>Pc(n).right,Ic=n=>{if(n==="right")return 1;if(n==="left")return-1;throw new RangeError("left or right hand is required")};function bx(n){let e=Js(n);if(!bc.includes(n))throw new RangeError(`unsupported physical two-person pattern: ${n}`);if(e.peopleCount!==2||e.clubCount!==6||e.performers.length!==2)throw new RangeError(`${n} must remain a 2-person, six-club pattern`);let t=e.performers.map(s=>s.id);if(!t.includes("left")||!t.includes("right"))throw new RangeError(`${n} must retain the declared left/right facing-pair identities`);let i=Array.from({length:e.loopBeats},(s,r)=>{let a=e.events.filter(h=>h.beat===r);if(a.length!==2||new Set(a.map(h=>h.juggler)).size!==2)throw new RangeError(`${n} beat ${r} must declare one event for each participant`);let o=Object.fromEntries(a.map(h=>[h.juggler,h])),c=o.left,l=o.right;if(!c||!l||c.kind==="hold"||l.kind==="hold"||c.kind!==l.kind||c.hand!==l.hand||c.catchHand!==l.catchHand)throw new RangeError(`${n} beat ${r} is not a synchronized facing-pair event row`);for(let h of a){let d=h.kind==="pass"?h.juggler==="left"?"right":"left":h.juggler;if(h.target!==d)throw new RangeError(`${n} beat ${r} must retain its declared ${h.kind} target`)}return Object.freeze({phraseBeat:r,kind:c.kind,hand:c.hand,catchHand:c.catchHand,label:c.kind==="pass"?`synchronised ${c.hand}-hand 540\xB0 single pass`:`${c.hand} self`,events:Object.freeze({left:c,right:l})})});return Object.freeze({patternId:n,title:e.title,loopBeats:e.loopBeats,people:Object.freeze(t),schedule:Object.freeze(i)})}var wx=Object.freeze(Object.fromEntries(bc.map(n=>[n,bx(n)])));function Lc(n=tr){let e=wx[n];if(!e)throw new RangeError(`unsupported physical two-person pattern: ${n}`);return e}var fb=Lc(tr).schedule;function xh(n,e){let t=typeof n=="string"?kt.get(n):n;if(!t||!kt.has(t.id))throw new RangeError("known four-count participant is required");let i=pt(bt(Wt(t),De(Mn(t),Ic(e))),Wt(t));return se(rt(pt(ve(i,It),It)))}function zd(n,e){let t=pt(e,Ke);return{knobPosition:ve(n,De(t,-cs.gripFromBalanceMetres)),knobTipPosition:ve(n,De(t,-cs.knobTipFromBalanceMetres)),capPosition:ve(n,De(t,cs.capTipFromBalanceMetres))}}function kn(n,e){return zd(n,e).knobPosition}function ea(n,e){return ve(n,De(pt(e,Ke),cs.gripFromBalanceMetres))}var Vi=Object.freeze({id:"passing-four-count-cyclopean-eye-v1",units:"metres-degrees",eyeHeightMetres:1.642,eyeForwardMetres:.12665,gazeForwardMetres:1.6,gazeDownMetres:.75,fovDegrees:100,semantics:"cyclopean eye at the named participant's sampled eye position, gazing down the real partner-facing line at the working/catch zone"});function kd(n,e){return ve(ve(n,De(e,Vi.gazeForwardMetres)),Qe(0,-Vi.gazeDownMetres,0))}function Ld(n){let e=kt.get(n),t=Pc(e),i=ve(ve(e.position,Qe(0,Vi.eyeHeightMetres,0)),De(t.forward,Vi.eyeForwardMetres));return se({id:e.id,ownerPersonId:e.id,viewKind:"first-person",label:`${e.name} first-person view`,semantics:`${e.name} ${Vi.semantics}`,position:se(i),target:se(kd(i,t.forward)),fov:Vi.fovDegrees})}var Dd=Object.freeze({audience:Object.freeze({id:"audience",viewKind:"audience",label:"Audience view",semantics:"front-of-stage observer camera",position:Object.freeze({x:0,y:2.45,z:8.8}),target:Object.freeze({x:0,y:1.4,z:0}),fov:29}),left:Ld("left"),right:Ld("right")}),Ex=n=>{let e=2166136261;for(let t of String(n))e^=t.charCodeAt(0),e=Math.imul(e,16777619);return(e>>>0)/4294967296},vc=n=>Ex(`${js.seed}:${n}`)*gn,Vd=(n,e)=>{let t=zn(n);return t>e?De(n,e/t):n};function ta(n,e){let t=nr(e),i=vc(`torso:${n}`),s=kt.get(n);if(!s)throw new RangeError("known person is required");let r=Mn(s),a=Wt(s),o=ve(De(r,Math.sin(gn*t/js.periodsBeats[1]+i)*.012),De(a,Math.cos(gn*t/js.periodsBeats[2]+i*1.7)*.01));return Vd(ve(o,Qe(0,Math.sin(gn*t/17+i*.6)*.006,0)),js.torsoMaximumMetres)}function Tx({personId:n,hand:e,clubId:t="hand",playheadBeats:i}){let s=nr(i),r=kt.get(n);if(!r||e!=="left"&&e!=="right")throw new RangeError("known person and left/right hand are required");let a=Mn(r),o=Wt(r),c=vc(`hand:${n}:${e}`),l=vc(`club:${t}`),h=ve(De(a,Math.sin(gn*s/11+c)*.022),De(o,Math.cos(gn*s/13+c*1.4)*.022)),d=Qe(0,Math.sin(gn*s/17+c*.5)*.015,0),u=ve(De(a,Math.sin(gn*s/13+l)*.004),De(o,Math.cos(gn*s/17+l*1.9)*.004));return ve(ve(h,d),u)}function Dc({personId:n,hand:e,clubId:t="hand",playheadBeats:i}){let s=nr(i);return Vd(ve(ta(n,s),Tx({personId:n,hand:e,clubId:t,playheadBeats:s})),js.maximumAnchorOffsetMetres)}function Mc(n,e,t){let i=kt.get(n),s=e==="left"?-1:1;return ve(ve(ve(ve(i.position,ta(n,t)),De(Mn(i),s*$e.shoulderSideMetres)),De(Wt(i),$e.shoulderForwardMetres)),Qe(0,$e.shoulderHeightMetres,0))}function yh(n,e,t,i,s,r){let a=Ic(t),o=Mn(n),c=Wt(n),l=vx,h=ve(ve(ve(e,De(o,a*l.waistSideRest.outwardMetres)),De(c,l.waistSideRest.forwardMetres)),Qe(0,l.waistSideRest.heightMetres,0)),d=nr(r),u=vc(`elbow:${n.id}:${t}`),p=Math.sin(gn*d/17+u)*l.independentExcursion.lateralMetres,g=Math.cos(gn*d/13+u*1.2)*l.independentExcursion.forwardMetres,M=Math.sin(gn*d/11+u*.7)*l.independentExcursion.verticalMetres,m=ve(ve(ve(h,De(o,a*p)),De(c,g)),Qe(0,M,0)),f=bt(m,i),S=bt(s,m),T=De(f,-1),v=Math.acos(xt(Kt(pt(T,It),pt(S,Ke)),-1,1));return{elbow:m,rest:h,excursionMetres:zn(bt(m,h)),local:{frontMetres:Kt(bt(m,e),c),outwardMetres:a*Kt(bt(m,e),o),heightMetres:m.y-e.y},upperArmMetres:zn(f),forearmMetres:zn(S),elbowExtensionRadians:v}}function Nd(n,e,t,i,s,r,a){let o=yh(n,e,t,i,s,r),c=xt(a,0,1),l=Ic(t),h=Mn(n),d=Wt(n),u=Cc,p=ve(ve(ve(e,De(h,l*u.skyElbowOutwardMetres)),De(d,u.skyElbowForwardMetres)),Qe(0,u.skyElbowHeightMetres,0)),g=hs(o.elbow,p,c),M=bt(g,i),m=bt(s,g),f=De(M,-1),S=Math.acos(xt(Kt(pt(f,It),pt(m,Ke)),-1,1));return{elbow:g,rest:o.rest,excursionMetres:zn(bt(g,o.rest)),local:{frontMetres:Kt(bt(g,e),d),outwardMetres:l*Kt(bt(g,e),h),heightMetres:g.y-e.y},upperArmMetres:zn(M),forearmMetres:zn(m),elbowExtensionRadians:S,countIn:!0,countInSwingProgress:c}}function _i(n,e,t,i){let s=kt.get(n),r=e==="left"?-1:1,a=ve(ve(s.position,De(Mn(s),r*$e.readySideMetres)),ve(De(Wt(s),$e.readyForwardMetres),Qe(0,$e.readyBalanceHeightMetres,0)));return ve(a,Dc({personId:n,hand:e,clubId:i,playheadBeats:t}))}function Ax(n,e,t,i,s=$e.throwReleaseBalanceHeightMetres,r=$e.throwReleaseSideMetres){let a=kt.get(n),o=e==="left"?-1:1,c=ve(ve(a.position,De(Mn(a),o*r)),ve(De(Wt(a),$e.throwReleaseForwardMetres),Qe(0,s,0)));return ve(c,Dc({personId:n,hand:e,clubId:i,playheadBeats:t}))}function Rx(n,e,t,i){let s=kt.get(n),r=e==="left"?-1:1,a=ve(ve(s.position,De(Mn(s),r*$e.selfCatchSideMetres)),ve(De(Wt(s),$e.selfCatchForwardMetres),Qe(0,$e.selfCatchBalanceHeightMetres,0)));return ve(a,Dc({personId:n,hand:e,clubId:i,playheadBeats:t}))}function Cx(n,e,t,i){let s=kt.get(n),r=Dc({personId:n,hand:e,clubId:i,playheadBeats:t}),a=bt(r,ta(n,t)),o=Qe(a.x,0,a.z),c=ve(s.position,ta(n,t)),l=e==="left"?-1:1;return ve(ve(ve(c,De(Mn(s),l*$e.passCatchSideMetres)),ve(De(Wt(s),$e.passCatchForwardMetres),Qe(0,Ec,0))),o)}function ds(n,e){return{x:n.w*e.x+n.x*e.w+n.y*e.z-n.z*e.y,y:n.w*e.y-n.x*e.z+n.y*e.w+n.z*e.x,z:n.w*e.z+n.x*e.y-n.y*e.x+n.z*e.w,w:n.w*e.w-n.x*e.x-n.y*e.y-n.z*e.z}}function na(n,e){let t=pt(n),i=e*.5;return{x:t.x*Math.sin(i),y:t.y*Math.sin(i),z:t.z*Math.sin(i),w:Math.cos(i)}}function Px(n,e,t){let i=n.x,s=e.x,r=t.x,a=n.y,o=e.y,c=t.y,l=n.z,h=e.z,d=t.z,u=i+o+d;if(u>0){let g=2*Math.sqrt(u+1);return{x:(h-c)/g,y:(r-l)/g,z:(a-s)/g,w:.25*g}}if(i>o&&i>d){let g=2*Math.sqrt(1+i-o-d);return{x:.25*g,y:(s+a)/g,z:(r+l)/g,w:(h-c)/g}}if(o>d){let g=2*Math.sqrt(1+o-i-d);return{x:(s+a)/g,y:.25*g,z:(c+h)/g,w:(r-l)/g}}let p=2*Math.sqrt(1+d-i-o);return{x:(r+l)/p,y:(c+h)/p,z:.25*p,w:(h-c)/p}}function er(n,e){let t=pt(n,Ke),i=pt(bt(e,De(t,Kt(e,t))),Qe(0,0,1)),s=pt(Qr(t,i),Qe(1,0,0));return i=pt(Qr(s,t),i),Px(s,t,i)}function Hd(n,e,t){let i=n.x*e.x+n.y*e.y+n.z*e.z+n.w*e.w,s=e;if(i<0&&(i=-i,s={x:-e.x,y:-e.y,z:-e.z,w:-e.w}),i>.9995)return fs({x:os(n.x,s.x,t),y:os(n.y,s.y,t),z:os(n.z,s.z,t),w:os(n.w,s.w,t)});let r=Math.acos(xt(i,-1,1)),a=Math.sin(r),o=Math.sin((1-t)*r)/a,c=Math.sin(t*r)/a;return{x:n.x*o+s.x*c,y:n.y*o+s.y*c,z:n.z*o+s.z*c,w:n.w*o+s.w*c}}function fs(n){let e=Math.hypot(n.x,n.y,n.z,n.w);return e>1e-9?{x:n.x/e,y:n.y/e,z:n.z/e,w:n.w/e}:{x:0,y:0,z:0,w:1}}function Ix(n,e,t,i,{throwAxisWorld:s=null}={}){let r=pt(s||Qr(Ke,e),Qe(1,0,0)),a=Math.acos(xt(Kt(Ke,e),-1,1)),o=fs(ds(na(r,a),n)),c=fs(ds(na(r,t),o)),l=a>1e-9?xt(t*Ac/(a*i),.25,2.75):1;return se({throwAxisWorld:se(rt(r)),loadAngleRadians:a,loadEndSlope:l,flightSpinRadians:t,startQuaternion:se({...n}),releaseQuaternion:se({...o}),primaryFlightEndQuaternion:se({...c})})}function Gd(n,e){let t=xt(n,0,1);return(e-2)*t**3+(3-e)*t**2}function Lx(n,e){let t=xt(n,0,1);return 3*(e-2)*t**2+2*(3-e)*t}function Dx(n,e){return fs(ds(na(n.throwAxisWorld,n.loadAngleRadians*Gd(e,n.loadEndSlope)),n.startQuaternion))}function Nx(n,e){let t=xt(e,0,1);return fs(ds(na(n.throwAxisWorld,n.flightSpinRadians*t),n.releaseQuaternion))}function Wd(n,e){let t=n.flightSpinRadians/e;return{axisWorld:n.throwAxisWorld,radiansPerSecond:t}}function us(n,e){let t=fs(n),i={x:e.x,y:e.y,z:e.z,w:0},s={x:-t.x,y:-t.y,z:-t.z,w:t.w},r=ds(ds(t,i),s);return Qe(r.x,r.y,r.z)}function Xd(n,e,t){let i=Lc(n),s=_h(t,i.loopBeats),r=i.schedule[s].events[e];if(!r)throw new RangeError(`${n} has no declared event for ${e} at beat ${s}`);let a=r.target;return se({patternId:n,launchBeat:t,phraseBeat:s,sourcePersonId:e,targetPersonId:a,hand:r.hand,catchHand:r.catchHand,kind:r.kind,label:r.kind==="pass"?`synchronised ${r.hand}-hand 540\xB0 single pass`:`${r.hand} self`})}function qd(n){return Xd(n.patternId,n.targetPersonId,n.launchBeat+ps)}var Ux=n=>se($e.people.flatMap(e=>[0,1,2].map((t,i)=>se({id:`${e.id}-club-${i+1}`,homePersonId:e.id,event:Xd(n,e.id,t)})))),Sh=Object.freeze(Object.fromEntries(bc.map(n=>[n,Ux(n)]))),pb=Sh[tr];function Fx(n){let t=Sh[n.event.patternId].filter(s=>s.homePersonId===n.homePersonId&&s.event.hand===n.event.hand).sort((s,r)=>s.event.launchBeat-r.event.launchBeat),i=t.findIndex(s=>s.id===n.id);if(i<0||t.length===0)throw new RangeError(`count-in carry plan cannot find ${n.id}`);return se({personId:n.homePersonId,hand:n.event.hand,carrySlot:i,primary:t[0],group:se(t)})}function Ox(n){return n==="left"?0:Cc.skyStaggerBeats}function Bx(n,e){let t=nr(e);if(t>=-1)return 1-Id(t+1);let i=(t+2-Ox(n))/Cc.skyTravelBeats;return Id(i)}function zx(n,e){if(e<n.event.launchBeat)return null;let t=n.event;for(;t.launchBeat+ps<=e+1e-10;)t=qd(t);return t}function kx(n){let e=Mh,t=e+n,i=ps-t,s=as.catch+as.return+as.ready,r=i*as.catch/s,a=i*as.return/s,o=i*as.ready/s;return se({flightBeats:n,forwardLoadEnd:e,flightStart:e,flightEnd:t,catchEnd:t+r,returnEnd:t+r+a,readyEnd:t+r+a+o})}function Yd(n,e,{catchAnchor:t,flightSeconds:i,flightBeats:s}){let r=kt.get(e.sourcePersonId),a=kx(s),o=e.launchBeat+a.flightStart,c=e.kind==="pass",l=Ax(r.id,e.hand,o,n.id,c?$e.passThrowReleaseBalanceHeightMetres:$e.throwReleaseBalanceHeightMetres,c?$e.passThrowReleaseSideMetres:$e.throwReleaseSideMetres),h=c?Ke:xh(r.id,e.hand),d=er(Ke,Wt(r)),u=c?mx:gx,p=t(o+s),g=c?It:xh(e.targetPersonId,e.catchHand),M=c?p:kn(p,g),m=c?It:null,f=c?ea(M,It):null,S=pt(Qe((f||p).x-l.x,0,(f||p).z-l.z),Wt(r)),T=pt(Qr(S,It),Mn(r)),v=Ix(d,h,u,i,c?{throwAxisWorld:T}:void 0),E=m||pt(us(v.primaryFlightEndQuaternion,It),h),b=f||ea(M,E);if(c&&Kt(pt(us(v.primaryFlightEndQuaternion,It),It),It)<1-1e-10)throw new RangeError("path-plane 3pi pass must arrive vertically body-up");let R=Qe((b.x-l.x)/i,0,(b.z-l.z)/i),x=(b.y-l.y+.5*gi*i**2)/i,w=x/gi,C=l.y+x*w-.5*gi*w**2,P=qd(e),D=_i(r.id,e.hand,e.launchBeat,n.id),W=_i(P.sourcePersonId,P.hand,P.launchBeat,n.id),q=er(Ke,Wt(kt.get(P.sourcePersonId)));return{loadStart:D,release:l,catchPosition:b,releaseDirection:h,releaseGripPosition:kn(l,h),ready:D,nextReady:W,nextEvent:P,timeline:a,horizontal:S,passPlaneNormal:c?T:null,horizontalVelocity:R,launchVerticalVelocity:x,apexTimeSeconds:w,apexHeightMetres:C,flightSeconds:i,sourceShoulder:Mc(r.id,e.hand,o),targetShoulder:Mc(e.targetPersonId,e.catchHand,o+s),readyQuaternion:d,nextReadyQuaternion:q,releaseQuaternion:v.releaseQuaternion,catchDirection:E,catchGripPosition:M,catchReferenceDirection:g,spinRadians:u,spinSemantics:cs.spinSemantics,rotationTrack:v}}function Vx(n,e){return Yd(n,e,{catchAnchor:t=>Rx(e.targetPersonId,e.catchHand,t,n.id),flightSeconds:Qs,flightBeats:xc})}function Hx(n,e){return Yd(n,e,{catchAnchor:t=>Cx(e.targetPersonId,e.catchHand,t,n.id),flightSeconds:Rc,flightBeats:yc})}function Gx(n,e){let t=xt(e,0,n.flightSeconds);return Qe(n.release.x+n.horizontalVelocity.x*t,n.release.y+n.launchVerticalVelocity*t-.5*gi*t**2,n.release.z+n.horizontalVelocity.z*t)}function Sc(n,e){let t=xt(n/e.timeline.flightBeats,0,1),i=Nx(e.rotationTrack,t),s=Wd(e.rotationTrack,e.flightSeconds);return{position:Gx(e,n*ms),direction:pt(us(i,It),e.releaseDirection),quaternion:i,spinRadians:e.spinRadians*t,orientationRadians:e.rotationTrack.loadAngleRadians+e.spinRadians*t,unwrappedThrowPhaseRadians:e.rotationTrack.loadAngleRadians+e.spinRadians*t,angularVelocityRadiansPerSecond:s.radiansPerSecond,angularVelocityAxisWorld:s.axisWorld,primaryThrowAxisWorld:e.rotationTrack.throwAxisWorld}}function $d(n){let e=Wd(n.rotationTrack,n.flightSeconds);return{position:n.release,direction:n.releaseDirection,quaternion:n.releaseQuaternion,airborne:!0,holder:null,release:n.release,catchPosition:n.catchPosition,ready:n.ready,flightProgress:0,returnProgress:1,loadProgress:1,spinRadians:0,orientationRadians:n.rotationTrack.loadAngleRadians,unwrappedThrowPhaseRadians:n.rotationTrack.loadAngleRadians,angularVelocityRadiansPerSecond:e.radiansPerSecond,angularVelocityAxisWorld:e.axisWorld,primaryThrowAxisWorld:n.rotationTrack.throwAxisWorld,motionState:"release"}}function Zd({start:n,release:e,holder:t,catchPosition:i,startDirection:s=Ke,releaseDirection:r,startQuaternion:a,releaseQuaternion:o,rotationTrack:c},l){let h=Jr(xt(l,0,1)),d=r||Ke,u=c?Gd(l,c.loadEndSlope):h,p=c?Dx(c,l):Hd(a||er(s,Ke),o||er(d,Ke),h),g=pt(us(p,It),d),M=c?c.loadAngleRadians*Lx(l,c.loadEndSlope)/Ac:0,m=hs(kn(n,s),kn(e,d),h);return{position:ea(m,g),direction:g,quaternion:p,airborne:!1,holder:t,release:e,catchPosition:i,ready:n,flightProgress:0,returnProgress:1,loadProgress:h,spinRadians:0,orientationRadians:c?c.loadAngleRadians*u:0,unwrappedThrowPhaseRadians:c?c.loadAngleRadians*u:0,angularVelocityRadiansPerSecond:M,angularVelocityAxisWorld:c?.throwAxisWorld||null,primaryThrowAxisWorld:c?.throwAxisWorld||null,motionState:"forward-load"}}function Jd(n,e,t){let{timeline:i}=n;if(e<=i.catchEnd)return{position:n.catchPosition,direction:t.direction,quaternion:t.quaternion,airborne:!1,holder:{personId:n.nextEvent.sourcePersonId,hand:n.nextEvent.hand},release:n.release,catchPosition:n.catchPosition,ready:n.nextReady,flightProgress:1,returnProgress:0,loadProgress:0,spinRadians:t.spinRadians,orientationRadians:t.orientationRadians,unwrappedThrowPhaseRadians:t.unwrappedThrowPhaseRadians,angularVelocityRadiansPerSecond:0,angularVelocityAxisWorld:t.angularVelocityAxisWorld,primaryThrowAxisWorld:t.primaryThrowAxisWorld,motionState:"catch"};if(e<=i.returnEnd){let s=Jr((e-i.catchEnd)/(i.returnEnd-i.catchEnd));return{position:hs(n.catchPosition,n.nextReady,s),direction:pt(hs(t.direction,Ke,s),Ke),quaternion:Hd(t.quaternion,n.nextReadyQuaternion,s),airborne:!1,holder:{personId:n.nextEvent.sourcePersonId,hand:n.nextEvent.hand},release:n.release,catchPosition:n.catchPosition,ready:n.nextReady,flightProgress:1,returnProgress:s,loadProgress:0,spinRadians:t.spinRadians,orientationRadians:t.orientationRadians,unwrappedThrowPhaseRadians:t.unwrappedThrowPhaseRadians,angularVelocityRadiansPerSecond:0,angularVelocityAxisWorld:t.angularVelocityAxisWorld,primaryThrowAxisWorld:t.primaryThrowAxisWorld,motionState:"return"}}return e<=i.readyEnd?{position:n.nextReady,direction:Ke,quaternion:n.nextReadyQuaternion,airborne:!1,holder:{personId:n.nextEvent.sourcePersonId,hand:n.nextEvent.hand},release:n.release,catchPosition:n.catchPosition,ready:n.nextReady,flightProgress:1,returnProgress:1,loadProgress:0,spinRadians:t.spinRadians,orientationRadians:t.orientationRadians,unwrappedThrowPhaseRadians:t.unwrappedThrowPhaseRadians,angularVelocityRadiansPerSecond:0,angularVelocityAxisWorld:t.angularVelocityAxisWorld,primaryThrowAxisWorld:t.primaryThrowAxisWorld,motionState:"ready"}:{position:n.nextReady,direction:Ke,quaternion:n.nextReadyQuaternion,airborne:!1,holder:{personId:n.nextEvent.sourcePersonId,hand:n.nextEvent.hand},release:n.release,catchPosition:n.catchPosition,ready:n.nextReady,flightProgress:1,returnProgress:1,loadProgress:0,spinRadians:t.spinRadians,orientationRadians:t.orientationRadians,unwrappedThrowPhaseRadians:t.unwrappedThrowPhaseRadians,angularVelocityRadiansPerSecond:0,angularVelocityAxisWorld:t.angularVelocityAxisWorld,primaryThrowAxisWorld:t.primaryThrowAxisWorld,motionState:"ready"}}function Wx(n,e,t){let i=Vx(n,e),{timeline:s}=i;if(t<s.flightStart-1e-10)return Zd({start:i.loadStart,release:i.release,holder:{personId:e.sourcePersonId,hand:e.hand},catchPosition:i.catchPosition,startDirection:Ke,releaseDirection:i.releaseDirection,startQuaternion:i.readyQuaternion,releaseQuaternion:i.releaseQuaternion,rotationTrack:i.rotationTrack},t/s.forwardLoadEnd);if(Math.abs(t-s.flightStart)<=1e-10)return $d(i);let r=t-s.flightStart;if(r<xc-1e-10)return{...Sc(r,i),airborne:!0,holder:null,release:i.release,catchPosition:i.catchPosition,ready:i.ready,flightProgress:xt(r/xc,0,1),returnProgress:0,loadProgress:1,motionState:"flight"};let a=Sc(xc,i);return Jd(i,t,a)}function Xx(n,e,t){let i=Hx(n,e),{timeline:s}=i;if(t<s.flightStart-1e-10)return Zd({start:i.loadStart,release:i.release,holder:{personId:e.sourcePersonId,hand:e.hand},catchPosition:i.catchPosition,startDirection:Ke,releaseDirection:i.releaseDirection,startQuaternion:i.readyQuaternion,releaseQuaternion:i.releaseQuaternion,rotationTrack:i.rotationTrack},t/s.forwardLoadEnd);if(Math.abs(t-s.flightStart)<=1e-10)return $d(i);let r=t-s.flightStart;return r<yc-1e-10?{...Sc(r,i),airborne:!0,release:i.release,catchPosition:i.catchPosition,ready:i.ready,flightProgress:xt(r/yc,0,1),returnProgress:0,loadProgress:1,motionState:"flight",holder:null}:Jd(i,t,Sc(yc,i))}function bh(n){let e=zd(n.position,n.direction),t={...n,position:se(rt(n.position)),direction:se(rt(n.direction)),quaternion:se({...n.quaternion}),knobPosition:se(rt(e.knobPosition)),gripPosition:se(rt(e.knobPosition)),knobTipPosition:se(rt(e.knobTipPosition)),capPosition:se(rt(e.capPosition))};return n.release&&(t.release=se(rt(n.release))),n.catchPosition&&(t.catchPosition=se(rt(n.catchPosition))),n.readyPosition&&(t.readyPosition=se(rt(n.readyPosition))),n.angularVelocityAxisWorld&&(t.angularVelocityAxisWorld=se(rt(n.angularVelocityAxisWorld))),n.primaryThrowAxisWorld&&(t.primaryThrowAxisWorld=se(rt(n.primaryThrowAxisWorld))),n.holder&&(t.holder=se({...n.holder})),se(t)}function qx(n,e){let t=n.event,i=_i(t.sourcePersonId,t.hand,e,n.id);return bh({id:n.id,homePersonId:n.homePersonId,state:"held",motionState:"ready",holder:{personId:t.sourcePersonId,hand:t.hand},holderPersonId:t.sourcePersonId,sourcePersonId:t.sourcePersonId,targetPersonId:t.sourcePersonId,hand:t.hand,catchHand:t.hand,kind:"ready",launchBeat:t.launchBeat,phraseBeat:t.phraseBeat,position:i,direction:Ke,quaternion:er(Ke,Wt(kt.get(t.sourcePersonId))),release:i,catchPosition:i,readyPosition:i,flightProgress:0,returnProgress:1,spinRadians:0,spinTurns:0})}function Yx(n,e){let t=zx(n,e);if(!t)return qx(n,e);let i=xt(e-t.launchBeat,0,ps),s=t.kind==="pass"?Xx(n,t,i):Wx(n,t,i),r=s.airborne===!0;return bh({id:n.id,homePersonId:n.homePersonId,state:r?"airborne":"held",motionState:s.motionState,holder:s.holder,holderPersonId:s.holder?.personId||null,sourcePersonId:t.sourcePersonId,targetPersonId:t.targetPersonId,hand:t.hand,catchHand:t.catchHand,kind:t.kind,label:t.label,launchBeat:t.launchBeat,phraseBeat:t.phraseBeat,eventPhase:i,position:s.position,direction:s.direction,quaternion:s.quaternion,release:s.release,catchPosition:s.catchPosition,readyPosition:s.ready,flightProgress:s.flightProgress,returnProgress:s.returnProgress,spinRadians:s.spinRadians,spinTurns:s.spinRadians/gn,orientationRadians:s.orientationRadians??0,unwrappedThrowPhaseRadians:s.unwrappedThrowPhaseRadians??0,angularVelocityRadiansPerSecond:s.angularVelocityRadiansPerSecond??0,angularVelocityAxisWorld:s.angularVelocityAxisWorld||null,primaryThrowAxisWorld:s.primaryThrowAxisWorld||null})}function $x(n,e){let t=kt.get(n.homePersonId),i=n.event.hand,s=Fx(n),r=Bx(t.id,e),a=Cc,o=Ic(i),c=Mn(t),l=Wt(t),h=kn(_i(t.id,i,0,s.primary.id),Ke),d=kn(_i(t.id,i,0,n.id),Ke),u=er(Ke,l),p={x:-u.x,y:-u.y,z:-u.z,w:u.w},g=us(p,bt(d,h)),M=Math.sin(Math.PI*r)**2,m=ve(ve(ve(ve(h,Qe(0,a.skyLiftMetres*r,0)),De(c,-o*a.skySideInwardMetres*r)),De(l,a.skyForwardMetres*r+a.swingArcForwardMetres*M)),De(c,o*a.swingArcSideMetres*M)),f=fs(ds(na(c,Math.PI*r),u)),S=pt(us(f,It),Ke),T=ve(m,us(f,g)),v=ea(T,S),E=se({phase:e<-1?"sky":"earth",swingProgress:r,carrierHand:i,carrySlot:s.carrySlot,primaryClubId:s.primary.id,carrierGripPosition:se(rt(m)),carrierQuaternion:se({...f}),localGripOffset:se(rt(g)),bundleContact:s.carrySlot===0?"primary-seam":"secondary-seam-in-bundle"});return bh({id:n.id,homePersonId:n.homePersonId,state:"held",motionState:"count-in",holder:{personId:t.id,hand:i},holderPersonId:t.id,sourcePersonId:t.id,targetPersonId:t.id,hand:i,catchHand:i,kind:"count-in",launchBeat:null,phraseBeat:null,position:v,direction:S,quaternion:f,release:v,catchPosition:v,readyPosition:ea(d,Ke),flightProgress:0,returnProgress:1,spinRadians:0,spinTurns:0,countIn:E})}function Zx(n,e){let t=[],i=n.flightProgress,s=kt.get(n.sourcePersonId),r=kn(_i(n.sourcePersonId,n.hand,e,`${n.sourcePersonId}-${n.hand}-rig`),Ke),a=kn(n.release,n.kind==="pass"?Ke:xh(s,n.hand)),o=ve(ve(a,De(Wt(s),.025)),Qe(0,.02,0));if(i<=.24?t.push({personId:n.sourcePersonId,hand:n.hand,position:hs(a,o,Jr(i/.24)),mode:"throw-follow",influence:.82,clubId:n.id}):i<=.5&&t.push({personId:n.sourcePersonId,hand:n.hand,position:hs(o,r,Jr((i-.24)/.26)),mode:"throw-recovery",influence:.57,clubId:n.id}),i>=.7){let c=kn(_i(n.targetPersonId,n.catchHand,e,`${n.targetPersonId}-${n.catchHand}-rig`),Ke);t.push({personId:n.targetPersonId,hand:n.catchHand,position:hs(c,n.gripPosition,Jr((i-.7)/.3)),mode:"catch-reach",influence:.84,clubId:n.id})}return t}function Jx(n,e){let t=new Map($e.people.map(r=>[r.id,{left:{position:kn(_i(r.id,"left",n,`${r.id}-left-rig`),Ke),mode:"ready",influence:0,clubId:null},right:{position:kn(_i(r.id,"right",n,`${r.id}-right-rig`),Ke),mode:"ready",influence:0,clubId:null}}])),i=e.filter(r=>r.motionState==="count-in");if(i.length>0)return i.forEach(r=>{let a=r.countIn;if(!a)throw new RangeError(`${r.id} count-in club lacks its carrier frame`);let o=t.get(r.holderPersonId)?.[a.carrierHand];!o||o.clubId===a.primaryClubId||(t.get(r.holderPersonId)[a.carrierHand]={position:rt(a.carrierGripPosition),mode:"count-in",influence:1,clubId:a.primaryClubId,countInSwingProgress:a.swingProgress,countInPhase:a.phase,countInCarrierHand:a.carrierHand})}),t;let s=r=>{let a=t.get(r.personId)?.[r.hand];!a||a.influence>r.influence||(t.get(r.personId)[r.hand]=r)};return e.forEach(r=>{if(r.motionState==="flight"){Zx(r,n).forEach(s);return}if(r.motionState==="release"){s({personId:r.sourcePersonId,hand:r.hand,position:r.gripPosition,mode:"release",influence:.98,clubId:r.id});return}r.holder&&s({personId:r.holder.personId,hand:r.holder.hand,position:r.gripPosition,mode:r.motionState,influence:r.motionState==="ready"?.9:1,clubId:r.id})}),t}function Kx(n,e){let t=Jx(n,e);return se($e.people.map(i=>{let s=ve(i.position,ta(i.id,n)),r=Pc(i),a=t.get(i.id).left,o=t.get(i.id).right,c={left:Mc(i.id,"left",n),right:Mc(i.id,"right",n)},l={left:a.mode==="count-in"?Nd(i,s,"left",c.left,a.position,n,a.countInSwingProgress):yh(i,s,"left",c.left,a.position,n),right:o.mode==="count-in"?Nd(i,s,"right",c.right,o.position,n,o.countInSwingProgress):yh(i,s,"right",c.right,o.position,n)};return se({id:i.id,name:i.name,position:se(s),headingRadians:r.headingRadians,visualYawRadians:r.visualYawRadians,forward:r.forward,right:r.right,partnerId:r.partnerId,hands:se({left:se(rt(a.position)),right:se(rt(o.position))}),handMotion:se({left:se({mode:a.mode,influence:a.influence,clubId:a.clubId,countInSwingProgress:a.countInSwingProgress??null,countInPhase:a.countInPhase??null}),right:se({mode:o.mode,influence:o.influence,clubId:o.clubId,countInSwingProgress:o.countInSwingProgress??null,countInPhase:o.countInPhase??null})}),shoulders:se({left:se(c.left),right:se(c.right)}),elbows:se({left:se(rt(l.left.elbow)),right:se(rt(l.right.elbow))}),arms:se({left:se({restElbow:se(rt(l.left.rest)),elbow:se(rt(l.left.elbow)),local:se({...l.left.local}),excursionMetres:l.left.excursionMetres,upperArmMetres:l.left.upperArmMetres,forearmMetres:l.left.forearmMetres,elbowExtensionRadians:l.left.elbowExtensionRadians,countIn:l.left.countIn===!0,countInSwingProgress:l.left.countInSwingProgress??null}),right:se({restElbow:se(rt(l.right.rest)),elbow:se(rt(l.right.elbow)),local:se({...l.right.local}),excursionMetres:l.right.excursionMetres,upperArmMetres:l.right.upperArmMetres,forearmMetres:l.right.forearmMetres,elbowExtensionRadians:l.right.elbowExtensionRadians,countIn:l.right.countIn===!0,countInSwingProgress:l.right.countInSwingProgress??null})})})}))}function jx(n,e,t){let i=bt(t,e),s=Kt(i,i);return s<=1e-12?e:ve(e,De(i,xt(Kt(bt(n,e),i)/s,0,1)))}function Qx(n,e,t){return zn(bt(jx(t,n,e),t))}function ey(n,e,t,i){let s=bt(e,n),r=bt(i,t),a=bt(n,t),o=Kt(s,s),c=Kt(r,r),l=Kt(s,r),h=Kt(s,a),d=Kt(r,a),u=o*c-l*l,p=0,g=0;return o<=1e-12&&c<=1e-12?zn(a):(o<=1e-12?g=xt(d/c,0,1):c<=1e-12?p=xt(-h/o,0,1):(p=u>1e-12?xt((l*d-h*c)/u,0,1):0,g=(l*p+d)/c,g<0?(g=0,p=xt(-h/o,0,1)):g>1&&(g=1,p=xt((l-h)/o,0,1))),zn(bt(ve(n,De(s,p)),ve(t,De(r,g)))))}function ty(n){let e=pt(n.direction,Ke);return se({knob:ve(n.position,De(e,-cs.knobTipFromBalanceMetres)),cap:ve(n.position,De(e,cs.capTipFromBalanceMetres))})}function ny(n){let e=jr.torsoCapsule,t=jr.headSphere;return se({torso:se({start:ve(n.position,De(It,e.bottomHeightMetres)),end:ve(n.position,De(It,e.topHeightMetres)),radiusMetres:e.radiusMetres}),head:se({center:ve(n.position,De(It,t.centerHeightMetres)),radiusMetres:t.radiusMetres})})}function iy(n,e){let t=n,i=null;return t.forEach(s=>{let r=ty(s);e.forEach(a=>{let o=ny(a),c=jr.clubOuterRadiusMetres,l=ey(r.knob,r.cap,o.torso.start,o.torso.end)-c-o.torso.radiusMetres,h=Qx(r.knob,r.cap,o.head.center)-c-o.head.radiusMetres;[["torso",l],["head",h]].forEach(([d,u])=>{(!i||u<i.clearanceMetres)&&(i={clubId:s.id,personId:a.id,bodyPart:d,clearanceMetres:u})})})}),se({method:"sampled full-club segment against conservative torso capsule and head sphere",flightClubCount:n.filter(s=>s.state==="airborne").length,guardedClubCount:t.length,requiredClearanceMetres:jr.requiredClearanceMetres,minimumClearanceMetres:i?i.clearanceMetres:1/0,closest:i?se({...i}):null})}function sy(n,e){if(e<-1)return se({name:"Sky",detail:"Raise all six clubs with a small natural stagger.",beat:-2});if(e<0)return se({name:"Earth",detail:"Lower together to the down-side ready position.",beat:-1});let t=Lc(n),i=_h(Math.floor(e),t.loopBeats),s=t.schedule[i],r=_h(e,1),a=Math.max(0,Ac-r*ms),o=r<Mh?` Begin the forward load; release in ${a.toFixed(2)} s.`:"";return se({name:"Pass",detail:`${t.title} beat ${i+1}: ${s.label}.${o}`,beat:i})}function Nc(n="audience"){return Dd[n]||Dd.audience}function ry(n,e="audience"){let t=Nc(e);if(t.viewKind!=="first-person")return t;let i=n?.people?.find(r=>r.id===t.ownerPersonId);if(!i)throw new RangeError(`sampled first-person owner is required for ${t.id}`);let s=ve(ve(i.position,Qe(0,Vi.eyeHeightMetres,0)),De(i.forward,Vi.eyeForwardMetres));return se({...t,position:se(rt(s)),target:se(kd(s,i.forward)),forward:se(rt(i.forward)),sampled:!0})}function ia(n){let e=bc.includes(n);return se({supported:e,selectedPatternId:n||null,reason:e?`The selected 2-person ${Js(n).title} runs the dedicated six-club 3D foundation.`:"Physical 3D is currently available only for the canonical 2-person 1-, 2-, 3-, and 4-count cards; this card stays in the schedule viewer.",animationOwner:e?"Passing Lab host transport":"Passing Lab schedule viewer",concurrentAnimationCount:e?1:0})}function ay(n,e,{camera:t="audience"}={}){if(!ia(n).supported)throw new RangeError(`${n||"selected card"} is not a physical two-person pattern`);let s=Lc(n),r=Sh[n],a=Math.max(-2,nr(e)),o=se(a<0?r.map(S=>$x(S,a)):r.map(S=>Yx(S,a))),c=o.map(S=>S.id);if(o.length!==6||new Set(c).size!==6)throw new RangeError(`${n} 3D sampler must expose exactly six unique clubs`);let l=se(o.filter(S=>S.state==="airborne")),h=se(o.filter(S=>S.state!=="airborne")),d=h.filter(S=>S.holder).map(S=>`${S.holder.personId}:${S.holder.hand}`),u=a>=0&&a<Mh-1e-10;if(a>=0&&!u&&new Set(d).size!==d.length)throw new RangeError(`no hand may hold two physical ${n} clubs at once`);let p=Kx(a,o),g=iy(o,p);if(g.minimumClearanceMetres<jr.requiredClearanceMetres)throw new RangeError(`${n} club path intersects a conservative ${g.closest?.bodyPart||"body"} envelope: ${g.minimumClearanceMetres.toFixed(4)}m`);let M=se($e.people.map(S=>se({personId:S.id,count:3,meaning:"initial token allocation"}))),m=se(Object.fromEntries(Mx.map(S=>[S,o.filter(T=>T.motionState===S).length]))),f=se({version:lx,patternId:n,physical:!0,tempoBpm:fx,beatSeconds:ms,physics:se({model:"first-order Earth-gravity teaching model",gravityMetresPerSecondSquared:gi,adultJugglerHeightMetres:Kr,balanceApexMetres:wc,selfFlightSeconds:Qs,passFlightSeconds:Rc,selfDwellSeconds:Tc,cycleSeconds:px}),playhead:a,cue:sy(n,a),camera:null,schedule:s.schedule,clubs:o,held:h,airborne:l,handConnected:h,people:p,allocation:M,total:o.length,inventory:se({total:o.length,inFlight:l.length,handConnected:h.length,unique:new Set(c).size,states:m}),collision:g,variation:js});return se({...f,camera:ry(f,t)})}function Kd(n,e,t={}){let i=ia(n);return i.supported?ay(n,e,t):se({physical:!1,capability:i})}var jd=2,Uc=(n,e=0)=>Number.isFinite(Number(n))?Number(n):e,nn=n=>Object.freeze(n);function oy(n){let e=n?.performers||[],t=n?.inventoryAllocation;if(!t||typeof t!="object")return null;let i=new Set(e.map(s=>s.id));if(Object.keys(t).some(s=>!i.has(s)))throw new RangeError(`${n.id}: inventory allocation names an unknown performer`);return e.map(s=>({personId:s.id,count:Math.floor(Uc(t[s.id],-1))}))}function Qd(n){let e=n?.performers||[];if(!e.length)return nn([]);let t=Math.max(0,Math.floor(Uc(n.clubCount))),s=oy(n)||(()=>{let r=Math.floor(t/e.length),a=t%e.length;return e.map((o,c)=>({personId:o.id,count:r+(c<a?1:0)}))})();if(s.some(r=>r.count<0)||s.reduce((r,a)=>r+a.count,0)!==t)throw new RangeError(`${n.id}: inventory allocation must sum to clubCount`);return nn(s.map(r=>nn({...r})))}function ef(n){return nn(Qd(n).flatMap(({personId:e,count:t})=>{let i=n.executionPlan?.initialHandAllocation?.[e],s=i?[...Array(i.left).fill("left"),...Array(i.right).fill("right")]:Array.from({length:t},(r,a)=>a%2?"right":"left");if(s.length!==t)throw new RangeError(`${n.id}: compiled hand allocation does not match ${e}'s declared inventory`);return s.map((r,a)=>nn({id:`${e}-club-${a+1}`,homePersonId:e,personId:e,hand:r,index:a}))}))}function wh(n,e){let t=Math.max(0,Math.floor(Uc(n?.loopBeats,1)))-.001;return Math.max(-jd,Math.min(t,Uc(e,-jd)))}function tf(n,e){let t=wh(n,e);return t<0?null:Math.floor(t)}function cy(n,e){let t=wh(n,e);return t<-1?nn({name:"Sky",detail:"Raise clubs with a slight natural stagger.",beat:-2}):t<0?nn({name:"Earth",detail:"Lower together to the head-down side position.",beat:-1}):nn({name:"Pass",detail:`Beat ${Math.floor(t)+1} of ${n.loopBeats}`,beat:Math.floor(t)})}function ly(n,e){let t=tf(n,e);return nn(t===null?[]:gh(n,t).filter(i=>i.kind==="self"||i.kind==="pass"))}function nf(n,e){return new Map(e.map(t=>[t.id,n.filter(i=>i.personId===t.id).map(i=>({...i}))]))}function sf(n,e,t=!1){let i=n.findIndex(s=>s.hand===e);return i>=0?n.splice(i,1)[0]:t?n.splice(0,1)[0]:void 0}function hy(n,e,t){let i=[];gh(n,t).forEach(s=>{if(s.kind==="hold")return;let r=e.get(s.juggler),a=sf(r,s.hand,n.inventoryMode==="visual-study");if(!a)throw new RangeError(`${n.id}: ${s.juggler} has no club available for beat ${t+1}`);i.push({...a,personId:s.target,hand:s.catchHand})}),i.forEach(s=>e.get(s.personId).push(s))}function uy(n,e){let t=nf(ef(n),n.performers),i=n.loopBeats*4;for(let s=0;s<i+e;s+=1)hy(n,t,s);return t}function dy(n){return nf(ef(n),n.performers)}function rf(n,e){let t=wh(n,e),i=Qd(n),s=tf(n,t),r=n.inventoryMode||"steady-state",a=s===null||r==="visual-study"?dy(n):uy(n,s),c=ly(n,t).map(d=>{let u=a.get(d.juggler),p=sf(u,d.hand,r==="visual-study");if(!p)throw new RangeError(`${n.id}: ${d.juggler} has no club available for displayed beat ${(s??0)+1}`);return nn({...d,id:p.id,tokenId:p.id,sourcePersonId:d.juggler})}),l=[...a.values()].flatMap(d=>d.map((u,p)=>nn({...u,slot:p,heldCount:d.length}))),h=[...l,...c];if(h.length!==n.clubCount)throw new RangeError(`${n.id}: visible inventory ${h.length} does not equal clubCount ${n.clubCount}`);if(new Set(h.map(d=>d.id)).size!==h.length)throw new RangeError(`${n.id}: a visible club token is duplicated`);return nn({playhead:t,cue:cy(n,t),allocation:i,mode:r,held:nn(l),airborne:nn(c),total:h.length})}var fy=2,jt=Object.freeze({release:.2,catch:.8}),bn=Object.freeze({readySideMetres:.5,readyForwardMetres:.32,readyGripHeightMetres:.8,releaseSideMetres:.14,releaseForwardMetres:.52,releaseGripHeightMetres:1,catchSideMetres:.34,catchForwardMetres:.38,catchGripHeightMetres:1.2,gripFromBalanceMetres:.2515,passSpinRadians:Math.PI*3,selfSpinRadians:Math.PI*2}),ir=Object.freeze({x:0,y:1,z:0}),cn=Object.freeze({x:0,y:-1,z:0}),We=n=>Object.freeze(n),ra=(n,e=0,t=1)=>Math.max(e,Math.min(t,n)),af=(n,e)=>(n%e+e)%e,py=n=>{let e=ra(n);return e*e*(3-2*e)},_s=n=>{let e=ra(n);return e**3*(e*(e*6-15)+10)},wt=(n=0,e=0,t=0)=>({x:n,y:e,z:t}),Xt=(n,e)=>wt(n.x+e.x,n.y+e.y,n.z+e.z),cf=(n,e)=>wt(n.x-e.x,n.y-e.y,n.z-e.z),wn=(n,e)=>wt(n.x*e,n.y*e,n.z*e),Eh=(n,e,t)=>n+(e-n)*t,xi=(n,e,t)=>wt(Eh(n.x,e.x,t),Eh(n.y,e.y,t),Eh(n.z,e.z,t)),lf=(n,e)=>n.x*e.x+n.y*e.y+n.z*e.z,Oc=(n,e)=>wt(n.y*e.z-n.z*e.y,n.z*e.x-n.x*e.z,n.x*e.y-n.y*e.x),my=n=>Math.hypot(n.x,n.y,n.z),Sn=(n,e=ir)=>{let t=my(n);return t>1e-9?wn(n,1/t):{...e}},gy=n=>[n.x,n.y,n.z].every(Number.isFinite),Th=(n,e)=>({x:n.w*e.x+n.x*e.w+n.y*e.z-n.z*e.y,y:n.w*e.y-n.x*e.z+n.y*e.w+n.z*e.x,z:n.w*e.z+n.x*e.y-n.y*e.x+n.z*e.w,w:n.w*e.w-n.x*e.x-n.y*e.y-n.z*e.z}),_y=(n,e)=>{let t=Sn(n),i=e*.5;return{x:t.x*Math.sin(i),y:t.y*Math.sin(i),z:t.z*Math.sin(i),w:Math.cos(i)}},xy=(n,e,t)=>{let i=n.x,s=e.x,r=t.x,a=n.y,o=e.y,c=t.y,l=n.z,h=e.z,d=t.z,u=i+o+d;if(u>0){let g=2*Math.sqrt(u+1);return{x:(h-c)/g,y:(r-l)/g,z:(a-s)/g,w:.25*g}}if(i>o&&i>d){let g=2*Math.sqrt(1+i-o-d);return{x:.25*g,y:(s+a)/g,z:(r+l)/g,w:(h-c)/g}}if(o>d){let g=2*Math.sqrt(1+o-i-d);return{x:(s+a)/g,y:.25*g,z:(c+h)/g,w:(r-l)/g}}let p=2*Math.sqrt(1+d-i-o);return{x:(r+l)/p,y:(c+h)/p,z:.25*p,w:(a-s)/p}},Fc=(n,e)=>{let t=Sn(n,cn),i=Sn(cf(e,wn(t,lf(e,t))),wt(0,0,1)),s=Sn(Oc(t,i),wt(1,0,0));return i=Sn(Oc(s,t),i),xy(s,t,i)},yy=(n,e)=>{let t={x:e.x,y:e.y,z:e.z,w:0},i={x:-n.x,y:-n.y,z:-n.z,w:n.w},s=Th(Th(n,t),i);return wt(s.x,s.y,s.z)};function vy(n){let e=n.performers.map(c=>c.x),t=n.performers.map(c=>c.z),i=(Math.min(...e)+Math.max(...e))*.5,s=(Math.min(...t)+Math.max(...t))*.5,r=Math.max(.01,Math.max(...e)-Math.min(...e)),a=Math.max(.01,Math.max(...t)-Math.min(...t)),o=Math.min(.62,4.4/r,2.8/a);return n.performers.map(c=>{let l=c.facing*Math.PI/180,h=Sn(wt(Math.sin(l),0,-Math.cos(l)),wt(0,0,-1)),d=Sn(Oc(h,ir),wt(1,0,0));return{id:c.id,name:c.name,position:wt((c.x-i)*o,0,(c.z-s)*o),forward:h,right:d,headingRadians:l,visualYawRadians:-l}})}var sr=(n,e)=>{let t=n.find(i=>i.id===e);if(!t)throw new RangeError(`unknown performer ${e}`);return t},Bc=n=>n==="left"?-1:1,aa=(n,e,{sideMetres:t,forwardMetres:i,heightMetres:s})=>Xt(Xt(n.position,wn(n.right,Bc(e)*t)),Xt(wn(n.forward,i),wt(0,s,0))),gs=(n,e)=>aa(n,e,{sideMetres:bn.readySideMetres,forwardMetres:bn.readyForwardMetres,heightMetres:bn.readyGripHeightMetres}),hf=(n,e)=>aa(n,e,{sideMetres:bn.releaseSideMetres,forwardMetres:bn.releaseForwardMetres,heightMetres:bn.releaseGripHeightMetres}),uf=(n,e)=>aa(n,e,{sideMetres:bn.catchSideMetres,forwardMetres:bn.catchForwardMetres,heightMetres:bn.catchGripHeightMetres}),sa=(n,e)=>Xt(n,wn(Sn(e,cn),bn.gripFromBalanceMetres)),My=n=>{if(!n?.id||!Array.isArray(n.events)||!n.executionPlan)throw new TypeError("compiled passing pattern required");return n};function of(n,e,t){let i=aa(n,e,{sideMetres:.23,forwardMetres:-.015,heightMetres:1.44}),s=aa(n,e,{sideMetres:.305,forwardMetres:-.05,heightMetres:.985}),r=cf(t,n.position),a=Bc(e)*lf(r,n.right),o=ra(.305+(a-.305)*.08,.29,.33),c=Xt(Xt(n.position,wn(n.right,Bc(e)*o)),Xt(wn(n.forward,-.05),wt(0,ra(s.y+(t.y-.8)*.08,.97,1.04),0)));return{shoulder:i,elbow:c,palm:t}}function Sy(n,e,t){return n<-1?_s((n+2-e*Math.min(.055,.18/Math.max(1,t-1)))/.76):1-_s(n+1)}function by(n,e,t){let i=new Map(e.map(r=>[r.id,{left:{position:gs(r,"left"),influence:0,mode:"ready"},right:{position:gs(r,"right"),influence:0,mode:"ready"}}])),s=(r,a,o,c,l)=>{let h=i.get(r)?.[a];!h||h.influence>c||(i.get(r)[a]={position:o,influence:c,mode:l})};return n.airborne.forEach(r=>{let a=sr(e,r.juggler),o=sr(e,r.target||r.juggler),c=gs(a,r.hand),l=hf(a,r.hand),h=gs(o,r.catchHand),d=uf(o,r.catchHand);if(t<=jt.release)s(a.id,r.hand,xi(c,l,_s(t/jt.release)),1,"forward-load");else if(t<.48){let u=Xt(l,Xt(wn(a.forward,.035),wt(0,.025,0)));s(a.id,r.hand,xi(l,u,py((t-jt.release)/.28)),.84,"throw-follow")}t>=.62&&t<jt.catch?s(o.id,r.catchHand,xi(h,d,_s((t-.62)/(jt.catch-.62))),.92,"catch-reach"):t>=jt.catch&&s(o.id,r.catchHand,xi(d,h,_s((t-jt.catch)/(1-jt.catch))),1,"catch-return")}),i}function wy(n,e,t){let i=sr(e,n.juggler),s=sr(e,n.target||n.juggler),r=gs(i,n.hand),a=hf(i,n.hand),o=uf(s,n.catchHand),c=gs(s,n.catchHand),l=Fc(cn,i.forward),h=n.kind==="pass",d=Number.isFinite(Number(n.spins))?Number(n.spins)*Math.PI*2:h?bn.passSpinRadians:bn.selfSpinRadians,u=Sn(wt(o.x-a.x,0,o.z-a.z),i.forward),p=Sn(Oc(u,ir),i.right);if(t<=jt.release){let T=_s(t/jt.release),v=xi(r,a,T);return{position:sa(v,cn),quaternion:l,direction:cn,motionState:"forward-load",state:"held",holder:{personId:i.id,hand:n.hand}}}if(t<jt.catch){let T=ra((t-jt.release)/(jt.catch-jt.release)),v=Th(_y(p,d*T),l),E=Sn(yy(v,ir),cn),b=sa(a,cn),R=sa(o,h?ir:cn),x=xi(b,R,T);return x.y+=Math.sin(Math.PI*T)*(h?.64:.72),{position:x,quaternion:v,direction:E,motionState:"flight",state:"airborne",holder:null}}let g=h?ir:cn,M=Fc(g,s.forward),m=_s((t-jt.catch)/(1-jt.catch)),f=xi(o,c,m),S=Sn(xi(g,cn,m),cn);return{position:sa(f,S),quaternion:m<.5?M:Fc(S,s.forward),direction:S,motionState:"catch-return",state:"held",holder:{personId:s.id,hand:n.catchHand}}}function Ey(n,e){if(e!=="audience"){let i=sr(n,e),s=Xt(i.position,Xt(wt(0,1.62,0),wn(i.forward,.07)));return We({id:e,viewKind:"first-person",ownerPersonId:e,position:We(s),target:We(Xt(s,Xt(wn(i.forward,3.2),wt(0,-.72,0)))),fov:54})}let t=Math.max(...n.map(i=>Math.abs(i.position.z)),1);return We({id:"audience",viewKind:"audience",ownerPersonId:null,position:We(wt(0,2.55,7.4+t)),target:We(wt(0,.98,0)),fov:31})}function Ah(n,e,{camera:t="audience"}={}){let i=My(n),s=Math.max(-2,Number.isFinite(Number(e))?Number(e):-2),r=s<0?s:af(s,i.loopBeats),a=rf(i,r),o=r<0?0:af(r,1),c=vy(i),l=r<0?new Map(c.map((m,f)=>{let S=Sy(r,f,c.length);return[m.id,Object.fromEntries(["left","right"].map(T=>{let v=gs(m,T),E=Xt(v,Xt(wt(0,.72,0),wn(m.right,-Bc(T)*.18)));return[T,{position:xi(v,E,S),influence:1,mode:"count-in"}]}))]})):by(a,c,o),h=We(c.map(m=>{let f=l.get(m.id).left,S=l.get(m.id).right,T=of(m,"left",f.position),v=of(m,"right",S.position);return We({...m,position:We(m.position),forward:We(m.forward),right:We(m.right),shoulders:We({left:We(T.shoulder),right:We(v.shoulder)}),elbows:We({left:We(T.elbow),right:We(v.elbow)}),hands:We({left:We(T.palm),right:We(v.palm)}),handMotion:We({left:We({mode:f.mode}),right:We({mode:S.mode})})})})),d=a.held.map(m=>{let f=sr(c,m.personId),S=m.hand||(m.slot%2?"right":"left"),T=l.get(f.id)[S].position,v=(m.heldCount-1)*.5,E=Xt(wn(f.right,(m.slot-v)*.075),wt(0,m.slot%2*.035,0)),b=Xt(T,E);return We({...m,position:We(sa(b,cn)),direction:cn,quaternion:We(Fc(cn,f.forward)),state:"held",motionState:r<0?"count-in":"ready",holder:We({personId:f.id,hand:S})})}),u=a.airborne.map(m=>{let f=wy(m,c,o);return We({...m,sourcePersonId:m.juggler,targetPersonId:m.target,...f,position:We(f.position),direction:We(f.direction),quaternion:We(f.quaternion),holder:f.holder?We(f.holder):null})}),p=We([...d,...u]);if(p.length!==i.clubCount||new Set(p.map(m=>m.id)).size!==p.length)throw new RangeError(`${i.id}: generic 3D inventory must remain unique and complete`);if(p.some(m=>!gy(m.position)||![m.quaternion.x,m.quaternion.y,m.quaternion.z,m.quaternion.w].every(Number.isFinite)))throw new RangeError(`${i.id}: generic 3D pose must stay finite`);let g=We(p.filter(m=>m.state==="airborne")),M=We(p.filter(m=>m.state!=="airborne"));return We({version:fy,patternId:i.id,physical:!1,threeD:!0,model:"compiled-pattern-3d",executionPlan:i.executionPlan,playhead:r,cue:a.cue,camera:Ey(h,t),clubs:p,held:M,airborne:g,handConnected:M,activeEvents:a.airborne,people:h,allocation:a.allocation,mode:a.mode,total:p.length,collision:We({minimumClearanceMetres:1/0,method:"not evaluated by compiled-pattern 3D"})})}var En=10,pf=2,Ty=44,Ay=new F(0,1,0),yi=n=>new F(n.x,n.y,n.z).multiplyScalar(En),Ch=n=>Object.freeze(n),oa=Object.freeze({animationOwner:"Passing Lab host transport",rendererAnimationLoopCount:0,patternAnimationCount:1,sceneCount:1,cameraCount:1,cameraChangesReuseScene:!0}),ca=Object.freeze({clubMeshParts:Object.freeze(["lathed shell","lathed knob","lathed cap"]),clubMeshCount:18,clubGeometryType:"LatheGeometry",clubSegments:72,clubUsesSprites:!1,clubUsesCanvasClubs:!1,clubCastsShadows:!0,personRig:"volumetric capsule, sphere, cylinder, clavicle-side shoulder, and sampled waist-side-elbow limb meshes",shadows:"PCFShadowMap with floor receiving"});function mf(n,e){if(!(Number.isFinite(n)&&n>0&&Number.isFinite(e)&&e>0))throw new RangeError("camera fov and aspect must be positive finite numbers");let t=zi.degToRad(n),i=2*Math.atan(Math.tan(t*.5)*pf/e);return Math.min(Ty,Math.max(n,zi.radToDeg(i)))}function Ry(n,e){let t=mf(n,e),i=2*Math.atan(Math.tan(zi.degToRad(n)*.5)*pf),s=2*Math.atan(Math.tan(zi.degToRad(t)*.5)*e),r=e<.65?42:38,a=e<1?Math.min(i,zi.degToRad(r)):Math.min(i,s);return Math.max(1,Math.tan(a*.5)/Math.tan(s*.5))}function Tn(n,{receive:e=!1}={}){return n.castShadow=!0,n.receiveShadow=e,n}function Cy(n,e){let t=new In;t.name="physical-neutral-club";let i=new In;i.name="club-balance-pivot",i.position.y=-Ed.balanceY;let s=Tn(new tt(n.shell,e.shell));s.name="club-lathed-shell";let r=Tn(new tt(n.knob,e.knob));r.name="club-lathed-knob";let a=Tn(new tt(n.cap,e.cap));return a.name="club-lathed-cap",i.add(s,r,a),t.add(i),{group:t,meshes:[s,r,a]}}function df(n,e){return Tn(new tt(new Qi(e,e*.9,1,14),n))}function Rh(n,e){return Tn(new tt(new pi(e,14,10),n))}function ff(n,e,t){let i=t.clone().sub(e),s=Math.max(.001,i.length());n.position.copy(e).add(t).multiplyScalar(.5),n.quaternion.setFromUnitVectors(Ay,i.normalize()),n.scale.set(1,s,1)}function Py(n,e){let t=new In;t.name=`physical-juggler-${n.id}`,t.scale.setScalar($e.personRigScale);let i=Tn(new tt(new Ar(1.8,6.2,8,16),e.clothing));i.position.y=10.8;let s=Tn(new tt(new pi(1.92,16,12),e.clothing));s.scale.set(1,.64,.78),s.position.y=13;let r=Tn(new tt(new pi(2,14,10),e.clothing));r.scale.set(1,.58,.74),r.position.y=7;let a=Tn(new tt(new pi(1.55,18,14),e.skin));a.position.y=18.1;let o=Tn(new tt(new pi(.34,14,10),e.skin));o.name="juggler-face-direction-cue",o.position.set(0,18.08,-1.42);let c=Tn(new tt(new Qi(.58,.7,1,12),e.skin));c.position.y=16.55;let l=new Qi(.74,.58,6.8,12);[-.82,.82].forEach(d=>{let u=Tn(new tt(l,e.trousers));u.position.set(d,3.4,0),t.add(u)}),t.add(i,s,r,a,o,c);let h={};return["left","right"].forEach(d=>{let u=df(e.skin,Ks.upperArmShoulderRadiusMetres*En),p=df(e.skin,.43),g=Rh(e.skin,Ks.shoulderJointRadiusMetres*En);g.name=`juggler-${d}-clavicle-shoulder`;let M=Rh(e.skin,.49),m=Rh(e.skin,.58);h[d]={upper:u,lower:p,shoulder:g,elbow:M,palm:m}}),{id:n.id,root:t,arms:h}}function la(n,{receive:e=!1}={}){return n.castShadow=!1,n.receiveShadow=e,n}function Iy(n){let e=la(new tt(new es($e.stageWidth*En,$e.stageDepth*En),new an({color:2435892,roughness:.8,metalness:.05})),{receive:!0});e.name="stage-floor-shadow-receiver",e.rotation.x=-Math.PI/2,e.position.z=1,n.add(e);let t=la(new tt(new Ln($e.stageWidth*En,$e.prosceniumHeight*En,1.2),new an({color:1383464,roughness:.94})));t.position.set(0,$e.prosceniumHeight*En*.5,-$e.stageDepth*En*.5),n.add(t);let i=new an({color:2757918,roughness:.93}),s=4.6;[-1,1].forEach(o=>{let c=la(new tt(new Ln(s,38,2.2),i));c.position.set(o*($e.stageWidth*En*.5-s*.42),19,-4),n.add(c);for(let l=0;l<4;l+=1){let h=la(new tt(new Ln(.18,38.3,2.28),new an({color:1050893,roughness:1})));h.position.copy(c.position).add(new F(o*(l-1.5)*.82,0,-1.15)),n.add(h)}});let r=la(new tt(new Ln($e.stageWidth*En+5,3.2,2.2),i));r.position.set(0,37.1,-4),n.add(r);let a=new Nr($e.stageWidth*En,12,6517898,3226699);a.position.set(0,.02,1),a.material.transparent=!0,a.material.opacity=.3,n.add(a)}function Ly({mount:n,ariaLabel:e="True 3D six-club two-person passing stage"}={}){if(!(n instanceof HTMLElement))throw new TypeError("Passing Lab 3D stage requires a mount HTMLElement");let t=new yr;t.background=new Ue(658965),t.fog=new xr(658965,58,120);let i=new Ht(29,1,.1,220),s=new dc({antialias:!0,alpha:!1,powerPreference:"high-performance"});s.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,1.5)),s.outputColorSpace=en,s.toneMapping=Ur,s.toneMappingExposure=1.22,s.shadowMap.enabled=!0,s.shadowMap.type=ts,s.domElement.setAttribute("role","img"),s.domElement.setAttribute("aria-label",e),s.domElement.dataset.clubCount="0",s.domElement.dataset.clubMeshCount="0",s.domElement.dataset.clubGeometry="lathed-knob-shell-cap",s.domElement.dataset.personRig="volumetric-articulated",s.domElement.dataset.shadowMap="pcf",s.domElement.dataset.sceneReuse="true",s.domElement.dataset.animationLoops="0",s.domElement.dataset.animationOwner="passing-lab-host",n.replaceChildren(s.domElement),Iy(t),t.add(new Ir(14477311,1708056,2.15));let r=new ks(16773078,850,120,Math.PI/5.3,.36,1.1);r.position.set(-22,47,32),r.target.position.set(-4,8,0),r.castShadow=!0,r.shadow.mapSize.set(1024,1024),r.shadow.bias=-2e-4,t.add(r,r.target);let a=new ks(11126783,520,110,Math.PI/4.4,.48,1.35);a.position.set(24,32,24),a.target.position.set(8,8,2),t.add(a,a.target);let o=new Dr(16745115,1.45);o.position.set(0,27,-24),t.add(o);let c={clothing:new an({color:5798824,roughness:.7,metalness:.02}),trousers:new an({color:2436411,roughness:.82}),skin:new an({color:14266256,roughness:.86})},l=new Map,h=O=>{let L=Py(O,c);return t.add(L.root,L.arms.left.upper,L.arms.left.lower,L.arms.left.shoulder,L.arms.left.elbow,L.arms.left.palm,L.arms.right.upper,L.arms.right.lower,L.arms.right.shoulder,L.arms.right.elbow,L.arms.right.palm),l.set(O.id,L),L},d=Td({segments:ca.clubSegments}),u={shell:new Cr({color:16118247,roughness:.34,metalness:0,clearcoat:.16,clearcoatRoughness:.48}),knob:new an({color:2369325,roughness:.84}),cap:new an({color:14869729,roughness:.45,metalness:.06})},p=[],g=new Map,M=O=>{let L=Cy(d,u);return p.push(...L.meshes),t.add(L.group),g.set(O,L),L},m=!1,f=0,S=0,T="audience",v="#f4f1e8",E=null,b=1,R=tr,x=O=>{l.forEach((L,X)=>{L.root.visible=O.viewKind!=="first-person"||O.ownerPersonId!==X})},w=(O=E)=>{let L=O?.camera||Nc(T),X=Math.max(i.aspect||1,.01);if(L.viewKind==="first-person")return i.position.copy(yi(L.position)),i.fov=L.fov,i.up.set(0,1,0),i.lookAt(yi(L.target)),i.updateProjectionMatrix(),b=1,x(L),L;let te=yi(L.target),Q=yi(L.position);return b=Ry(L.fov,X),i.position.copy(te).add(Q.sub(te).multiplyScalar(b)),i.fov=mf(L.fov,X),i.lookAt(te),i.updateProjectionMatrix(),x(L),L},C=()=>{if(m)return;let O=Math.max(1,Math.round(n.clientWidth)),L=Math.max(1,Math.round(n.clientHeight));O===f&&L===S||(f=O,S=L,s.setSize(f,S,!1),i.aspect=f/S,w())},P=new ResizeObserver(C);P.observe(n);let D=O=>{T=O||"audience",w(E)},W=O=>{let L=l.get(O.id)||h(O);L.root.position.copy(yi(O.position)),L.root.rotation.y=O.visualYawRadians,["left","right"].forEach(X=>{let te=yi(O.shoulders[X]),Q=yi(O.hands[X]),ce=yi(O.elbows[X]);ff(L.arms[X].upper,te,ce),ff(L.arms[X].lower,ce,Q),L.arms[X].shoulder.position.copy(te),L.arms[X].elbow.position.copy(ce),L.arms[X].palm.position.copy(Q)})},q=(O,L={})=>{if(m)return E;let X=L.pattern||Js(L.patternId||R),te=ia(X.id);R=X.id,L.camera&&D(L.camera),L.clubColour&&L.clubColour!==v&&(v=L.clubColour,u.shell.color.set(v)),C();let Q=te.supported?Kd(R,O,{camera:T}):Ah(X,O,{camera:T}),ce=new Set(Q.people.map(Ie=>Ie.id));l.forEach((Ie,Z)=>{Ie.root.visible=ce.has(Z)}),Q.people.forEach(W);let ye=new Set(Q.clubs.map(Ie=>Ie.id));g.forEach((Ie,Z)=>{Ie.group.visible=ye.has(Z)}),Q.clubs.forEach(Ie=>{let Z=g.get(Ie.id)||M(Ie.id);Z.group.position.copy(yi(Ie.position)),Z.group.quaternion.set(Ie.quaternion.x,Ie.quaternion.y,Ie.quaternion.z,Ie.quaternion.w),Z.group.visible=!0});let Xe=w(Q),dt=X.title;return s.domElement.setAttribute("aria-label",Q.physical?`${dt}: detailed physical 3D six-club passing stage`:`${dt}: compiled-pattern 3D stage with ${Q.people.length} performers and ${Q.total} clubs`),s.domElement.dataset.activePattern=Q.patternId,s.domElement.dataset.stageModel=Q.physical?"dedicated-physical-3d":Q.model,s.domElement.dataset.clubCount=String(Q.total),s.domElement.dataset.clubMeshCount=String(Q.total*ca.clubMeshParts.length),s.domElement.dataset.performerCount=String(Q.people.length),s.domElement.dataset.handConnectedClubs=String((Q.handConnected||Q.held).length),s.domElement.dataset.inFlightClubs=String(Q.airborne.length),s.domElement.dataset.minimumBodyClearanceMm=Number.isFinite(Q.collision.minimumClearanceMetres)?String(Math.round(Q.collision.minimumClearanceMetres*1e3)):"not-applicable",s.domElement.dataset.bodyCollisionMethod=Q.collision.method,s.domElement.dataset.camera=T,s.domElement.dataset.cameraKind=Xe.viewKind,s.domElement.dataset.cameraOwner=Xe.ownerPersonId||"",s.domElement.dataset.hiddenAvatar=Xe.viewKind==="first-person"?Xe.ownerPersonId:"",s.domElement.dataset.visibleClubs=String([...g.values()].filter(Ie=>Ie.group.visible).length),s.domElement.dataset.cameraFov=i.fov.toFixed(2),s.domElement.dataset.cameraAspect=i.aspect.toFixed(3),s.domElement.dataset.cameraDistanceScale=b.toFixed(3),s.render(t,i),E=Q,Q},z=()=>{if(m)return;m=!0,P.disconnect();let O=new Set,L=new Set;t.traverse(X=>{if(!X.isMesh)return;X.geometry&&!O.has(X.geometry)&&(O.add(X.geometry),X.geometry.dispose()),(Array.isArray(X.material)?X.material:[X.material]).forEach(Q=>{Q&&!L.has(Q)&&(L.add(Q),Q.dispose())})}),s.dispose(),n.replaceChildren()};return D("audience"),C(),Ch({render:q,setCamera:D,dispose:z,debug:()=>Ch({rendererCount:1,sceneCount:oa.sceneCount,cameraCount:oa.cameraCount,cameraChangesReuseScene:oa.cameraChangesReuseScene,animationLoopCount:oa.rendererAnimationLoopCount,animationOwner:oa.animationOwner,activePattern:R,clubCount:E?.total||0,clubMeshCount:E?E.total*ca.clubMeshParts.length:0,allClubMeshesLathed:p.every(O=>O.geometry.type===ca.clubGeometryType),clubUsesSprites:ca.clubUsesSprites,shadowMapEnabled:s.shadowMap.enabled,camera:T,cameraKind:E?.camera?.viewKind||Nc(T).viewKind,cameraPose:E?.camera||null,hiddenAvatarRoots:[...l.entries()].filter(([,O])=>!O.root.visible).map(([O])=>O),visibleArmRigs:[...l.keys()],actorFacing:E?Object.fromEntries(E.people.map(O=>[O.id,{forward:O.forward,visualYawRadians:O.visualYawRadians}])):null,width:f,height:S,cameraDistanceScale:b,threeRevision:"185"})})}globalThis.PassingFourCount3D=Ch({create:Ly,isSupported:n=>{try{return Ah(typeof n=="string"?Js(n):n,-2),!0}catch{return!1}},isDedicatedPhysical:n=>ia(n).supported,revision:"185"});})();
