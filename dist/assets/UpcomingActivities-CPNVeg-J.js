import{e as Q,g as Y,r as $,a as F,u as ee,s as te,j as e,d as ne,c as U,b as re}from"./index-BztnOGJd.js";var A={},T;function ae(){if(T)return A;T=1;function d(s){if(typeof window>"u")return;const r=document.createElement("style");return r.setAttribute("type","text/css"),r.innerHTML=s,document.head.appendChild(r),s}Object.defineProperty(A,"__esModule",{value:!0});var t=Q();function m(s){return s&&typeof s=="object"&&"default"in s?s:{default:s}}var a=m(t);d(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const f=t.forwardRef(function({style:r={},className:w="",autoFill:l=!1,play:h=!0,pauseOnHover:o=!1,pauseOnClick:b=!1,direction:n="left",speed:x=50,delay:M=0,loop:j=0,gradient:y=!1,gradientColor:q="white",gradientWidth:u=200,onFinish:c,onCycleComplete:V,onMount:D,children:L},O){const[S,X]=t.useState(0),[R,H]=t.useState(0),[E,z]=t.useState(1),[C,Z]=t.useState(!1),G=t.useRef(null),g=O||G,N=t.useRef(null),k=t.useCallback(()=>{if(N.current&&g.current){const i=g.current.getBoundingClientRect(),W=N.current.getBoundingClientRect();let v=i.width,p=W.width;(n==="up"||n==="down")&&(v=i.height,p=W.height),z(l&&v&&p&&p<v?Math.ceil(v/p):1),X(v),H(p)}},[l,g,n]);t.useEffect(()=>{if(C&&(k(),N.current&&g.current)){const i=new ResizeObserver(()=>k());return i.observe(g.current),i.observe(N.current),()=>{i&&i.disconnect()}}},[k,g,C]),t.useEffect(()=>{k()},[k,L]),t.useEffect(()=>{Z(!0)},[]),t.useEffect(()=>{typeof D=="function"&&D()},[]);const B=t.useMemo(()=>l?R*E/x:R<S?S/x:R/x,[l,S,R,E,x]),J=t.useMemo(()=>Object.assign(Object.assign({},r),{"--pause-on-hover":!h||o?"paused":"running","--pause-on-click":!h||o&&!b||b?"paused":"running","--width":n==="up"||n==="down"?"100vh":"100%","--transform":n==="up"?"rotate(-90deg)":n==="down"?"rotate(90deg)":"none"}),[r,h,o,b,n]),K=t.useMemo(()=>({"--gradient-color":q,"--gradient-width":typeof u=="number"?`${u}px`:u}),[q,u]),I=t.useMemo(()=>({"--play":h?"running":"paused","--direction":n==="left"?"normal":"reverse","--duration":`${B}s`,"--delay":`${M}s`,"--iteration-count":j?`${j}`:"infinite","--min-width":l?"auto":"100%"}),[h,n,B,M,j,l]),_=t.useMemo(()=>({"--transform":n==="up"?"rotate(90deg)":n==="down"?"rotate(-90deg)":"none"}),[n]),P=t.useCallback(i=>[...Array(Number.isFinite(i)&&i>=0?i:0)].map((W,v)=>a.default.createElement(t.Fragment,{key:v},t.Children.map(L,p=>a.default.createElement("div",{style:_,className:"rfm-child"},p)))),[_,L]);return C?a.default.createElement("div",{ref:g,style:J,className:"rfm-marquee-container "+w},y&&a.default.createElement("div",{style:K,className:"rfm-overlay"}),a.default.createElement("div",{className:"rfm-marquee",style:I,onAnimationIteration:V,onAnimationEnd:c},a.default.createElement("div",{className:"rfm-initial-child-container",ref:N},t.Children.map(L,i=>a.default.createElement("div",{style:_,className:"rfm-child"},i))),P(E-1)),a.default.createElement("div",{className:"rfm-marquee",style:I},P(E))):null});return A.default=f,A}var se=ae();const ie=Y(se),oe=({title:d,k_title:t,program_date:m,location:a,k_location:f,program_time:s,about:r,k_about:w,media_file:l,id:h,isEnglish:o})=>{const b=re();let n=null,x=o?d:t;if(Array.isArray(l)&&l.length>0){const u=l.find(c=>c.image_url&&c.image_url.full&&c.image_url.full.high_res);if(u){const c=u.image_url.full.high_res;n=c.startsWith("http")?c:`${U}${c}`,x=u.name?.original||(o?d:t)}}const M=o?d:t,j=o?a:f,y=o?r:w,q=y&&y.length>120;return e.jsx("div",{className:"w-[350px] mb-2 p-4 pb-8 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-[500px] flex flex-col justify-between",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-3",children:M}),e.jsx("div",{className:"aspect-video w-full mb-4 overflow-hidden rounded-lg",children:n?e.jsx("a",{href:n,target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{src:n,alt:x,className:"w-full h-full object-cover hover:scale-105 transition-transform duration-300"})}):e.jsx("div",{className:"w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-semibold text-lg",children:o?"No Image":"ಯಾವುದೇ ಚಿತ್ರವಿಲ್ಲ"})}),e.jsxs("div",{className:"space-y-2 text-gray-600",children:[e.jsxs("p",{className:"flex items-center",children:[e.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})}),m?new Date(m).toLocaleDateString():"N/A"]}),e.jsxs("p",{className:"flex items-center",children:[e.jsxs("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),j]}),e.jsxs("p",{className:"flex items-center",children:[e.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),s?new Date(`1970-01-01T${s}`).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"N/A"]}),e.jsx("div",{className:"text-gray-500",children:q?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"overflow-hidden text-ellipsis",style:{display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"},children:y}),e.jsx("span",{children:"... "}),e.jsx("button",{className:"text-blue-600 underline text-sm ml-1 cursor-pointer",style:{textDecoration:"underline"},onClick:()=>b(`/upcoming-programs/${h}`),children:o?"Read more":"ಮತ್ತಷ್ಟು ಓದಿ"})]}):e.jsx("span",{children:y})})]})]})})},ce=()=>{const[d,t]=$.useState([]),m=F(),a=ee(r=>r.user.value);$.useEffect(()=>{a.language===void 0&&m(te(!1))},[m,a.language]);const f=!!a.language,s=()=>{ne.get(`${U}upcommingprograms`).then(r=>{t(r.data.data)}).catch(r=>{console.error("Error fetching activities:",r)})};return $.useEffect(()=>{s()},[]),e.jsxs("section",{className:"w-full py-12 overflow-hidden",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-800 text-center mb-8",children:f?"Notifications/Programs":"ಮಹಾಸಭಾದ ಅಧಿಸೂಚನೆಗಳು/ಕಾರ್ಯಕ್ರಮಗಳು"}),e.jsx("div",{className:"max-w-7xl mx-auto flex justify-end mb-8 px-4",children:e.jsx("button",{className:"cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm",onClick:()=>window.location.href="/upcoming-programs",children:f?"View More >":"ಮತ್ತಷ್ಟು ನೋಡಿ >"})}),e.jsx(ie,{gradient:!0,speed:40,pauseOnHover:!0,children:d.map((r,w)=>e.jsx(oe,{...r,isEnglish:f},w))})]})};export{ce as default};
