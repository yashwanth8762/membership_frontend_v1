import{e as K,g as Q,r as D,a as Y,u as ee,s as te,j as e,d as ne,c as V,b as re}from"./index-B9LvKJhK.js";var A={},U;function ae(){if(U)return A;U=1;function m(s){if(typeof window>"u")return;const n=document.createElement("style");return n.setAttribute("type","text/css"),n.innerHTML=s,document.head.appendChild(n),s}Object.defineProperty(A,"__esModule",{value:!0});var t=K();function h(s){return s&&typeof s=="object"&&"default"in s?s:{default:s}}var a=h(t);m(`.rfm-marquee-container {
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
}`);const c=t.forwardRef(function({style:n={},className:u="",autoFill:o=!1,play:x=!0,pauseOnHover:l=!1,pauseOnClick:b=!1,direction:r="left",speed:p=50,delay:M=0,loop:j=0,gradient:y=!1,gradientColor:q="white",gradientWidth:f=200,onFinish:d,onCycleComplete:T,onMount:W,children:R},H){const[C,O]=t.useState(0),[E,F]=t.useState(0),[L,$]=t.useState(1),[S,X]=t.useState(!1),Z=t.useRef(null),g=H||Z,N=t.useRef(null),k=t.useCallback(()=>{if(N.current&&g.current){const i=g.current.getBoundingClientRect(),z=N.current.getBoundingClientRect();let v=i.width,w=z.width;(r==="up"||r==="down")&&(v=i.height,w=z.height),$(o&&v&&w&&w<v?Math.ceil(v/w):1),O(v),F(w)}},[o,g,r]);t.useEffect(()=>{if(S&&(k(),N.current&&g.current)){const i=new ResizeObserver(()=>k());return i.observe(g.current),i.observe(N.current),()=>{i&&i.disconnect()}}},[k,g,S]),t.useEffect(()=>{k()},[k,R]),t.useEffect(()=>{X(!0)},[]),t.useEffect(()=>{typeof W=="function"&&W()},[]);const B=t.useMemo(()=>o?E*L/p:E<C?C/p:E/p,[o,C,E,L,p]),G=t.useMemo(()=>Object.assign(Object.assign({},n),{"--pause-on-hover":!x||l?"paused":"running","--pause-on-click":!x||l&&!b||b?"paused":"running","--width":r==="up"||r==="down"?"100vh":"100%","--transform":r==="up"?"rotate(-90deg)":r==="down"?"rotate(90deg)":"none"}),[n,x,l,b,r]),J=t.useMemo(()=>({"--gradient-color":q,"--gradient-width":typeof f=="number"?`${f}px`:f}),[q,f]),I=t.useMemo(()=>({"--play":x?"running":"paused","--direction":r==="left"?"normal":"reverse","--duration":`${B}s`,"--delay":`${M}s`,"--iteration-count":j?`${j}`:"infinite","--min-width":o?"auto":"100%"}),[x,r,B,M,j,o]),_=t.useMemo(()=>({"--transform":r==="up"?"rotate(90deg)":r==="down"?"rotate(-90deg)":"none"}),[r]),P=t.useCallback(i=>[...Array(Number.isFinite(i)&&i>=0?i:0)].map((z,v)=>a.default.createElement(t.Fragment,{key:v},t.Children.map(R,w=>a.default.createElement("div",{style:_,className:"rfm-child"},w)))),[_,R]);return S?a.default.createElement("div",{ref:g,style:G,className:"rfm-marquee-container "+u},y&&a.default.createElement("div",{style:J,className:"rfm-overlay"}),a.default.createElement("div",{className:"rfm-marquee",style:I,onAnimationIteration:T,onAnimationEnd:d},a.default.createElement("div",{className:"rfm-initial-child-container",ref:N},t.Children.map(R,i=>a.default.createElement("div",{style:_,className:"rfm-child"},i))),P(L-1)),a.default.createElement("div",{className:"rfm-marquee",style:I},P(L))):null});return A.default=c,A}var se=ae();const ie=Q(se),oe=({title:m,k_title:t,program_date:h,location:a,k_location:c,program_time:s,about:n,k_about:u,media_file:o,id:x,isEnglish:l})=>{const b=re();let r=null,p=l?m:t;if(Array.isArray(o)&&o.length>0){const f=o.find(d=>d.image_url&&d.image_url.full&&d.image_url.full.high_res);if(f){const d=f.image_url.full.high_res;r=d.startsWith("http")?d:`${V}${d}`,p=f.name?.original||(l?m:t)}}const M=l?m:t,j=l?a:c,y=l?n:u,q=y&&y.length>120;return e.jsx("div",{className:"w-[350px] mb-2 p-4 pb-8 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-[500px] flex flex-col justify-between",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-3",children:M}),e.jsx("div",{className:"aspect-video w-full mb-4 overflow-hidden rounded-lg",children:r?e.jsx("a",{href:r,target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{src:r,alt:p,className:"w-full h-full object-cover hover:scale-105 transition-transform duration-300"})}):e.jsx("div",{className:"w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-semibold text-lg",children:l?"No Image":"ಯಾವುದೇ ಚಿತ್ರವಿಲ್ಲ"})}),e.jsxs("div",{className:"space-y-2 text-gray-600",children:[e.jsxs("p",{className:"flex items-center",children:[e.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})}),h?new Date(h).toLocaleDateString():"N/A"]}),e.jsxs("p",{className:"flex items-center",children:[e.jsxs("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),j]}),e.jsxs("p",{className:"flex items-center",children:[e.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),s?new Date(`1970-01-01T${s}`).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"N/A"]}),e.jsx("div",{className:"text-gray-500",children:q?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"overflow-hidden text-ellipsis",style:{display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"},children:y}),e.jsx("span",{children:"... "}),e.jsx("button",{className:"text-blue-600 underline text-sm ml-1 cursor-pointer",style:{textDecoration:"underline"},onClick:()=>b(`/upcoming-programs/${x}`),children:l?"Read more":"ಮತ್ತಷ್ಟು ಓದಿ"})]}):e.jsx("span",{children:y})})]})]})})},ce=()=>{const[m,t]=D.useState([]),h=Y(),a=ee(n=>n.user.value);D.useEffect(()=>{a.language===void 0&&h(te(!1))},[h,a.language]);const c=!!a.language,s=()=>{ne.get(`${V}upcommingprograms`).then(n=>{t(n.data.data)}).catch(n=>{console.error("Error fetching activities:",n)})};return D.useEffect(()=>{s()},[]),e.jsxs("section",{className:"w-full py-12 overflow-hidden",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-800 text-center mb-8",children:c?"Notifications/Programs":"ಮಹಾಸಭಾದ ಅಧಿಸೂಚನೆಗಳು/ಕಾರ್ಯಕ್ರಮಗಳು"}),e.jsx("div",{className:"max-w-7xl mx-auto flex justify-end mb-8 px-4",children:e.jsx("button",{className:"cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm",onClick:()=>window.location.href="/upcoming-programs",children:c?"View More >":"ಮತ್ತಷ್ಟು ನೋಡಿ >"})}),e.jsxs(ie,{gradient:!0,speed:40,pauseOnHover:!0,children:[(()=>{const n="ಕೇಂದ್ರ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರನ್ನಾಗಿ ನೇಮಕ ಮಾಡುವ ಕುರಿತು..pdf",u=`/assets/${encodeURIComponent(n)}`,o=c?"Executive Committee Appointment Notification (PDF)":n;return e.jsx("div",{className:"w-[350px] mb-2 p-4 pb-8 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-[500px] flex flex-col justify-between",children:e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-3",children:o}),e.jsx("div",{className:"aspect-video w-full mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100",children:e.jsx("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center w-full h-full",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"96",height:"96",fill:"#ef4444","aria-hidden":"true",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",opacity:".2"}),e.jsx("path",{d:"M14 2v6h6"}),e.jsx("path",{d:"M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"}),e.jsx("path",{d:"M8 13h3a2 2 0 1 1 0 4H8z"}),e.jsx("path",{d:"M13 17v-4h2a1 1 0 0 1 0 2h-2"}),e.jsx("path",{d:"M17 13h1a2 2 0 1 1 0 4h-1z"})]})})}),e.jsx("div",{className:"space-y-2 text-gray-600 text-center",children:e.jsx("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 underline text-sm",children:c?"Open PDF":"ಪಿಡಿಎಫ್ ತೆರೆಯಿರಿ"})})]})})})(),m.map((n,u)=>e.jsx(oe,{...n,isEnglish:c},u))]})]})};export{ce as default};
