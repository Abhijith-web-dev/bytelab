const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-CqKVB-4n.js","assets/vendor-markdown-DF3k51c2.js","assets/vendor-react-Ci8dv4ag.js","assets/Badge-BwRYt8TR.js","assets/pythonRuntime-CPEvI86O.js","assets/vendor-ui-DTaOEc3i.js","assets/vendor-firebase-TBfIE0rs.js","assets/vendor-state-DzvRPpAi.js","assets/vendor-utils-DKX_0JK4.js","assets/CourseCatalogPage-DPrPgjJb.js","assets/Card-B0t9krN9.js","assets/ProgressBar-1NcTRPj2.js","assets/SubNavFrosted-CM7ogYI9.js","assets/CourseOverviewPage-BwWiaSG3.js","assets/UnitOverviewPage-DE9-KC3n.js","assets/LessonPage-BFPSz-0I.js","assets/PracticePage-BXFTuUV7.js","assets/CodePlayground-VI91asfg.js","assets/vendor-editor-DFq7nhUw.js","assets/TestSessionPage-BE92Fmqr.js","assets/ProgressDashboardPage-dQJOlVkw.js","assets/LeaderboardPage-xo2qvm3X.js","assets/ProfilePage-CIrVdMN6.js","assets/LoginPage-LcJsdH2V.js","assets/RegisterPage-B7xwQUQF.js"])))=>i.map(i=>d[i]);
import{j as r}from"./vendor-markdown-DF3k51c2.js";import{c as S1,g as C1,u as st,L as $,d as T1,r as f,O as P1,e as I1,f as $1,N as k1,R as E1,h as j1}from"./vendor-react-Ci8dv4ag.js";import{C as at,S as ke,F as O1,A as M1,L as Ge,X as lt,M as z1,U as A1,a as F1,b as D1,c as q1,d as W1,B as R1,e as L1,T as N1,f as U1,R as B1,H as V1}from"./vendor-ui-DTaOEc3i.js";import{g as He,i as G1,a as H1,b as Y1,s as J1,c as Q1,d as K1,u as X1,e as Z1,o as eC,q as tC,f as Ye,h as nC,l as oC,j as rC,k as we,m as Se,n as Ce}from"./vendor-firebase-TBfIE0rs.js";import{c as Ae}from"./vendor-state-DzvRPpAi.js";import{e as iC}from"./vendor-utils-DKX_0JK4.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var le={},Je;function sC(){if(Je)return le;Je=1;var e=S1();return le.createRoot=e.createRoot,le.hydrateRoot=e.hydrateRoot,le}var aC=sC();const lC=C1(aC),cC="modulepreload",dC=function(e){return"/bytelab/"+e},Qe={},O=function(o,t,n){let s=Promise.resolve();if(t&&t.length>0){let a=function(c){return Promise.all(c.map(m=>Promise.resolve(m).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),g=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=a(t.map(c=>{if(c=dC(c),c in Qe)return;Qe[c]=!0;const m=c.endsWith(".css"),b=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${b}`))return;const v=document.createElement("link");if(v.rel=m?"stylesheet":cC,m||(v.as="script"),v.crossOrigin="",v.href=c,g&&v.setAttribute("nonce",g),document.head.appendChild(v),m)return new Promise((x,T)=>{v.addEventListener("load",x),v.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return o().catch(i)})},uC=void 0,pC=!!uC,D=pC;let ce=null,A=null,R=null;if(D)try{const e={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0};He().length?ce=He()[0]:ce=G1(e),A=H1(ce),R=Y1(ce)}catch(e){console.warn("Firebase init error (using offline local mode):",e)}const Te="bytelab:",w={get(e,o=null){try{const t=localStorage.getItem(`${Te}${e}`);return t?JSON.parse(t):o}catch(t){return console.warn(`LocalStorage read error for ${e}:`,t),o}},set(e,o){try{return localStorage.setItem(`${Te}${e}`,JSON.stringify(o)),!0}catch(t){return console.warn(`LocalStorage write error for ${e}:`,t),!1}},remove(e){try{return localStorage.removeItem(`${Te}${e}`),!0}catch(o){return console.warn(`LocalStorage remove error for ${e}:`,o),!1}}},M4={saveDraft(e,o){e&&w.set(`draft:${e}`,{code:o,savedAt:Date.now()})},getDraft(e){if(!e)return null;const o=w.get(`draft:${e}`);return(o==null?void 0:o.code)||null},clearDraft(e){e&&w.remove(`draft:${e}`)}},Ke={getLocalProgress(e="guest"){return w.get(`progress:${e}`,{completedLessons:[],completedChapters:[],completedUnits:[],solvedProblems:{},testScores:{},streakDays:1,lastActiveDate:new Date().toISOString().split("T")[0],totalPoints:0})},saveLocalProgress(e="guest",o){return w.set(`progress:${e}`,{...o,updatedAt:Date.now()})}},ee="demo_user",te={onAuthChange(e){if(!D||!A){const o=w.get(ee,null);return e(o),()=>{}}return eC(A,o=>{var t;e(o?{uid:o.uid,email:o.email,displayName:o.displayName||((t=o.email)==null?void 0:t.split("@")[0])||"Student",isAnonymous:o.isAnonymous}:null)})},async login(e,o){if(!D||!A){const n={uid:"user_"+btoa(e).replace(/=/g,"").substring(0,10),email:e,displayName:e.split("@")[0],isAnonymous:!1};return w.set(ee,n),n}const t=await Z1(A,e,o);return{uid:t.user.uid,email:t.user.email,displayName:t.user.displayName||e.split("@")[0]}},async register(e,o,t){if(!D||!A){const s={uid:"user_"+btoa(e).replace(/=/g,"").substring(0,10),email:e,displayName:t||e.split("@")[0],isAnonymous:!1};return w.set(ee,s),s}const n=await K1(A,e,o);return t&&await X1(n.user,{displayName:t}),{uid:n.user.uid,email:n.user.email,displayName:t||e.split("@")[0]}},async loginAsGuest(){if(!D||!A){const o={uid:"guest_"+Math.random().toString(36).substring(2,9),email:null,displayName:"Guest Student",isAnonymous:!0};return w.set(ee,o),o}return{uid:(await Q1(A)).user.uid,email:null,displayName:"Guest Student",isAnonymous:!0}},async logout(){w.remove(ee),D&&A&&await J1(A)}},Pe={async saveUserProgress(e,o){if(!(!e||e==="guest")){if(!D||!R){w.set(`remote_progress:${e}`,o);return}try{const t=we(R,"users",e,"courseProgress",o.courseId||"python-programming");await Se(t,{...o,updatedAt:Ce()},{merge:!0})}catch(t){console.warn("Firestore save progress error:",t)}}},async recordTestAttempt(e,o){if(e){if(!D||!R){const t=w.get(`test_attempts:${e}`,[]);t.unshift({...o,id:`att_${Date.now()}`,attemptedAt:Date.now()}),w.set(`test_attempts:${e}`,t);return}try{const t=we(Ye(R,"users",e,"testAttempts"));await Se(t,{...o,submittedAt:Ce()})}catch(t){console.warn("Firestore record test error:",t)}}},async updateLeaderboardEntry(e,o){if(!(!e||e.startsWith("guest_"))){if(!D||!R){const t=w.get("mock_leaderboard",[]),n=t.findIndex(i=>i.userId===e),s={userId:e,displayName:o.displayName||"Student",score:o.score||0,completedUnits:o.completedUnits||0,completedChapters:o.completedChapters||0,updatedAt:Date.now()};n>=0?t[n]=s:t.push(s),t.sort((i,a)=>a.score-i.score),w.set("mock_leaderboard",t);return}try{const t=we(R,"leaderboards",o.courseId||"python-programming","entries",e);await Se(t,{userId:e,displayName:o.displayName||"Student",score:o.score,completedUnits:o.completedUnits,completedChapters:o.completedChapters,updatedAt:Ce()},{merge:!0})}catch(t){console.warn("Firestore update leaderboard error:",t)}}},async getLeaderboard(e="python-programming",o=20){if(!D||!R){const t=[{userId:"u-1",displayName:"Aravind S.",score:1480,completedUnits:5,completedChapters:27,rank:1},{userId:"u-2",displayName:"Deepika R.",score:1390,completedUnits:5,completedChapters:25,rank:2},{userId:"u-3",displayName:"Karthik N.",score:1250,completedUnits:4,completedChapters:22,rank:3},{userId:"u-4",displayName:"Meera V.",score:1120,completedUnits:4,completedChapters:19,rank:4},{userId:"u-5",displayName:"Rahul K.",score:980,completedUnits:3,completedChapters:16,rank:5},{userId:"u-6",displayName:"Sneha M.",score:840,completedUnits:3,completedChapters:13,rank:6},{userId:"u-7",displayName:"Vikram B.",score:710,completedUnits:2,completedChapters:10,rank:7},{userId:"u-8",displayName:"Ananya G.",score:560,completedUnits:2,completedChapters:8,rank:8}],s=[...w.get("mock_leaderboard",[])];return t.forEach(i=>{s.find(a=>a.userId===i.userId)||s.push(i)}),s.sort((i,a)=>a.score-i.score),s.slice(0,o).map((i,a)=>({...i,rank:a+1}))}try{const t=tC(Ye(R,"leaderboards",e,"entries"),nC("score","desc"),oC(o));return(await rC(t)).docs.map((s,i)=>({id:s.id,rank:i+1,...s.data()}))}catch(t){return console.warn("Firestore fetch leaderboard error:",t),[]}}},de="sync_queue";class mC{constructor(){this.isOnline=typeof navigator<"u"?navigator.onLine:!0,this.isSyncing=!1,typeof window<"u"&&(window.addEventListener("online",()=>{this.isOnline=!0,this.flushQueue()}),window.addEventListener("offline",()=>{this.isOnline=!1}))}enqueue(o){const t=w.get(de,[]);t.push({...o,queuedAt:Date.now()}),w.set(de,t),this.isOnline&&this.flushQueue()}async flushQueue(){if(!(this.isSyncing||!this.isOnline)){this.isSyncing=!0;try{const o=w.get(de,[]);if(!o.length)return;const t=[];for(const n of o)try{n.type==="SAVE_PROGRESS"?await Pe.saveUserProgress(n.userId,n.data):n.type==="RECORD_TEST"?await Pe.recordTestAttempt(n.userId,n.data):n.type==="UPDATE_LEADERBOARD"&&await Pe.updateLeaderboardEntry(n.userId,n.data)}catch(s){console.warn("Sync failed for item, keeping in queue:",s),t.push(n)}w.set(de,t)}finally{this.isSyncing=!1}}}}const Ie=new mC,ct="day-01",dt="unit-01",ut=1,pt=1,mt="Day 1: Python Interpreter & Interactive Mode",yt="Python Interpreter & Interactive Mode",gt="Introduction to the Python interpreter, running code in interactive mode vs script mode.",ht="Type B: Flowchart / Decision Simulation",bt=20,ft="beginner",_t=["CO1"],xt=[],vt=1,wt=1,St=1,yC={id:ct,unitId:dt,dayNumber:ut,order:pt,title:mt,shortTitle:yt,description:gt,simulationType:ht,estimatedMinutes:bt,difficulty:ft,outcomes:_t,prerequisites:xt,lessonsCount:vt,problemsCount:wt,quizCount:St},gC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:ut,default:yC,description:gt,difficulty:ft,estimatedMinutes:bt,id:ct,lessonsCount:vt,order:pt,outcomes:_t,prerequisites:xt,problemsCount:wt,quizCount:St,shortTitle:yt,simulationType:ht,title:mt,unitId:dt},Symbol.toStringTag,{value:"Module"})),Ct="day-02",Tt="unit-01",Pt=2,It=2,$t="Day 2: Values and Types (int, float, boolean)",kt="Values and Types (int, float, boolean)",Et="Understanding primitive data types: integers, floats, and booleans.",jt="Type A: Value / State Simulation",Ot=20,Mt="beginner",zt=["CO1"],At=["day-01"],Ft=1,Dt=1,qt=1,hC={id:Ct,unitId:Tt,dayNumber:Pt,order:It,title:$t,shortTitle:kt,description:Et,simulationType:jt,estimatedMinutes:Ot,difficulty:Mt,outcomes:zt,prerequisites:At,lessonsCount:Ft,problemsCount:Dt,quizCount:qt},bC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Pt,default:hC,description:Et,difficulty:Mt,estimatedMinutes:Ot,id:Ct,lessonsCount:Ft,order:It,outcomes:zt,prerequisites:At,problemsCount:Dt,quizCount:qt,shortTitle:kt,simulationType:jt,title:$t,unitId:Tt},Symbol.toStringTag,{value:"Module"})),Wt="day-03",Rt="unit-01",Lt=3,Nt=3,Ut="Day 3: String and List Types",Bt="String and List Types",Vt="Basic introduction to string and list types as sequences of values.",Gt="Type E: Data Structure Visualizer",Ht=20,Yt="beginner",Jt=["CO1"],Qt=["day-02"],Kt=1,Xt=1,Zt=1,fC={id:Wt,unitId:Rt,dayNumber:Lt,order:Nt,title:Ut,shortTitle:Bt,description:Vt,simulationType:Gt,estimatedMinutes:Ht,difficulty:Yt,outcomes:Jt,prerequisites:Qt,lessonsCount:Kt,problemsCount:Xt,quizCount:Zt},_C=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Lt,default:fC,description:Vt,difficulty:Yt,estimatedMinutes:Ht,id:Wt,lessonsCount:Kt,order:Nt,outcomes:Jt,prerequisites:Qt,problemsCount:Xt,quizCount:Zt,shortTitle:Bt,simulationType:Gt,title:Ut,unitId:Rt},Symbol.toStringTag,{value:"Module"})),en="day-04",tn="unit-01",nn=4,on=4,rn="Day 4: Variables and Comments",sn="Variables and Comments",an="Declaring variables, naming rules, and adding inline/block comments.",ln="Type A: Value / State Simulation",cn=20,dn="beginner",un=["CO1"],pn=["day-03"],mn=1,yn=1,gn=1,xC={id:en,unitId:tn,dayNumber:nn,order:on,title:rn,shortTitle:sn,description:an,simulationType:ln,estimatedMinutes:cn,difficulty:dn,outcomes:un,prerequisites:pn,lessonsCount:mn,problemsCount:yn,quizCount:gn},vC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:nn,default:xC,description:an,difficulty:dn,estimatedMinutes:cn,id:en,lessonsCount:mn,order:on,outcomes:un,prerequisites:pn,problemsCount:yn,quizCount:gn,shortTitle:sn,simulationType:ln,title:rn,unitId:tn},Symbol.toStringTag,{value:"Module"})),hn="day-05",bn="unit-01",fn=5,_n=5,xn="Day 5: Expressions and Statements",vn="Expressions and Statements",wn="Differentiating expressions (evaluate to a value) and statements (execute an action).",Sn="Type A: Value / State Simulation",Cn=20,Tn="beginner",Pn=["CO1"],In=["day-04"],$n=1,kn=1,En=1,wC={id:hn,unitId:bn,dayNumber:fn,order:_n,title:xn,shortTitle:vn,description:wn,simulationType:Sn,estimatedMinutes:Cn,difficulty:Tn,outcomes:Pn,prerequisites:In,lessonsCount:$n,problemsCount:kn,quizCount:En},SC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:fn,default:wC,description:wn,difficulty:Tn,estimatedMinutes:Cn,id:hn,lessonsCount:$n,order:_n,outcomes:Pn,prerequisites:In,problemsCount:kn,quizCount:En,shortTitle:vn,simulationType:Sn,title:xn,unitId:bn},Symbol.toStringTag,{value:"Module"})),jn="day-06",On="unit-01",Mn=6,zn=6,An="Day 6: Precedence of Operators",Fn="Precedence of Operators",Dn="Understanding how mathematical operators are evaluated using BEDMAS/PEMDAS precedence.",qn="Type B: Flowchart / Decision Simulation",Wn=20,Rn="beginner",Ln=["CO1"],Nn=["day-05"],Un=1,Bn=1,Vn=1,CC={id:jn,unitId:On,dayNumber:Mn,order:zn,title:An,shortTitle:Fn,description:Dn,simulationType:qn,estimatedMinutes:Wn,difficulty:Rn,outcomes:Ln,prerequisites:Nn,lessonsCount:Un,problemsCount:Bn,quizCount:Vn},TC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Mn,default:CC,description:Dn,difficulty:Rn,estimatedMinutes:Wn,id:jn,lessonsCount:Un,order:zn,outcomes:Ln,prerequisites:Nn,problemsCount:Bn,quizCount:Vn,shortTitle:Fn,simulationType:qn,title:An,unitId:On},Symbol.toStringTag,{value:"Module"})),Gn="day-07",Hn="unit-01",Yn=7,Jn=7,Qn="Day 7: Tuple Assignment & Value Swapping",Kn="Tuple Assignment & Value Swapping",Xn="Swapping two values elegantly without a temporary variable, and circulating n variables.",Zn="Type A: Value / State Simulation",eo=20,to="beginner",no=["CO1"],oo=["day-06"],ro=1,io=1,so=1,PC={id:Gn,unitId:Hn,dayNumber:Yn,order:Jn,title:Qn,shortTitle:Kn,description:Xn,simulationType:Zn,estimatedMinutes:eo,difficulty:to,outcomes:no,prerequisites:oo,lessonsCount:ro,problemsCount:io,quizCount:so},IC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Yn,default:PC,description:Xn,difficulty:to,estimatedMinutes:eo,id:Gn,lessonsCount:ro,order:Jn,outcomes:no,prerequisites:oo,problemsCount:io,quizCount:so,shortTitle:Kn,simulationType:Zn,title:Qn,unitId:Hn},Symbol.toStringTag,{value:"Module"})),ao="day-08",lo="unit-01",co=8,uo=8,po="Day 8: Modules and Built-in Functions",mo="Modules and Built-in Functions",yo="Importing standard modules (e.g. math) and using built-in functions.",go="Type D: Code Execution Tracer",ho=20,bo="beginner",fo=["CO1"],_o=["day-07"],xo=1,vo=1,wo=1,$C={id:ao,unitId:lo,dayNumber:co,order:uo,title:po,shortTitle:mo,description:yo,simulationType:go,estimatedMinutes:ho,difficulty:bo,outcomes:fo,prerequisites:_o,lessonsCount:xo,problemsCount:vo,quizCount:wo},kC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:co,default:$C,description:yo,difficulty:bo,estimatedMinutes:ho,id:ao,lessonsCount:xo,order:uo,outcomes:fo,prerequisites:_o,problemsCount:vo,quizCount:wo,shortTitle:mo,simulationType:go,title:po,unitId:lo},Symbol.toStringTag,{value:"Module"})),So="day-09",Co="unit-01",To=9,Po=9,Io="Day 9: Function Definition and Use",$o="Function Definition and Use",ko="Defining custom functions using 'def' and calling them.",Eo="Type D: Code Execution Tracer",jo=20,Oo="beginner",Mo=["CO1"],zo=["day-08"],Ao=1,Fo=1,Do=1,EC={id:So,unitId:Co,dayNumber:To,order:Po,title:Io,shortTitle:$o,description:ko,simulationType:Eo,estimatedMinutes:jo,difficulty:Oo,outcomes:Mo,prerequisites:zo,lessonsCount:Ao,problemsCount:Fo,quizCount:Do},jC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:To,default:EC,description:ko,difficulty:Oo,estimatedMinutes:jo,id:So,lessonsCount:Ao,order:Po,outcomes:Mo,prerequisites:zo,problemsCount:Fo,quizCount:Do,shortTitle:$o,simulationType:Eo,title:Io,unitId:Co},Symbol.toStringTag,{value:"Module"})),qo="day-10",Wo="unit-01",Ro=10,Lo=10,No="Day 10: Flow of Execution",Uo="Flow of Execution",Bo="Tracing how the Python interpreter jumps execution into a function and returns.",Vo="Type D: Code Execution Tracer",Go=20,Ho="beginner",Yo=["CO1"],Jo=["day-09"],Qo=1,Ko=1,Xo=1,OC={id:qo,unitId:Wo,dayNumber:Ro,order:Lo,title:No,shortTitle:Uo,description:Bo,simulationType:Vo,estimatedMinutes:Go,difficulty:Ho,outcomes:Yo,prerequisites:Jo,lessonsCount:Qo,problemsCount:Ko,quizCount:Xo},MC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Ro,default:OC,description:Bo,difficulty:Ho,estimatedMinutes:Go,id:qo,lessonsCount:Qo,order:Lo,outcomes:Yo,prerequisites:Jo,problemsCount:Ko,quizCount:Xo,shortTitle:Uo,simulationType:Vo,title:No,unitId:Wo},Symbol.toStringTag,{value:"Module"})),Zo="day-11",er="unit-01",tr=11,nr=11,or="Day 11: Parameters and Arguments",rr="Parameters and Arguments",ir="Passing arguments to function parameters.",sr="Type D: Code Execution Tracer",ar=20,lr="beginner",cr=["CO1"],dr=["day-10"],ur=1,pr=1,mr=1,zC={id:Zo,unitId:er,dayNumber:tr,order:nr,title:or,shortTitle:rr,description:ir,simulationType:sr,estimatedMinutes:ar,difficulty:lr,outcomes:cr,prerequisites:dr,lessonsCount:ur,problemsCount:pr,quizCount:mr},AC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:tr,default:zC,description:ir,difficulty:lr,estimatedMinutes:ar,id:Zo,lessonsCount:ur,order:nr,outcomes:cr,prerequisites:dr,problemsCount:pr,quizCount:mr,shortTitle:rr,simulationType:sr,title:or,unitId:er},Symbol.toStringTag,{value:"Module"})),yr="day-12",gr="unit-01",hr=12,br=12,fr="Day 12: Unit I Illustrative Programs",_r="Unit I Illustrative Programs",xr="Practical programs: Exchange the values of two variables, circulate the values of n variables, distance between two points.",vr="Type D: Code Execution Tracer",wr=20,Sr="beginner",Cr=["CO1"],Tr=["day-11"],Pr=1,Ir=1,$r=1,FC={id:yr,unitId:gr,dayNumber:hr,order:br,title:fr,shortTitle:_r,description:xr,simulationType:vr,estimatedMinutes:wr,difficulty:Sr,outcomes:Cr,prerequisites:Tr,lessonsCount:Pr,problemsCount:Ir,quizCount:$r},DC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:hr,default:FC,description:xr,difficulty:Sr,estimatedMinutes:wr,id:yr,lessonsCount:Pr,order:br,outcomes:Cr,prerequisites:Tr,problemsCount:Ir,quizCount:$r,shortTitle:_r,simulationType:vr,title:fr,unitId:gr},Symbol.toStringTag,{value:"Module"})),kr="day-13",Er="unit-02",jr=13,Or=13,Mr="Day 13: Boolean Values and Operators",zr="Boolean Values and Operators",Ar="Evaluating Boolean logic and comparison operators.",Fr="Type B: Flowchart / Decision Simulation",Dr=20,qr="beginner",Wr=["CO2"],Rr=["day-12"],Lr=1,Nr=1,Ur=1,qC={id:kr,unitId:Er,dayNumber:jr,order:Or,title:Mr,shortTitle:zr,description:Ar,simulationType:Fr,estimatedMinutes:Dr,difficulty:qr,outcomes:Wr,prerequisites:Rr,lessonsCount:Lr,problemsCount:Nr,quizCount:Ur},WC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:jr,default:qC,description:Ar,difficulty:qr,estimatedMinutes:Dr,id:kr,lessonsCount:Lr,order:Or,outcomes:Wr,prerequisites:Rr,problemsCount:Nr,quizCount:Ur,shortTitle:zr,simulationType:Fr,title:Mr,unitId:Er},Symbol.toStringTag,{value:"Module"})),Br="day-14",Vr="unit-02",Gr=14,Hr=14,Yr="Day 14: Conditional Execution (if)",Jr="Conditional Execution (if)",Qr="Running code blocks conditionally based on Boolean truth.",Kr="Type B: Flowchart / Decision Simulation",Xr=20,Zr="beginner",ei=["CO2"],ti=["day-13"],ni=1,oi=1,ri=1,RC={id:Br,unitId:Vr,dayNumber:Gr,order:Hr,title:Yr,shortTitle:Jr,description:Qr,simulationType:Kr,estimatedMinutes:Xr,difficulty:Zr,outcomes:ei,prerequisites:ti,lessonsCount:ni,problemsCount:oi,quizCount:ri},LC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Gr,default:RC,description:Qr,difficulty:Zr,estimatedMinutes:Xr,id:Br,lessonsCount:ni,order:Hr,outcomes:ei,prerequisites:ti,problemsCount:oi,quizCount:ri,shortTitle:Jr,simulationType:Kr,title:Yr,unitId:Vr},Symbol.toStringTag,{value:"Module"})),ii="day-15",si="unit-02",ai=15,li=15,ci="Day 15: Alternative (if-else) & Chained (if-elif-else)",di="Alternative (if-else) & Chained (if-elif-else)",ui="Handling multiple mutually exclusive branching paths.",pi="Type B: Flowchart / Decision Simulation",mi=20,yi="beginner",gi=["CO2"],hi=["day-14"],bi=1,fi=1,_i=1,NC={id:ii,unitId:si,dayNumber:ai,order:li,title:ci,shortTitle:di,description:ui,simulationType:pi,estimatedMinutes:mi,difficulty:yi,outcomes:gi,prerequisites:hi,lessonsCount:bi,problemsCount:fi,quizCount:_i},UC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:ai,default:NC,description:ui,difficulty:yi,estimatedMinutes:mi,id:ii,lessonsCount:bi,order:li,outcomes:gi,prerequisites:hi,problemsCount:fi,quizCount:_i,shortTitle:di,simulationType:pi,title:ci,unitId:si},Symbol.toStringTag,{value:"Module"})),xi="day-16",vi="unit-02",wi=16,Si=16,Ci="Day 16: Iteration State & The while Loop",Ti="Iteration State & The while Loop",Pi="Repeating code continuously while a condition remains True.",Ii="Type C: Loop Timeline Simulation",$i=20,ki="beginner",Ei=["CO2"],ji=["day-15"],Oi=1,Mi=1,zi=1,BC={id:xi,unitId:vi,dayNumber:wi,order:Si,title:Ci,shortTitle:Ti,description:Pi,simulationType:Ii,estimatedMinutes:$i,difficulty:ki,outcomes:Ei,prerequisites:ji,lessonsCount:Oi,problemsCount:Mi,quizCount:zi},VC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:wi,default:BC,description:Pi,difficulty:ki,estimatedMinutes:$i,id:xi,lessonsCount:Oi,order:Si,outcomes:Ei,prerequisites:ji,problemsCount:Mi,quizCount:zi,shortTitle:Ti,simulationType:Ii,title:Ci,unitId:vi},Symbol.toStringTag,{value:"Module"})),Ai="day-17",Fi="unit-02",Di=17,qi=17,Wi="Day 17: The for Loop & range()",Ri="The for Loop & range()",Li="Iterating over sequences systematically.",Ni="Type C: Loop Timeline Simulation",Ui=20,Bi="beginner",Vi=["CO2"],Gi=["day-16"],Hi=1,Yi=1,Ji=1,GC={id:Ai,unitId:Fi,dayNumber:Di,order:qi,title:Wi,shortTitle:Ri,description:Li,simulationType:Ni,estimatedMinutes:Ui,difficulty:Bi,outcomes:Vi,prerequisites:Gi,lessonsCount:Hi,problemsCount:Yi,quizCount:Ji},HC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Di,default:GC,description:Li,difficulty:Bi,estimatedMinutes:Ui,id:Ai,lessonsCount:Hi,order:qi,outcomes:Vi,prerequisites:Gi,problemsCount:Yi,quizCount:Ji,shortTitle:Ri,simulationType:Ni,title:Wi,unitId:Fi},Symbol.toStringTag,{value:"Module"})),Qi="day-18",Ki="unit-02",Xi=18,Zi=18,es="Day 18: Loop Control: break, continue, pass",ts="Loop Control: break, continue, pass",ns="Controlling execution flow from inside a loop.",os="Type C: Loop Timeline Simulation",rs=20,is="beginner",ss=["CO2"],as=["day-17"],ls=1,cs=1,ds=1,YC={id:Qi,unitId:Ki,dayNumber:Xi,order:Zi,title:es,shortTitle:ts,description:ns,simulationType:os,estimatedMinutes:rs,difficulty:is,outcomes:ss,prerequisites:as,lessonsCount:ls,problemsCount:cs,quizCount:ds},JC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Xi,default:YC,description:ns,difficulty:is,estimatedMinutes:rs,id:Qi,lessonsCount:ls,order:Zi,outcomes:ss,prerequisites:as,problemsCount:cs,quizCount:ds,shortTitle:ts,simulationType:os,title:es,unitId:Ki},Symbol.toStringTag,{value:"Module"})),us="day-19",ps="unit-02",ms=19,ys=19,gs="Day 19: Fruitful Functions & Return Values",hs="Fruitful Functions & Return Values",bs="Returning computed results from functions to the caller.",fs="Type D: Code Execution Tracer",_s=20,xs="beginner",vs=["CO2"],ws=["day-18"],Ss=1,Cs=1,Ts=1,QC={id:us,unitId:ps,dayNumber:ms,order:ys,title:gs,shortTitle:hs,description:bs,simulationType:fs,estimatedMinutes:_s,difficulty:xs,outcomes:vs,prerequisites:ws,lessonsCount:Ss,problemsCount:Cs,quizCount:Ts},KC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:ms,default:QC,description:bs,difficulty:xs,estimatedMinutes:_s,id:us,lessonsCount:Ss,order:ys,outcomes:vs,prerequisites:ws,problemsCount:Cs,quizCount:Ts,shortTitle:hs,simulationType:fs,title:gs,unitId:ps},Symbol.toStringTag,{value:"Module"})),Ps="day-20",Is="unit-02",$s=20,ks=20,Es="Day 20: Scope (Local/Global) & Function Composition",js="Scope (Local/Global) & Function Composition",Os="Understanding variable visibility and chaining functions.",Ms="Type D: Code Execution Tracer",zs=20,As="beginner",Fs=["CO2"],Ds=["day-19"],qs=1,Ws=1,Rs=1,XC={id:Ps,unitId:Is,dayNumber:$s,order:ks,title:Es,shortTitle:js,description:Os,simulationType:Ms,estimatedMinutes:zs,difficulty:As,outcomes:Fs,prerequisites:Ds,lessonsCount:qs,problemsCount:Ws,quizCount:Rs},ZC=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:$s,default:XC,description:Os,difficulty:As,estimatedMinutes:zs,id:Ps,lessonsCount:qs,order:ks,outcomes:Fs,prerequisites:Ds,problemsCount:Ws,quizCount:Rs,shortTitle:js,simulationType:Ms,title:Es,unitId:Is},Symbol.toStringTag,{value:"Module"})),Ls="day-21",Ns="unit-02",Us=21,Bs=21,Vs="Day 21: Recursion",Gs="Recursion",Hs="Functions that call themselves to solve smaller problem instances.",Ys="Type D: Code Execution Tracer",Js=20,Qs="beginner",Ks=["CO2"],Xs=["day-20"],Zs=1,ea=1,ta=1,eT={id:Ls,unitId:Ns,dayNumber:Us,order:Bs,title:Vs,shortTitle:Gs,description:Hs,simulationType:Ys,estimatedMinutes:Js,difficulty:Qs,outcomes:Ks,prerequisites:Xs,lessonsCount:Zs,problemsCount:ea,quizCount:ta},tT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Us,default:eT,description:Hs,difficulty:Qs,estimatedMinutes:Js,id:Ls,lessonsCount:Zs,order:Bs,outcomes:Ks,prerequisites:Xs,problemsCount:ea,quizCount:ta,shortTitle:Gs,simulationType:Ys,title:Vs,unitId:Ns},Symbol.toStringTag,{value:"Module"})),na="day-22",oa="unit-02",ra=22,ia=22,sa="Day 22: Strings: Immutability & Slices",aa="Strings: Immutability & Slices",la="Extracting substrings using slicing and understanding that strings cannot be changed in place.",ca="Type E: Data Structure Visualizer",da=20,ua="beginner",pa=["CO2"],ma=["day-21"],ya=1,ga=1,ha=1,nT={id:na,unitId:oa,dayNumber:ra,order:ia,title:sa,shortTitle:aa,description:la,simulationType:ca,estimatedMinutes:da,difficulty:ua,outcomes:pa,prerequisites:ma,lessonsCount:ya,problemsCount:ga,quizCount:ha},oT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:ra,default:nT,description:la,difficulty:ua,estimatedMinutes:da,id:na,lessonsCount:ya,order:ia,outcomes:pa,prerequisites:ma,problemsCount:ga,quizCount:ha,shortTitle:aa,simulationType:ca,title:sa,unitId:oa},Symbol.toStringTag,{value:"Module"})),ba="day-23",fa="unit-02",_a=23,xa=23,va="Day 23: String Methods, Module & Lists as Arrays",wa="String Methods, Module & Lists as Arrays",Sa="Using string transformation methods, string module utilities, and simulating arrays with lists.",Ca="Type E: Data Structure Visualizer",Ta=20,Pa="beginner",Ia=["CO2"],$a=["day-22"],ka=1,Ea=1,ja=1,rT={id:ba,unitId:fa,dayNumber:_a,order:xa,title:va,shortTitle:wa,description:Sa,simulationType:Ca,estimatedMinutes:Ta,difficulty:Pa,outcomes:Ia,prerequisites:$a,lessonsCount:ka,problemsCount:Ea,quizCount:ja},iT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:_a,default:rT,description:Sa,difficulty:Pa,estimatedMinutes:Ta,id:ba,lessonsCount:ka,order:xa,outcomes:Ia,prerequisites:$a,problemsCount:Ea,quizCount:ja,shortTitle:wa,simulationType:Ca,title:va,unitId:fa},Symbol.toStringTag,{value:"Module"})),Oa="day-24",Ma="unit-02",za=24,Aa=24,Fa="Day 24: Unit II Illustrative Programs",Da="Unit II Illustrative Programs",qa="Practical programs: Square root (Newton's method), GCD, exponentiation, sum an array of numbers.",Wa="Type F: Algorithm Animation",Ra=20,La="beginner",Na=["CO2"],Ua=["day-23"],Ba=1,Va=1,Ga=1,sT={id:Oa,unitId:Ma,dayNumber:za,order:Aa,title:Fa,shortTitle:Da,description:qa,simulationType:Wa,estimatedMinutes:Ra,difficulty:La,outcomes:Na,prerequisites:Ua,lessonsCount:Ba,problemsCount:Va,quizCount:Ga},aT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:za,default:sT,description:qa,difficulty:La,estimatedMinutes:Ra,id:Oa,lessonsCount:Ba,order:Aa,outcomes:Na,prerequisites:Ua,problemsCount:Va,quizCount:Ga,shortTitle:Da,simulationType:Wa,title:Fa,unitId:Ma},Symbol.toStringTag,{value:"Module"})),Ha="day-25",Ya="unit-03",Ja=25,Qa=25,Ka="Day 25: Lists: Operations and Slices",Xa="Lists: Operations and Slices",Za="Combining lists and extracting sublists.",el="Type E: Data Structure Visualizer",tl=20,nl="intermediate",ol=["CO3"],rl=["day-24"],il=1,sl=1,al=1,lT={id:Ha,unitId:Ya,dayNumber:Ja,order:Qa,title:Ka,shortTitle:Xa,description:Za,simulationType:el,estimatedMinutes:tl,difficulty:nl,outcomes:ol,prerequisites:rl,lessonsCount:il,problemsCount:sl,quizCount:al},cT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Ja,default:lT,description:Za,difficulty:nl,estimatedMinutes:tl,id:Ha,lessonsCount:il,order:Qa,outcomes:ol,prerequisites:rl,problemsCount:sl,quizCount:al,shortTitle:Xa,simulationType:el,title:Ka,unitId:Ya},Symbol.toStringTag,{value:"Module"})),ll="day-26",cl="unit-03",dl=26,ul=26,pl="Day 26: List Methods and List Loop",ml="List Methods and List Loop",yl="Mutating lists (append, remove, pop) and iterating through elements.",gl="Type E: Data Structure Visualizer",hl=20,bl="intermediate",fl=["CO3"],_l=["day-25"],xl=1,vl=1,wl=1,dT={id:ll,unitId:cl,dayNumber:dl,order:ul,title:pl,shortTitle:ml,description:yl,simulationType:gl,estimatedMinutes:hl,difficulty:bl,outcomes:fl,prerequisites:_l,lessonsCount:xl,problemsCount:vl,quizCount:wl},uT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:dl,default:dT,description:yl,difficulty:bl,estimatedMinutes:hl,id:ll,lessonsCount:xl,order:ul,outcomes:fl,prerequisites:_l,problemsCount:vl,quizCount:wl,shortTitle:ml,simulationType:gl,title:pl,unitId:cl},Symbol.toStringTag,{value:"Module"})),Sl="day-27",Cl="unit-03",Tl=27,Pl=27,Il="Day 27: Mutability, Aliasing, and Cloning",$l="Mutability, Aliasing, and Cloning",kl="Understanding reference variables, side effects of aliasing, and how to clone lists safely.",El="Type E: Data Structure Visualizer",jl=20,Ol="intermediate",Ml=["CO3"],zl=["day-26"],Al=1,Fl=1,Dl=1,pT={id:Sl,unitId:Cl,dayNumber:Tl,order:Pl,title:Il,shortTitle:$l,description:kl,simulationType:El,estimatedMinutes:jl,difficulty:Ol,outcomes:Ml,prerequisites:zl,lessonsCount:Al,problemsCount:Fl,quizCount:Dl},mT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Tl,default:pT,description:kl,difficulty:Ol,estimatedMinutes:jl,id:Sl,lessonsCount:Al,order:Pl,outcomes:Ml,prerequisites:zl,problemsCount:Fl,quizCount:Dl,shortTitle:$l,simulationType:El,title:Il,unitId:Cl},Symbol.toStringTag,{value:"Module"})),ql="day-28",Wl="unit-03",Rl=28,Ll=28,Nl="Day 28: List Parameters & Advanced Comprehensions",Ul="List Parameters & Advanced Comprehensions",Bl="Passing lists to functions and transforming lists efficiently using list comprehension.",Vl="Type E: Data Structure Visualizer",Gl=20,Hl="intermediate",Yl=["CO3"],Jl=["day-27"],Ql=1,Kl=1,Xl=1,yT={id:ql,unitId:Wl,dayNumber:Rl,order:Ll,title:Nl,shortTitle:Ul,description:Bl,simulationType:Vl,estimatedMinutes:Gl,difficulty:Hl,outcomes:Yl,prerequisites:Jl,lessonsCount:Ql,problemsCount:Kl,quizCount:Xl},gT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Rl,default:yT,description:Bl,difficulty:Hl,estimatedMinutes:Gl,id:ql,lessonsCount:Ql,order:Ll,outcomes:Yl,prerequisites:Jl,problemsCount:Kl,quizCount:Xl,shortTitle:Ul,simulationType:Vl,title:Nl,unitId:Wl},Symbol.toStringTag,{value:"Module"})),Zl="day-29",ec="unit-03",tc=29,nc=29,oc="Day 29: Tuples: Assignment & Return Values",rc="Tuples: Assignment & Return Values",ic="Using immutable tuples for packing/unpacking and returning multiple values.",sc="Type E: Data Structure Visualizer",ac=20,lc="intermediate",cc=["CO3"],dc=["day-28"],uc=1,pc=1,mc=1,hT={id:Zl,unitId:ec,dayNumber:tc,order:nc,title:oc,shortTitle:rc,description:ic,simulationType:sc,estimatedMinutes:ac,difficulty:lc,outcomes:cc,prerequisites:dc,lessonsCount:uc,problemsCount:pc,quizCount:mc},bT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:tc,default:hT,description:ic,difficulty:lc,estimatedMinutes:ac,id:Zl,lessonsCount:uc,order:nc,outcomes:cc,prerequisites:dc,problemsCount:pc,quizCount:mc,shortTitle:rc,simulationType:sc,title:oc,unitId:ec},Symbol.toStringTag,{value:"Module"})),yc="day-30",gc="unit-03",hc=30,bc=30,fc="Day 30: Dictionaries: Operations & Methods",_c="Dictionaries: Operations & Methods",xc="Storing key-value pairs and using dictionary methods.",vc="Type E: Data Structure Visualizer",wc=20,Sc="intermediate",Cc=["CO3"],Tc=["day-29"],Pc=1,Ic=1,$c=1,fT={id:yc,unitId:gc,dayNumber:hc,order:bc,title:fc,shortTitle:_c,description:xc,simulationType:vc,estimatedMinutes:wc,difficulty:Sc,outcomes:Cc,prerequisites:Tc,lessonsCount:Pc,problemsCount:Ic,quizCount:$c},_T=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:hc,default:fT,description:xc,difficulty:Sc,estimatedMinutes:wc,id:yc,lessonsCount:Pc,order:bc,outcomes:Cc,prerequisites:Tc,problemsCount:Ic,quizCount:$c,shortTitle:_c,simulationType:vc,title:fc,unitId:gc},Symbol.toStringTag,{value:"Module"})),kc="day-31",Ec="unit-03",jc=31,Oc=31,Mc="Day 31: Finding Maximum of a List",zc="Finding Maximum of a List",Ac="Iterating through a sequence to find the maximum element.",Fc="Type F: Algorithm Animation",Dc=20,qc="intermediate",Wc=["CO3"],Rc=["day-30"],Lc=1,Nc=1,Uc=1,xT={id:kc,unitId:Ec,dayNumber:jc,order:Oc,title:Mc,shortTitle:zc,description:Ac,simulationType:Fc,estimatedMinutes:Dc,difficulty:qc,outcomes:Wc,prerequisites:Rc,lessonsCount:Lc,problemsCount:Nc,quizCount:Uc},vT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:jc,default:xT,description:Ac,difficulty:qc,estimatedMinutes:Dc,id:kc,lessonsCount:Lc,order:Oc,outcomes:Wc,prerequisites:Rc,problemsCount:Nc,quizCount:Uc,shortTitle:zc,simulationType:Fc,title:Mc,unitId:Ec},Symbol.toStringTag,{value:"Module"})),Bc="day-32",Vc="unit-03",Gc=32,Hc=32,Yc="Day 32: Linear Search",Jc="Linear Search",Qc="Sequential searching algorithm.",Kc="Type F: Algorithm Animation",Xc=20,Zc="intermediate",ed=["CO3"],td=["day-31"],nd=1,od=1,rd=1,wT={id:Bc,unitId:Vc,dayNumber:Gc,order:Hc,title:Yc,shortTitle:Jc,description:Qc,simulationType:Kc,estimatedMinutes:Xc,difficulty:Zc,outcomes:ed,prerequisites:td,lessonsCount:nd,problemsCount:od,quizCount:rd},ST=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Gc,default:wT,description:Qc,difficulty:Zc,estimatedMinutes:Xc,id:Bc,lessonsCount:nd,order:Hc,outcomes:ed,prerequisites:td,problemsCount:od,quizCount:rd,shortTitle:Jc,simulationType:Kc,title:Yc,unitId:Vc},Symbol.toStringTag,{value:"Module"})),id="day-33",sd="unit-03",ad=33,ld=33,cd="Day 33: Binary Search",dd="Binary Search",ud="Divide-and-conquer search on sorted data.",pd="Type F: Algorithm Animation",md=20,yd="intermediate",gd=["CO3"],hd=["day-32"],bd=1,fd=1,_d=1,CT={id,unitId:sd,dayNumber:ad,order:ld,title:cd,shortTitle:dd,description:ud,simulationType:pd,estimatedMinutes:md,difficulty:yd,outcomes:gd,prerequisites:hd,lessonsCount:bd,problemsCount:fd,quizCount:_d},TT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:ad,default:CT,description:ud,difficulty:yd,estimatedMinutes:md,id,lessonsCount:bd,order:ld,outcomes:gd,prerequisites:hd,problemsCount:fd,quizCount:_d,shortTitle:dd,simulationType:pd,title:cd,unitId:sd},Symbol.toStringTag,{value:"Module"})),xd="day-34",vd="unit-03",wd=34,Sd=34,Cd="Day 34: Selection Sort",Td="Selection Sort",Pd="Sorting by repeatedly finding the minimum.",Id="Type F: Algorithm Animation",$d=20,kd="intermediate",Ed=["CO3"],jd=["day-33"],Od=1,Md=1,zd=1,PT={id:xd,unitId:vd,dayNumber:wd,order:Sd,title:Cd,shortTitle:Td,description:Pd,simulationType:Id,estimatedMinutes:$d,difficulty:kd,outcomes:Ed,prerequisites:jd,lessonsCount:Od,problemsCount:Md,quizCount:zd},IT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:wd,default:PT,description:Pd,difficulty:kd,estimatedMinutes:$d,id:xd,lessonsCount:Od,order:Sd,outcomes:Ed,prerequisites:jd,problemsCount:Md,quizCount:zd,shortTitle:Td,simulationType:Id,title:Cd,unitId:vd},Symbol.toStringTag,{value:"Module"})),Ad="day-35",Fd="unit-03",Dd=35,qd=35,Wd="Day 35: Insertion Sort",Rd="Insertion Sort",Ld="Sorting by building a sorted array one item at a time.",Nd="Type F: Algorithm Animation",Ud=20,Bd="intermediate",Vd=["CO3"],Gd=["day-34"],Hd=1,Yd=1,Jd=1,$T={id:Ad,unitId:Fd,dayNumber:Dd,order:qd,title:Wd,shortTitle:Rd,description:Ld,simulationType:Nd,estimatedMinutes:Ud,difficulty:Bd,outcomes:Vd,prerequisites:Gd,lessonsCount:Hd,problemsCount:Yd,quizCount:Jd},kT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Dd,default:$T,description:Ld,difficulty:Bd,estimatedMinutes:Ud,id:Ad,lessonsCount:Hd,order:qd,outcomes:Vd,prerequisites:Gd,problemsCount:Yd,quizCount:Jd,shortTitle:Rd,simulationType:Nd,title:Wd,unitId:Fd},Symbol.toStringTag,{value:"Module"})),Qd="day-36",Kd="unit-03",Xd=36,Zd=36,eu="Day 36: Merge Sort & Histograms",tu="Merge Sort & Histograms",nu="Divide-and-conquer sorting and frequency counting using dictionaries.",ou="Type F: Algorithm Animation",ru=20,iu="intermediate",su=["CO3"],au=["day-35"],lu=1,cu=1,du=1,ET={id:Qd,unitId:Kd,dayNumber:Xd,order:Zd,title:eu,shortTitle:tu,description:nu,simulationType:ou,estimatedMinutes:ru,difficulty:iu,outcomes:su,prerequisites:au,lessonsCount:lu,problemsCount:cu,quizCount:du},jT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Xd,default:ET,description:nu,difficulty:iu,estimatedMinutes:ru,id:Qd,lessonsCount:lu,order:Zd,outcomes:su,prerequisites:au,problemsCount:cu,quizCount:du,shortTitle:tu,simulationType:ou,title:eu,unitId:Kd},Symbol.toStringTag,{value:"Module"})),uu="day-37",pu="unit-04",mu=37,yu=37,gu="Day 37: Text Files: Reading and Writing",hu="Text Files: Reading and Writing",bu="Opening, reading, writing, and closing text files.",fu="Type G: File / Data Pipeline Simulation",_u=20,xu="intermediate",vu=["CO4"],wu=["day-36"],Su=1,Cu=1,Tu=1,OT={id:uu,unitId:pu,dayNumber:mu,order:yu,title:gu,shortTitle:hu,description:bu,simulationType:fu,estimatedMinutes:_u,difficulty:xu,outcomes:vu,prerequisites:wu,lessonsCount:Su,problemsCount:Cu,quizCount:Tu},MT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:mu,default:OT,description:bu,difficulty:xu,estimatedMinutes:_u,id:uu,lessonsCount:Su,order:yu,outcomes:vu,prerequisites:wu,problemsCount:Cu,quizCount:Tu,shortTitle:hu,simulationType:fu,title:gu,unitId:pu},Symbol.toStringTag,{value:"Module"})),Pu="day-38",Iu="unit-04",$u=38,ku=38,Eu="Day 38: The Format Operator",ju="The Format Operator",Ou="Formatting output using format operators and string interpolation.",Mu="Type G: File / Data Pipeline Simulation",zu=20,Au="intermediate",Fu=["CO4"],Du=["day-37"],qu=1,Wu=1,Ru=1,zT={id:Pu,unitId:Iu,dayNumber:$u,order:ku,title:Eu,shortTitle:ju,description:Ou,simulationType:Mu,estimatedMinutes:zu,difficulty:Au,outcomes:Fu,prerequisites:Du,lessonsCount:qu,problemsCount:Wu,quizCount:Ru},AT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:$u,default:zT,description:Ou,difficulty:Au,estimatedMinutes:zu,id:Pu,lessonsCount:qu,order:ku,outcomes:Fu,prerequisites:Du,problemsCount:Wu,quizCount:Ru,shortTitle:ju,simulationType:Mu,title:Eu,unitId:Iu},Symbol.toStringTag,{value:"Module"})),Lu="day-39",Nu="unit-04",Uu=39,Bu=39,Vu="Day 39: Command Line Arguments",Gu="Command Line Arguments",Hu="Passing arguments to a Python script via sys.argv.",Yu="Type G: File / Data Pipeline Simulation",Ju=20,Qu="intermediate",Ku=["CO4"],Xu=["day-38"],Zu=1,ep=1,tp=1,FT={id:Lu,unitId:Nu,dayNumber:Uu,order:Bu,title:Vu,shortTitle:Gu,description:Hu,simulationType:Yu,estimatedMinutes:Ju,difficulty:Qu,outcomes:Ku,prerequisites:Xu,lessonsCount:Zu,problemsCount:ep,quizCount:tp},DT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Uu,default:FT,description:Hu,difficulty:Qu,estimatedMinutes:Ju,id:Lu,lessonsCount:Zu,order:Bu,outcomes:Ku,prerequisites:Xu,problemsCount:ep,quizCount:tp,shortTitle:Gu,simulationType:Yu,title:Vu,unitId:Nu},Symbol.toStringTag,{value:"Module"})),np="day-40",op="unit-04",rp=40,ip=40,sp="Day 40: Errors and Exceptions",ap="Errors and Exceptions",lp="Differentiating syntax errors from runtime exceptions.",cp="Type G: File / Data Pipeline Simulation",dp=20,up="intermediate",pp=["CO4"],mp=["day-39"],yp=1,gp=1,hp=1,qT={id:np,unitId:op,dayNumber:rp,order:ip,title:sp,shortTitle:ap,description:lp,simulationType:cp,estimatedMinutes:dp,difficulty:up,outcomes:pp,prerequisites:mp,lessonsCount:yp,problemsCount:gp,quizCount:hp},WT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:rp,default:qT,description:lp,difficulty:up,estimatedMinutes:dp,id:np,lessonsCount:yp,order:ip,outcomes:pp,prerequisites:mp,problemsCount:gp,quizCount:hp,shortTitle:ap,simulationType:cp,title:sp,unitId:op},Symbol.toStringTag,{value:"Module"})),bp="day-41",fp="unit-04",_p=41,xp=41,vp="Day 41: Handling Exceptions (try-except)",wp="Handling Exceptions (try-except)",Sp="Gracefully catching and handling runtime exceptions to prevent program crashes.",Cp="Type G: File / Data Pipeline Simulation",Tp=20,Pp="intermediate",Ip=["CO4"],$p=["day-40"],kp=1,Ep=1,jp=1,RT={id:bp,unitId:fp,dayNumber:_p,order:xp,title:vp,shortTitle:wp,description:Sp,simulationType:Cp,estimatedMinutes:Tp,difficulty:Pp,outcomes:Ip,prerequisites:$p,lessonsCount:kp,problemsCount:Ep,quizCount:jp},LT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:_p,default:RT,description:Sp,difficulty:Pp,estimatedMinutes:Tp,id:bp,lessonsCount:kp,order:xp,outcomes:Ip,prerequisites:$p,problemsCount:Ep,quizCount:jp,shortTitle:wp,simulationType:Cp,title:vp,unitId:fp},Symbol.toStringTag,{value:"Module"})),Op="day-42",Mp="unit-04",zp=42,Ap=42,Fp="Day 42: Modules and Packages",Dp="Modules and Packages",qp="Organizing Python code into modules and directory-based packages.",Wp="Type G: File / Data Pipeline Simulation",Rp=20,Lp="intermediate",Np=["CO4"],Up=["day-41"],Bp=1,Vp=1,Gp=1,NT={id:Op,unitId:Mp,dayNumber:zp,order:Ap,title:Fp,shortTitle:Dp,description:qp,simulationType:Wp,estimatedMinutes:Rp,difficulty:Lp,outcomes:Np,prerequisites:Up,lessonsCount:Bp,problemsCount:Vp,quizCount:Gp},UT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:zp,default:NT,description:qp,difficulty:Lp,estimatedMinutes:Rp,id:Op,lessonsCount:Bp,order:Ap,outcomes:Np,prerequisites:Up,problemsCount:Vp,quizCount:Gp,shortTitle:Dp,simulationType:Wp,title:Fp,unitId:Mp},Symbol.toStringTag,{value:"Module"})),Hp="day-43",Yp="unit-04",Jp=43,Qp=43,Kp="Day 43: Classes and Objects Intro",Xp="Classes and Objects Intro",Zp="Introduction to object-oriented programming: blueprints (classes) and instances (objects).",em="Type G: File / Data Pipeline Simulation",tm=20,nm="intermediate",om=["CO4"],rm=["day-42"],im=1,sm=1,am=1,BT={id:Hp,unitId:Yp,dayNumber:Jp,order:Qp,title:Kp,shortTitle:Xp,description:Zp,simulationType:em,estimatedMinutes:tm,difficulty:nm,outcomes:om,prerequisites:rm,lessonsCount:im,problemsCount:sm,quizCount:am},VT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Jp,default:BT,description:Zp,difficulty:nm,estimatedMinutes:tm,id:Hp,lessonsCount:im,order:Qp,outcomes:om,prerequisites:rm,problemsCount:sm,quizCount:am,shortTitle:Xp,simulationType:em,title:Kp,unitId:Yp},Symbol.toStringTag,{value:"Module"})),lm="day-44",cm="unit-04",dm=44,um=44,pm="Day 44: Object Attributes and Methods",mm="Object Attributes and Methods",ym="Adding state and behavior to custom objects.",gm="Type G: File / Data Pipeline Simulation",hm=20,bm="intermediate",fm=["CO4"],_m=["day-43"],xm=1,vm=1,wm=1,GT={id:lm,unitId:cm,dayNumber:dm,order:um,title:pm,shortTitle:mm,description:ym,simulationType:gm,estimatedMinutes:hm,difficulty:bm,outcomes:fm,prerequisites:_m,lessonsCount:xm,problemsCount:vm,quizCount:wm},HT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:dm,default:GT,description:ym,difficulty:bm,estimatedMinutes:hm,id:lm,lessonsCount:xm,order:um,outcomes:fm,prerequisites:_m,problemsCount:vm,quizCount:wm,shortTitle:mm,simulationType:gm,title:pm,unitId:cm},Symbol.toStringTag,{value:"Module"})),Sm="day-45",Cm="unit-04",Tm=45,Pm=45,Im="Day 45: Unit IV Practical: Word Count (CLI)",$m="Unit IV Practical: Word Count (CLI)",km="Building a program that takes command line arguments and counts words in a file.",Em="Type G: File / Data Pipeline Simulation",jm=20,Om="intermediate",Mm=["CO4"],zm=["day-44"],Am=1,Fm=1,Dm=1,YT={id:Sm,unitId:Cm,dayNumber:Tm,order:Pm,title:Im,shortTitle:$m,description:km,simulationType:Em,estimatedMinutes:jm,difficulty:Om,outcomes:Mm,prerequisites:zm,lessonsCount:Am,problemsCount:Fm,quizCount:Dm},JT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Tm,default:YT,description:km,difficulty:Om,estimatedMinutes:jm,id:Sm,lessonsCount:Am,order:Pm,outcomes:Mm,prerequisites:zm,problemsCount:Fm,quizCount:Dm,shortTitle:$m,simulationType:Em,title:Im,unitId:Cm},Symbol.toStringTag,{value:"Module"})),qm="day-46",Wm="unit-04",Rm=46,Lm=46,Nm="Day 46: Unit IV Practical: Copy File",Um="Unit IV Practical: Copy File",Bm="Script to safely open a source file, read contents, and write to a destination file.",Vm="Type G: File / Data Pipeline Simulation",Gm=20,Hm="intermediate",Ym=["CO4"],Jm=["day-45"],Qm=1,Km=1,Xm=1,QT={id:qm,unitId:Wm,dayNumber:Rm,order:Lm,title:Nm,shortTitle:Um,description:Bm,simulationType:Vm,estimatedMinutes:Gm,difficulty:Hm,outcomes:Ym,prerequisites:Jm,lessonsCount:Qm,problemsCount:Km,quizCount:Xm},KT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Rm,default:QT,description:Bm,difficulty:Hm,estimatedMinutes:Gm,id:qm,lessonsCount:Qm,order:Lm,outcomes:Ym,prerequisites:Jm,problemsCount:Km,quizCount:Xm,shortTitle:Um,simulationType:Vm,title:Nm,unitId:Wm},Symbol.toStringTag,{value:"Module"})),Zm="day-47",ey="unit-04",ty=47,ny=47,oy="Day 47: Consolidation: File Parsing & Objects",ry="Consolidation: File Parsing & Objects",iy="Combining file reading and object initialization.",sy="Type G: File / Data Pipeline Simulation",ay=20,ly="intermediate",cy=["CO4"],dy=["day-46"],uy=1,py=1,my=1,XT={id:Zm,unitId:ey,dayNumber:ty,order:ny,title:oy,shortTitle:ry,description:iy,simulationType:sy,estimatedMinutes:ay,difficulty:ly,outcomes:cy,prerequisites:dy,lessonsCount:uy,problemsCount:py,quizCount:my},ZT=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:ty,default:XT,description:iy,difficulty:ly,estimatedMinutes:ay,id:Zm,lessonsCount:uy,order:ny,outcomes:cy,prerequisites:dy,problemsCount:py,quizCount:my,shortTitle:ry,simulationType:sy,title:oy,unitId:ey},Symbol.toStringTag,{value:"Module"})),yy="day-48",gy="unit-04",hy=48,by=48,fy="Day 48: Consolidation: Exception-Safe Pipelines",_y="Consolidation: Exception-Safe Pipelines",xy="Robust coding practices integrating packages, exceptions, and file I/O.",vy="Type G: File / Data Pipeline Simulation",wy=20,Sy="intermediate",Cy=["CO4"],Ty=["day-47"],Py=1,Iy=1,$y=1,e0={id:yy,unitId:gy,dayNumber:hy,order:by,title:fy,shortTitle:_y,description:xy,simulationType:vy,estimatedMinutes:wy,difficulty:Sy,outcomes:Cy,prerequisites:Ty,lessonsCount:Py,problemsCount:Iy,quizCount:$y},t0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:hy,default:e0,description:xy,difficulty:Sy,estimatedMinutes:wy,id:yy,lessonsCount:Py,order:by,outcomes:Cy,prerequisites:Ty,problemsCount:Iy,quizCount:$y,shortTitle:_y,simulationType:vy,title:fy,unitId:gy},Symbol.toStringTag,{value:"Module"})),ky="day-49",Ey="unit-05",jy=49,Oy=49,My="Day 49: NumPy: Creating a NumPy Array",zy="NumPy: Creating a NumPy Array",Ay="Initializing homogeneous arrays for high-performance math.",Fy="Type H: Matrix / Table Visualization",Dy=20,qy="advanced",Wy=["CO5"],Ry=["day-48"],Ly=1,Ny=1,Uy=1,n0={id:ky,unitId:Ey,dayNumber:jy,order:Oy,title:My,shortTitle:zy,description:Ay,simulationType:Fy,estimatedMinutes:Dy,difficulty:qy,outcomes:Wy,prerequisites:Ry,lessonsCount:Ly,problemsCount:Ny,quizCount:Uy},o0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:jy,default:n0,description:Ay,difficulty:qy,estimatedMinutes:Dy,id:ky,lessonsCount:Ly,order:Oy,outcomes:Wy,prerequisites:Ry,problemsCount:Ny,quizCount:Uy,shortTitle:zy,simulationType:Fy,title:My,unitId:Ey},Symbol.toStringTag,{value:"Module"})),By="day-50",Vy="unit-05",Gy=50,Hy=50,Yy="Day 50: The Shape and Reshaping of NumPy Array",Jy="The Shape and Reshaping of NumPy Array",Qy="Manipulating dimensions of multi-dimensional arrays.",Ky="Type H: Matrix / Table Visualization",Xy=20,Zy="advanced",eg=["CO5"],tg=["day-49"],ng=1,og=1,rg=1,r0={id:By,unitId:Vy,dayNumber:Gy,order:Hy,title:Yy,shortTitle:Jy,description:Qy,simulationType:Ky,estimatedMinutes:Xy,difficulty:Zy,outcomes:eg,prerequisites:tg,lessonsCount:ng,problemsCount:og,quizCount:rg},i0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Gy,default:r0,description:Qy,difficulty:Zy,estimatedMinutes:Xy,id:By,lessonsCount:ng,order:Hy,outcomes:eg,prerequisites:tg,problemsCount:og,quizCount:rg,shortTitle:Jy,simulationType:Ky,title:Yy,unitId:Vy},Symbol.toStringTag,{value:"Module"})),ig="day-51",sg="unit-05",ag=51,lg=51,cg="Day 51: Indexing and Slicing of NumPy Array",dg="Indexing and Slicing of NumPy Array",ug="Accessing elements, rows, and sub-matrices.",pg="Type H: Matrix / Table Visualization",mg=20,yg="advanced",gg=["CO5"],hg=["day-50"],bg=1,fg=1,_g=1,s0={id:ig,unitId:sg,dayNumber:ag,order:lg,title:cg,shortTitle:dg,description:ug,simulationType:pg,estimatedMinutes:mg,difficulty:yg,outcomes:gg,prerequisites:hg,lessonsCount:bg,problemsCount:fg,quizCount:_g},a0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:ag,default:s0,description:ug,difficulty:yg,estimatedMinutes:mg,id:ig,lessonsCount:bg,order:lg,outcomes:gg,prerequisites:hg,problemsCount:fg,quizCount:_g,shortTitle:dg,simulationType:pg,title:cg,unitId:sg},Symbol.toStringTag,{value:"Module"})),xg="day-52",vg="unit-05",wg=52,Sg=52,Cg="Day 52: Maths & Basic Arithmetic with NumPy Arrays",Tg="Maths & Basic Arithmetic with NumPy Arrays",Pg="Vectorized element-wise addition, subtraction, multiplication, and division.",Ig="Type H: Matrix / Table Visualization",$g=20,kg="advanced",Eg=["CO5"],jg=["day-51"],Og=1,Mg=1,zg=1,l0={id:xg,unitId:vg,dayNumber:wg,order:Sg,title:Cg,shortTitle:Tg,description:Pg,simulationType:Ig,estimatedMinutes:$g,difficulty:kg,outcomes:Eg,prerequisites:jg,lessonsCount:Og,problemsCount:Mg,quizCount:zg},c0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:wg,default:l0,description:Pg,difficulty:kg,estimatedMinutes:$g,id:xg,lessonsCount:Og,order:Sg,outcomes:Eg,prerequisites:jg,problemsCount:Mg,quizCount:zg,shortTitle:Tg,simulationType:Ig,title:Cg,unitId:vg},Symbol.toStringTag,{value:"Module"})),Ag="day-53",Fg="unit-05",Dg=53,qg=53,Wg="Day 53: Matrix Operations (Multiply, Inverse) & Verification",Rg="Matrix Operations (Multiply, Inverse) & Verification",Lg="Using loops and library functions for matrix multiplication and finding the inverse.",Ng="Type H: Matrix / Table Visualization",Ug=20,Bg="advanced",Vg=["CO5"],Gg=["day-52"],Hg=1,Yg=1,Jg=1,d0={id:Ag,unitId:Fg,dayNumber:Dg,order:qg,title:Wg,shortTitle:Rg,description:Lg,simulationType:Ng,estimatedMinutes:Ug,difficulty:Bg,outcomes:Vg,prerequisites:Gg,lessonsCount:Hg,problemsCount:Yg,quizCount:Jg},u0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Dg,default:d0,description:Lg,difficulty:Bg,estimatedMinutes:Ug,id:Ag,lessonsCount:Hg,order:qg,outcomes:Vg,prerequisites:Gg,problemsCount:Yg,quizCount:Jg,shortTitle:Rg,simulationType:Ng,title:Wg,unitId:Fg},Symbol.toStringTag,{value:"Module"})),Qg="day-54",Kg="unit-05",Xg=54,Zg=54,eh="Day 54: Pandas Series & DataFrames",th="Pandas Series & DataFrames",nh="Introduction to 1D Series and 2D labeled DataFrames.",oh="Type H: Matrix / Table Visualization",rh=20,ih="advanced",sh=["CO5"],ah=["day-53"],lh=1,ch=1,dh=1,p0={id:Qg,unitId:Kg,dayNumber:Xg,order:Zg,title:eh,shortTitle:th,description:nh,simulationType:oh,estimatedMinutes:rh,difficulty:ih,outcomes:sh,prerequisites:ah,lessonsCount:lh,problemsCount:ch,quizCount:dh},m0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Xg,default:p0,description:nh,difficulty:ih,estimatedMinutes:rh,id:Qg,lessonsCount:lh,order:Zg,outcomes:sh,prerequisites:ah,problemsCount:ch,quizCount:dh,shortTitle:th,simulationType:oh,title:eh,unitId:Kg},Symbol.toStringTag,{value:"Module"})),uh="day-55",ph="unit-05",mh=55,yh=55,gh="Day 55: Selection and Indexing in Pandas",hh="Selection and Indexing in Pandas",bh="Filtering DataFrame rows and selecting specific columns.",fh="Type H: Matrix / Table Visualization",_h=20,xh="advanced",vh=["CO5"],wh=["day-54"],Sh=1,Ch=1,Th=1,y0={id:uh,unitId:ph,dayNumber:mh,order:yh,title:gh,shortTitle:hh,description:bh,simulationType:fh,estimatedMinutes:_h,difficulty:xh,outcomes:vh,prerequisites:wh,lessonsCount:Sh,problemsCount:Ch,quizCount:Th},g0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:mh,default:y0,description:bh,difficulty:xh,estimatedMinutes:_h,id:uh,lessonsCount:Sh,order:yh,outcomes:vh,prerequisites:wh,problemsCount:Ch,quizCount:Th,shortTitle:hh,simulationType:fh,title:gh,unitId:ph},Symbol.toStringTag,{value:"Module"})),Ph="day-56",Ih="unit-05",$h=56,kh=56,Eh="Day 56: Handling Missing Data",jh="Handling Missing Data",Oh="Detecting, dropping, and imputing missing (NaN) values.",Mh="Type H: Matrix / Table Visualization",zh=20,Ah="advanced",Fh=["CO5"],Dh=["day-55"],qh=1,Wh=1,Rh=1,h0={id:Ph,unitId:Ih,dayNumber:$h,order:kh,title:Eh,shortTitle:jh,description:Oh,simulationType:Mh,estimatedMinutes:zh,difficulty:Ah,outcomes:Fh,prerequisites:Dh,lessonsCount:qh,problemsCount:Wh,quizCount:Rh},b0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:$h,default:h0,description:Oh,difficulty:Ah,estimatedMinutes:zh,id:Ph,lessonsCount:qh,order:kh,outcomes:Fh,prerequisites:Dh,problemsCount:Wh,quizCount:Rh,shortTitle:jh,simulationType:Mh,title:Eh,unitId:Ih},Symbol.toStringTag,{value:"Module"})),Lh="day-57",Nh="unit-05",Uh=57,Bh=57,Vh="Day 57: Merging, Joining, Concatenating",Gh="Merging, Joining, Concatenating",Hh="Combining multiple tabular datasets into one.",Yh="Type H: Matrix / Table Visualization",Jh=20,Qh="advanced",Kh=["CO5"],Xh=["day-56"],Zh=1,eb=1,tb=1,f0={id:Lh,unitId:Nh,dayNumber:Uh,order:Bh,title:Vh,shortTitle:Gh,description:Hh,simulationType:Yh,estimatedMinutes:Jh,difficulty:Qh,outcomes:Kh,prerequisites:Xh,lessonsCount:Zh,problemsCount:eb,quizCount:tb},_0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Uh,default:f0,description:Hh,difficulty:Qh,estimatedMinutes:Jh,id:Lh,lessonsCount:Zh,order:Bh,outcomes:Kh,prerequisites:Xh,problemsCount:eb,quizCount:tb,shortTitle:Gh,simulationType:Yh,title:Vh,unitId:Nh},Symbol.toStringTag,{value:"Module"})),nb="day-58",ob="unit-05",rb=58,ib=58,sb="Day 58: Groupby and Apply Functions",ab="Groupby and Apply Functions",lb="Aggregating data by categories and applying custom transformations.",cb="Type H: Matrix / Table Visualization",db=20,ub="advanced",pb=["CO5"],mb=["day-57"],yb=1,gb=1,hb=1,x0={id:nb,unitId:ob,dayNumber:rb,order:ib,title:sb,shortTitle:ab,description:lb,simulationType:cb,estimatedMinutes:db,difficulty:ub,outcomes:pb,prerequisites:mb,lessonsCount:yb,problemsCount:gb,quizCount:hb},v0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:rb,default:x0,description:lb,difficulty:ub,estimatedMinutes:db,id:nb,lessonsCount:yb,order:ib,outcomes:pb,prerequisites:mb,problemsCount:gb,quizCount:hb,shortTitle:ab,simulationType:cb,title:sb,unitId:ob},Symbol.toStringTag,{value:"Module"})),bb="day-59",fb="unit-05",_b=59,xb=59,vb="Day 59: Sorting in DataFrames",wb="Sorting in DataFrames",Sb="Ordering rows by column values ascending or descending.",Cb="Type H: Matrix / Table Visualization",Tb=20,Pb="advanced",Ib=["CO5"],$b=["day-58"],kb=1,Eb=1,jb=1,w0={id:bb,unitId:fb,dayNumber:_b,order:xb,title:vb,shortTitle:wb,description:Sb,simulationType:Cb,estimatedMinutes:Tb,difficulty:Pb,outcomes:Ib,prerequisites:$b,lessonsCount:kb,problemsCount:Eb,quizCount:jb},S0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:_b,default:w0,description:Sb,difficulty:Pb,estimatedMinutes:Tb,id:bb,lessonsCount:kb,order:xb,outcomes:Ib,prerequisites:$b,problemsCount:Eb,quizCount:jb,shortTitle:wb,simulationType:Cb,title:vb,unitId:fb},Symbol.toStringTag,{value:"Module"})),Ob="day-60",Mb="unit-05",zb=60,Ab=60,Fb="Day 60: File Read and Write Support (CSV Processing)",Db="File Read and Write Support (CSV Processing)",qb="Reading and processing data from a CSV file.",Wb="Type H: Matrix / Table Visualization",Rb=20,Lb="advanced",Nb=["CO5"],Ub=["day-59"],Bb=1,Vb=1,Gb=1,C0={id:Ob,unitId:Mb,dayNumber:zb,order:Ab,title:Fb,shortTitle:Db,description:qb,simulationType:Wb,estimatedMinutes:Rb,difficulty:Lb,outcomes:Nb,prerequisites:Ub,lessonsCount:Bb,problemsCount:Vb,quizCount:Gb},T0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:zb,default:C0,description:qb,difficulty:Lb,estimatedMinutes:Rb,id:Ob,lessonsCount:Bb,order:Ab,outcomes:Nb,prerequisites:Ub,problemsCount:Vb,quizCount:Gb,shortTitle:Db,simulationType:Wb,title:Fb,unitId:Mb},Symbol.toStringTag,{value:"Module"})),Hb="day-61",Yb="unit-06",Jb=61,Qb=61,Kb="Day 61: Consolidation: Control Flow & Logic",Xb="Consolidation: Control Flow & Logic",Zb="Mastery of loops, conditionals, and logical operators.",ef="Type B: Flowchart / Decision Simulation",tf=20,nf="advanced",of=["CO1"],rf=["day-60"],sf=1,af=1,lf=1,P0={id:Hb,unitId:Yb,dayNumber:Jb,order:Qb,title:Kb,shortTitle:Xb,description:Zb,simulationType:ef,estimatedMinutes:tf,difficulty:nf,outcomes:of,prerequisites:rf,lessonsCount:sf,problemsCount:af,quizCount:lf},I0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Jb,default:P0,description:Zb,difficulty:nf,estimatedMinutes:tf,id:Hb,lessonsCount:sf,order:Qb,outcomes:of,prerequisites:rf,problemsCount:af,quizCount:lf,shortTitle:Xb,simulationType:ef,title:Kb,unitId:Yb},Symbol.toStringTag,{value:"Module"})),cf="day-62",df="unit-06",uf=62,pf=62,mf="Day 62: Consolidation: Advanced Data Structures",yf="Consolidation: Advanced Data Structures",gf="Mastery of lists, dictionaries, tuples, and comprehensions.",hf="Type E: Data Structure Visualizer",bf=20,ff="advanced",_f=["CO3"],xf=["day-61"],vf=1,wf=1,Sf=1,$0={id:cf,unitId:df,dayNumber:uf,order:pf,title:mf,shortTitle:yf,description:gf,simulationType:hf,estimatedMinutes:bf,difficulty:ff,outcomes:_f,prerequisites:xf,lessonsCount:vf,problemsCount:wf,quizCount:Sf},k0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:uf,default:$0,description:gf,difficulty:ff,estimatedMinutes:bf,id:cf,lessonsCount:vf,order:pf,outcomes:_f,prerequisites:xf,problemsCount:wf,quizCount:Sf,shortTitle:yf,simulationType:hf,title:mf,unitId:df},Symbol.toStringTag,{value:"Module"})),Cf="day-63",Tf="unit-06",Pf=63,If=63,$f="Day 63: Consolidation: Search & Sort Algorithms",kf="Consolidation: Search & Sort Algorithms",Ef="Reviewing binary search, linear search, and sorting implementations.",jf="Type F: Algorithm Animation",Of=20,Mf="advanced",zf=["CO3"],Af=["day-62"],Ff=1,Df=1,qf=1,E0={id:Cf,unitId:Tf,dayNumber:Pf,order:If,title:$f,shortTitle:kf,description:Ef,simulationType:jf,estimatedMinutes:Of,difficulty:Mf,outcomes:zf,prerequisites:Af,lessonsCount:Ff,problemsCount:Df,quizCount:qf},j0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Pf,default:E0,description:Ef,difficulty:Mf,estimatedMinutes:Of,id:Cf,lessonsCount:Ff,order:If,outcomes:zf,prerequisites:Af,problemsCount:Df,quizCount:qf,shortTitle:kf,simulationType:jf,title:$f,unitId:Tf},Symbol.toStringTag,{value:"Module"})),Wf="day-64",Rf="unit-06",Lf=64,Nf=64,Uf="Day 64: Consolidation: Files, Modules, and Error Handling",Bf="Consolidation: Files, Modules, and Error Handling",Vf="Building robust I/O pipelines.",Gf="Type G: File / Data Pipeline Simulation",Hf=20,Yf="advanced",Jf=["CO4"],Qf=["day-63"],Kf=1,Xf=1,Zf=1,O0={id:Wf,unitId:Rf,dayNumber:Lf,order:Nf,title:Uf,shortTitle:Bf,description:Vf,simulationType:Gf,estimatedMinutes:Hf,difficulty:Yf,outcomes:Jf,prerequisites:Qf,lessonsCount:Kf,problemsCount:Xf,quizCount:Zf},M0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:Lf,default:O0,description:Vf,difficulty:Yf,estimatedMinutes:Hf,id:Wf,lessonsCount:Kf,order:Nf,outcomes:Jf,prerequisites:Qf,problemsCount:Xf,quizCount:Zf,shortTitle:Bf,simulationType:Gf,title:Uf,unitId:Rf},Symbol.toStringTag,{value:"Module"})),e_="day-65",t_="unit-06",n_=65,o_=65,r_="Day 65: Capstone: NumPy & Pandas End-to-End",i_="Capstone: NumPy & Pandas End-to-End",s_="Complete CSV data analytics pipeline integrating all course concepts.",a_="Type H: Matrix / Table Visualization",l_=20,c_="advanced",d_=["CO5"],u_=["day-64"],p_=1,m_=1,y_=1,z0={id:e_,unitId:t_,dayNumber:n_,order:o_,title:r_,shortTitle:i_,description:s_,simulationType:a_,estimatedMinutes:l_,difficulty:c_,outcomes:d_,prerequisites:u_,lessonsCount:p_,problemsCount:m_,quizCount:y_},A0=Object.freeze(Object.defineProperty({__proto__:null,dayNumber:n_,default:z0,description:s_,difficulty:c_,estimatedMinutes:l_,id:e_,lessonsCount:p_,order:o_,outcomes:d_,prerequisites:u_,problemsCount:m_,quizCount:y_,shortTitle:i_,simulationType:a_,title:r_,unitId:t_},Symbol.toStringTag,{value:"Module"})),F0=`# Day 1: Python Interpreter & Interactive Mode\r
\r
## 01. Concept Header\r
**Python Interpreter & Interactive Mode**\r
Introduction to the Python interpreter, running code in interactive mode vs script mode.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of python interpreter & interactive mode\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Kitchen Recipe and the Master Chef Translator**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Kitchen Recipe and the Master Chef Translator represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, python interpreter & interactive mode allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, python interpreter & interactive mode follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Python Interpreter & Interactive Mode Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Python Interpreter & Interactive Mode Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Python Interpreter & Interactive Mode\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Python Interpreter & Interactive Mode")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Python Interpreter & Interactive Mode in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Python Interpreter & Interactive Mode\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Python Interpreter & Interactive Mode on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Python Interpreter & Interactive Mode changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Python Interpreter & Interactive Mode. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,D0=`# Day 2: Values and Types (int, float, boolean)\r
\r
## 01. Concept Header\r
**Values and Types (int, float, boolean)**\r
Understanding primitive data types: integers, floats, and booleans.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of values and types (int, float, boolean)\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Color-Coded Storage Boxes**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Color-Coded Storage Boxes represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, values and types (int, float, boolean) allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, values and types (int, float, boolean) follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Values and Types (int, float, boolean) Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Values and Types (int, float, boolean) Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Values and Types (int, float, boolean)\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Values and Types (int, float, boolean)")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Values and Types (int, float, boolean) in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Values and Types (int, float, boolean)\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Values and Types (int, float, boolean) on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Values and Types (int, float, boolean) changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Values and Types (int, float, boolean). You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,q0=`# Day 3: String and List Types\r
\r
## 01. Concept Header\r
**String and List Types**\r
Basic introduction to string and list types as sequences of values.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of string and list types\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Alphabet Necklace and the Shopping Checklist**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Alphabet Necklace and the Shopping Checklist represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, string and list types allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, string and list types follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> String and List Types Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ String and List Types Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for String and List Types\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning String and List Types")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe String and List Types in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating String and List Types\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses String and List Types on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how String and List Types changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered String and List Types. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,W0=`# Day 4: Variables and Comments\r
\r
## 01. Concept Header\r
**Variables and Comments**\r
Declaring variables, naming rules, and adding inline/block comments.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of variables and comments\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Postal Mailbox & Sticky Name Tags**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Postal Mailbox & Sticky Name Tags represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, variables and comments allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, variables and comments follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Variables and Comments Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Variables and Comments Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Variables and Comments\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Variables and Comments")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Variables and Comments in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Variables and Comments\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Variables and Comments on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Variables and Comments changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Variables and Comments. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,R0=`# Day 5: Expressions and Statements\r
\r
## 01. Concept Header\r
**Expressions and Statements**\r
Differentiating expressions (evaluate to a value) and statements (execute an action).\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of expressions and statements\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Calculator Formula vs The Action Command**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Calculator Formula vs The Action Command represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, expressions and statements allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, expressions and statements follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Expressions and Statements Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Expressions and Statements Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Expressions and Statements\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Expressions and Statements")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Expressions and Statements in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Expressions and Statements\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Expressions and Statements on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Expressions and Statements changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Expressions and Statements. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,L0=`# Day 6: Precedence of Operators\r
\r
## 01. Concept Header\r
**Precedence of Operators**\r
Understanding how mathematical operators are evaluated using BEDMAS/PEMDAS precedence.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of precedence of operators\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Math Traffic Rules and Priority Pass**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Math Traffic Rules and Priority Pass represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, precedence of operators allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, precedence of operators follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Precedence of Operators Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Precedence of Operators Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Precedence of Operators\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Precedence of Operators")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Precedence of Operators in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Precedence of Operators\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Precedence of Operators on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Precedence of Operators changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Precedence of Operators. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,N0=`# Day 7: Tuple Assignment & Value Swapping\r
\r
## 01. Concept Header\r
**Tuple Assignment & Value Swapping**\r
Swapping two values elegantly without a temporary variable, and circulating n variables.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of tuple assignment & value swapping\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Simultaneous Juggling Trick**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Simultaneous Juggling Trick represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, tuple assignment & value swapping allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, tuple assignment & value swapping follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Tuple Assignment & Value Swapping Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Tuple Assignment & Value Swapping Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Tuple Assignment & Value Swapping\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Tuple Assignment & Value Swapping")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Tuple Assignment & Value Swapping in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Tuple Assignment & Value Swapping\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Tuple Assignment & Value Swapping on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Tuple Assignment & Value Swapping changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Tuple Assignment & Value Swapping. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,U0=`# Day 8: Modules and Built-in Functions\r
\r
## 01. Concept Header\r
**Modules and Built-in Functions**\r
Importing standard modules (e.g. math) and using built-in functions.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of modules and built-in functions\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Magical Reusable Toolkit**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Magical Reusable Toolkit represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, modules and built-in functions allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, modules and built-in functions follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Modules and Built-in Functions Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Modules and Built-in Functions Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Modules and Built-in Functions\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Modules and Built-in Functions")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Modules and Built-in Functions in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Modules and Built-in Functions\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Modules and Built-in Functions on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Modules and Built-in Functions changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Modules and Built-in Functions. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,B0=`# Day 9: Function Definition and Use\r
\r
## 01. Concept Header\r
**Function Definition and Use**\r
Defining custom functions using 'def' and calling them.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of function definition and use\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Custom Recipe Book**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Custom Recipe Book represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, function definition and use allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, function definition and use follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Function Definition and Use Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Function Definition and Use Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Function Definition and Use\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Function Definition and Use")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Function Definition and Use in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Function Definition and Use\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Function Definition and Use on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Function Definition and Use changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Function Definition and Use. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,V0=`# Day 10: Flow of Execution\r
\r
## 01. Concept Header\r
**Flow of Execution**\r
Tracing how the Python interpreter jumps execution into a function and returns.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of flow of execution\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Stack of Cafeteria Trays**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Stack of Cafeteria Trays represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, flow of execution allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, flow of execution follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Flow of Execution Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Flow of Execution Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Flow of Execution\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Flow of Execution")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Flow of Execution in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Flow of Execution\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Flow of Execution on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Flow of Execution changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Flow of Execution. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,G0=`# Day 11: Parameters and Arguments\r
\r
## 01. Concept Header\r
**Parameters and Arguments**\r
Passing arguments to function parameters.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of parameters and arguments\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Coffee Vending Machine Selector**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Coffee Vending Machine Selector represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, parameters and arguments allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, parameters and arguments follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Parameters and Arguments Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Parameters and Arguments Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Parameters and Arguments\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Parameters and Arguments")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Parameters and Arguments in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Parameters and Arguments\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Parameters and Arguments on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Parameters and Arguments changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Parameters and Arguments. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,H0=`# Day 12: Unit I Illustrative Programs\r
\r
## 01. Concept Header\r
**Unit I Illustrative Programs**\r
Practical programs: Exchange the values of two variables, circulate the values of n variables, distance between two points.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 01\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of unit i illustrative programs\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Coordinate Map and The Circle Dance**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Coordinate Map and The Circle Dance represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, unit i illustrative programs allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, unit i illustrative programs follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Unit I Illustrative Programs Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Unit I Illustrative Programs Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Unit I Illustrative Programs\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Unit I Illustrative Programs")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Unit I Illustrative Programs in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Unit I Illustrative Programs\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Unit I Illustrative Programs on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Unit I Illustrative Programs changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Unit I Illustrative Programs. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,Y0=`# Day 13: Boolean Values and Operators\r
\r
## 01. Concept Header\r
**Boolean Values and Operators**\r
Evaluating Boolean logic and comparison operators.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of boolean values and operators\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Security Checkpoint & Dual Key Lock**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Security Checkpoint & Dual Key Lock represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, boolean values and operators allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, boolean values and operators follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Boolean Values and Operators Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Boolean Values and Operators Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Boolean Values and Operators\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Boolean Values and Operators")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Boolean Values and Operators in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Boolean Values and Operators\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Boolean Values and Operators on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Boolean Values and Operators changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Boolean Values and Operators. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,J0=`# Day 14: Conditional Execution (if)\r
\r
## 01. Concept Header\r
**Conditional Execution (if)**\r
Running code blocks conditionally based on Boolean truth.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of conditional execution (if)\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Single Railway Track Switch**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Single Railway Track Switch represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, conditional execution (if) allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, conditional execution (if) follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Conditional Execution (if) Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Conditional Execution (if) Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Conditional Execution (if)\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Conditional Execution (if)")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Conditional Execution (if) in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Conditional Execution (if)\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Conditional Execution (if) on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Conditional Execution (if) changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Conditional Execution (if). You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,Q0=`# Day 15: Alternative (if-else) & Chained (if-elif-else)\r
\r
## 01. Concept Header\r
**Alternative (if-else) & Chained (if-elif-else)**\r
Handling multiple mutually exclusive branching paths.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of alternative (if-else) & chained (if-elif-else)\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Fork in the Road and The Decision Ladder**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Fork in the Road and The Decision Ladder represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, alternative (if-else) & chained (if-elif-else) allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, alternative (if-else) & chained (if-elif-else) follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Alternative (if-else) & Chained (if-elif-else) Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Alternative (if-else) & Chained (if-elif-else) Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Alternative (if-else) & Chained (if-elif-else)\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Alternative (if-else) & Chained (if-elif-else)")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Alternative (if-else) & Chained (if-elif-else) in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Alternative (if-else) & Chained (if-elif-else)\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Alternative (if-else) & Chained (if-elif-else) on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Alternative (if-else) & Chained (if-elif-else) changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Alternative (if-else) & Chained (if-elif-else). You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,K0=`# Day 16: Iteration State & The while Loop\r
\r
## 01. Concept Header\r
**Iteration State & The while Loop**\r
Repeating code continuously while a condition remains True.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of iteration state & the while loop\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Factory Assembly Line Conveyor**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Factory Assembly Line Conveyor represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, iteration state & the while loop allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, iteration state & the while loop follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Iteration State & The while Loop Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Iteration State & The while Loop Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Iteration State & The while Loop\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Iteration State & The while Loop")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Iteration State & The while Loop in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Iteration State & The while Loop\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Iteration State & The while Loop on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Iteration State & The while Loop changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Iteration State & The while Loop. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,X0=`# Day 17: The for Loop & range()\r
\r
## 01. Concept Header\r
**The for Loop & range()**\r
Iterating over sequences systematically.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of the for loop & range()\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Roll Call Attendance Sheet**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Roll Call Attendance Sheet represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, the for loop & range() allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, the for loop & range() follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> The for Loop & range() Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ The for Loop & range() Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for The for Loop & range()\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning The for Loop & range()")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe The for Loop & range() in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating The for Loop & range()\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses The for Loop & range() on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how The for Loop & range() changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered The for Loop & range(). You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,Z0=`# Day 18: Loop Control: break, continue, pass\r
\r
## 01. Concept Header\r
**Loop Control: break, continue, pass**\r
Controlling execution flow from inside a loop.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of loop control: break, continue, pass\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Emergency Stop Switch & Fast-Forward Button**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Emergency Stop Switch & Fast-Forward Button represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, loop control: break, continue, pass allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, loop control: break, continue, pass follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Loop Control: break, continue, pass Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Loop Control: break, continue, pass Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Loop Control: break, continue, pass\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Loop Control: break, continue, pass")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Loop Control: break, continue, pass in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Loop Control: break, continue, pass\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Loop Control: break, continue, pass on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Loop Control: break, continue, pass changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Loop Control: break, continue, pass. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,eP=`# Day 19: Fruitful Functions & Return Values\r
\r
## 01. Concept Header\r
**Fruitful Functions & Return Values**\r
Returning computed results from functions to the caller.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of fruitful functions & return values\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Automated Calculation Factory**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Automated Calculation Factory represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, fruitful functions & return values allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, fruitful functions & return values follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Fruitful Functions & Return Values Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Fruitful Functions & Return Values Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Fruitful Functions & Return Values\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Fruitful Functions & Return Values")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Fruitful Functions & Return Values in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Fruitful Functions & Return Values\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Fruitful Functions & Return Values on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Fruitful Functions & Return Values changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Fruitful Functions & Return Values. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,tP=`# Day 20: Scope (Local/Global) & Function Composition\r
\r
## 01. Concept Header\r
**Scope (Local/Global) & Function Composition**\r
Understanding variable visibility and chaining functions.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of scope (local/global) & function composition\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Neighborhood Whispering Rules**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Neighborhood Whispering Rules represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, scope (local/global) & function composition allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, scope (local/global) & function composition follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Scope (Local/Global) & Function Composition Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Scope (Local/Global) & Function Composition Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Scope (Local/Global) & Function Composition\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Scope (Local/Global) & Function Composition")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Scope (Local/Global) & Function Composition in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Scope (Local/Global) & Function Composition\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Scope (Local/Global) & Function Composition on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Scope (Local/Global) & Function Composition changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Scope (Local/Global) & Function Composition. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,nP=`# Day 21: Recursion\r
\r
## 01. Concept Header\r
**Recursion**\r
Functions that call themselves to solve smaller problem instances.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of recursion\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Russian Nesting Dolls**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Russian Nesting Dolls represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, recursion allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, recursion follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Recursion Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Recursion Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Recursion\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Recursion")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Recursion in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Recursion\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Recursion on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Recursion changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Recursion. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,oP=`# Day 22: Strings: Immutability & Slices\r
\r
## 01. Concept Header\r
**Strings: Immutability & Slices**\r
Extracting substrings using slicing and understanding that strings cannot be changed in place.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of strings: immutability & slices\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Word Scissors**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Word Scissors represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, strings: immutability & slices allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, strings: immutability & slices follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Strings: Immutability & Slices Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Strings: Immutability & Slices Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Strings: Immutability & Slices\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Strings: Immutability & Slices")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Strings: Immutability & Slices in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Strings: Immutability & Slices\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Strings: Immutability & Slices on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Strings: Immutability & Slices changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Strings: Immutability & Slices. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,rP=`# Day 23: String Methods, Module & Lists as Arrays\r
\r
## 01. Concept Header\r
**String Methods, Module & Lists as Arrays**\r
Using string transformation methods, string module utilities, and simulating arrays with lists.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of string methods, module & lists as arrays\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Text Formatter & Data Shelves**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Text Formatter & Data Shelves represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, string methods, module & lists as arrays allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, string methods, module & lists as arrays follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> String Methods, Module & Lists as Arrays Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ String Methods, Module & Lists as Arrays Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for String Methods, Module & Lists as Arrays\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning String Methods, Module & Lists as Arrays")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe String Methods, Module & Lists as Arrays in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating String Methods, Module & Lists as Arrays\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses String Methods, Module & Lists as Arrays on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how String Methods, Module & Lists as Arrays changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered String Methods, Module & Lists as Arrays. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,iP=`# Day 24: Unit II Illustrative Programs\r
\r
## 01. Concept Header\r
**Unit II Illustrative Programs**\r
Practical programs: Square root (Newton's method), GCD, exponentiation, sum an array of numbers.\r
Difficulty: Beginner | Estimated Time: 20 min | Unit: Unit 02\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of unit ii illustrative programs\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Mathematical Detective & Number Sorter**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Mathematical Detective & Number Sorter represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, unit ii illustrative programs allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, unit ii illustrative programs follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Unit II Illustrative Programs Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Unit II Illustrative Programs Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Unit II Illustrative Programs\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Unit II Illustrative Programs")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Unit II Illustrative Programs in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Unit II Illustrative Programs\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Unit II Illustrative Programs on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Unit II Illustrative Programs changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Unit II Illustrative Programs. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,sP=`# Day 25: Lists: Operations and Slices\r
\r
## 01. Concept Header\r
**Lists: Operations and Slices**\r
Combining lists and extracting sublists.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of lists: operations and slices\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Expandable Train Carriages**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Expandable Train Carriages represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, lists: operations and slices allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, lists: operations and slices follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Lists: Operations and Slices Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Lists: Operations and Slices Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Lists: Operations and Slices\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Lists: Operations and Slices")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Lists: Operations and Slices in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Lists: Operations and Slices\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Lists: Operations and Slices on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Lists: Operations and Slices changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Lists: Operations and Slices. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,aP=`# Day 26: List Methods and List Loop\r
\r
## 01. Concept Header\r
**List Methods and List Loop**\r
Mutating lists (append, remove, pop) and iterating through elements.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of list methods and list loop\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Dynamic Toolbox**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Dynamic Toolbox represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, list methods and list loop allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, list methods and list loop follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> List Methods and List Loop Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ List Methods and List Loop Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for List Methods and List Loop\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning List Methods and List Loop")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe List Methods and List Loop in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating List Methods and List Loop\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses List Methods and List Loop on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how List Methods and List Loop changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered List Methods and List Loop. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,lP=`# Day 27: Mutability, Aliasing, and Cloning\r
\r
## 01. Concept Header\r
**Mutability, Aliasing, and Cloning**\r
Understanding reference variables, side effects of aliasing, and how to clone lists safely.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of mutability, aliasing, and cloning\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**Two Keys to the Same Locker vs The Photocopy**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. Two Keys to the Same Locker vs The Photocopy represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, mutability, aliasing, and cloning allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, mutability, aliasing, and cloning follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Mutability, Aliasing, and Cloning Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Mutability, Aliasing, and Cloning Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Mutability, Aliasing, and Cloning\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Mutability, Aliasing, and Cloning")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Mutability, Aliasing, and Cloning in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Mutability, Aliasing, and Cloning\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Mutability, Aliasing, and Cloning on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Mutability, Aliasing, and Cloning changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Mutability, Aliasing, and Cloning. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,cP=`# Day 28: List Parameters & Advanced Comprehensions\r
\r
## 01. Concept Header\r
**List Parameters & Advanced Comprehensions**\r
Passing lists to functions and transforming lists efficiently using list comprehension.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of list parameters & advanced comprehensions\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The One-Line Fruit Sorter Factory**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The One-Line Fruit Sorter Factory represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, list parameters & advanced comprehensions allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, list parameters & advanced comprehensions follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> List Parameters & Advanced Comprehensions Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ List Parameters & Advanced Comprehensions Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for List Parameters & Advanced Comprehensions\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning List Parameters & Advanced Comprehensions")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe List Parameters & Advanced Comprehensions in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating List Parameters & Advanced Comprehensions\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses List Parameters & Advanced Comprehensions on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how List Parameters & Advanced Comprehensions changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered List Parameters & Advanced Comprehensions. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,dP=`# Day 29: Tuples: Assignment & Return Values\r
\r
## 01. Concept Header\r
**Tuples: Assignment & Return Values**\r
Using immutable tuples for packing/unpacking and returning multiple values.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of tuples: assignment & return values\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Sealed Glass Display Case**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Sealed Glass Display Case represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, tuples: assignment & return values allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, tuples: assignment & return values follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Tuples: Assignment & Return Values Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Tuples: Assignment & Return Values Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Tuples: Assignment & Return Values\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Tuples: Assignment & Return Values")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Tuples: Assignment & Return Values in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Tuples: Assignment & Return Values\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Tuples: Assignment & Return Values on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Tuples: Assignment & Return Values changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Tuples: Assignment & Return Values. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,uP=`# Day 30: Dictionaries: Operations & Methods\r
\r
## 01. Concept Header\r
**Dictionaries: Operations & Methods**\r
Storing key-value pairs and using dictionary methods.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of dictionaries: operations & methods\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Magic Postal Lockers with Custom Nameplates**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Magic Postal Lockers with Custom Nameplates represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, dictionaries: operations & methods allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, dictionaries: operations & methods follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Dictionaries: Operations & Methods Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Dictionaries: Operations & Methods Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Dictionaries: Operations & Methods\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Dictionaries: Operations & Methods")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Dictionaries: Operations & Methods in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Dictionaries: Operations & Methods\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Dictionaries: Operations & Methods on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Dictionaries: Operations & Methods changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Dictionaries: Operations & Methods. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,pP=`# Day 31: Finding Maximum of a List\r
\r
## 01. Concept Header\r
**Finding Maximum of a List**\r
Iterating through a sequence to find the maximum element.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of finding maximum of a list\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The King of the Hill**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The King of the Hill represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, finding maximum of a list allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, finding maximum of a list follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Finding Maximum of a List Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Finding Maximum of a List Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Finding Maximum of a List\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Finding Maximum of a List")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Finding Maximum of a List in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Finding Maximum of a List\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Finding Maximum of a List on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Finding Maximum of a List changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Finding Maximum of a List. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,mP=`# Day 32: Linear Search\r
\r
## 01. Concept Header\r
**Linear Search**\r
Sequential searching algorithm.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of linear search\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**Finding a Book on a Messy Shelf**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. Finding a Book on a Messy Shelf represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, linear search allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, linear search follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Linear Search Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Linear Search Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Linear Search\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Linear Search")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Linear Search in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Linear Search\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Linear Search on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Linear Search changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Linear Search. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,yP=`# Day 33: Binary Search\r
\r
## 01. Concept Header\r
**Binary Search**\r
Divide-and-conquer search on sorted data.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of binary search\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**Finding a Word in a Dictionary**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. Finding a Word in a Dictionary represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, binary search allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, binary search follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Binary Search Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Binary Search Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Binary Search\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Binary Search")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Binary Search in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Binary Search\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Binary Search on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Binary Search changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Binary Search. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,gP=`# Day 34: Selection Sort\r
\r
## 01. Concept Header\r
**Selection Sort**\r
Sorting by repeatedly finding the minimum.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of selection sort\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**Organizing Playing Cards by Rank**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. Organizing Playing Cards by Rank represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, selection sort allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, selection sort follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Selection Sort Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Selection Sort Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Selection Sort\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Selection Sort")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Selection Sort in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Selection Sort\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Selection Sort on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Selection Sort changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Selection Sort. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,hP=`# Day 35: Insertion Sort\r
\r
## 01. Concept Header\r
**Insertion Sort**\r
Sorting by building a sorted array one item at a time.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of insertion sort\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Card Dealer's Technique**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Card Dealer's Technique represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, insertion sort allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, insertion sort follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Insertion Sort Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Insertion Sort Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Insertion Sort\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Insertion Sort")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Insertion Sort in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Insertion Sort\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Insertion Sort on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Insertion Sort changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Insertion Sort. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,bP=`# Day 36: Merge Sort & Histograms\r
\r
## 01. Concept Header\r
**Merge Sort & Histograms**\r
Divide-and-conquer sorting and frequency counting using dictionaries.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 03\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of merge sort & histograms\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Assembly Line Sorter & Frequency Counter**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Assembly Line Sorter & Frequency Counter represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, merge sort & histograms allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, merge sort & histograms follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Merge Sort & Histograms Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Merge Sort & Histograms Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Merge Sort & Histograms\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Merge Sort & Histograms")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Merge Sort & Histograms in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Merge Sort & Histograms\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Merge Sort & Histograms on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Merge Sort & Histograms changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Merge Sort & Histograms. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,fP=`# Day 37: Text Files: Reading and Writing\r
\r
## 01. Concept Header\r
**Text Files: Reading and Writing**\r
Opening, reading, writing, and closing text files.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of text files: reading and writing\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Long-Term Diary and Filing Cabinet**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Long-Term Diary and Filing Cabinet represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, text files: reading and writing allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, text files: reading and writing follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Text Files: Reading and Writing Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Text Files: Reading and Writing Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Text Files: Reading and Writing\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Text Files: Reading and Writing")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Text Files: Reading and Writing in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Text Files: Reading and Writing\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Text Files: Reading and Writing on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Text Files: Reading and Writing changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Text Files: Reading and Writing. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,_P=`# Day 38: The Format Operator\r
\r
## 01. Concept Header\r
**The Format Operator**\r
Formatting output using format operators and string interpolation.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of the format operator\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Professional Certificate Formatter**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Professional Certificate Formatter represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, the format operator allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, the format operator follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> The Format Operator Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ The Format Operator Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for The Format Operator\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning The Format Operator")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe The Format Operator in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating The Format Operator\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses The Format Operator on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how The Format Operator changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered The Format Operator. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,xP=`# Day 39: Command Line Arguments\r
\r
## 01. Concept Header\r
**Command Line Arguments**\r
Passing arguments to a Python script via sys.argv.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of command line arguments\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Mail Delivery Address Label**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Mail Delivery Address Label represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, command line arguments allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, command line arguments follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Command Line Arguments Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Command Line Arguments Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Command Line Arguments\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Command Line Arguments")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Command Line Arguments in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Command Line Arguments\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Command Line Arguments on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Command Line Arguments changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Command Line Arguments. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,vP=`# Day 40: Errors and Exceptions\r
\r
## 01. Concept Header\r
**Errors and Exceptions**\r
Differentiating syntax errors from runtime exceptions.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of errors and exceptions\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Grammar Mistake vs The Pothole**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Grammar Mistake vs The Pothole represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, errors and exceptions allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, errors and exceptions follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Errors and Exceptions Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Errors and Exceptions Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Errors and Exceptions\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Errors and Exceptions")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Errors and Exceptions in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Errors and Exceptions\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Errors and Exceptions on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Errors and Exceptions changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Errors and Exceptions. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,wP=`# Day 41: Handling Exceptions (try-except)\r
\r
## 01. Concept Header\r
**Handling Exceptions (try-except)**\r
Gracefully catching and handling runtime exceptions to prevent program crashes.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of handling exceptions (try-except)\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Trapeze Safety Net**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Trapeze Safety Net represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, handling exceptions (try-except) allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, handling exceptions (try-except) follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Handling Exceptions (try-except) Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Handling Exceptions (try-except) Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Handling Exceptions (try-except)\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Handling Exceptions (try-except)")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Handling Exceptions (try-except) in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Handling Exceptions (try-except)\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Handling Exceptions (try-except) on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Handling Exceptions (try-except) changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Handling Exceptions (try-except). You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,SP=`# Day 42: Modules and Packages\r
\r
## 01. Concept Header\r
**Modules and Packages**\r
Organizing Python code into modules and directory-based packages.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of modules and packages\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Labeled Department Store Shelves**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Labeled Department Store Shelves represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, modules and packages allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, modules and packages follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Modules and Packages Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Modules and Packages Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Modules and Packages\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Modules and Packages")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Modules and Packages in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Modules and Packages\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Modules and Packages on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Modules and Packages changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Modules and Packages. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,CP=`# Day 43: Classes and Objects Intro\r
\r
## 01. Concept Header\r
**Classes and Objects Intro**\r
Introduction to object-oriented programming: blueprints (classes) and instances (objects).\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of classes and objects intro\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Architectural Blueprint and Finished Houses**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Architectural Blueprint and Finished Houses represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, classes and objects intro allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, classes and objects intro follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Classes and Objects Intro Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Classes and Objects Intro Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Classes and Objects Intro\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Classes and Objects Intro")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Classes and Objects Intro in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Classes and Objects Intro\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Classes and Objects Intro on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Classes and Objects Intro changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Classes and Objects Intro. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,TP=`# Day 44: Object Attributes and Methods\r
\r
## 01. Concept Header\r
**Object Attributes and Methods**\r
Adding state and behavior to custom objects.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of object attributes and methods\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Robot Factory**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Robot Factory represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, object attributes and methods allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, object attributes and methods follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Object Attributes and Methods Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Object Attributes and Methods Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Object Attributes and Methods\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Object Attributes and Methods")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Object Attributes and Methods in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Object Attributes and Methods\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Object Attributes and Methods on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Object Attributes and Methods changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Object Attributes and Methods. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,PP=`# Day 45: Unit IV Practical: Word Count (CLI)\r
\r
## 01. Concept Header\r
**Unit IV Practical: Word Count (CLI)**\r
Building a program that takes command line arguments and counts words in a file.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of unit iv practical: word count (cli)\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Automated Document Scanner**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Automated Document Scanner represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, unit iv practical: word count (cli) allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, unit iv practical: word count (cli) follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Unit IV Practical: Word Count (CLI) Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Unit IV Practical: Word Count (CLI) Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Unit IV Practical: Word Count (CLI)\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Unit IV Practical: Word Count (CLI)")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Unit IV Practical: Word Count (CLI) in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Unit IV Practical: Word Count (CLI)\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Unit IV Practical: Word Count (CLI) on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Unit IV Practical: Word Count (CLI) changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Unit IV Practical: Word Count (CLI). You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,IP=`# Day 46: Unit IV Practical: Copy File\r
\r
## 01. Concept Header\r
**Unit IV Practical: Copy File**\r
Script to safely open a source file, read contents, and write to a destination file.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of unit iv practical: copy file\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Photocopy Machine**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Photocopy Machine represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, unit iv practical: copy file allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, unit iv practical: copy file follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Unit IV Practical: Copy File Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Unit IV Practical: Copy File Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Unit IV Practical: Copy File\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Unit IV Practical: Copy File")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Unit IV Practical: Copy File in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Unit IV Practical: Copy File\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Unit IV Practical: Copy File on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Unit IV Practical: Copy File changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Unit IV Practical: Copy File. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,$P=`# Day 47: Consolidation: File Parsing & Objects\r
\r
## 01. Concept Header\r
**Consolidation: File Parsing & Objects**\r
Combining file reading and object initialization.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of consolidation: file parsing & objects\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Data Importer**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Data Importer represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, consolidation: file parsing & objects allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, consolidation: file parsing & objects follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Consolidation: File Parsing & Objects Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Consolidation: File Parsing & Objects Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Consolidation: File Parsing & Objects\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Consolidation: File Parsing & Objects")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Consolidation: File Parsing & Objects in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Consolidation: File Parsing & Objects\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Consolidation: File Parsing & Objects on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Consolidation: File Parsing & Objects changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Consolidation: File Parsing & Objects. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,kP=`# Day 48: Consolidation: Exception-Safe Pipelines\r
\r
## 01. Concept Header\r
**Consolidation: Exception-Safe Pipelines**\r
Robust coding practices integrating packages, exceptions, and file I/O.\r
Difficulty: Intermediate | Estimated Time: 20 min | Unit: Unit 04\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of consolidation: exception-safe pipelines\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Industrial Safety Protocols**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Industrial Safety Protocols represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, consolidation: exception-safe pipelines allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, consolidation: exception-safe pipelines follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Consolidation: Exception-Safe Pipelines Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Consolidation: Exception-Safe Pipelines Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Consolidation: Exception-Safe Pipelines\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Consolidation: Exception-Safe Pipelines")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Consolidation: Exception-Safe Pipelines in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Consolidation: Exception-Safe Pipelines\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Consolidation: Exception-Safe Pipelines on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Consolidation: Exception-Safe Pipelines changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Consolidation: Exception-Safe Pipelines. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,EP=`# Day 49: NumPy: Creating a NumPy Array\r
\r
## 01. Concept Header\r
**NumPy: Creating a NumPy Array**\r
Initializing homogeneous arrays for high-performance math.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of numpy: creating a numpy array\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Supercharged Number Conveyor**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Supercharged Number Conveyor represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, numpy: creating a numpy array allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, numpy: creating a numpy array follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> NumPy: Creating a NumPy Array Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ NumPy: Creating a NumPy Array Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for NumPy: Creating a NumPy Array\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning NumPy: Creating a NumPy Array")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe NumPy: Creating a NumPy Array in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating NumPy: Creating a NumPy Array\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses NumPy: Creating a NumPy Array on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how NumPy: Creating a NumPy Array changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered NumPy: Creating a NumPy Array. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,jP=`# Day 50: The Shape and Reshaping of NumPy Array\r
\r
## 01. Concept Header\r
**The Shape and Reshaping of NumPy Array**\r
Manipulating dimensions of multi-dimensional arrays.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of the shape and reshaping of numpy array\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**Rearranging Chocolate Pieces in a Box**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. Rearranging Chocolate Pieces in a Box represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, the shape and reshaping of numpy array allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, the shape and reshaping of numpy array follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> The Shape and Reshaping of NumPy Array Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ The Shape and Reshaping of NumPy Array Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for The Shape and Reshaping of NumPy Array\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning The Shape and Reshaping of NumPy Array")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe The Shape and Reshaping of NumPy Array in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating The Shape and Reshaping of NumPy Array\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses The Shape and Reshaping of NumPy Array on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how The Shape and Reshaping of NumPy Array changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered The Shape and Reshaping of NumPy Array. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,OP=`# Day 51: Indexing and Slicing of NumPy Array\r
\r
## 01. Concept Header\r
**Indexing and Slicing of NumPy Array**\r
Accessing elements, rows, and sub-matrices.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of indexing and slicing of numpy array\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Coordinate Target Selector**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Coordinate Target Selector represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, indexing and slicing of numpy array allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, indexing and slicing of numpy array follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Indexing and Slicing of NumPy Array Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Indexing and Slicing of NumPy Array Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Indexing and Slicing of NumPy Array\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Indexing and Slicing of NumPy Array")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Indexing and Slicing of NumPy Array in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Indexing and Slicing of NumPy Array\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Indexing and Slicing of NumPy Array on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Indexing and Slicing of NumPy Array changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Indexing and Slicing of NumPy Array. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,MP=`# Day 52: Maths & Basic Arithmetic with NumPy Arrays\r
\r
## 01. Concept Header\r
**Maths & Basic Arithmetic with NumPy Arrays**\r
Vectorized element-wise addition, subtraction, multiplication, and division.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of maths & basic arithmetic with numpy arrays\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**Applying Operations to Whole Rows**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. Applying Operations to Whole Rows represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, maths & basic arithmetic with numpy arrays allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, maths & basic arithmetic with numpy arrays follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Maths & Basic Arithmetic with NumPy Arrays Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Maths & Basic Arithmetic with NumPy Arrays Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Maths & Basic Arithmetic with NumPy Arrays\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Maths & Basic Arithmetic with NumPy Arrays")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Maths & Basic Arithmetic with NumPy Arrays in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Maths & Basic Arithmetic with NumPy Arrays\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Maths & Basic Arithmetic with NumPy Arrays on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Maths & Basic Arithmetic with NumPy Arrays changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Maths & Basic Arithmetic with NumPy Arrays. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,zP=`# Day 53: Matrix Operations (Multiply, Inverse) & Verification\r
\r
## 01. Concept Header\r
**Matrix Operations (Multiply, Inverse) & Verification**\r
Using loops and library functions for matrix multiplication and finding the inverse.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of matrix operations (multiply, inverse) & verification\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Linear Algebra Engine**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Linear Algebra Engine represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, matrix operations (multiply, inverse) & verification allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, matrix operations (multiply, inverse) & verification follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Matrix Operations (Multiply, Inverse) & Verification Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Matrix Operations (Multiply, Inverse) & Verification Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Matrix Operations (Multiply, Inverse) & Verification\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Matrix Operations (Multiply, Inverse) & Verification")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Matrix Operations (Multiply, Inverse) & Verification in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Matrix Operations (Multiply, Inverse) & Verification\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Matrix Operations (Multiply, Inverse) & Verification on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Matrix Operations (Multiply, Inverse) & Verification changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Matrix Operations (Multiply, Inverse) & Verification. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,AP=`# Day 54: Pandas Series & DataFrames\r
\r
## 01. Concept Header\r
**Pandas Series & DataFrames**\r
Introduction to 1D Series and 2D labeled DataFrames.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of pandas series & dataframes\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Intelligent Multi-Column Spreadsheet**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Intelligent Multi-Column Spreadsheet represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, pandas series & dataframes allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, pandas series & dataframes follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Pandas Series & DataFrames Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Pandas Series & DataFrames Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Pandas Series & DataFrames\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Pandas Series & DataFrames")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Pandas Series & DataFrames in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Pandas Series & DataFrames\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Pandas Series & DataFrames on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Pandas Series & DataFrames changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Pandas Series & DataFrames. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,FP=`# Day 55: Selection and Indexing in Pandas\r
\r
## 01. Concept Header\r
**Selection and Indexing in Pandas**\r
Filtering DataFrame rows and selecting specific columns.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of selection and indexing in pandas\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Targeted Database Query Filter**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Targeted Database Query Filter represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, selection and indexing in pandas allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, selection and indexing in pandas follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Selection and Indexing in Pandas Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Selection and Indexing in Pandas Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Selection and Indexing in Pandas\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Selection and Indexing in Pandas")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Selection and Indexing in Pandas in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Selection and Indexing in Pandas\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Selection and Indexing in Pandas on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Selection and Indexing in Pandas changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Selection and Indexing in Pandas. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,DP=`# Day 56: Handling Missing Data\r
\r
## 01. Concept Header\r
**Handling Missing Data**\r
Detecting, dropping, and imputing missing (NaN) values.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of handling missing data\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Data Cleaning & Tidy Sorter**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Data Cleaning & Tidy Sorter represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, handling missing data allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, handling missing data follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Handling Missing Data Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Handling Missing Data Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Handling Missing Data\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Handling Missing Data")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Handling Missing Data in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Handling Missing Data\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Handling Missing Data on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Handling Missing Data changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Handling Missing Data. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,qP=`# Day 57: Merging, Joining, Concatenating\r
\r
## 01. Concept Header\r
**Merging, Joining, Concatenating**\r
Combining multiple tabular datasets into one.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of merging, joining, concatenating\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Department Store Sales Aggregator**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Department Store Sales Aggregator represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, merging, joining, concatenating allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, merging, joining, concatenating follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Merging, Joining, Concatenating Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Merging, Joining, Concatenating Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Merging, Joining, Concatenating\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Merging, Joining, Concatenating")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Merging, Joining, Concatenating in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Merging, Joining, Concatenating\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Merging, Joining, Concatenating on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Merging, Joining, Concatenating changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Merging, Joining, Concatenating. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,WP=`# Day 58: Groupby and Apply Functions\r
\r
## 01. Concept Header\r
**Groupby and Apply Functions**\r
Aggregating data by categories and applying custom transformations.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of groupby and apply functions\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Analytical Report Generator**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Analytical Report Generator represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, groupby and apply functions allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, groupby and apply functions follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Groupby and Apply Functions Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Groupby and Apply Functions Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Groupby and Apply Functions\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Groupby and Apply Functions")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Groupby and Apply Functions in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Groupby and Apply Functions\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Groupby and Apply Functions on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Groupby and Apply Functions changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Groupby and Apply Functions. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,RP=`# Day 59: Sorting in DataFrames\r
\r
## 01. Concept Header\r
**Sorting in DataFrames**\r
Ordering rows by column values ascending or descending.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of sorting in dataframes\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Leaderboard Sorter**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Leaderboard Sorter represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, sorting in dataframes allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, sorting in dataframes follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Sorting in DataFrames Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Sorting in DataFrames Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Sorting in DataFrames\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Sorting in DataFrames")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Sorting in DataFrames in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Sorting in DataFrames\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Sorting in DataFrames on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Sorting in DataFrames changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Sorting in DataFrames. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,LP=`# Day 60: File Read and Write Support (CSV Processing)\r
\r
## 01. Concept Header\r
**File Read and Write Support (CSV Processing)**\r
Reading and processing data from a CSV file.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 05\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of file read and write support (csv processing)\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Automated Data Scientist Pipeline**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Automated Data Scientist Pipeline represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, file read and write support (csv processing) allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, file read and write support (csv processing) follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> File Read and Write Support (CSV Processing) Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ File Read and Write Support (CSV Processing) Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for File Read and Write Support (CSV Processing)\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning File Read and Write Support (CSV Processing)")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe File Read and Write Support (CSV Processing) in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating File Read and Write Support (CSV Processing)\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses File Read and Write Support (CSV Processing) on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how File Read and Write Support (CSV Processing) changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered File Read and Write Support (CSV Processing). You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,NP=`# Day 61: Consolidation: Control Flow & Logic\r
\r
## 01. Concept Header\r
**Consolidation: Control Flow & Logic**\r
Mastery of loops, conditionals, and logical operators.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 06\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of consolidation: control flow & logic\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Logic Puzzle Room**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Logic Puzzle Room represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, consolidation: control flow & logic allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, consolidation: control flow & logic follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Consolidation: Control Flow & Logic Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Consolidation: Control Flow & Logic Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Consolidation: Control Flow & Logic\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Consolidation: Control Flow & Logic")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Consolidation: Control Flow & Logic in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Consolidation: Control Flow & Logic\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Consolidation: Control Flow & Logic on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Consolidation: Control Flow & Logic changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Consolidation: Control Flow & Logic. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,UP=`# Day 62: Consolidation: Advanced Data Structures\r
\r
## 01. Concept Header\r
**Consolidation: Advanced Data Structures**\r
Mastery of lists, dictionaries, tuples, and comprehensions.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 06\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of consolidation: advanced data structures\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Data Structure Gauntlet**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Data Structure Gauntlet represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, consolidation: advanced data structures allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, consolidation: advanced data structures follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Consolidation: Advanced Data Structures Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Consolidation: Advanced Data Structures Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Consolidation: Advanced Data Structures\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Consolidation: Advanced Data Structures")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Consolidation: Advanced Data Structures in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Consolidation: Advanced Data Structures\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Consolidation: Advanced Data Structures on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Consolidation: Advanced Data Structures changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Consolidation: Advanced Data Structures. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,BP=`# Day 63: Consolidation: Search & Sort Algorithms\r
\r
## 01. Concept Header\r
**Consolidation: Search & Sort Algorithms**\r
Reviewing binary search, linear search, and sorting implementations.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 06\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of consolidation: search & sort algorithms\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Algorithm Olympics**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Algorithm Olympics represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, consolidation: search & sort algorithms allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, consolidation: search & sort algorithms follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Consolidation: Search & Sort Algorithms Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Consolidation: Search & Sort Algorithms Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Consolidation: Search & Sort Algorithms\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Consolidation: Search & Sort Algorithms")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Consolidation: Search & Sort Algorithms in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Consolidation: Search & Sort Algorithms\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Consolidation: Search & Sort Algorithms on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Consolidation: Search & Sort Algorithms changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Consolidation: Search & Sort Algorithms. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,VP=`# Day 64: Consolidation: Files, Modules, and Error Handling\r
\r
## 01. Concept Header\r
**Consolidation: Files, Modules, and Error Handling**\r
Building robust I/O pipelines.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 06\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of consolidation: files, modules, and error handling\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The File Processing Factory**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The File Processing Factory represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, consolidation: files, modules, and error handling allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, consolidation: files, modules, and error handling follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Consolidation: Files, Modules, and Error Handling Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Consolidation: Files, Modules, and Error Handling Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Consolidation: Files, Modules, and Error Handling\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Consolidation: Files, Modules, and Error Handling")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Consolidation: Files, Modules, and Error Handling in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Consolidation: Files, Modules, and Error Handling\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Consolidation: Files, Modules, and Error Handling on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Consolidation: Files, Modules, and Error Handling changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Consolidation: Files, Modules, and Error Handling. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,GP=`# Day 65: Capstone: NumPy & Pandas End-to-End\r
\r
## 01. Concept Header\r
**Capstone: NumPy & Pandas End-to-End**\r
Complete CSV data analytics pipeline integrating all course concepts.\r
Difficulty: Advanced | Estimated Time: 20 min | Unit: Unit 06\r
\r
## 02. Learning Objective\r
By the end of this lesson, you can:\r
✓ Understand the core concepts of capstone: numpy & pandas end-to-end\r
✓ Apply syntax correctly to solve problems\r
✓ Trace internal state and identify common mistakes\r
\r
## 03. Story Hook\r
**The Final Graduation Data Project**\r
Imagine you need to automate a repetitive task or manage complex data efficiently. The Final Graduation Data Project represents how this programming concept solves real-world challenges elegantly.\r
\r
## 04. Problem / Motivation\r
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.\r
\r
## 05. Simple Explanation\r
In simple terms, capstone: numpy & pandas end-to-end allows us to instruct the computer to handle data, make decisions, or process information predictably.\r
\r
## 06. Formal Explanation\r
In Python, capstone: numpy & pandas end-to-end follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.\r
\r
## 07. Mental Model\r
Think of it as:\r
\`Input -> Capstone: NumPy & Pandas End-to-End Process -> Output/State Change\`\r
\r
## 08. Visual Model\r
\`\`\`text\r
[ Capstone: NumPy & Pandas End-to-End Visualization ]\r
State A --------> State B\r
\`\`\`\r
\r
## 09. Syntax\r
\`\`\`python\r
# General syntax for Capstone: NumPy & Pandas End-to-End\r
# Feature implementation\r
\`\`\`\r
\r
## 10. Rules\r
✓ Rule 1: Adhere to strict indentation if it involves blocks.\r
✓ Rule 2: Observe type constraints.\r
✗ Warning: Do not violate Python's execution order or scope bounds.\r
\r
## 11. Smallest Example\r
\`\`\`python\r
# Smallest working example\r
print("Learning Capstone: NumPy & Pandas End-to-End")\r
\`\`\`\r
\r
## 12. Step-by-Step Code Explanation\r
1. **Initialize:** The environment prepares variables.\r
2. **Execute:** The statement runs.\r
3. **Yield:** A result is generated or state is modified.\r
\r
## 13. Execution Trace\r
| Line | Instruction | State |\r
|---|---|---|\r
| 1 | \`Initialize\` | \`State 0\` |\r
| 2 | \`Process\` | \`State 1\` |\r
\r
## 14. Internal State\r
**BEFORE:** State is untouched.\r
**AFTER:** State has been mutated or new objects created.\r
\r
## 15. Interactive Simulation\r
(Explore the visual simulation tool to observe Capstone: NumPy & Pandas End-to-End in action.)\r
\r
## 16. Guided Example\r
\`\`\`python\r
def guided_example():\r
    # Demonstrating Capstone: NumPy & Pandas End-to-End\r
    pass\r
\`\`\`\r
\r
## 17. Real-World Example\r
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.\r
\r
## 18. Compare / Contrast\r
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.\r
\r
## 19. Common Mistakes\r
- Syntax errors (missing colons, brackets)\r
- Name errors (typos in variables)\r
- Type errors (mismatched operations)\r
\r
## 20. Debugging Example\r
\`\`\`python\r
# Broken code\r
# print(wrong_variable)\r
# Fix: Ensure variable exists before use.\r
\`\`\`\r
\r
## 21. Guided Practice\r
Try writing a small snippet that uses Capstone: NumPy & Pandas End-to-End on your own. Use the code playground.\r
\r
## 22. Independent Practice\r
Complete the practice tasks provided in the interactive sandbox.\r
\r
## 23. Challenge\r
Can you combine this concept with what you learned in previous days to build a more complex function?\r
\r
## 24. Quick Test\r
Test your knowledge with the multiple choice quiz below.\r
\r
## 25. Reflection\r
Consider how Capstone: NumPy & Pandas End-to-End changes the way you approach problem-solving in Python.\r
\r
## 26. Summary\r
You have mastered Capstone: NumPy & Pandas End-to-End. You now know its syntax, rules, and how to debug it.\r
\r
## 27. What Comes Next\r
In the next day, we will build upon this foundation with more advanced operations.\r
`,HP=`# The Story of Python Interpreter & Interactive Mode\r
\r
**The Kitchen Recipe and the Master Chef Translator**\r
\r
When learning about python interpreter & interactive mode, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,YP=`# The Story of Values and Types (int, float, boolean)\r
\r
**The Color-Coded Storage Boxes**\r
\r
When learning about values and types (int, float, boolean), it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,JP=`# The Story of String and List Types\r
\r
**The Alphabet Necklace and the Shopping Checklist**\r
\r
When learning about string and list types, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,QP=`# The Story of Variables and Comments\r
\r
**The Postal Mailbox & Sticky Name Tags**\r
\r
When learning about variables and comments, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,KP=`# The Story of Expressions and Statements\r
\r
**The Calculator Formula vs The Action Command**\r
\r
When learning about expressions and statements, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,XP=`# The Story of Precedence of Operators\r
\r
**The Math Traffic Rules and Priority Pass**\r
\r
When learning about precedence of operators, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,ZP=`# The Story of Tuple Assignment & Value Swapping\r
\r
**The Simultaneous Juggling Trick**\r
\r
When learning about tuple assignment & value swapping, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,e2=`# The Story of Modules and Built-in Functions\r
\r
**The Magical Reusable Toolkit**\r
\r
When learning about modules and built-in functions, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,t2=`# The Story of Function Definition and Use\r
\r
**The Custom Recipe Book**\r
\r
When learning about function definition and use, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,n2=`# The Story of Flow of Execution\r
\r
**The Stack of Cafeteria Trays**\r
\r
When learning about flow of execution, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,o2=`# The Story of Parameters and Arguments\r
\r
**The Coffee Vending Machine Selector**\r
\r
When learning about parameters and arguments, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,r2=`# The Story of Unit I Illustrative Programs\r
\r
**The Coordinate Map and The Circle Dance**\r
\r
When learning about unit i illustrative programs, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,i2=`# The Story of Boolean Values and Operators\r
\r
**The Security Checkpoint & Dual Key Lock**\r
\r
When learning about boolean values and operators, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,s2=`# The Story of Conditional Execution (if)\r
\r
**The Single Railway Track Switch**\r
\r
When learning about conditional execution (if), it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,a2=`# The Story of Alternative (if-else) & Chained (if-elif-else)\r
\r
**The Fork in the Road and The Decision Ladder**\r
\r
When learning about alternative (if-else) & chained (if-elif-else), it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,l2=`# The Story of Iteration State & The while Loop\r
\r
**The Factory Assembly Line Conveyor**\r
\r
When learning about iteration state & the while loop, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,c2=`# The Story of The for Loop & range()\r
\r
**The Roll Call Attendance Sheet**\r
\r
When learning about the for loop & range(), it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,d2=`# The Story of Loop Control: break, continue, pass\r
\r
**The Emergency Stop Switch & Fast-Forward Button**\r
\r
When learning about loop control: break, continue, pass, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,u2=`# The Story of Fruitful Functions & Return Values\r
\r
**The Automated Calculation Factory**\r
\r
When learning about fruitful functions & return values, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,p2=`# The Story of Scope (Local/Global) & Function Composition\r
\r
**The Neighborhood Whispering Rules**\r
\r
When learning about scope (local/global) & function composition, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,m2=`# The Story of Recursion\r
\r
**The Russian Nesting Dolls**\r
\r
When learning about recursion, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,y2=`# The Story of Strings: Immutability & Slices\r
\r
**The Word Scissors**\r
\r
When learning about strings: immutability & slices, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,g2=`# The Story of String Methods, Module & Lists as Arrays\r
\r
**The Text Formatter & Data Shelves**\r
\r
When learning about string methods, module & lists as arrays, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,h2=`# The Story of Unit II Illustrative Programs\r
\r
**The Mathematical Detective & Number Sorter**\r
\r
When learning about unit ii illustrative programs, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,b2=`# The Story of Lists: Operations and Slices\r
\r
**The Expandable Train Carriages**\r
\r
When learning about lists: operations and slices, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,f2=`# The Story of List Methods and List Loop\r
\r
**The Dynamic Toolbox**\r
\r
When learning about list methods and list loop, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,_2=`# The Story of Mutability, Aliasing, and Cloning\r
\r
**Two Keys to the Same Locker vs The Photocopy**\r
\r
When learning about mutability, aliasing, and cloning, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,x2=`# The Story of List Parameters & Advanced Comprehensions\r
\r
**The One-Line Fruit Sorter Factory**\r
\r
When learning about list parameters & advanced comprehensions, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,v2=`# The Story of Tuples: Assignment & Return Values\r
\r
**The Sealed Glass Display Case**\r
\r
When learning about tuples: assignment & return values, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,w2=`# The Story of Dictionaries: Operations & Methods\r
\r
**The Magic Postal Lockers with Custom Nameplates**\r
\r
When learning about dictionaries: operations & methods, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,S2=`# The Story of Finding Maximum of a List\r
\r
**The King of the Hill**\r
\r
When learning about finding maximum of a list, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,C2=`# The Story of Linear Search\r
\r
**Finding a Book on a Messy Shelf**\r
\r
When learning about linear search, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,T2=`# The Story of Binary Search\r
\r
**Finding a Word in a Dictionary**\r
\r
When learning about binary search, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,P2=`# The Story of Selection Sort\r
\r
**Organizing Playing Cards by Rank**\r
\r
When learning about selection sort, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,I2=`# The Story of Insertion Sort\r
\r
**The Card Dealer's Technique**\r
\r
When learning about insertion sort, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,$2=`# The Story of Merge Sort & Histograms\r
\r
**The Assembly Line Sorter & Frequency Counter**\r
\r
When learning about merge sort & histograms, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,k2=`# The Story of Text Files: Reading and Writing\r
\r
**The Long-Term Diary and Filing Cabinet**\r
\r
When learning about text files: reading and writing, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,E2=`# The Story of The Format Operator\r
\r
**The Professional Certificate Formatter**\r
\r
When learning about the format operator, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,j2=`# The Story of Command Line Arguments\r
\r
**The Mail Delivery Address Label**\r
\r
When learning about command line arguments, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,O2=`# The Story of Errors and Exceptions\r
\r
**The Grammar Mistake vs The Pothole**\r
\r
When learning about errors and exceptions, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,M2=`# The Story of Handling Exceptions (try-except)\r
\r
**The Trapeze Safety Net**\r
\r
When learning about handling exceptions (try-except), it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,z2=`# The Story of Modules and Packages\r
\r
**The Labeled Department Store Shelves**\r
\r
When learning about modules and packages, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,A2=`# The Story of Classes and Objects Intro\r
\r
**The Architectural Blueprint and Finished Houses**\r
\r
When learning about classes and objects intro, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,F2=`# The Story of Object Attributes and Methods\r
\r
**The Robot Factory**\r
\r
When learning about object attributes and methods, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,D2=`# The Story of Unit IV Practical: Word Count (CLI)\r
\r
**The Automated Document Scanner**\r
\r
When learning about unit iv practical: word count (cli), it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,q2=`# The Story of Unit IV Practical: Copy File\r
\r
**The Photocopy Machine**\r
\r
When learning about unit iv practical: copy file, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,W2=`# The Story of Consolidation: File Parsing & Objects\r
\r
**The Data Importer**\r
\r
When learning about consolidation: file parsing & objects, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,R2=`# The Story of Consolidation: Exception-Safe Pipelines\r
\r
**The Industrial Safety Protocols**\r
\r
When learning about consolidation: exception-safe pipelines, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,L2=`# The Story of NumPy: Creating a NumPy Array\r
\r
**The Supercharged Number Conveyor**\r
\r
When learning about numpy: creating a numpy array, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,N2=`# The Story of The Shape and Reshaping of NumPy Array\r
\r
**Rearranging Chocolate Pieces in a Box**\r
\r
When learning about the shape and reshaping of numpy array, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,U2=`# The Story of Indexing and Slicing of NumPy Array\r
\r
**The Coordinate Target Selector**\r
\r
When learning about indexing and slicing of numpy array, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,B2=`# The Story of Maths & Basic Arithmetic with NumPy Arrays\r
\r
**Applying Operations to Whole Rows**\r
\r
When learning about maths & basic arithmetic with numpy arrays, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,V2=`# The Story of Matrix Operations (Multiply, Inverse) & Verification\r
\r
**The Linear Algebra Engine**\r
\r
When learning about matrix operations (multiply, inverse) & verification, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,G2=`# The Story of Pandas Series & DataFrames\r
\r
**The Intelligent Multi-Column Spreadsheet**\r
\r
When learning about pandas series & dataframes, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,H2=`# The Story of Selection and Indexing in Pandas\r
\r
**The Targeted Database Query Filter**\r
\r
When learning about selection and indexing in pandas, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,Y2=`# The Story of Handling Missing Data\r
\r
**The Data Cleaning & Tidy Sorter**\r
\r
When learning about handling missing data, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,J2=`# The Story of Merging, Joining, Concatenating\r
\r
**The Department Store Sales Aggregator**\r
\r
When learning about merging, joining, concatenating, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,Q2=`# The Story of Groupby and Apply Functions\r
\r
**The Analytical Report Generator**\r
\r
When learning about groupby and apply functions, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,K2=`# The Story of Sorting in DataFrames\r
\r
**The Leaderboard Sorter**\r
\r
When learning about sorting in dataframes, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,X2=`# The Story of File Read and Write Support (CSV Processing)\r
\r
**The Automated Data Scientist Pipeline**\r
\r
When learning about file read and write support (csv processing), it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,Z2=`# The Story of Consolidation: Control Flow & Logic\r
\r
**The Logic Puzzle Room**\r
\r
When learning about consolidation: control flow & logic, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,eI=`# The Story of Consolidation: Advanced Data Structures\r
\r
**The Data Structure Gauntlet**\r
\r
When learning about consolidation: advanced data structures, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,tI=`# The Story of Consolidation: Search & Sort Algorithms\r
\r
**The Algorithm Olympics**\r
\r
When learning about consolidation: search & sort algorithms, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,nI=`# The Story of Consolidation: Files, Modules, and Error Handling\r
\r
**The File Processing Factory**\r
\r
When learning about consolidation: files, modules, and error handling, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,oI=`# The Story of Capstone: NumPy & Pandas End-to-End\r
\r
**The Final Graduation Data Project**\r
\r
When learning about capstone: numpy & pandas end-to-end, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.\r
\r
This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.\r
`,rI=[{id:"ex-day-1-1",title:"Basic Usage of Python Interpreter & Interactive Mode",code:`# Example for Python Interpreter & Interactive Mode
print('Day 1 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],iI=Object.freeze(Object.defineProperty({__proto__:null,default:rI},Symbol.toStringTag,{value:"Module"})),sI=[{id:"ex-day-2-1",title:"Basic Usage of Values and Types (int, float, boolean)",code:`# Example for Values and Types (int, float, boolean)
print('Day 2 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],aI=Object.freeze(Object.defineProperty({__proto__:null,default:sI},Symbol.toStringTag,{value:"Module"})),lI=[{id:"ex-day-3-1",title:"Basic Usage of String and List Types",code:`# Example for String and List Types
print('Day 3 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],cI=Object.freeze(Object.defineProperty({__proto__:null,default:lI},Symbol.toStringTag,{value:"Module"})),dI=[{id:"ex-day-4-1",title:"Basic Usage of Variables and Comments",code:`# Example for Variables and Comments
print('Day 4 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],uI=Object.freeze(Object.defineProperty({__proto__:null,default:dI},Symbol.toStringTag,{value:"Module"})),pI=[{id:"ex-day-5-1",title:"Basic Usage of Expressions and Statements",code:`# Example for Expressions and Statements
print('Day 5 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],mI=Object.freeze(Object.defineProperty({__proto__:null,default:pI},Symbol.toStringTag,{value:"Module"})),yI=[{id:"ex-day-6-1",title:"Basic Usage of Precedence of Operators",code:`# Example for Precedence of Operators
print('Day 6 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],gI=Object.freeze(Object.defineProperty({__proto__:null,default:yI},Symbol.toStringTag,{value:"Module"})),hI=[{id:"ex-day-7-1",title:"Basic Usage of Tuple Assignment & Value Swapping",code:`# Example for Tuple Assignment & Value Swapping
print('Day 7 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],bI=Object.freeze(Object.defineProperty({__proto__:null,default:hI},Symbol.toStringTag,{value:"Module"})),fI=[{id:"ex-day-8-1",title:"Basic Usage of Modules and Built-in Functions",code:`# Example for Modules and Built-in Functions
print('Day 8 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],_I=Object.freeze(Object.defineProperty({__proto__:null,default:fI},Symbol.toStringTag,{value:"Module"})),xI=[{id:"ex-day-9-1",title:"Basic Usage of Function Definition and Use",code:`# Example for Function Definition and Use
print('Day 9 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],vI=Object.freeze(Object.defineProperty({__proto__:null,default:xI},Symbol.toStringTag,{value:"Module"})),wI=[{id:"ex-day-10-1",title:"Basic Usage of Flow of Execution",code:`# Example for Flow of Execution
print('Day 10 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],SI=Object.freeze(Object.defineProperty({__proto__:null,default:wI},Symbol.toStringTag,{value:"Module"})),CI=[{id:"ex-day-11-1",title:"Basic Usage of Parameters and Arguments",code:`# Example for Parameters and Arguments
print('Day 11 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],TI=Object.freeze(Object.defineProperty({__proto__:null,default:CI},Symbol.toStringTag,{value:"Module"})),PI=[{id:"ex-day-12-1",title:"Basic Usage of Unit I Illustrative Programs",code:`# Example for Unit I Illustrative Programs
print('Day 12 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],II=Object.freeze(Object.defineProperty({__proto__:null,default:PI},Symbol.toStringTag,{value:"Module"})),$I=[{id:"ex-day-13-1",title:"Basic Usage of Boolean Values and Operators",code:`# Example for Boolean Values and Operators
print('Day 13 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],kI=Object.freeze(Object.defineProperty({__proto__:null,default:$I},Symbol.toStringTag,{value:"Module"})),EI=[{id:"ex-day-14-1",title:"Basic Usage of Conditional Execution (if)",code:`# Example for Conditional Execution (if)
print('Day 14 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],jI=Object.freeze(Object.defineProperty({__proto__:null,default:EI},Symbol.toStringTag,{value:"Module"})),OI=[{id:"ex-day-15-1",title:"Basic Usage of Alternative (if-else) & Chained (if-elif-else)",code:`# Example for Alternative (if-else) & Chained (if-elif-else)
print('Day 15 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],MI=Object.freeze(Object.defineProperty({__proto__:null,default:OI},Symbol.toStringTag,{value:"Module"})),zI=[{id:"ex-day-16-1",title:"Basic Usage of Iteration State & The while Loop",code:`# Example for Iteration State & The while Loop
print('Day 16 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],AI=Object.freeze(Object.defineProperty({__proto__:null,default:zI},Symbol.toStringTag,{value:"Module"})),FI=[{id:"ex-day-17-1",title:"Basic Usage of The for Loop & range()",code:`# Example for The for Loop & range()
print('Day 17 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],DI=Object.freeze(Object.defineProperty({__proto__:null,default:FI},Symbol.toStringTag,{value:"Module"})),qI=[{id:"ex-day-18-1",title:"Basic Usage of Loop Control: break, continue, pass",code:`# Example for Loop Control: break, continue, pass
print('Day 18 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],WI=Object.freeze(Object.defineProperty({__proto__:null,default:qI},Symbol.toStringTag,{value:"Module"})),RI=[{id:"ex-day-19-1",title:"Basic Usage of Fruitful Functions & Return Values",code:`# Example for Fruitful Functions & Return Values
print('Day 19 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],LI=Object.freeze(Object.defineProperty({__proto__:null,default:RI},Symbol.toStringTag,{value:"Module"})),NI=[{id:"ex-day-20-1",title:"Basic Usage of Scope (Local/Global) & Function Composition",code:`# Example for Scope (Local/Global) & Function Composition
print('Day 20 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],UI=Object.freeze(Object.defineProperty({__proto__:null,default:NI},Symbol.toStringTag,{value:"Module"})),BI=[{id:"ex-day-21-1",title:"Basic Usage of Recursion",code:`# Example for Recursion
print('Day 21 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],VI=Object.freeze(Object.defineProperty({__proto__:null,default:BI},Symbol.toStringTag,{value:"Module"})),GI=[{id:"ex-day-22-1",title:"Basic Usage of Strings: Immutability & Slices",code:`# Example for Strings: Immutability & Slices
print('Day 22 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],HI=Object.freeze(Object.defineProperty({__proto__:null,default:GI},Symbol.toStringTag,{value:"Module"})),YI=[{id:"ex-day-23-1",title:"Basic Usage of String Methods, Module & Lists as Arrays",code:`# Example for String Methods, Module & Lists as Arrays
print('Day 23 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],JI=Object.freeze(Object.defineProperty({__proto__:null,default:YI},Symbol.toStringTag,{value:"Module"})),QI=[{id:"ex-day-24-1",title:"Basic Usage of Unit II Illustrative Programs",code:`# Example for Unit II Illustrative Programs
print('Day 24 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],KI=Object.freeze(Object.defineProperty({__proto__:null,default:QI},Symbol.toStringTag,{value:"Module"})),XI=[{id:"ex-day-25-1",title:"Basic Usage of Lists: Operations and Slices",code:`# Example for Lists: Operations and Slices
print('Day 25 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],ZI=Object.freeze(Object.defineProperty({__proto__:null,default:XI},Symbol.toStringTag,{value:"Module"})),e$=[{id:"ex-day-26-1",title:"Basic Usage of List Methods and List Loop",code:`# Example for List Methods and List Loop
print('Day 26 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],t$=Object.freeze(Object.defineProperty({__proto__:null,default:e$},Symbol.toStringTag,{value:"Module"})),n$=[{id:"ex-day-27-1",title:"Basic Usage of Mutability, Aliasing, and Cloning",code:`# Example for Mutability, Aliasing, and Cloning
print('Day 27 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],o$=Object.freeze(Object.defineProperty({__proto__:null,default:n$},Symbol.toStringTag,{value:"Module"})),r$=[{id:"ex-day-28-1",title:"Basic Usage of List Parameters & Advanced Comprehensions",code:`# Example for List Parameters & Advanced Comprehensions
print('Day 28 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],i$=Object.freeze(Object.defineProperty({__proto__:null,default:r$},Symbol.toStringTag,{value:"Module"})),s$=[{id:"ex-day-29-1",title:"Basic Usage of Tuples: Assignment & Return Values",code:`# Example for Tuples: Assignment & Return Values
print('Day 29 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],a$=Object.freeze(Object.defineProperty({__proto__:null,default:s$},Symbol.toStringTag,{value:"Module"})),l$=[{id:"ex-day-30-1",title:"Basic Usage of Dictionaries: Operations & Methods",code:`# Example for Dictionaries: Operations & Methods
print('Day 30 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],c$=Object.freeze(Object.defineProperty({__proto__:null,default:l$},Symbol.toStringTag,{value:"Module"})),d$=[{id:"ex-day-31-1",title:"Basic Usage of Finding Maximum of a List",code:`# Example for Finding Maximum of a List
print('Day 31 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],u$=Object.freeze(Object.defineProperty({__proto__:null,default:d$},Symbol.toStringTag,{value:"Module"})),p$=[{id:"ex-day-32-1",title:"Basic Usage of Linear Search",code:`# Example for Linear Search
print('Day 32 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],m$=Object.freeze(Object.defineProperty({__proto__:null,default:p$},Symbol.toStringTag,{value:"Module"})),y$=[{id:"ex-day-33-1",title:"Basic Usage of Binary Search",code:`# Example for Binary Search
print('Day 33 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],g$=Object.freeze(Object.defineProperty({__proto__:null,default:y$},Symbol.toStringTag,{value:"Module"})),h$=[{id:"ex-day-34-1",title:"Basic Usage of Selection Sort",code:`# Example for Selection Sort
print('Day 34 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],b$=Object.freeze(Object.defineProperty({__proto__:null,default:h$},Symbol.toStringTag,{value:"Module"})),f$=[{id:"ex-day-35-1",title:"Basic Usage of Insertion Sort",code:`# Example for Insertion Sort
print('Day 35 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],_$=Object.freeze(Object.defineProperty({__proto__:null,default:f$},Symbol.toStringTag,{value:"Module"})),x$=[{id:"ex-day-36-1",title:"Basic Usage of Merge Sort & Histograms",code:`# Example for Merge Sort & Histograms
print('Day 36 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],v$=Object.freeze(Object.defineProperty({__proto__:null,default:x$},Symbol.toStringTag,{value:"Module"})),w$=[{id:"ex-day-37-1",title:"Basic Usage of Text Files: Reading and Writing",code:`# Example for Text Files: Reading and Writing
print('Day 37 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],S$=Object.freeze(Object.defineProperty({__proto__:null,default:w$},Symbol.toStringTag,{value:"Module"})),C$=[{id:"ex-day-38-1",title:"Basic Usage of The Format Operator",code:`# Example for The Format Operator
print('Day 38 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],T$=Object.freeze(Object.defineProperty({__proto__:null,default:C$},Symbol.toStringTag,{value:"Module"})),P$=[{id:"ex-day-39-1",title:"Basic Usage of Command Line Arguments",code:`# Example for Command Line Arguments
print('Day 39 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],I$=Object.freeze(Object.defineProperty({__proto__:null,default:P$},Symbol.toStringTag,{value:"Module"})),$$=[{id:"ex-day-40-1",title:"Basic Usage of Errors and Exceptions",code:`# Example for Errors and Exceptions
print('Day 40 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],k$=Object.freeze(Object.defineProperty({__proto__:null,default:$$},Symbol.toStringTag,{value:"Module"})),E$=[{id:"ex-day-41-1",title:"Basic Usage of Handling Exceptions (try-except)",code:`# Example for Handling Exceptions (try-except)
print('Day 41 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],j$=Object.freeze(Object.defineProperty({__proto__:null,default:E$},Symbol.toStringTag,{value:"Module"})),O$=[{id:"ex-day-42-1",title:"Basic Usage of Modules and Packages",code:`# Example for Modules and Packages
print('Day 42 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],M$=Object.freeze(Object.defineProperty({__proto__:null,default:O$},Symbol.toStringTag,{value:"Module"})),z$=[{id:"ex-day-43-1",title:"Basic Usage of Classes and Objects Intro",code:`# Example for Classes and Objects Intro
print('Day 43 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],A$=Object.freeze(Object.defineProperty({__proto__:null,default:z$},Symbol.toStringTag,{value:"Module"})),F$=[{id:"ex-day-44-1",title:"Basic Usage of Object Attributes and Methods",code:`# Example for Object Attributes and Methods
print('Day 44 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],D$=Object.freeze(Object.defineProperty({__proto__:null,default:F$},Symbol.toStringTag,{value:"Module"})),q$=[{id:"ex-day-45-1",title:"Basic Usage of Unit IV Practical: Word Count (CLI)",code:`# Example for Unit IV Practical: Word Count (CLI)
print('Day 45 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],W$=Object.freeze(Object.defineProperty({__proto__:null,default:q$},Symbol.toStringTag,{value:"Module"})),R$=[{id:"ex-day-46-1",title:"Basic Usage of Unit IV Practical: Copy File",code:`# Example for Unit IV Practical: Copy File
print('Day 46 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],L$=Object.freeze(Object.defineProperty({__proto__:null,default:R$},Symbol.toStringTag,{value:"Module"})),N$=[{id:"ex-day-47-1",title:"Basic Usage of Consolidation: File Parsing & Objects",code:`# Example for Consolidation: File Parsing & Objects
print('Day 47 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],U$=Object.freeze(Object.defineProperty({__proto__:null,default:N$},Symbol.toStringTag,{value:"Module"})),B$=[{id:"ex-day-48-1",title:"Basic Usage of Consolidation: Exception-Safe Pipelines",code:`# Example for Consolidation: Exception-Safe Pipelines
print('Day 48 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],V$=Object.freeze(Object.defineProperty({__proto__:null,default:B$},Symbol.toStringTag,{value:"Module"})),G$=[{id:"ex-day-49-1",title:"Basic Usage of NumPy: Creating a NumPy Array",code:`# Example for NumPy: Creating a NumPy Array
print('Day 49 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],H$=Object.freeze(Object.defineProperty({__proto__:null,default:G$},Symbol.toStringTag,{value:"Module"})),Y$=[{id:"ex-day-50-1",title:"Basic Usage of The Shape and Reshaping of NumPy Array",code:`# Example for The Shape and Reshaping of NumPy Array
print('Day 50 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],J$=Object.freeze(Object.defineProperty({__proto__:null,default:Y$},Symbol.toStringTag,{value:"Module"})),Q$=[{id:"ex-day-51-1",title:"Basic Usage of Indexing and Slicing of NumPy Array",code:`# Example for Indexing and Slicing of NumPy Array
print('Day 51 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],K$=Object.freeze(Object.defineProperty({__proto__:null,default:Q$},Symbol.toStringTag,{value:"Module"})),X$=[{id:"ex-day-52-1",title:"Basic Usage of Maths & Basic Arithmetic with NumPy Arrays",code:`# Example for Maths & Basic Arithmetic with NumPy Arrays
print('Day 52 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],Z$=Object.freeze(Object.defineProperty({__proto__:null,default:X$},Symbol.toStringTag,{value:"Module"})),ek=[{id:"ex-day-53-1",title:"Basic Usage of Matrix Operations (Multiply, Inverse) & Verification",code:`# Example for Matrix Operations (Multiply, Inverse) & Verification
print('Day 53 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],tk=Object.freeze(Object.defineProperty({__proto__:null,default:ek},Symbol.toStringTag,{value:"Module"})),nk=[{id:"ex-day-54-1",title:"Basic Usage of Pandas Series & DataFrames",code:`# Example for Pandas Series & DataFrames
print('Day 54 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],ok=Object.freeze(Object.defineProperty({__proto__:null,default:nk},Symbol.toStringTag,{value:"Module"})),rk=[{id:"ex-day-55-1",title:"Basic Usage of Selection and Indexing in Pandas",code:`# Example for Selection and Indexing in Pandas
print('Day 55 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],ik=Object.freeze(Object.defineProperty({__proto__:null,default:rk},Symbol.toStringTag,{value:"Module"})),sk=[{id:"ex-day-56-1",title:"Basic Usage of Handling Missing Data",code:`# Example for Handling Missing Data
print('Day 56 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],ak=Object.freeze(Object.defineProperty({__proto__:null,default:sk},Symbol.toStringTag,{value:"Module"})),lk=[{id:"ex-day-57-1",title:"Basic Usage of Merging, Joining, Concatenating",code:`# Example for Merging, Joining, Concatenating
print('Day 57 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],ck=Object.freeze(Object.defineProperty({__proto__:null,default:lk},Symbol.toStringTag,{value:"Module"})),dk=[{id:"ex-day-58-1",title:"Basic Usage of Groupby and Apply Functions",code:`# Example for Groupby and Apply Functions
print('Day 58 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],uk=Object.freeze(Object.defineProperty({__proto__:null,default:dk},Symbol.toStringTag,{value:"Module"})),pk=[{id:"ex-day-59-1",title:"Basic Usage of Sorting in DataFrames",code:`# Example for Sorting in DataFrames
print('Day 59 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],mk=Object.freeze(Object.defineProperty({__proto__:null,default:pk},Symbol.toStringTag,{value:"Module"})),yk=[{id:"ex-day-60-1",title:"Basic Usage of File Read and Write Support (CSV Processing)",code:`# Example for File Read and Write Support (CSV Processing)
print('Day 60 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],gk=Object.freeze(Object.defineProperty({__proto__:null,default:yk},Symbol.toStringTag,{value:"Module"})),hk=[{id:"ex-day-61-1",title:"Basic Usage of Consolidation: Control Flow & Logic",code:`# Example for Consolidation: Control Flow & Logic
print('Day 61 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],bk=Object.freeze(Object.defineProperty({__proto__:null,default:hk},Symbol.toStringTag,{value:"Module"})),fk=[{id:"ex-day-62-1",title:"Basic Usage of Consolidation: Advanced Data Structures",code:`# Example for Consolidation: Advanced Data Structures
print('Day 62 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],_k=Object.freeze(Object.defineProperty({__proto__:null,default:fk},Symbol.toStringTag,{value:"Module"})),xk=[{id:"ex-day-63-1",title:"Basic Usage of Consolidation: Search & Sort Algorithms",code:`# Example for Consolidation: Search & Sort Algorithms
print('Day 63 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],vk=Object.freeze(Object.defineProperty({__proto__:null,default:xk},Symbol.toStringTag,{value:"Module"})),wk=[{id:"ex-day-64-1",title:"Basic Usage of Consolidation: Files, Modules, and Error Handling",code:`# Example for Consolidation: Files, Modules, and Error Handling
print('Day 64 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],Sk=Object.freeze(Object.defineProperty({__proto__:null,default:wk},Symbol.toStringTag,{value:"Module"})),Ck=[{id:"ex-day-65-1",title:"Basic Usage of Capstone: NumPy & Pandas End-to-End",code:`# Example for Capstone: NumPy & Pandas End-to-End
print('Day 65 executed successfully.')`,explanation:"This demonstrates the minimum syntax needed."}],Tk=Object.freeze(Object.defineProperty({__proto__:null,default:Ck},Symbol.toStringTag,{value:"Module"})),g_="sim-day-1",h_="Type B",b_="Simulation: Python Interpreter & Interactive Mode",f_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Pk={id:g_,type:h_,title:b_,steps:f_},Ik=Object.freeze(Object.defineProperty({__proto__:null,default:Pk,id:g_,steps:f_,title:b_,type:h_},Symbol.toStringTag,{value:"Module"})),__="sim-day-2",x_="Type A",v_="Simulation: Values and Types (int, float, boolean)",w_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],$k={id:__,type:x_,title:v_,steps:w_},kk=Object.freeze(Object.defineProperty({__proto__:null,default:$k,id:__,steps:w_,title:v_,type:x_},Symbol.toStringTag,{value:"Module"})),S_="sim-day-3",C_="Type E",T_="Simulation: String and List Types",P_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Ek={id:S_,type:C_,title:T_,steps:P_},jk=Object.freeze(Object.defineProperty({__proto__:null,default:Ek,id:S_,steps:P_,title:T_,type:C_},Symbol.toStringTag,{value:"Module"})),I_="sim-day-4",$_="Type A",k_="Simulation: Variables and Comments",E_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Ok={id:I_,type:$_,title:k_,steps:E_},Mk=Object.freeze(Object.defineProperty({__proto__:null,default:Ok,id:I_,steps:E_,title:k_,type:$_},Symbol.toStringTag,{value:"Module"})),j_="sim-day-5",O_="Type A",M_="Simulation: Expressions and Statements",z_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],zk={id:j_,type:O_,title:M_,steps:z_},Ak=Object.freeze(Object.defineProperty({__proto__:null,default:zk,id:j_,steps:z_,title:M_,type:O_},Symbol.toStringTag,{value:"Module"})),A_="sim-day-6",F_="Type B",D_="Simulation: Precedence of Operators",q_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Fk={id:A_,type:F_,title:D_,steps:q_},Dk=Object.freeze(Object.defineProperty({__proto__:null,default:Fk,id:A_,steps:q_,title:D_,type:F_},Symbol.toStringTag,{value:"Module"})),W_="sim-day-7",R_="Type A",L_="Simulation: Tuple Assignment & Value Swapping",N_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],qk={id:W_,type:R_,title:L_,steps:N_},Wk=Object.freeze(Object.defineProperty({__proto__:null,default:qk,id:W_,steps:N_,title:L_,type:R_},Symbol.toStringTag,{value:"Module"})),U_="sim-day-8",B_="Type D",V_="Simulation: Modules and Built-in Functions",G_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Rk={id:U_,type:B_,title:V_,steps:G_},Lk=Object.freeze(Object.defineProperty({__proto__:null,default:Rk,id:U_,steps:G_,title:V_,type:B_},Symbol.toStringTag,{value:"Module"})),H_="sim-day-9",Y_="Type D",J_="Simulation: Function Definition and Use",Q_=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Nk={id:H_,type:Y_,title:J_,steps:Q_},Uk=Object.freeze(Object.defineProperty({__proto__:null,default:Nk,id:H_,steps:Q_,title:J_,type:Y_},Symbol.toStringTag,{value:"Module"})),K_="sim-day-10",X_="Type D",Z_="Simulation: Flow of Execution",ex=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Bk={id:K_,type:X_,title:Z_,steps:ex},Vk=Object.freeze(Object.defineProperty({__proto__:null,default:Bk,id:K_,steps:ex,title:Z_,type:X_},Symbol.toStringTag,{value:"Module"})),tx="sim-day-11",nx="Type D",ox="Simulation: Parameters and Arguments",rx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Gk={id:tx,type:nx,title:ox,steps:rx},Hk=Object.freeze(Object.defineProperty({__proto__:null,default:Gk,id:tx,steps:rx,title:ox,type:nx},Symbol.toStringTag,{value:"Module"})),ix="sim-day-12",sx="Type D",ax="Simulation: Unit I Illustrative Programs",lx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Yk={id:ix,type:sx,title:ax,steps:lx},Jk=Object.freeze(Object.defineProperty({__proto__:null,default:Yk,id:ix,steps:lx,title:ax,type:sx},Symbol.toStringTag,{value:"Module"})),cx="sim-day-13",dx="Type B",ux="Simulation: Boolean Values and Operators",px=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Qk={id:cx,type:dx,title:ux,steps:px},Kk=Object.freeze(Object.defineProperty({__proto__:null,default:Qk,id:cx,steps:px,title:ux,type:dx},Symbol.toStringTag,{value:"Module"})),mx="sim-day-14",yx="Type B",gx="Simulation: Conditional Execution (if)",hx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Xk={id:mx,type:yx,title:gx,steps:hx},Zk=Object.freeze(Object.defineProperty({__proto__:null,default:Xk,id:mx,steps:hx,title:gx,type:yx},Symbol.toStringTag,{value:"Module"})),bx="sim-day-15",fx="Type B",_x="Simulation: Alternative (if-else) & Chained (if-elif-else)",xx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],eE={id:bx,type:fx,title:_x,steps:xx},tE=Object.freeze(Object.defineProperty({__proto__:null,default:eE,id:bx,steps:xx,title:_x,type:fx},Symbol.toStringTag,{value:"Module"})),vx="sim-day-16",wx="Type C",Sx="Simulation: Iteration State & The while Loop",Cx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],nE={id:vx,type:wx,title:Sx,steps:Cx},oE=Object.freeze(Object.defineProperty({__proto__:null,default:nE,id:vx,steps:Cx,title:Sx,type:wx},Symbol.toStringTag,{value:"Module"})),Tx="sim-day-17",Px="Type C",Ix="Simulation: The for Loop & range()",$x=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],rE={id:Tx,type:Px,title:Ix,steps:$x},iE=Object.freeze(Object.defineProperty({__proto__:null,default:rE,id:Tx,steps:$x,title:Ix,type:Px},Symbol.toStringTag,{value:"Module"})),kx="sim-day-18",Ex="Type C",jx="Simulation: Loop Control: break, continue, pass",Ox=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],sE={id:kx,type:Ex,title:jx,steps:Ox},aE=Object.freeze(Object.defineProperty({__proto__:null,default:sE,id:kx,steps:Ox,title:jx,type:Ex},Symbol.toStringTag,{value:"Module"})),Mx="sim-day-19",zx="Type D",Ax="Simulation: Fruitful Functions & Return Values",Fx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],lE={id:Mx,type:zx,title:Ax,steps:Fx},cE=Object.freeze(Object.defineProperty({__proto__:null,default:lE,id:Mx,steps:Fx,title:Ax,type:zx},Symbol.toStringTag,{value:"Module"})),Dx="sim-day-20",qx="Type D",Wx="Simulation: Scope (Local/Global) & Function Composition",Rx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],dE={id:Dx,type:qx,title:Wx,steps:Rx},uE=Object.freeze(Object.defineProperty({__proto__:null,default:dE,id:Dx,steps:Rx,title:Wx,type:qx},Symbol.toStringTag,{value:"Module"})),Lx="sim-day-21",Nx="Type D",Ux="Simulation: Recursion",Bx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],pE={id:Lx,type:Nx,title:Ux,steps:Bx},mE=Object.freeze(Object.defineProperty({__proto__:null,default:pE,id:Lx,steps:Bx,title:Ux,type:Nx},Symbol.toStringTag,{value:"Module"})),Vx="sim-day-22",Gx="Type E",Hx="Simulation: Strings: Immutability & Slices",Yx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],yE={id:Vx,type:Gx,title:Hx,steps:Yx},gE=Object.freeze(Object.defineProperty({__proto__:null,default:yE,id:Vx,steps:Yx,title:Hx,type:Gx},Symbol.toStringTag,{value:"Module"})),Jx="sim-day-23",Qx="Type E",Kx="Simulation: String Methods, Module & Lists as Arrays",Xx=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],hE={id:Jx,type:Qx,title:Kx,steps:Xx},bE=Object.freeze(Object.defineProperty({__proto__:null,default:hE,id:Jx,steps:Xx,title:Kx,type:Qx},Symbol.toStringTag,{value:"Module"})),Zx="sim-day-24",ev="Type F",tv="Simulation: Unit II Illustrative Programs",nv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],fE={id:Zx,type:ev,title:tv,steps:nv},_E=Object.freeze(Object.defineProperty({__proto__:null,default:fE,id:Zx,steps:nv,title:tv,type:ev},Symbol.toStringTag,{value:"Module"})),ov="sim-day-25",rv="Type E",iv="Simulation: Lists: Operations and Slices",sv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],xE={id:ov,type:rv,title:iv,steps:sv},vE=Object.freeze(Object.defineProperty({__proto__:null,default:xE,id:ov,steps:sv,title:iv,type:rv},Symbol.toStringTag,{value:"Module"})),av="sim-day-26",lv="Type E",cv="Simulation: List Methods and List Loop",dv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],wE={id:av,type:lv,title:cv,steps:dv},SE=Object.freeze(Object.defineProperty({__proto__:null,default:wE,id:av,steps:dv,title:cv,type:lv},Symbol.toStringTag,{value:"Module"})),uv="sim-day-27",pv="Type E",mv="Simulation: Mutability, Aliasing, and Cloning",yv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],CE={id:uv,type:pv,title:mv,steps:yv},TE=Object.freeze(Object.defineProperty({__proto__:null,default:CE,id:uv,steps:yv,title:mv,type:pv},Symbol.toStringTag,{value:"Module"})),gv="sim-day-28",hv="Type E",bv="Simulation: List Parameters & Advanced Comprehensions",fv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],PE={id:gv,type:hv,title:bv,steps:fv},IE=Object.freeze(Object.defineProperty({__proto__:null,default:PE,id:gv,steps:fv,title:bv,type:hv},Symbol.toStringTag,{value:"Module"})),_v="sim-day-29",xv="Type E",vv="Simulation: Tuples: Assignment & Return Values",wv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],$E={id:_v,type:xv,title:vv,steps:wv},kE=Object.freeze(Object.defineProperty({__proto__:null,default:$E,id:_v,steps:wv,title:vv,type:xv},Symbol.toStringTag,{value:"Module"})),Sv="sim-day-30",Cv="Type E",Tv="Simulation: Dictionaries: Operations & Methods",Pv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],EE={id:Sv,type:Cv,title:Tv,steps:Pv},jE=Object.freeze(Object.defineProperty({__proto__:null,default:EE,id:Sv,steps:Pv,title:Tv,type:Cv},Symbol.toStringTag,{value:"Module"})),Iv="sim-day-31",$v="Type F",kv="Simulation: Finding Maximum of a List",Ev=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],OE={id:Iv,type:$v,title:kv,steps:Ev},ME=Object.freeze(Object.defineProperty({__proto__:null,default:OE,id:Iv,steps:Ev,title:kv,type:$v},Symbol.toStringTag,{value:"Module"})),jv="sim-day-32",Ov="Type F",Mv="Simulation: Linear Search",zv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],zE={id:jv,type:Ov,title:Mv,steps:zv},AE=Object.freeze(Object.defineProperty({__proto__:null,default:zE,id:jv,steps:zv,title:Mv,type:Ov},Symbol.toStringTag,{value:"Module"})),Av="sim-day-33",Fv="Type F",Dv="Simulation: Binary Search",qv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],FE={id:Av,type:Fv,title:Dv,steps:qv},DE=Object.freeze(Object.defineProperty({__proto__:null,default:FE,id:Av,steps:qv,title:Dv,type:Fv},Symbol.toStringTag,{value:"Module"})),Wv="sim-day-34",Rv="Type F",Lv="Simulation: Selection Sort",Nv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],qE={id:Wv,type:Rv,title:Lv,steps:Nv},WE=Object.freeze(Object.defineProperty({__proto__:null,default:qE,id:Wv,steps:Nv,title:Lv,type:Rv},Symbol.toStringTag,{value:"Module"})),Uv="sim-day-35",Bv="Type F",Vv="Simulation: Insertion Sort",Gv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],RE={id:Uv,type:Bv,title:Vv,steps:Gv},LE=Object.freeze(Object.defineProperty({__proto__:null,default:RE,id:Uv,steps:Gv,title:Vv,type:Bv},Symbol.toStringTag,{value:"Module"})),Hv="sim-day-36",Yv="Type F",Jv="Simulation: Merge Sort & Histograms",Qv=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],NE={id:Hv,type:Yv,title:Jv,steps:Qv},UE=Object.freeze(Object.defineProperty({__proto__:null,default:NE,id:Hv,steps:Qv,title:Jv,type:Yv},Symbol.toStringTag,{value:"Module"})),Kv="sim-day-37",Xv="Type G",Zv="Simulation: Text Files: Reading and Writing",ew=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],BE={id:Kv,type:Xv,title:Zv,steps:ew},VE=Object.freeze(Object.defineProperty({__proto__:null,default:BE,id:Kv,steps:ew,title:Zv,type:Xv},Symbol.toStringTag,{value:"Module"})),tw="sim-day-38",nw="Type G",ow="Simulation: The Format Operator",rw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],GE={id:tw,type:nw,title:ow,steps:rw},HE=Object.freeze(Object.defineProperty({__proto__:null,default:GE,id:tw,steps:rw,title:ow,type:nw},Symbol.toStringTag,{value:"Module"})),iw="sim-day-39",sw="Type G",aw="Simulation: Command Line Arguments",lw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],YE={id:iw,type:sw,title:aw,steps:lw},JE=Object.freeze(Object.defineProperty({__proto__:null,default:YE,id:iw,steps:lw,title:aw,type:sw},Symbol.toStringTag,{value:"Module"})),cw="sim-day-40",dw="Type G",uw="Simulation: Errors and Exceptions",pw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],QE={id:cw,type:dw,title:uw,steps:pw},KE=Object.freeze(Object.defineProperty({__proto__:null,default:QE,id:cw,steps:pw,title:uw,type:dw},Symbol.toStringTag,{value:"Module"})),mw="sim-day-41",yw="Type G",gw="Simulation: Handling Exceptions (try-except)",hw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],XE={id:mw,type:yw,title:gw,steps:hw},ZE=Object.freeze(Object.defineProperty({__proto__:null,default:XE,id:mw,steps:hw,title:gw,type:yw},Symbol.toStringTag,{value:"Module"})),bw="sim-day-42",fw="Type G",_w="Simulation: Modules and Packages",xw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],ej={id:bw,type:fw,title:_w,steps:xw},tj=Object.freeze(Object.defineProperty({__proto__:null,default:ej,id:bw,steps:xw,title:_w,type:fw},Symbol.toStringTag,{value:"Module"})),vw="sim-day-43",ww="Type G",Sw="Simulation: Classes and Objects Intro",Cw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],nj={id:vw,type:ww,title:Sw,steps:Cw},oj=Object.freeze(Object.defineProperty({__proto__:null,default:nj,id:vw,steps:Cw,title:Sw,type:ww},Symbol.toStringTag,{value:"Module"})),Tw="sim-day-44",Pw="Type G",Iw="Simulation: Object Attributes and Methods",$w=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],rj={id:Tw,type:Pw,title:Iw,steps:$w},ij=Object.freeze(Object.defineProperty({__proto__:null,default:rj,id:Tw,steps:$w,title:Iw,type:Pw},Symbol.toStringTag,{value:"Module"})),kw="sim-day-45",Ew="Type G",jw="Simulation: Unit IV Practical: Word Count (CLI)",Ow=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],sj={id:kw,type:Ew,title:jw,steps:Ow},aj=Object.freeze(Object.defineProperty({__proto__:null,default:sj,id:kw,steps:Ow,title:jw,type:Ew},Symbol.toStringTag,{value:"Module"})),Mw="sim-day-46",zw="Type G",Aw="Simulation: Unit IV Practical: Copy File",Fw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],lj={id:Mw,type:zw,title:Aw,steps:Fw},cj=Object.freeze(Object.defineProperty({__proto__:null,default:lj,id:Mw,steps:Fw,title:Aw,type:zw},Symbol.toStringTag,{value:"Module"})),Dw="sim-day-47",qw="Type G",Ww="Simulation: Consolidation: File Parsing & Objects",Rw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],dj={id:Dw,type:qw,title:Ww,steps:Rw},uj=Object.freeze(Object.defineProperty({__proto__:null,default:dj,id:Dw,steps:Rw,title:Ww,type:qw},Symbol.toStringTag,{value:"Module"})),Lw="sim-day-48",Nw="Type G",Uw="Simulation: Consolidation: Exception-Safe Pipelines",Bw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],pj={id:Lw,type:Nw,title:Uw,steps:Bw},mj=Object.freeze(Object.defineProperty({__proto__:null,default:pj,id:Lw,steps:Bw,title:Uw,type:Nw},Symbol.toStringTag,{value:"Module"})),Vw="sim-day-49",Gw="Type H",Hw="Simulation: NumPy: Creating a NumPy Array",Yw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],yj={id:Vw,type:Gw,title:Hw,steps:Yw},gj=Object.freeze(Object.defineProperty({__proto__:null,default:yj,id:Vw,steps:Yw,title:Hw,type:Gw},Symbol.toStringTag,{value:"Module"})),Jw="sim-day-50",Qw="Type H",Kw="Simulation: The Shape and Reshaping of NumPy Array",Xw=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],hj={id:Jw,type:Qw,title:Kw,steps:Xw},bj=Object.freeze(Object.defineProperty({__proto__:null,default:hj,id:Jw,steps:Xw,title:Kw,type:Qw},Symbol.toStringTag,{value:"Module"})),Zw="sim-day-51",eS="Type H",tS="Simulation: Indexing and Slicing of NumPy Array",nS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],fj={id:Zw,type:eS,title:tS,steps:nS},_j=Object.freeze(Object.defineProperty({__proto__:null,default:fj,id:Zw,steps:nS,title:tS,type:eS},Symbol.toStringTag,{value:"Module"})),oS="sim-day-52",rS="Type H",iS="Simulation: Maths & Basic Arithmetic with NumPy Arrays",sS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],xj={id:oS,type:rS,title:iS,steps:sS},vj=Object.freeze(Object.defineProperty({__proto__:null,default:xj,id:oS,steps:sS,title:iS,type:rS},Symbol.toStringTag,{value:"Module"})),aS="sim-day-53",lS="Type H",cS="Simulation: Matrix Operations (Multiply, Inverse) & Verification",dS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],wj={id:aS,type:lS,title:cS,steps:dS},Sj=Object.freeze(Object.defineProperty({__proto__:null,default:wj,id:aS,steps:dS,title:cS,type:lS},Symbol.toStringTag,{value:"Module"})),uS="sim-day-54",pS="Type H",mS="Simulation: Pandas Series & DataFrames",yS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Cj={id:uS,type:pS,title:mS,steps:yS},Tj=Object.freeze(Object.defineProperty({__proto__:null,default:Cj,id:uS,steps:yS,title:mS,type:pS},Symbol.toStringTag,{value:"Module"})),gS="sim-day-55",hS="Type H",bS="Simulation: Selection and Indexing in Pandas",fS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Pj={id:gS,type:hS,title:bS,steps:fS},Ij=Object.freeze(Object.defineProperty({__proto__:null,default:Pj,id:gS,steps:fS,title:bS,type:hS},Symbol.toStringTag,{value:"Module"})),_S="sim-day-56",xS="Type H",vS="Simulation: Handling Missing Data",wS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],$j={id:_S,type:xS,title:vS,steps:wS},kj=Object.freeze(Object.defineProperty({__proto__:null,default:$j,id:_S,steps:wS,title:vS,type:xS},Symbol.toStringTag,{value:"Module"})),SS="sim-day-57",CS="Type H",TS="Simulation: Merging, Joining, Concatenating",PS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Ej={id:SS,type:CS,title:TS,steps:PS},jj=Object.freeze(Object.defineProperty({__proto__:null,default:Ej,id:SS,steps:PS,title:TS,type:CS},Symbol.toStringTag,{value:"Module"})),IS="sim-day-58",$S="Type H",kS="Simulation: Groupby and Apply Functions",ES=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Oj={id:IS,type:$S,title:kS,steps:ES},Mj=Object.freeze(Object.defineProperty({__proto__:null,default:Oj,id:IS,steps:ES,title:kS,type:$S},Symbol.toStringTag,{value:"Module"})),jS="sim-day-59",OS="Type H",MS="Simulation: Sorting in DataFrames",zS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],zj={id:jS,type:OS,title:MS,steps:zS},Aj=Object.freeze(Object.defineProperty({__proto__:null,default:zj,id:jS,steps:zS,title:MS,type:OS},Symbol.toStringTag,{value:"Module"})),AS="sim-day-60",FS="Type H",DS="Simulation: File Read and Write Support (CSV Processing)",qS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Fj={id:AS,type:FS,title:DS,steps:qS},Dj=Object.freeze(Object.defineProperty({__proto__:null,default:Fj,id:AS,steps:qS,title:DS,type:FS},Symbol.toStringTag,{value:"Module"})),WS="sim-day-61",RS="Type B",LS="Simulation: Consolidation: Control Flow & Logic",NS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],qj={id:WS,type:RS,title:LS,steps:NS},Wj=Object.freeze(Object.defineProperty({__proto__:null,default:qj,id:WS,steps:NS,title:LS,type:RS},Symbol.toStringTag,{value:"Module"})),US="sim-day-62",BS="Type E",VS="Simulation: Consolidation: Advanced Data Structures",GS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Rj={id:US,type:BS,title:VS,steps:GS},Lj=Object.freeze(Object.defineProperty({__proto__:null,default:Rj,id:US,steps:GS,title:VS,type:BS},Symbol.toStringTag,{value:"Module"})),HS="sim-day-63",YS="Type F",JS="Simulation: Consolidation: Search & Sort Algorithms",QS=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Nj={id:HS,type:YS,title:JS,steps:QS},Uj=Object.freeze(Object.defineProperty({__proto__:null,default:Nj,id:HS,steps:QS,title:JS,type:YS},Symbol.toStringTag,{value:"Module"})),KS="sim-day-64",XS="Type G",ZS="Simulation: Consolidation: Files, Modules, and Error Handling",e1=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Bj={id:KS,type:XS,title:ZS,steps:e1},Vj=Object.freeze(Object.defineProperty({__proto__:null,default:Bj,id:KS,steps:e1,title:ZS,type:XS},Symbol.toStringTag,{value:"Module"})),t1="sim-day-65",n1="Type H",o1="Simulation: Capstone: NumPy & Pandas End-to-End",r1=[{step:1,description:"Initial state before execution.",state:{}},{step:2,description:"Processing logic...",state:{}},{step:3,description:"Final output.",state:{}}],Gj={id:t1,type:n1,title:o1,steps:r1},Hj=Object.freeze(Object.defineProperty({__proto__:null,default:Gj,id:t1,steps:r1,title:o1,type:n1},Symbol.toStringTag,{value:"Module"})),Yj=[{id:"prob-day-1",title:"Practice: Python Interpreter & Interactive Mode",description:"Write a Python script that demonstrates python interpreter & interactive mode.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Python Interpreter & Interactive Mode
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],Jj=Object.freeze(Object.defineProperty({__proto__:null,default:Yj},Symbol.toStringTag,{value:"Module"})),Qj=[{id:"prob-day-2",title:"Practice: Values and Types (int, float, boolean)",description:"Write a Python script that demonstrates values and types (int, float, boolean).",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Values and Types (int, float, boolean)
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],Kj=Object.freeze(Object.defineProperty({__proto__:null,default:Qj},Symbol.toStringTag,{value:"Module"})),Xj=[{id:"prob-day-3",title:"Practice: String and List Types",description:"Write a Python script that demonstrates string and list types.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for String and List Types
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],Zj=Object.freeze(Object.defineProperty({__proto__:null,default:Xj},Symbol.toStringTag,{value:"Module"})),eO=[{id:"prob-day-4",title:"Practice: Variables and Comments",description:"Write a Python script that demonstrates variables and comments.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Variables and Comments
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],tO=Object.freeze(Object.defineProperty({__proto__:null,default:eO},Symbol.toStringTag,{value:"Module"})),nO=[{id:"prob-day-5",title:"Practice: Expressions and Statements",description:"Write a Python script that demonstrates expressions and statements.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Expressions and Statements
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],oO=Object.freeze(Object.defineProperty({__proto__:null,default:nO},Symbol.toStringTag,{value:"Module"})),rO=[{id:"prob-day-6",title:"Practice: Precedence of Operators",description:"Write a Python script that demonstrates precedence of operators.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Precedence of Operators
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],iO=Object.freeze(Object.defineProperty({__proto__:null,default:rO},Symbol.toStringTag,{value:"Module"})),sO=[{id:"prob-day-7",title:"Practice: Tuple Assignment & Value Swapping",description:"Write a Python script that demonstrates tuple assignment & value swapping.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Tuple Assignment & Value Swapping
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],aO=Object.freeze(Object.defineProperty({__proto__:null,default:sO},Symbol.toStringTag,{value:"Module"})),lO=[{id:"prob-day-8",title:"Practice: Modules and Built-in Functions",description:"Write a Python script that demonstrates modules and built-in functions.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Modules and Built-in Functions
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],cO=Object.freeze(Object.defineProperty({__proto__:null,default:lO},Symbol.toStringTag,{value:"Module"})),dO=[{id:"prob-day-9",title:"Practice: Function Definition and Use",description:"Write a Python script that demonstrates function definition and use.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Function Definition and Use
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],uO=Object.freeze(Object.defineProperty({__proto__:null,default:dO},Symbol.toStringTag,{value:"Module"})),pO=[{id:"prob-day-10",title:"Practice: Flow of Execution",description:"Write a Python script that demonstrates flow of execution.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Flow of Execution
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],mO=Object.freeze(Object.defineProperty({__proto__:null,default:pO},Symbol.toStringTag,{value:"Module"})),yO=[{id:"prob-day-11",title:"Practice: Parameters and Arguments",description:"Write a Python script that demonstrates parameters and arguments.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Parameters and Arguments
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],gO=Object.freeze(Object.defineProperty({__proto__:null,default:yO},Symbol.toStringTag,{value:"Module"})),hO=[{id:"prob-day-12",title:"Practice: Unit I Illustrative Programs",description:"Write a Python script that demonstrates unit i illustrative programs.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Unit I Illustrative Programs
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],bO=Object.freeze(Object.defineProperty({__proto__:null,default:hO},Symbol.toStringTag,{value:"Module"})),fO=[{id:"prob-day-13",title:"Practice: Boolean Values and Operators",description:"Write a Python script that demonstrates boolean values and operators.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Boolean Values and Operators
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],_O=Object.freeze(Object.defineProperty({__proto__:null,default:fO},Symbol.toStringTag,{value:"Module"})),xO=[{id:"prob-day-14",title:"Practice: Conditional Execution (if)",description:"Write a Python script that demonstrates conditional execution (if).",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Conditional Execution (if)
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],vO=Object.freeze(Object.defineProperty({__proto__:null,default:xO},Symbol.toStringTag,{value:"Module"})),wO=[{id:"prob-day-15",title:"Practice: Alternative (if-else) & Chained (if-elif-else)",description:"Write a Python script that demonstrates alternative (if-else) & chained (if-elif-else).",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Alternative (if-else) & Chained (if-elif-else)
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],SO=Object.freeze(Object.defineProperty({__proto__:null,default:wO},Symbol.toStringTag,{value:"Module"})),CO=[{id:"prob-day-16",title:"Practice: Iteration State & The while Loop",description:"Write a Python script that demonstrates iteration state & the while loop.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Iteration State & The while Loop
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],TO=Object.freeze(Object.defineProperty({__proto__:null,default:CO},Symbol.toStringTag,{value:"Module"})),PO=[{id:"prob-day-17",title:"Practice: The for Loop & range()",description:"Write a Python script that demonstrates the for loop & range().",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for The for Loop & range()
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],IO=Object.freeze(Object.defineProperty({__proto__:null,default:PO},Symbol.toStringTag,{value:"Module"})),$O=[{id:"prob-day-18",title:"Practice: Loop Control: break, continue, pass",description:"Write a Python script that demonstrates loop control: break, continue, pass.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Loop Control: break, continue, pass
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],kO=Object.freeze(Object.defineProperty({__proto__:null,default:$O},Symbol.toStringTag,{value:"Module"})),EO=[{id:"prob-day-19",title:"Practice: Fruitful Functions & Return Values",description:"Write a Python script that demonstrates fruitful functions & return values.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Fruitful Functions & Return Values
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],jO=Object.freeze(Object.defineProperty({__proto__:null,default:EO},Symbol.toStringTag,{value:"Module"})),OO=[{id:"prob-day-20",title:"Practice: Scope (Local/Global) & Function Composition",description:"Write a Python script that demonstrates scope (local/global) & function composition.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Scope (Local/Global) & Function Composition
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],MO=Object.freeze(Object.defineProperty({__proto__:null,default:OO},Symbol.toStringTag,{value:"Module"})),zO=[{id:"prob-day-21",title:"Practice: Recursion",description:"Write a Python script that demonstrates recursion.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Recursion
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],AO=Object.freeze(Object.defineProperty({__proto__:null,default:zO},Symbol.toStringTag,{value:"Module"})),FO=[{id:"prob-day-22",title:"Practice: Strings: Immutability & Slices",description:"Write a Python script that demonstrates strings: immutability & slices.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Strings: Immutability & Slices
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],DO=Object.freeze(Object.defineProperty({__proto__:null,default:FO},Symbol.toStringTag,{value:"Module"})),qO=[{id:"prob-day-23",title:"Practice: String Methods, Module & Lists as Arrays",description:"Write a Python script that demonstrates string methods, module & lists as arrays.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for String Methods, Module & Lists as Arrays
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],WO=Object.freeze(Object.defineProperty({__proto__:null,default:qO},Symbol.toStringTag,{value:"Module"})),RO=[{id:"prob-day-24",title:"Practice: Unit II Illustrative Programs",description:"Write a Python script that demonstrates unit ii illustrative programs.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Unit II Illustrative Programs
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],LO=Object.freeze(Object.defineProperty({__proto__:null,default:RO},Symbol.toStringTag,{value:"Module"})),NO=[{id:"prob-day-25",title:"Practice: Lists: Operations and Slices",description:"Write a Python script that demonstrates lists: operations and slices.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Lists: Operations and Slices
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],UO=Object.freeze(Object.defineProperty({__proto__:null,default:NO},Symbol.toStringTag,{value:"Module"})),BO=[{id:"prob-day-26",title:"Practice: List Methods and List Loop",description:"Write a Python script that demonstrates list methods and list loop.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for List Methods and List Loop
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],VO=Object.freeze(Object.defineProperty({__proto__:null,default:BO},Symbol.toStringTag,{value:"Module"})),GO=[{id:"prob-day-27",title:"Practice: Mutability, Aliasing, and Cloning",description:"Write a Python script that demonstrates mutability, aliasing, and cloning.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Mutability, Aliasing, and Cloning
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],HO=Object.freeze(Object.defineProperty({__proto__:null,default:GO},Symbol.toStringTag,{value:"Module"})),YO=[{id:"prob-day-28",title:"Practice: List Parameters & Advanced Comprehensions",description:"Write a Python script that demonstrates list parameters & advanced comprehensions.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for List Parameters & Advanced Comprehensions
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],JO=Object.freeze(Object.defineProperty({__proto__:null,default:YO},Symbol.toStringTag,{value:"Module"})),QO=[{id:"prob-day-29",title:"Practice: Tuples: Assignment & Return Values",description:"Write a Python script that demonstrates tuples: assignment & return values.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Tuples: Assignment & Return Values
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],KO=Object.freeze(Object.defineProperty({__proto__:null,default:QO},Symbol.toStringTag,{value:"Module"})),XO=[{id:"prob-day-30",title:"Practice: Dictionaries: Operations & Methods",description:"Write a Python script that demonstrates dictionaries: operations & methods.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Dictionaries: Operations & Methods
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],ZO=Object.freeze(Object.defineProperty({__proto__:null,default:XO},Symbol.toStringTag,{value:"Module"})),eM=[{id:"prob-day-31",title:"Practice: Finding Maximum of a List",description:"Write a Python script that demonstrates finding maximum of a list.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Finding Maximum of a List
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],tM=Object.freeze(Object.defineProperty({__proto__:null,default:eM},Symbol.toStringTag,{value:"Module"})),nM=[{id:"prob-day-32",title:"Practice: Linear Search",description:"Write a Python script that demonstrates linear search.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Linear Search
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],oM=Object.freeze(Object.defineProperty({__proto__:null,default:nM},Symbol.toStringTag,{value:"Module"})),rM=[{id:"prob-day-33",title:"Practice: Binary Search",description:"Write a Python script that demonstrates binary search.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Binary Search
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],iM=Object.freeze(Object.defineProperty({__proto__:null,default:rM},Symbol.toStringTag,{value:"Module"})),sM=[{id:"prob-day-34",title:"Practice: Selection Sort",description:"Write a Python script that demonstrates selection sort.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Selection Sort
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],aM=Object.freeze(Object.defineProperty({__proto__:null,default:sM},Symbol.toStringTag,{value:"Module"})),lM=[{id:"prob-day-35",title:"Practice: Insertion Sort",description:"Write a Python script that demonstrates insertion sort.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Insertion Sort
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],cM=Object.freeze(Object.defineProperty({__proto__:null,default:lM},Symbol.toStringTag,{value:"Module"})),dM=[{id:"prob-day-36",title:"Practice: Merge Sort & Histograms",description:"Write a Python script that demonstrates merge sort & histograms.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Merge Sort & Histograms
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],uM=Object.freeze(Object.defineProperty({__proto__:null,default:dM},Symbol.toStringTag,{value:"Module"})),pM=[{id:"prob-day-37",title:"Practice: Text Files: Reading and Writing",description:"Write a Python script that demonstrates text files: reading and writing.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Text Files: Reading and Writing
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],mM=Object.freeze(Object.defineProperty({__proto__:null,default:pM},Symbol.toStringTag,{value:"Module"})),yM=[{id:"prob-day-38",title:"Practice: The Format Operator",description:"Write a Python script that demonstrates the format operator.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for The Format Operator
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],gM=Object.freeze(Object.defineProperty({__proto__:null,default:yM},Symbol.toStringTag,{value:"Module"})),hM=[{id:"prob-day-39",title:"Practice: Command Line Arguments",description:"Write a Python script that demonstrates command line arguments.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Command Line Arguments
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],bM=Object.freeze(Object.defineProperty({__proto__:null,default:hM},Symbol.toStringTag,{value:"Module"})),fM=[{id:"prob-day-40",title:"Practice: Errors and Exceptions",description:"Write a Python script that demonstrates errors and exceptions.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Errors and Exceptions
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],_M=Object.freeze(Object.defineProperty({__proto__:null,default:fM},Symbol.toStringTag,{value:"Module"})),xM=[{id:"prob-day-41",title:"Practice: Handling Exceptions (try-except)",description:"Write a Python script that demonstrates handling exceptions (try-except).",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Handling Exceptions (try-except)
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],vM=Object.freeze(Object.defineProperty({__proto__:null,default:xM},Symbol.toStringTag,{value:"Module"})),wM=[{id:"prob-day-42",title:"Practice: Modules and Packages",description:"Write a Python script that demonstrates modules and packages.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Modules and Packages
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],SM=Object.freeze(Object.defineProperty({__proto__:null,default:wM},Symbol.toStringTag,{value:"Module"})),CM=[{id:"prob-day-43",title:"Practice: Classes and Objects Intro",description:"Write a Python script that demonstrates classes and objects intro.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Classes and Objects Intro
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],TM=Object.freeze(Object.defineProperty({__proto__:null,default:CM},Symbol.toStringTag,{value:"Module"})),PM=[{id:"prob-day-44",title:"Practice: Object Attributes and Methods",description:"Write a Python script that demonstrates object attributes and methods.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Object Attributes and Methods
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],IM=Object.freeze(Object.defineProperty({__proto__:null,default:PM},Symbol.toStringTag,{value:"Module"})),$M=[{id:"prob-day-45",title:"Practice: Unit IV Practical: Word Count (CLI)",description:"Write a Python script that demonstrates unit iv practical: word count (cli).",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Unit IV Practical: Word Count (CLI)
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],kM=Object.freeze(Object.defineProperty({__proto__:null,default:$M},Symbol.toStringTag,{value:"Module"})),EM=[{id:"prob-day-46",title:"Practice: Unit IV Practical: Copy File",description:"Write a Python script that demonstrates unit iv practical: copy file.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Unit IV Practical: Copy File
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],jM=Object.freeze(Object.defineProperty({__proto__:null,default:EM},Symbol.toStringTag,{value:"Module"})),OM=[{id:"prob-day-47",title:"Practice: Consolidation: File Parsing & Objects",description:"Write a Python script that demonstrates consolidation: file parsing & objects.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Consolidation: File Parsing & Objects
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],MM=Object.freeze(Object.defineProperty({__proto__:null,default:OM},Symbol.toStringTag,{value:"Module"})),zM=[{id:"prob-day-48",title:"Practice: Consolidation: Exception-Safe Pipelines",description:"Write a Python script that demonstrates consolidation: exception-safe pipelines.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Consolidation: Exception-Safe Pipelines
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],AM=Object.freeze(Object.defineProperty({__proto__:null,default:zM},Symbol.toStringTag,{value:"Module"})),FM=[{id:"prob-day-49",title:"Practice: NumPy: Creating a NumPy Array",description:"Write a Python script that demonstrates numpy: creating a numpy array.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for NumPy: Creating a NumPy Array
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],DM=Object.freeze(Object.defineProperty({__proto__:null,default:FM},Symbol.toStringTag,{value:"Module"})),qM=[{id:"prob-day-50",title:"Practice: The Shape and Reshaping of NumPy Array",description:"Write a Python script that demonstrates the shape and reshaping of numpy array.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for The Shape and Reshaping of NumPy Array
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],WM=Object.freeze(Object.defineProperty({__proto__:null,default:qM},Symbol.toStringTag,{value:"Module"})),RM=[{id:"prob-day-51",title:"Practice: Indexing and Slicing of NumPy Array",description:"Write a Python script that demonstrates indexing and slicing of numpy array.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Indexing and Slicing of NumPy Array
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],LM=Object.freeze(Object.defineProperty({__proto__:null,default:RM},Symbol.toStringTag,{value:"Module"})),NM=[{id:"prob-day-52",title:"Practice: Maths & Basic Arithmetic with NumPy Arrays",description:"Write a Python script that demonstrates maths & basic arithmetic with numpy arrays.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Maths & Basic Arithmetic with NumPy Arrays
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],UM=Object.freeze(Object.defineProperty({__proto__:null,default:NM},Symbol.toStringTag,{value:"Module"})),BM=[{id:"prob-day-53",title:"Practice: Matrix Operations (Multiply, Inverse) & Verification",description:"Write a Python script that demonstrates matrix operations (multiply, inverse) & verification.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Matrix Operations (Multiply, Inverse) & Verification
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],VM=Object.freeze(Object.defineProperty({__proto__:null,default:BM},Symbol.toStringTag,{value:"Module"})),GM=[{id:"prob-day-54",title:"Practice: Pandas Series & DataFrames",description:"Write a Python script that demonstrates pandas series & dataframes.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Pandas Series & DataFrames
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],HM=Object.freeze(Object.defineProperty({__proto__:null,default:GM},Symbol.toStringTag,{value:"Module"})),YM=[{id:"prob-day-55",title:"Practice: Selection and Indexing in Pandas",description:"Write a Python script that demonstrates selection and indexing in pandas.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Selection and Indexing in Pandas
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],JM=Object.freeze(Object.defineProperty({__proto__:null,default:YM},Symbol.toStringTag,{value:"Module"})),QM=[{id:"prob-day-56",title:"Practice: Handling Missing Data",description:"Write a Python script that demonstrates handling missing data.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Handling Missing Data
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],KM=Object.freeze(Object.defineProperty({__proto__:null,default:QM},Symbol.toStringTag,{value:"Module"})),XM=[{id:"prob-day-57",title:"Practice: Merging, Joining, Concatenating",description:"Write a Python script that demonstrates merging, joining, concatenating.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Merging, Joining, Concatenating
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],ZM=Object.freeze(Object.defineProperty({__proto__:null,default:XM},Symbol.toStringTag,{value:"Module"})),ez=[{id:"prob-day-58",title:"Practice: Groupby and Apply Functions",description:"Write a Python script that demonstrates groupby and apply functions.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Groupby and Apply Functions
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],tz=Object.freeze(Object.defineProperty({__proto__:null,default:ez},Symbol.toStringTag,{value:"Module"})),nz=[{id:"prob-day-59",title:"Practice: Sorting in DataFrames",description:"Write a Python script that demonstrates sorting in dataframes.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Sorting in DataFrames
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],oz=Object.freeze(Object.defineProperty({__proto__:null,default:nz},Symbol.toStringTag,{value:"Module"})),rz=[{id:"prob-day-60",title:"Practice: File Read and Write Support (CSV Processing)",description:"Write a Python script that demonstrates file read and write support (csv processing).",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for File Read and Write Support (CSV Processing)
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],iz=Object.freeze(Object.defineProperty({__proto__:null,default:rz},Symbol.toStringTag,{value:"Module"})),sz=[{id:"prob-day-61",title:"Practice: Consolidation: Control Flow & Logic",description:"Write a Python script that demonstrates consolidation: control flow & logic.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Consolidation: Control Flow & Logic
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],az=Object.freeze(Object.defineProperty({__proto__:null,default:sz},Symbol.toStringTag,{value:"Module"})),lz=[{id:"prob-day-62",title:"Practice: Consolidation: Advanced Data Structures",description:"Write a Python script that demonstrates consolidation: advanced data structures.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Consolidation: Advanced Data Structures
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],cz=Object.freeze(Object.defineProperty({__proto__:null,default:lz},Symbol.toStringTag,{value:"Module"})),dz=[{id:"prob-day-63",title:"Practice: Consolidation: Search & Sort Algorithms",description:"Write a Python script that demonstrates consolidation: search & sort algorithms.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Consolidation: Search & Sort Algorithms
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],uz=Object.freeze(Object.defineProperty({__proto__:null,default:dz},Symbol.toStringTag,{value:"Module"})),pz=[{id:"prob-day-64",title:"Practice: Consolidation: Files, Modules, and Error Handling",description:"Write a Python script that demonstrates consolidation: files, modules, and error handling.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Consolidation: Files, Modules, and Error Handling
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],mz=Object.freeze(Object.defineProperty({__proto__:null,default:pz},Symbol.toStringTag,{value:"Module"})),yz=[{id:"prob-day-65",title:"Practice: Capstone: NumPy & Pandas End-to-End",description:"Write a Python script that demonstrates capstone: numpy & pandas end-to-end.",starterCode:`# Write your code here
`,solutionCode:`# Expected logic for Capstone: NumPy & Pandas End-to-End
print('Success')`,testCases:[{input:"",expectedOutput:"Success",isHidden:!1}]}],gz=Object.freeze(Object.defineProperty({__proto__:null,default:yz},Symbol.toStringTag,{value:"Module"})),hz=[{id:"quiz-day-1-1",question:"Which of the following best describes Python Interpreter & Interactive Mode?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],bz=Object.freeze(Object.defineProperty({__proto__:null,default:hz},Symbol.toStringTag,{value:"Module"})),fz=[{id:"quiz-day-2-1",question:"Which of the following best describes Values and Types (int, float, boolean)?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],_z=Object.freeze(Object.defineProperty({__proto__:null,default:fz},Symbol.toStringTag,{value:"Module"})),xz=[{id:"quiz-day-3-1",question:"Which of the following best describes String and List Types?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],vz=Object.freeze(Object.defineProperty({__proto__:null,default:xz},Symbol.toStringTag,{value:"Module"})),wz=[{id:"quiz-day-4-1",question:"Which of the following best describes Variables and Comments?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Sz=Object.freeze(Object.defineProperty({__proto__:null,default:wz},Symbol.toStringTag,{value:"Module"})),Cz=[{id:"quiz-day-5-1",question:"Which of the following best describes Expressions and Statements?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Tz=Object.freeze(Object.defineProperty({__proto__:null,default:Cz},Symbol.toStringTag,{value:"Module"})),Pz=[{id:"quiz-day-6-1",question:"Which of the following best describes Precedence of Operators?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Iz=Object.freeze(Object.defineProperty({__proto__:null,default:Pz},Symbol.toStringTag,{value:"Module"})),$z=[{id:"quiz-day-7-1",question:"Which of the following best describes Tuple Assignment & Value Swapping?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],kz=Object.freeze(Object.defineProperty({__proto__:null,default:$z},Symbol.toStringTag,{value:"Module"})),Ez=[{id:"quiz-day-8-1",question:"Which of the following best describes Modules and Built-in Functions?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],jz=Object.freeze(Object.defineProperty({__proto__:null,default:Ez},Symbol.toStringTag,{value:"Module"})),Oz=[{id:"quiz-day-9-1",question:"Which of the following best describes Function Definition and Use?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Mz=Object.freeze(Object.defineProperty({__proto__:null,default:Oz},Symbol.toStringTag,{value:"Module"})),zz=[{id:"quiz-day-10-1",question:"Which of the following best describes Flow of Execution?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Az=Object.freeze(Object.defineProperty({__proto__:null,default:zz},Symbol.toStringTag,{value:"Module"})),Fz=[{id:"quiz-day-11-1",question:"Which of the following best describes Parameters and Arguments?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Dz=Object.freeze(Object.defineProperty({__proto__:null,default:Fz},Symbol.toStringTag,{value:"Module"})),qz=[{id:"quiz-day-12-1",question:"Which of the following best describes Unit I Illustrative Programs?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Wz=Object.freeze(Object.defineProperty({__proto__:null,default:qz},Symbol.toStringTag,{value:"Module"})),Rz=[{id:"quiz-day-13-1",question:"Which of the following best describes Boolean Values and Operators?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Lz=Object.freeze(Object.defineProperty({__proto__:null,default:Rz},Symbol.toStringTag,{value:"Module"})),Nz=[{id:"quiz-day-14-1",question:"Which of the following best describes Conditional Execution (if)?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Uz=Object.freeze(Object.defineProperty({__proto__:null,default:Nz},Symbol.toStringTag,{value:"Module"})),Bz=[{id:"quiz-day-15-1",question:"Which of the following best describes Alternative (if-else) & Chained (if-elif-else)?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Vz=Object.freeze(Object.defineProperty({__proto__:null,default:Bz},Symbol.toStringTag,{value:"Module"})),Gz=[{id:"quiz-day-16-1",question:"Which of the following best describes Iteration State & The while Loop?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Hz=Object.freeze(Object.defineProperty({__proto__:null,default:Gz},Symbol.toStringTag,{value:"Module"})),Yz=[{id:"quiz-day-17-1",question:"Which of the following best describes The for Loop & range()?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Jz=Object.freeze(Object.defineProperty({__proto__:null,default:Yz},Symbol.toStringTag,{value:"Module"})),Qz=[{id:"quiz-day-18-1",question:"Which of the following best describes Loop Control: break, continue, pass?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Kz=Object.freeze(Object.defineProperty({__proto__:null,default:Qz},Symbol.toStringTag,{value:"Module"})),Xz=[{id:"quiz-day-19-1",question:"Which of the following best describes Fruitful Functions & Return Values?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Zz=Object.freeze(Object.defineProperty({__proto__:null,default:Xz},Symbol.toStringTag,{value:"Module"})),e3=[{id:"quiz-day-20-1",question:"Which of the following best describes Scope (Local/Global) & Function Composition?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],t3=Object.freeze(Object.defineProperty({__proto__:null,default:e3},Symbol.toStringTag,{value:"Module"})),n3=[{id:"quiz-day-21-1",question:"Which of the following best describes Recursion?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],o3=Object.freeze(Object.defineProperty({__proto__:null,default:n3},Symbol.toStringTag,{value:"Module"})),r3=[{id:"quiz-day-22-1",question:"Which of the following best describes Strings: Immutability & Slices?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],i3=Object.freeze(Object.defineProperty({__proto__:null,default:r3},Symbol.toStringTag,{value:"Module"})),s3=[{id:"quiz-day-23-1",question:"Which of the following best describes String Methods, Module & Lists as Arrays?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],a3=Object.freeze(Object.defineProperty({__proto__:null,default:s3},Symbol.toStringTag,{value:"Module"})),l3=[{id:"quiz-day-24-1",question:"Which of the following best describes Unit II Illustrative Programs?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],c3=Object.freeze(Object.defineProperty({__proto__:null,default:l3},Symbol.toStringTag,{value:"Module"})),d3=[{id:"quiz-day-25-1",question:"Which of the following best describes Lists: Operations and Slices?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],u3=Object.freeze(Object.defineProperty({__proto__:null,default:d3},Symbol.toStringTag,{value:"Module"})),p3=[{id:"quiz-day-26-1",question:"Which of the following best describes List Methods and List Loop?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],m3=Object.freeze(Object.defineProperty({__proto__:null,default:p3},Symbol.toStringTag,{value:"Module"})),y3=[{id:"quiz-day-27-1",question:"Which of the following best describes Mutability, Aliasing, and Cloning?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],g3=Object.freeze(Object.defineProperty({__proto__:null,default:y3},Symbol.toStringTag,{value:"Module"})),h3=[{id:"quiz-day-28-1",question:"Which of the following best describes List Parameters & Advanced Comprehensions?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],b3=Object.freeze(Object.defineProperty({__proto__:null,default:h3},Symbol.toStringTag,{value:"Module"})),f3=[{id:"quiz-day-29-1",question:"Which of the following best describes Tuples: Assignment & Return Values?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],_3=Object.freeze(Object.defineProperty({__proto__:null,default:f3},Symbol.toStringTag,{value:"Module"})),x3=[{id:"quiz-day-30-1",question:"Which of the following best describes Dictionaries: Operations & Methods?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],v3=Object.freeze(Object.defineProperty({__proto__:null,default:x3},Symbol.toStringTag,{value:"Module"})),w3=[{id:"quiz-day-31-1",question:"Which of the following best describes Finding Maximum of a List?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],S3=Object.freeze(Object.defineProperty({__proto__:null,default:w3},Symbol.toStringTag,{value:"Module"})),C3=[{id:"quiz-day-32-1",question:"Which of the following best describes Linear Search?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],T3=Object.freeze(Object.defineProperty({__proto__:null,default:C3},Symbol.toStringTag,{value:"Module"})),P3=[{id:"quiz-day-33-1",question:"Which of the following best describes Binary Search?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],I3=Object.freeze(Object.defineProperty({__proto__:null,default:P3},Symbol.toStringTag,{value:"Module"})),$3=[{id:"quiz-day-34-1",question:"Which of the following best describes Selection Sort?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],k3=Object.freeze(Object.defineProperty({__proto__:null,default:$3},Symbol.toStringTag,{value:"Module"})),E3=[{id:"quiz-day-35-1",question:"Which of the following best describes Insertion Sort?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],j3=Object.freeze(Object.defineProperty({__proto__:null,default:E3},Symbol.toStringTag,{value:"Module"})),O3=[{id:"quiz-day-36-1",question:"Which of the following best describes Merge Sort & Histograms?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],M3=Object.freeze(Object.defineProperty({__proto__:null,default:O3},Symbol.toStringTag,{value:"Module"})),z3=[{id:"quiz-day-37-1",question:"Which of the following best describes Text Files: Reading and Writing?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],A3=Object.freeze(Object.defineProperty({__proto__:null,default:z3},Symbol.toStringTag,{value:"Module"})),F3=[{id:"quiz-day-38-1",question:"Which of the following best describes The Format Operator?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],D3=Object.freeze(Object.defineProperty({__proto__:null,default:F3},Symbol.toStringTag,{value:"Module"})),q3=[{id:"quiz-day-39-1",question:"Which of the following best describes Command Line Arguments?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],W3=Object.freeze(Object.defineProperty({__proto__:null,default:q3},Symbol.toStringTag,{value:"Module"})),R3=[{id:"quiz-day-40-1",question:"Which of the following best describes Errors and Exceptions?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],L3=Object.freeze(Object.defineProperty({__proto__:null,default:R3},Symbol.toStringTag,{value:"Module"})),N3=[{id:"quiz-day-41-1",question:"Which of the following best describes Handling Exceptions (try-except)?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],U3=Object.freeze(Object.defineProperty({__proto__:null,default:N3},Symbol.toStringTag,{value:"Module"})),B3=[{id:"quiz-day-42-1",question:"Which of the following best describes Modules and Packages?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],V3=Object.freeze(Object.defineProperty({__proto__:null,default:B3},Symbol.toStringTag,{value:"Module"})),G3=[{id:"quiz-day-43-1",question:"Which of the following best describes Classes and Objects Intro?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],H3=Object.freeze(Object.defineProperty({__proto__:null,default:G3},Symbol.toStringTag,{value:"Module"})),Y3=[{id:"quiz-day-44-1",question:"Which of the following best describes Object Attributes and Methods?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],J3=Object.freeze(Object.defineProperty({__proto__:null,default:Y3},Symbol.toStringTag,{value:"Module"})),Q3=[{id:"quiz-day-45-1",question:"Which of the following best describes Unit IV Practical: Word Count (CLI)?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],K3=Object.freeze(Object.defineProperty({__proto__:null,default:Q3},Symbol.toStringTag,{value:"Module"})),X3=[{id:"quiz-day-46-1",question:"Which of the following best describes Unit IV Practical: Copy File?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],Z3=Object.freeze(Object.defineProperty({__proto__:null,default:X3},Symbol.toStringTag,{value:"Module"})),eA=[{id:"quiz-day-47-1",question:"Which of the following best describes Consolidation: File Parsing & Objects?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],tA=Object.freeze(Object.defineProperty({__proto__:null,default:eA},Symbol.toStringTag,{value:"Module"})),nA=[{id:"quiz-day-48-1",question:"Which of the following best describes Consolidation: Exception-Safe Pipelines?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],oA=Object.freeze(Object.defineProperty({__proto__:null,default:nA},Symbol.toStringTag,{value:"Module"})),rA=[{id:"quiz-day-49-1",question:"Which of the following best describes NumPy: Creating a NumPy Array?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],iA=Object.freeze(Object.defineProperty({__proto__:null,default:rA},Symbol.toStringTag,{value:"Module"})),sA=[{id:"quiz-day-50-1",question:"Which of the following best describes The Shape and Reshaping of NumPy Array?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],aA=Object.freeze(Object.defineProperty({__proto__:null,default:sA},Symbol.toStringTag,{value:"Module"})),lA=[{id:"quiz-day-51-1",question:"Which of the following best describes Indexing and Slicing of NumPy Array?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],cA=Object.freeze(Object.defineProperty({__proto__:null,default:lA},Symbol.toStringTag,{value:"Module"})),dA=[{id:"quiz-day-52-1",question:"Which of the following best describes Maths & Basic Arithmetic with NumPy Arrays?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],uA=Object.freeze(Object.defineProperty({__proto__:null,default:dA},Symbol.toStringTag,{value:"Module"})),pA=[{id:"quiz-day-53-1",question:"Which of the following best describes Matrix Operations (Multiply, Inverse) & Verification?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],mA=Object.freeze(Object.defineProperty({__proto__:null,default:pA},Symbol.toStringTag,{value:"Module"})),yA=[{id:"quiz-day-54-1",question:"Which of the following best describes Pandas Series & DataFrames?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],gA=Object.freeze(Object.defineProperty({__proto__:null,default:yA},Symbol.toStringTag,{value:"Module"})),hA=[{id:"quiz-day-55-1",question:"Which of the following best describes Selection and Indexing in Pandas?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],bA=Object.freeze(Object.defineProperty({__proto__:null,default:hA},Symbol.toStringTag,{value:"Module"})),fA=[{id:"quiz-day-56-1",question:"Which of the following best describes Handling Missing Data?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],_A=Object.freeze(Object.defineProperty({__proto__:null,default:fA},Symbol.toStringTag,{value:"Module"})),xA=[{id:"quiz-day-57-1",question:"Which of the following best describes Merging, Joining, Concatenating?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],vA=Object.freeze(Object.defineProperty({__proto__:null,default:xA},Symbol.toStringTag,{value:"Module"})),wA=[{id:"quiz-day-58-1",question:"Which of the following best describes Groupby and Apply Functions?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],SA=Object.freeze(Object.defineProperty({__proto__:null,default:wA},Symbol.toStringTag,{value:"Module"})),CA=[{id:"quiz-day-59-1",question:"Which of the following best describes Sorting in DataFrames?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],TA=Object.freeze(Object.defineProperty({__proto__:null,default:CA},Symbol.toStringTag,{value:"Module"})),PA=[{id:"quiz-day-60-1",question:"Which of the following best describes File Read and Write Support (CSV Processing)?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],IA=Object.freeze(Object.defineProperty({__proto__:null,default:PA},Symbol.toStringTag,{value:"Module"})),$A=[{id:"quiz-day-61-1",question:"Which of the following best describes Consolidation: Control Flow & Logic?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],kA=Object.freeze(Object.defineProperty({__proto__:null,default:$A},Symbol.toStringTag,{value:"Module"})),EA=[{id:"quiz-day-62-1",question:"Which of the following best describes Consolidation: Advanced Data Structures?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],jA=Object.freeze(Object.defineProperty({__proto__:null,default:EA},Symbol.toStringTag,{value:"Module"})),OA=[{id:"quiz-day-63-1",question:"Which of the following best describes Consolidation: Search & Sort Algorithms?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],MA=Object.freeze(Object.defineProperty({__proto__:null,default:OA},Symbol.toStringTag,{value:"Module"})),zA=[{id:"quiz-day-64-1",question:"Which of the following best describes Consolidation: Files, Modules, and Error Handling?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],AA=Object.freeze(Object.defineProperty({__proto__:null,default:zA},Symbol.toStringTag,{value:"Module"})),FA=[{id:"quiz-day-65-1",question:"Which of the following best describes Capstone: NumPy & Pandas End-to-End?",options:["It manages data or execution flow.","It is a hardware component.","It only works on Windows.","It is deprecated."],correctAnswer:0,explanation:"Python uses this concept to manage data or execution flow logically."}],DA=Object.freeze(Object.defineProperty({__proto__:null,default:FA},Symbol.toStringTag,{value:"Module"})),qA="python-programming",WA="19AI301 / CS3301",RA="Python Programming",LA="B.Tech Artificial Intelligence and Data Science / CSE",NA="2-0-2-3",UA=60,BA=65,VA=6,GA=65,HA="python",YA="Python 3.11 (Pyodide WebAssembly)",JA="Comprehensive 65-day interactive curriculum: from foundational data types, conditionals, loops, and data structures to files, packages, and numerical data processing with NumPy and pandas.",QA=[{code:"CO1",statement:"Read and write simple Python programs using basic data types, expressions, and statements",bloomLevel:"Understand"},{code:"CO2",statement:"Develop programs with conditionals, loops, and modular functions",bloomLevel:"Create"},{code:"CO3",statement:"Use lists, tuples, and dictionaries for complex data manipulation and searching/sorting",bloomLevel:"Apply"},{code:"CO4",statement:"Use files, exception handling, modules, packages, and classes for robust software design",bloomLevel:"Apply"},{code:"CO5",statement:"Use NumPy arrays and pandas DataFrames for numerical computation and data analytics",bloomLevel:"Apply"}],KA=[{id:"unit-01",unitNumber:1,romanNumber:"Unit I",title:"Data Types, Expressions, Statements",description:"Python interpreter, interactive mode, values and types (int, float, boolean, string, list), variables, expressions, statements, tuple assignment, precedence, comments, modules and functions, flow of execution.",periods:12,outcomes:["CO1"],chapters:["day-01","day-02","day-03","day-04","day-05","day-06","day-07","day-08","day-09","day-10","day-11","day-12"]},{id:"unit-02",unitNumber:2,romanNumber:"Unit II",title:"Control Flow, Functions",description:"Conditionals (if, if-else, if-elif-else), Iteration (while, for, break, continue, pass), Fruitful functions, scope, composition, recursion, Strings (slices, immutability, string module), Lists as arrays.",periods:12,outcomes:["CO2"],chapters:["day-13","day-14","day-15","day-16","day-17","day-18","day-19","day-20","day-21","day-22","day-23","day-24"]},{id:"unit-03",unitNumber:3,romanNumber:"Unit III",title:"Lists, Tuples, Dictionaries",description:"Lists (operations, slices, methods, loops, mutability, aliasing, cloning), Tuples, Dictionaries, list comprehensions, linear/binary search, selection/insertion/merge sort, histograms.",periods:12,outcomes:["CO3"],chapters:["day-25","day-26","day-27","day-28","day-29","day-30","day-31","day-32","day-33","day-34","day-35","day-36"]},{id:"unit-04",unitNumber:4,romanNumber:"Unit IV",title:"Files, Modules, Packages",description:"Text files, format operator, command line arguments, errors and exceptions, modules, packages, Classes, objects, word count, copy file.",periods:12,outcomes:["CO4"],chapters:["day-37","day-38","day-39","day-40","day-41","day-42","day-43","day-44","day-45","day-46","day-47","day-48"]},{id:"unit-05",unitNumber:5,romanNumber:"Unit V",title:"NumPy, Data Frame",description:"NumPy arrays (creation, shape, slicing, math), Pandas Series, Dataframes, Missing data, Merging, Groupby, Apply, Sorting, File I/O, Matrix operations.",periods:12,outcomes:["CO5"],chapters:["day-49","day-50","day-51","day-52","day-53","day-54","day-55","day-56","day-57","day-58","day-59","day-60"]},{id:"unit-06",unitNumber:6,romanNumber:"Consolidation",title:"Revision & Assessment",description:"Master consolidation of all concepts, full-scale practical assessment across all 5 units.",periods:5,outcomes:["CO1","CO2","CO3","CO4","CO5"],chapters:["day-61","day-62","day-63","day-64","day-65"]}],XA={id:qA,code:WA,title:RA,programme:LA,ltpc:NA,totalPeriods:UA,totalDays:BA,unitsCount:VA,chaptersCount:GA,language:HA,runtimeVersion:YA,description:JA,outcomes:QA,units:KA},ZA="19AI301 / CS3301",e5="Python Programming",t5="B.Tech Artificial Intelligence and Data Science",n5="2-0-2-3",o5="This course provides learners with in-depth knowledge of python programming. Learners get hands-on experience using various programming constructs (for, while, if) to solve engineering problems. The introduction of packages like NumPy and pandas provides learners with confidence to handle large complex data problems.",r5="Nil",i5=60,s5=[{id:"tb-1",author:"Allen B. Downey",title:"Think Python: How to Think Like a Computer Scientist",edition:"2nd edition, Updated for Python 3",publisher:"Shroff/O'Reilly Publishers",year:2016},{id:"tb-2",author:"Guido van Rossum and Fred L. Drake Jr",title:"An Introduction to Python – Revised and updated for Python 3.2",publisher:"Network Theory Ltd.",year:2011},{id:"tb-3",author:"Jake VanderPlas",title:"Python Data Science Handbook: Essential Tools for Working with Data",publisher:"O'Reilly Media, Inc.",year:2016}],a5=[{id:"ref-1",author:"Wes McKinney",title:"Python for Data Analysis",publisher:"O'Reilly Media, Inc.",year:2017},{id:"ref-2",author:"Jesús Rogel-Salazar",title:"Data Science And Analytics With Python",publisher:"CRC Press, Taylor & Francis Group",year:2017},{id:"ref-3",author:"Joel Grus",title:"Data Science from Scratch",edition:"First Edition",publisher:"O'Reilly Media, Inc.",year:2015}],l5={hardware:"PCs (30 units for batch of 30 students)",software:"Anaconda – Python 3.7+ Installation"},c5={courseCode:ZA,courseName:e5,programme:t5,ltpc:n5,preamble:o5,prerequisite:r5,totalPeriods:i5,textbooks:s5,references:a5,equipmentNeeded:l5},d5=Object.assign({"../../../content/courses/python-programming/unit-01/day-01/chapter.json":gC,"../../../content/courses/python-programming/unit-01/day-02/chapter.json":bC,"../../../content/courses/python-programming/unit-01/day-03/chapter.json":_C,"../../../content/courses/python-programming/unit-01/day-04/chapter.json":vC,"../../../content/courses/python-programming/unit-01/day-05/chapter.json":SC,"../../../content/courses/python-programming/unit-01/day-06/chapter.json":TC,"../../../content/courses/python-programming/unit-01/day-07/chapter.json":IC,"../../../content/courses/python-programming/unit-01/day-08/chapter.json":kC,"../../../content/courses/python-programming/unit-01/day-09/chapter.json":jC,"../../../content/courses/python-programming/unit-01/day-10/chapter.json":MC,"../../../content/courses/python-programming/unit-01/day-11/chapter.json":AC,"../../../content/courses/python-programming/unit-01/day-12/chapter.json":DC,"../../../content/courses/python-programming/unit-02/day-13/chapter.json":WC,"../../../content/courses/python-programming/unit-02/day-14/chapter.json":LC,"../../../content/courses/python-programming/unit-02/day-15/chapter.json":UC,"../../../content/courses/python-programming/unit-02/day-16/chapter.json":VC,"../../../content/courses/python-programming/unit-02/day-17/chapter.json":HC,"../../../content/courses/python-programming/unit-02/day-18/chapter.json":JC,"../../../content/courses/python-programming/unit-02/day-19/chapter.json":KC,"../../../content/courses/python-programming/unit-02/day-20/chapter.json":ZC,"../../../content/courses/python-programming/unit-02/day-21/chapter.json":tT,"../../../content/courses/python-programming/unit-02/day-22/chapter.json":oT,"../../../content/courses/python-programming/unit-02/day-23/chapter.json":iT,"../../../content/courses/python-programming/unit-02/day-24/chapter.json":aT,"../../../content/courses/python-programming/unit-03/day-25/chapter.json":cT,"../../../content/courses/python-programming/unit-03/day-26/chapter.json":uT,"../../../content/courses/python-programming/unit-03/day-27/chapter.json":mT,"../../../content/courses/python-programming/unit-03/day-28/chapter.json":gT,"../../../content/courses/python-programming/unit-03/day-29/chapter.json":bT,"../../../content/courses/python-programming/unit-03/day-30/chapter.json":_T,"../../../content/courses/python-programming/unit-03/day-31/chapter.json":vT,"../../../content/courses/python-programming/unit-03/day-32/chapter.json":ST,"../../../content/courses/python-programming/unit-03/day-33/chapter.json":TT,"../../../content/courses/python-programming/unit-03/day-34/chapter.json":IT,"../../../content/courses/python-programming/unit-03/day-35/chapter.json":kT,"../../../content/courses/python-programming/unit-03/day-36/chapter.json":jT,"../../../content/courses/python-programming/unit-04/day-37/chapter.json":MT,"../../../content/courses/python-programming/unit-04/day-38/chapter.json":AT,"../../../content/courses/python-programming/unit-04/day-39/chapter.json":DT,"../../../content/courses/python-programming/unit-04/day-40/chapter.json":WT,"../../../content/courses/python-programming/unit-04/day-41/chapter.json":LT,"../../../content/courses/python-programming/unit-04/day-42/chapter.json":UT,"../../../content/courses/python-programming/unit-04/day-43/chapter.json":VT,"../../../content/courses/python-programming/unit-04/day-44/chapter.json":HT,"../../../content/courses/python-programming/unit-04/day-45/chapter.json":JT,"../../../content/courses/python-programming/unit-04/day-46/chapter.json":KT,"../../../content/courses/python-programming/unit-04/day-47/chapter.json":ZT,"../../../content/courses/python-programming/unit-04/day-48/chapter.json":t0,"../../../content/courses/python-programming/unit-05/day-49/chapter.json":o0,"../../../content/courses/python-programming/unit-05/day-50/chapter.json":i0,"../../../content/courses/python-programming/unit-05/day-51/chapter.json":a0,"../../../content/courses/python-programming/unit-05/day-52/chapter.json":c0,"../../../content/courses/python-programming/unit-05/day-53/chapter.json":u0,"../../../content/courses/python-programming/unit-05/day-54/chapter.json":m0,"../../../content/courses/python-programming/unit-05/day-55/chapter.json":g0,"../../../content/courses/python-programming/unit-05/day-56/chapter.json":b0,"../../../content/courses/python-programming/unit-05/day-57/chapter.json":_0,"../../../content/courses/python-programming/unit-05/day-58/chapter.json":v0,"../../../content/courses/python-programming/unit-05/day-59/chapter.json":S0,"../../../content/courses/python-programming/unit-05/day-60/chapter.json":T0,"../../../content/courses/python-programming/unit-06/day-61/chapter.json":I0,"../../../content/courses/python-programming/unit-06/day-62/chapter.json":k0,"../../../content/courses/python-programming/unit-06/day-63/chapter.json":j0,"../../../content/courses/python-programming/unit-06/day-64/chapter.json":M0,"../../../content/courses/python-programming/unit-06/day-65/chapter.json":A0}),u5=Object.assign({"../../../content/courses/python-programming/unit-01/day-01/lesson.md":F0,"../../../content/courses/python-programming/unit-01/day-02/lesson.md":D0,"../../../content/courses/python-programming/unit-01/day-03/lesson.md":q0,"../../../content/courses/python-programming/unit-01/day-04/lesson.md":W0,"../../../content/courses/python-programming/unit-01/day-05/lesson.md":R0,"../../../content/courses/python-programming/unit-01/day-06/lesson.md":L0,"../../../content/courses/python-programming/unit-01/day-07/lesson.md":N0,"../../../content/courses/python-programming/unit-01/day-08/lesson.md":U0,"../../../content/courses/python-programming/unit-01/day-09/lesson.md":B0,"../../../content/courses/python-programming/unit-01/day-10/lesson.md":V0,"../../../content/courses/python-programming/unit-01/day-11/lesson.md":G0,"../../../content/courses/python-programming/unit-01/day-12/lesson.md":H0,"../../../content/courses/python-programming/unit-02/day-13/lesson.md":Y0,"../../../content/courses/python-programming/unit-02/day-14/lesson.md":J0,"../../../content/courses/python-programming/unit-02/day-15/lesson.md":Q0,"../../../content/courses/python-programming/unit-02/day-16/lesson.md":K0,"../../../content/courses/python-programming/unit-02/day-17/lesson.md":X0,"../../../content/courses/python-programming/unit-02/day-18/lesson.md":Z0,"../../../content/courses/python-programming/unit-02/day-19/lesson.md":eP,"../../../content/courses/python-programming/unit-02/day-20/lesson.md":tP,"../../../content/courses/python-programming/unit-02/day-21/lesson.md":nP,"../../../content/courses/python-programming/unit-02/day-22/lesson.md":oP,"../../../content/courses/python-programming/unit-02/day-23/lesson.md":rP,"../../../content/courses/python-programming/unit-02/day-24/lesson.md":iP,"../../../content/courses/python-programming/unit-03/day-25/lesson.md":sP,"../../../content/courses/python-programming/unit-03/day-26/lesson.md":aP,"../../../content/courses/python-programming/unit-03/day-27/lesson.md":lP,"../../../content/courses/python-programming/unit-03/day-28/lesson.md":cP,"../../../content/courses/python-programming/unit-03/day-29/lesson.md":dP,"../../../content/courses/python-programming/unit-03/day-30/lesson.md":uP,"../../../content/courses/python-programming/unit-03/day-31/lesson.md":pP,"../../../content/courses/python-programming/unit-03/day-32/lesson.md":mP,"../../../content/courses/python-programming/unit-03/day-33/lesson.md":yP,"../../../content/courses/python-programming/unit-03/day-34/lesson.md":gP,"../../../content/courses/python-programming/unit-03/day-35/lesson.md":hP,"../../../content/courses/python-programming/unit-03/day-36/lesson.md":bP,"../../../content/courses/python-programming/unit-04/day-37/lesson.md":fP,"../../../content/courses/python-programming/unit-04/day-38/lesson.md":_P,"../../../content/courses/python-programming/unit-04/day-39/lesson.md":xP,"../../../content/courses/python-programming/unit-04/day-40/lesson.md":vP,"../../../content/courses/python-programming/unit-04/day-41/lesson.md":wP,"../../../content/courses/python-programming/unit-04/day-42/lesson.md":SP,"../../../content/courses/python-programming/unit-04/day-43/lesson.md":CP,"../../../content/courses/python-programming/unit-04/day-44/lesson.md":TP,"../../../content/courses/python-programming/unit-04/day-45/lesson.md":PP,"../../../content/courses/python-programming/unit-04/day-46/lesson.md":IP,"../../../content/courses/python-programming/unit-04/day-47/lesson.md":$P,"../../../content/courses/python-programming/unit-04/day-48/lesson.md":kP,"../../../content/courses/python-programming/unit-05/day-49/lesson.md":EP,"../../../content/courses/python-programming/unit-05/day-50/lesson.md":jP,"../../../content/courses/python-programming/unit-05/day-51/lesson.md":OP,"../../../content/courses/python-programming/unit-05/day-52/lesson.md":MP,"../../../content/courses/python-programming/unit-05/day-53/lesson.md":zP,"../../../content/courses/python-programming/unit-05/day-54/lesson.md":AP,"../../../content/courses/python-programming/unit-05/day-55/lesson.md":FP,"../../../content/courses/python-programming/unit-05/day-56/lesson.md":DP,"../../../content/courses/python-programming/unit-05/day-57/lesson.md":qP,"../../../content/courses/python-programming/unit-05/day-58/lesson.md":WP,"../../../content/courses/python-programming/unit-05/day-59/lesson.md":RP,"../../../content/courses/python-programming/unit-05/day-60/lesson.md":LP,"../../../content/courses/python-programming/unit-06/day-61/lesson.md":NP,"../../../content/courses/python-programming/unit-06/day-62/lesson.md":UP,"../../../content/courses/python-programming/unit-06/day-63/lesson.md":BP,"../../../content/courses/python-programming/unit-06/day-64/lesson.md":VP,"../../../content/courses/python-programming/unit-06/day-65/lesson.md":GP}),p5=Object.assign({"../../../content/courses/python-programming/unit-01/day-01/story.md":HP,"../../../content/courses/python-programming/unit-01/day-02/story.md":YP,"../../../content/courses/python-programming/unit-01/day-03/story.md":JP,"../../../content/courses/python-programming/unit-01/day-04/story.md":QP,"../../../content/courses/python-programming/unit-01/day-05/story.md":KP,"../../../content/courses/python-programming/unit-01/day-06/story.md":XP,"../../../content/courses/python-programming/unit-01/day-07/story.md":ZP,"../../../content/courses/python-programming/unit-01/day-08/story.md":e2,"../../../content/courses/python-programming/unit-01/day-09/story.md":t2,"../../../content/courses/python-programming/unit-01/day-10/story.md":n2,"../../../content/courses/python-programming/unit-01/day-11/story.md":o2,"../../../content/courses/python-programming/unit-01/day-12/story.md":r2,"../../../content/courses/python-programming/unit-02/day-13/story.md":i2,"../../../content/courses/python-programming/unit-02/day-14/story.md":s2,"../../../content/courses/python-programming/unit-02/day-15/story.md":a2,"../../../content/courses/python-programming/unit-02/day-16/story.md":l2,"../../../content/courses/python-programming/unit-02/day-17/story.md":c2,"../../../content/courses/python-programming/unit-02/day-18/story.md":d2,"../../../content/courses/python-programming/unit-02/day-19/story.md":u2,"../../../content/courses/python-programming/unit-02/day-20/story.md":p2,"../../../content/courses/python-programming/unit-02/day-21/story.md":m2,"../../../content/courses/python-programming/unit-02/day-22/story.md":y2,"../../../content/courses/python-programming/unit-02/day-23/story.md":g2,"../../../content/courses/python-programming/unit-02/day-24/story.md":h2,"../../../content/courses/python-programming/unit-03/day-25/story.md":b2,"../../../content/courses/python-programming/unit-03/day-26/story.md":f2,"../../../content/courses/python-programming/unit-03/day-27/story.md":_2,"../../../content/courses/python-programming/unit-03/day-28/story.md":x2,"../../../content/courses/python-programming/unit-03/day-29/story.md":v2,"../../../content/courses/python-programming/unit-03/day-30/story.md":w2,"../../../content/courses/python-programming/unit-03/day-31/story.md":S2,"../../../content/courses/python-programming/unit-03/day-32/story.md":C2,"../../../content/courses/python-programming/unit-03/day-33/story.md":T2,"../../../content/courses/python-programming/unit-03/day-34/story.md":P2,"../../../content/courses/python-programming/unit-03/day-35/story.md":I2,"../../../content/courses/python-programming/unit-03/day-36/story.md":$2,"../../../content/courses/python-programming/unit-04/day-37/story.md":k2,"../../../content/courses/python-programming/unit-04/day-38/story.md":E2,"../../../content/courses/python-programming/unit-04/day-39/story.md":j2,"../../../content/courses/python-programming/unit-04/day-40/story.md":O2,"../../../content/courses/python-programming/unit-04/day-41/story.md":M2,"../../../content/courses/python-programming/unit-04/day-42/story.md":z2,"../../../content/courses/python-programming/unit-04/day-43/story.md":A2,"../../../content/courses/python-programming/unit-04/day-44/story.md":F2,"../../../content/courses/python-programming/unit-04/day-45/story.md":D2,"../../../content/courses/python-programming/unit-04/day-46/story.md":q2,"../../../content/courses/python-programming/unit-04/day-47/story.md":W2,"../../../content/courses/python-programming/unit-04/day-48/story.md":R2,"../../../content/courses/python-programming/unit-05/day-49/story.md":L2,"../../../content/courses/python-programming/unit-05/day-50/story.md":N2,"../../../content/courses/python-programming/unit-05/day-51/story.md":U2,"../../../content/courses/python-programming/unit-05/day-52/story.md":B2,"../../../content/courses/python-programming/unit-05/day-53/story.md":V2,"../../../content/courses/python-programming/unit-05/day-54/story.md":G2,"../../../content/courses/python-programming/unit-05/day-55/story.md":H2,"../../../content/courses/python-programming/unit-05/day-56/story.md":Y2,"../../../content/courses/python-programming/unit-05/day-57/story.md":J2,"../../../content/courses/python-programming/unit-05/day-58/story.md":Q2,"../../../content/courses/python-programming/unit-05/day-59/story.md":K2,"../../../content/courses/python-programming/unit-05/day-60/story.md":X2,"../../../content/courses/python-programming/unit-06/day-61/story.md":Z2,"../../../content/courses/python-programming/unit-06/day-62/story.md":eI,"../../../content/courses/python-programming/unit-06/day-63/story.md":tI,"../../../content/courses/python-programming/unit-06/day-64/story.md":nI,"../../../content/courses/python-programming/unit-06/day-65/story.md":oI}),m5=Object.assign({"../../../content/courses/python-programming/unit-01/day-01/examples.json":iI,"../../../content/courses/python-programming/unit-01/day-02/examples.json":aI,"../../../content/courses/python-programming/unit-01/day-03/examples.json":cI,"../../../content/courses/python-programming/unit-01/day-04/examples.json":uI,"../../../content/courses/python-programming/unit-01/day-05/examples.json":mI,"../../../content/courses/python-programming/unit-01/day-06/examples.json":gI,"../../../content/courses/python-programming/unit-01/day-07/examples.json":bI,"../../../content/courses/python-programming/unit-01/day-08/examples.json":_I,"../../../content/courses/python-programming/unit-01/day-09/examples.json":vI,"../../../content/courses/python-programming/unit-01/day-10/examples.json":SI,"../../../content/courses/python-programming/unit-01/day-11/examples.json":TI,"../../../content/courses/python-programming/unit-01/day-12/examples.json":II,"../../../content/courses/python-programming/unit-02/day-13/examples.json":kI,"../../../content/courses/python-programming/unit-02/day-14/examples.json":jI,"../../../content/courses/python-programming/unit-02/day-15/examples.json":MI,"../../../content/courses/python-programming/unit-02/day-16/examples.json":AI,"../../../content/courses/python-programming/unit-02/day-17/examples.json":DI,"../../../content/courses/python-programming/unit-02/day-18/examples.json":WI,"../../../content/courses/python-programming/unit-02/day-19/examples.json":LI,"../../../content/courses/python-programming/unit-02/day-20/examples.json":UI,"../../../content/courses/python-programming/unit-02/day-21/examples.json":VI,"../../../content/courses/python-programming/unit-02/day-22/examples.json":HI,"../../../content/courses/python-programming/unit-02/day-23/examples.json":JI,"../../../content/courses/python-programming/unit-02/day-24/examples.json":KI,"../../../content/courses/python-programming/unit-03/day-25/examples.json":ZI,"../../../content/courses/python-programming/unit-03/day-26/examples.json":t$,"../../../content/courses/python-programming/unit-03/day-27/examples.json":o$,"../../../content/courses/python-programming/unit-03/day-28/examples.json":i$,"../../../content/courses/python-programming/unit-03/day-29/examples.json":a$,"../../../content/courses/python-programming/unit-03/day-30/examples.json":c$,"../../../content/courses/python-programming/unit-03/day-31/examples.json":u$,"../../../content/courses/python-programming/unit-03/day-32/examples.json":m$,"../../../content/courses/python-programming/unit-03/day-33/examples.json":g$,"../../../content/courses/python-programming/unit-03/day-34/examples.json":b$,"../../../content/courses/python-programming/unit-03/day-35/examples.json":_$,"../../../content/courses/python-programming/unit-03/day-36/examples.json":v$,"../../../content/courses/python-programming/unit-04/day-37/examples.json":S$,"../../../content/courses/python-programming/unit-04/day-38/examples.json":T$,"../../../content/courses/python-programming/unit-04/day-39/examples.json":I$,"../../../content/courses/python-programming/unit-04/day-40/examples.json":k$,"../../../content/courses/python-programming/unit-04/day-41/examples.json":j$,"../../../content/courses/python-programming/unit-04/day-42/examples.json":M$,"../../../content/courses/python-programming/unit-04/day-43/examples.json":A$,"../../../content/courses/python-programming/unit-04/day-44/examples.json":D$,"../../../content/courses/python-programming/unit-04/day-45/examples.json":W$,"../../../content/courses/python-programming/unit-04/day-46/examples.json":L$,"../../../content/courses/python-programming/unit-04/day-47/examples.json":U$,"../../../content/courses/python-programming/unit-04/day-48/examples.json":V$,"../../../content/courses/python-programming/unit-05/day-49/examples.json":H$,"../../../content/courses/python-programming/unit-05/day-50/examples.json":J$,"../../../content/courses/python-programming/unit-05/day-51/examples.json":K$,"../../../content/courses/python-programming/unit-05/day-52/examples.json":Z$,"../../../content/courses/python-programming/unit-05/day-53/examples.json":tk,"../../../content/courses/python-programming/unit-05/day-54/examples.json":ok,"../../../content/courses/python-programming/unit-05/day-55/examples.json":ik,"../../../content/courses/python-programming/unit-05/day-56/examples.json":ak,"../../../content/courses/python-programming/unit-05/day-57/examples.json":ck,"../../../content/courses/python-programming/unit-05/day-58/examples.json":uk,"../../../content/courses/python-programming/unit-05/day-59/examples.json":mk,"../../../content/courses/python-programming/unit-05/day-60/examples.json":gk,"../../../content/courses/python-programming/unit-06/day-61/examples.json":bk,"../../../content/courses/python-programming/unit-06/day-62/examples.json":_k,"../../../content/courses/python-programming/unit-06/day-63/examples.json":vk,"../../../content/courses/python-programming/unit-06/day-64/examples.json":Sk,"../../../content/courses/python-programming/unit-06/day-65/examples.json":Tk}),y5=Object.assign({"../../../content/courses/python-programming/unit-01/day-01/simulation.json":Ik,"../../../content/courses/python-programming/unit-01/day-02/simulation.json":kk,"../../../content/courses/python-programming/unit-01/day-03/simulation.json":jk,"../../../content/courses/python-programming/unit-01/day-04/simulation.json":Mk,"../../../content/courses/python-programming/unit-01/day-05/simulation.json":Ak,"../../../content/courses/python-programming/unit-01/day-06/simulation.json":Dk,"../../../content/courses/python-programming/unit-01/day-07/simulation.json":Wk,"../../../content/courses/python-programming/unit-01/day-08/simulation.json":Lk,"../../../content/courses/python-programming/unit-01/day-09/simulation.json":Uk,"../../../content/courses/python-programming/unit-01/day-10/simulation.json":Vk,"../../../content/courses/python-programming/unit-01/day-11/simulation.json":Hk,"../../../content/courses/python-programming/unit-01/day-12/simulation.json":Jk,"../../../content/courses/python-programming/unit-02/day-13/simulation.json":Kk,"../../../content/courses/python-programming/unit-02/day-14/simulation.json":Zk,"../../../content/courses/python-programming/unit-02/day-15/simulation.json":tE,"../../../content/courses/python-programming/unit-02/day-16/simulation.json":oE,"../../../content/courses/python-programming/unit-02/day-17/simulation.json":iE,"../../../content/courses/python-programming/unit-02/day-18/simulation.json":aE,"../../../content/courses/python-programming/unit-02/day-19/simulation.json":cE,"../../../content/courses/python-programming/unit-02/day-20/simulation.json":uE,"../../../content/courses/python-programming/unit-02/day-21/simulation.json":mE,"../../../content/courses/python-programming/unit-02/day-22/simulation.json":gE,"../../../content/courses/python-programming/unit-02/day-23/simulation.json":bE,"../../../content/courses/python-programming/unit-02/day-24/simulation.json":_E,"../../../content/courses/python-programming/unit-03/day-25/simulation.json":vE,"../../../content/courses/python-programming/unit-03/day-26/simulation.json":SE,"../../../content/courses/python-programming/unit-03/day-27/simulation.json":TE,"../../../content/courses/python-programming/unit-03/day-28/simulation.json":IE,"../../../content/courses/python-programming/unit-03/day-29/simulation.json":kE,"../../../content/courses/python-programming/unit-03/day-30/simulation.json":jE,"../../../content/courses/python-programming/unit-03/day-31/simulation.json":ME,"../../../content/courses/python-programming/unit-03/day-32/simulation.json":AE,"../../../content/courses/python-programming/unit-03/day-33/simulation.json":DE,"../../../content/courses/python-programming/unit-03/day-34/simulation.json":WE,"../../../content/courses/python-programming/unit-03/day-35/simulation.json":LE,"../../../content/courses/python-programming/unit-03/day-36/simulation.json":UE,"../../../content/courses/python-programming/unit-04/day-37/simulation.json":VE,"../../../content/courses/python-programming/unit-04/day-38/simulation.json":HE,"../../../content/courses/python-programming/unit-04/day-39/simulation.json":JE,"../../../content/courses/python-programming/unit-04/day-40/simulation.json":KE,"../../../content/courses/python-programming/unit-04/day-41/simulation.json":ZE,"../../../content/courses/python-programming/unit-04/day-42/simulation.json":tj,"../../../content/courses/python-programming/unit-04/day-43/simulation.json":oj,"../../../content/courses/python-programming/unit-04/day-44/simulation.json":ij,"../../../content/courses/python-programming/unit-04/day-45/simulation.json":aj,"../../../content/courses/python-programming/unit-04/day-46/simulation.json":cj,"../../../content/courses/python-programming/unit-04/day-47/simulation.json":uj,"../../../content/courses/python-programming/unit-04/day-48/simulation.json":mj,"../../../content/courses/python-programming/unit-05/day-49/simulation.json":gj,"../../../content/courses/python-programming/unit-05/day-50/simulation.json":bj,"../../../content/courses/python-programming/unit-05/day-51/simulation.json":_j,"../../../content/courses/python-programming/unit-05/day-52/simulation.json":vj,"../../../content/courses/python-programming/unit-05/day-53/simulation.json":Sj,"../../../content/courses/python-programming/unit-05/day-54/simulation.json":Tj,"../../../content/courses/python-programming/unit-05/day-55/simulation.json":Ij,"../../../content/courses/python-programming/unit-05/day-56/simulation.json":kj,"../../../content/courses/python-programming/unit-05/day-57/simulation.json":jj,"../../../content/courses/python-programming/unit-05/day-58/simulation.json":Mj,"../../../content/courses/python-programming/unit-05/day-59/simulation.json":Aj,"../../../content/courses/python-programming/unit-05/day-60/simulation.json":Dj,"../../../content/courses/python-programming/unit-06/day-61/simulation.json":Wj,"../../../content/courses/python-programming/unit-06/day-62/simulation.json":Lj,"../../../content/courses/python-programming/unit-06/day-63/simulation.json":Uj,"../../../content/courses/python-programming/unit-06/day-64/simulation.json":Vj,"../../../content/courses/python-programming/unit-06/day-65/simulation.json":Hj}),me=Object.assign({"../../../content/courses/python-programming/unit-01/day-01/problems.json":Jj,"../../../content/courses/python-programming/unit-01/day-02/problems.json":Kj,"../../../content/courses/python-programming/unit-01/day-03/problems.json":Zj,"../../../content/courses/python-programming/unit-01/day-04/problems.json":tO,"../../../content/courses/python-programming/unit-01/day-05/problems.json":oO,"../../../content/courses/python-programming/unit-01/day-06/problems.json":iO,"../../../content/courses/python-programming/unit-01/day-07/problems.json":aO,"../../../content/courses/python-programming/unit-01/day-08/problems.json":cO,"../../../content/courses/python-programming/unit-01/day-09/problems.json":uO,"../../../content/courses/python-programming/unit-01/day-10/problems.json":mO,"../../../content/courses/python-programming/unit-01/day-11/problems.json":gO,"../../../content/courses/python-programming/unit-01/day-12/problems.json":bO,"../../../content/courses/python-programming/unit-02/day-13/problems.json":_O,"../../../content/courses/python-programming/unit-02/day-14/problems.json":vO,"../../../content/courses/python-programming/unit-02/day-15/problems.json":SO,"../../../content/courses/python-programming/unit-02/day-16/problems.json":TO,"../../../content/courses/python-programming/unit-02/day-17/problems.json":IO,"../../../content/courses/python-programming/unit-02/day-18/problems.json":kO,"../../../content/courses/python-programming/unit-02/day-19/problems.json":jO,"../../../content/courses/python-programming/unit-02/day-20/problems.json":MO,"../../../content/courses/python-programming/unit-02/day-21/problems.json":AO,"../../../content/courses/python-programming/unit-02/day-22/problems.json":DO,"../../../content/courses/python-programming/unit-02/day-23/problems.json":WO,"../../../content/courses/python-programming/unit-02/day-24/problems.json":LO,"../../../content/courses/python-programming/unit-03/day-25/problems.json":UO,"../../../content/courses/python-programming/unit-03/day-26/problems.json":VO,"../../../content/courses/python-programming/unit-03/day-27/problems.json":HO,"../../../content/courses/python-programming/unit-03/day-28/problems.json":JO,"../../../content/courses/python-programming/unit-03/day-29/problems.json":KO,"../../../content/courses/python-programming/unit-03/day-30/problems.json":ZO,"../../../content/courses/python-programming/unit-03/day-31/problems.json":tM,"../../../content/courses/python-programming/unit-03/day-32/problems.json":oM,"../../../content/courses/python-programming/unit-03/day-33/problems.json":iM,"../../../content/courses/python-programming/unit-03/day-34/problems.json":aM,"../../../content/courses/python-programming/unit-03/day-35/problems.json":cM,"../../../content/courses/python-programming/unit-03/day-36/problems.json":uM,"../../../content/courses/python-programming/unit-04/day-37/problems.json":mM,"../../../content/courses/python-programming/unit-04/day-38/problems.json":gM,"../../../content/courses/python-programming/unit-04/day-39/problems.json":bM,"../../../content/courses/python-programming/unit-04/day-40/problems.json":_M,"../../../content/courses/python-programming/unit-04/day-41/problems.json":vM,"../../../content/courses/python-programming/unit-04/day-42/problems.json":SM,"../../../content/courses/python-programming/unit-04/day-43/problems.json":TM,"../../../content/courses/python-programming/unit-04/day-44/problems.json":IM,"../../../content/courses/python-programming/unit-04/day-45/problems.json":kM,"../../../content/courses/python-programming/unit-04/day-46/problems.json":jM,"../../../content/courses/python-programming/unit-04/day-47/problems.json":MM,"../../../content/courses/python-programming/unit-04/day-48/problems.json":AM,"../../../content/courses/python-programming/unit-05/day-49/problems.json":DM,"../../../content/courses/python-programming/unit-05/day-50/problems.json":WM,"../../../content/courses/python-programming/unit-05/day-51/problems.json":LM,"../../../content/courses/python-programming/unit-05/day-52/problems.json":UM,"../../../content/courses/python-programming/unit-05/day-53/problems.json":VM,"../../../content/courses/python-programming/unit-05/day-54/problems.json":HM,"../../../content/courses/python-programming/unit-05/day-55/problems.json":JM,"../../../content/courses/python-programming/unit-05/day-56/problems.json":KM,"../../../content/courses/python-programming/unit-05/day-57/problems.json":ZM,"../../../content/courses/python-programming/unit-05/day-58/problems.json":tz,"../../../content/courses/python-programming/unit-05/day-59/problems.json":oz,"../../../content/courses/python-programming/unit-05/day-60/problems.json":iz,"../../../content/courses/python-programming/unit-06/day-61/problems.json":az,"../../../content/courses/python-programming/unit-06/day-62/problems.json":cz,"../../../content/courses/python-programming/unit-06/day-63/problems.json":uz,"../../../content/courses/python-programming/unit-06/day-64/problems.json":mz,"../../../content/courses/python-programming/unit-06/day-65/problems.json":gz}),ye=Object.assign({"../../../content/courses/python-programming/unit-01/day-01/quiz.json":bz,"../../../content/courses/python-programming/unit-01/day-02/quiz.json":_z,"../../../content/courses/python-programming/unit-01/day-03/quiz.json":vz,"../../../content/courses/python-programming/unit-01/day-04/quiz.json":Sz,"../../../content/courses/python-programming/unit-01/day-05/quiz.json":Tz,"../../../content/courses/python-programming/unit-01/day-06/quiz.json":Iz,"../../../content/courses/python-programming/unit-01/day-07/quiz.json":kz,"../../../content/courses/python-programming/unit-01/day-08/quiz.json":jz,"../../../content/courses/python-programming/unit-01/day-09/quiz.json":Mz,"../../../content/courses/python-programming/unit-01/day-10/quiz.json":Az,"../../../content/courses/python-programming/unit-01/day-11/quiz.json":Dz,"../../../content/courses/python-programming/unit-01/day-12/quiz.json":Wz,"../../../content/courses/python-programming/unit-02/day-13/quiz.json":Lz,"../../../content/courses/python-programming/unit-02/day-14/quiz.json":Uz,"../../../content/courses/python-programming/unit-02/day-15/quiz.json":Vz,"../../../content/courses/python-programming/unit-02/day-16/quiz.json":Hz,"../../../content/courses/python-programming/unit-02/day-17/quiz.json":Jz,"../../../content/courses/python-programming/unit-02/day-18/quiz.json":Kz,"../../../content/courses/python-programming/unit-02/day-19/quiz.json":Zz,"../../../content/courses/python-programming/unit-02/day-20/quiz.json":t3,"../../../content/courses/python-programming/unit-02/day-21/quiz.json":o3,"../../../content/courses/python-programming/unit-02/day-22/quiz.json":i3,"../../../content/courses/python-programming/unit-02/day-23/quiz.json":a3,"../../../content/courses/python-programming/unit-02/day-24/quiz.json":c3,"../../../content/courses/python-programming/unit-03/day-25/quiz.json":u3,"../../../content/courses/python-programming/unit-03/day-26/quiz.json":m3,"../../../content/courses/python-programming/unit-03/day-27/quiz.json":g3,"../../../content/courses/python-programming/unit-03/day-28/quiz.json":b3,"../../../content/courses/python-programming/unit-03/day-29/quiz.json":_3,"../../../content/courses/python-programming/unit-03/day-30/quiz.json":v3,"../../../content/courses/python-programming/unit-03/day-31/quiz.json":S3,"../../../content/courses/python-programming/unit-03/day-32/quiz.json":T3,"../../../content/courses/python-programming/unit-03/day-33/quiz.json":I3,"../../../content/courses/python-programming/unit-03/day-34/quiz.json":k3,"../../../content/courses/python-programming/unit-03/day-35/quiz.json":j3,"../../../content/courses/python-programming/unit-03/day-36/quiz.json":M3,"../../../content/courses/python-programming/unit-04/day-37/quiz.json":A3,"../../../content/courses/python-programming/unit-04/day-38/quiz.json":D3,"../../../content/courses/python-programming/unit-04/day-39/quiz.json":W3,"../../../content/courses/python-programming/unit-04/day-40/quiz.json":L3,"../../../content/courses/python-programming/unit-04/day-41/quiz.json":U3,"../../../content/courses/python-programming/unit-04/day-42/quiz.json":V3,"../../../content/courses/python-programming/unit-04/day-43/quiz.json":H3,"../../../content/courses/python-programming/unit-04/day-44/quiz.json":J3,"../../../content/courses/python-programming/unit-04/day-45/quiz.json":K3,"../../../content/courses/python-programming/unit-04/day-46/quiz.json":Z3,"../../../content/courses/python-programming/unit-04/day-47/quiz.json":tA,"../../../content/courses/python-programming/unit-04/day-48/quiz.json":oA,"../../../content/courses/python-programming/unit-05/day-49/quiz.json":iA,"../../../content/courses/python-programming/unit-05/day-50/quiz.json":aA,"../../../content/courses/python-programming/unit-05/day-51/quiz.json":cA,"../../../content/courses/python-programming/unit-05/day-52/quiz.json":uA,"../../../content/courses/python-programming/unit-05/day-53/quiz.json":mA,"../../../content/courses/python-programming/unit-05/day-54/quiz.json":gA,"../../../content/courses/python-programming/unit-05/day-55/quiz.json":bA,"../../../content/courses/python-programming/unit-05/day-56/quiz.json":_A,"../../../content/courses/python-programming/unit-05/day-57/quiz.json":vA,"../../../content/courses/python-programming/unit-05/day-58/quiz.json":SA,"../../../content/courses/python-programming/unit-05/day-59/quiz.json":TA,"../../../content/courses/python-programming/unit-05/day-60/quiz.json":IA,"../../../content/courses/python-programming/unit-06/day-61/quiz.json":kA,"../../../content/courses/python-programming/unit-06/day-62/quiz.json":jA,"../../../content/courses/python-programming/unit-06/day-63/quiz.json":MA,"../../../content/courses/python-programming/unit-06/day-64/quiz.json":AA,"../../../content/courses/python-programming/unit-06/day-65/quiz.json":DA}),Ee={"python-programming":XA},Xe={"python-programming":c5};function z4(){return Object.values(Ee)}function he(e){return Ee[e]||Ee["python-programming"]}function A4(e){return Xe[e]||Xe["python-programming"]}function F4(e,o){const t=he(e);return t.units.find(n=>n.id===o)||t.units[0]}function H(e,o,t,n){const s=`${o}/${t}/${n}`,i=Object.keys(e).find(l=>l.replace(/\\/g,"/").includes(s)),a=i?e[i]:null;return(a==null?void 0:a.default)!==void 0?a.default:a}function i1(e,o,t){return H(d5,o,t,"chapter.json")||null}function D4(e,o,t){const n=H(u5,o,t,"lesson.md");return typeof n=="string"?n:"# Lesson Content Not Found"}function q4(e,o,t){const n=H(p5,o,t,"story.md");return typeof n=="string"?n:null}function W4(e,o,t){return H(y5,o,t,"simulation.json")||null}function R4(e,o,t){const n=H(m5,o,t,"examples.json");return Array.isArray(n)?n:[]}function g5(e,o,t){const n=H(me,o,t,"problems.json");return Array.isArray(n)?n:[]}function L4(e,o,t){const n=H(ye,o,t,"quiz.json");return Array.isArray(n)?n:[]}function h5(e="python-programming"){var t;const o=[];for(const n in me)if(n.includes(e)){const s=((t=me[n])==null?void 0:t.default)||me[n]||[];o.push(...s)}return o}function N4(e,o="python-programming"){return h5(o).find(n=>n.id===e)||null}function U4(e,o=null,t=null){var s;const n=[];for(const i in ye)if(i.includes(e)){if(o&&!i.includes(`/${o}/`)||t&&!i.includes(`/${t}/`))continue;const a=((s=ye[i])==null?void 0:s.default)||ye[i]||[];n.push(...a)}return n}function je(e="python-programming"){const o=he(e),t=[];return o.units.forEach(n=>{n.chapters.forEach(s=>{const i=i1(e,n.id,s);t.push({courseId:e,unitId:n.id,unitNumber:n.unitNumber,romanNumber:n.romanNumber,unitTitle:n.title,chapterId:s,chapterTitle:(i==null?void 0:i.title)||s,order:(i==null?void 0:i.order)||0})})}),t}function B4(e,o,t){const n=je(e),s=n.findIndex(l=>l.unitId===o&&l.chapterId===t),i=s>0?n[s-1]:null,a=s<n.length-1?n[s+1]:null;return{prev:i,next:a,current:n[s]||null,totalCount:n.length,currentIndex:s+1}}function b5(e="python-programming"){const o=he(e),t=[];return o.units.forEach(n=>{t.push({id:`${e}-${n.id}`,type:"Unit",title:`${n.romanNumber}: ${n.title}`,description:n.description,url:`/courses/${e}/unit/${n.id}`,tags:["unit",n.romanNumber,...n.outcomes]}),n.chapters.forEach(s=>{const i=i1(e,n.id,s);i&&t.push({id:`${e}-${n.id}-${s}`,type:"Chapter",title:i.title,description:i.description,url:`/courses/${e}/chapter/${s}`,tags:["chapter",i.difficulty,...i.outcomes||[]]}),g5(e,n.id,s).forEach(l=>{t.push({id:l.id,type:"Practice Problem",title:`Practice: ${l.title}`,description:l.description,url:`/practice/${l.id}`,tags:["problem",l.difficulty,...l.skills||[],...l.coMapping||[]]})})})}),t}const G=Ae((e,o)=>({userId:"guest",courseId:"python-programming",completedLessons:[],completedChapters:[],completedUnits:[],solvedProblems:{},testScores:{},streakDays:1,lastActiveDate:new Date().toISOString().split("T")[0],totalPoints:0,loadUserProgress:t=>{const n=Ke.getLocalProgress(t),s=new Date().toISOString().split("T")[0];let i=n.streakDays||1;if(n.lastActiveDate&&n.lastActiveDate!==s){const a=new Date(n.lastActiveDate),l=Math.round((new Date(s)-a)/(1e3*60*60*24));l===1?i+=1:l>1&&(i=1)}e({userId:t,completedLessons:n.completedLessons||[],completedChapters:n.completedChapters||[],completedUnits:n.completedUnits||[],solvedProblems:n.solvedProblems||{},testScores:n.testScores||{},streakDays:i,lastActiveDate:s,totalPoints:n.totalPoints||0})},markLessonComplete:(t,n,s)=>{const i=o();if(i.completedLessons.includes(t))return;const a=[...i.completedLessons,t],l=i.completedChapters.includes(n)?i.completedChapters:[...i.completedChapters,n],c=he(i.courseId).units.find(x=>x.id===s);let m=[...i.completedUnits];c&&c.chapters.every(x=>l.includes(x))&&(m.includes(s)||m.push(s));const b=i.totalPoints+20;e({completedLessons:a,completedChapters:l,completedUnits:m,totalPoints:b}),o()._persistAndSync()},recordProblemSolved:(t,n,s=1)=>{const i=o(),a=i.solvedProblems[t]||{attempts:0,passed:!1},l=!a.passed,g={...i.solvedProblems,[t]:{passed:!0,attempts:a.attempts+s,bestCode:n,updatedAt:Date.now()}},c=i.totalPoints+(l?50:5);e({solvedProblems:g,totalPoints:c}),o()._persistAndSync()},recordTestResult:(t,n,s,i=null,a=null)=>{const l=o(),g=Math.round(n/s*100),c=g>=60,m={...l.testScores,[t]:{score:n,maxScore:s,percentage:g,passed:c,attemptedAt:Date.now()}},b=c?n*10:n*2,v=l.totalPoints+b;let x=[...l.completedChapters];a&&c&&!x.includes(a)&&x.push(a);let T=[...l.completedUnits];i&&c&&!T.includes(i)&&T.push(i),e({testScores:m,completedChapters:x,completedUnits:T,totalPoints:v}),o()._persistAndSync(),Ie.enqueue({type:"RECORD_TEST",userId:l.userId,data:{testId:t,score:n,maxScore:s,percentage:g,passed:c,unitId:i,chapterId:a,courseId:l.courseId}}),l.userId&&!l.userId.startsWith("guest")&&Ie.enqueue({type:"UPDATE_LEADERBOARD",userId:l.userId,data:{score:v,completedUnits:T.length,completedChapters:x.length,courseId:l.courseId}})},_persistAndSync:()=>{const t=o(),n={courseId:t.courseId,completedLessons:t.completedLessons,completedChapters:t.completedChapters,completedUnits:t.completedUnits,solvedProblems:t.solvedProblems,testScores:t.testScores,streakDays:t.streakDays,lastActiveDate:t.lastActiveDate,totalPoints:t.totalPoints};Ke.saveLocalProgress(t.userId,n),t.userId&&t.userId!=="guest"&&Ie.enqueue({type:"SAVE_PROGRESS",userId:t.userId,data:n})},getOutcomeMastery:()=>{const t=o(),n={CO1:{total:0,completed:0,percent:0,bloom:"Understand"},CO2:{total:0,completed:0,percent:0,bloom:"Create"},CO3:{total:0,completed:0,percent:0,bloom:"Apply"},CO4:{total:0,completed:0,percent:0,bloom:"Apply"},CO5:{total:0,completed:0,percent:0,bloom:"Apply"}};return je(t.courseId).forEach(i=>{let a="CO1";i.unitId==="unit-01"?a="CO1":i.unitId==="unit-02"?a="CO2":i.unitId==="unit-03"?a="CO3":i.unitId==="unit-04"?a="CO4":(i.unitId==="unit-05"||i.unitId==="unit-06")&&(a="CO5"),n[a]&&(n[a].total+=1,t.completedChapters.includes(i.chapterId)&&(n[a].completed+=1))}),Object.keys(n).forEach(i=>{const a=n[i].total||1;n[i].percent=Math.min(100,Math.round(n[i].completed/a*100))}),n},getCourseCompletionPercentage:()=>{const t=o(),s=je(t.courseId).length||65;return Math.min(100,Math.round(t.completedChapters.length/s*100))}})),s1=Ae((e,o)=>({user:null,isLoading:!0,isAuthenticated:!1,isGuest:!1,initAuth:()=>te.onAuthChange(t=>{e({user:t,isLoading:!1,isAuthenticated:!!t,isGuest:!!(t!=null&&t.isAnonymous)}),t?G.getState().loadUserProgress(t.uid):G.getState().loadUserProgress("guest")}),login:async(t,n)=>{e({isLoading:!0});try{const s=await te.login(t,n);return e({user:s,isAuthenticated:!0,isGuest:!1,isLoading:!1}),G.getState().loadUserProgress(s.uid),{success:!0}}catch(s){return e({isLoading:!1}),{success:!1,error:s.message}}},register:async(t,n,s)=>{e({isLoading:!0});try{const i=await te.register(t,n,s);return e({user:i,isAuthenticated:!0,isGuest:!1,isLoading:!1}),G.getState().loadUserProgress(i.uid),{success:!0}}catch(i){return e({isLoading:!1}),{success:!1,error:i.message}}},loginAsGuest:async()=>{e({isLoading:!0});try{const t=await te.loginAsGuest();return e({user:t,isAuthenticated:!0,isGuest:!0,isLoading:!1}),G.getState().loadUserProgress(t.uid),{success:!0}}catch(t){return e({isLoading:!1}),{success:!1,error:t.message}}},logout:async()=>{e({isLoading:!0}),await te.logout(),e({user:null,isAuthenticated:!1,isGuest:!1,isLoading:!1}),G.getState().loadUserProgress("guest")}})),f5=()=>{try{return localStorage.getItem("bytelab_story_mode")==="true"}catch{return!1}},Oe=Ae(e=>({isCmdKOpen:!1,isMobileNavOpen:!1,isSidebarOpen:!0,isStoryMode:f5(),isMobileCurriculumOpen:!1,openCmdK:()=>e({isCmdKOpen:!0}),closeCmdK:()=>e({isCmdKOpen:!1}),toggleCmdK:()=>e(o=>({isCmdKOpen:!o.isCmdKOpen})),openMobileNav:()=>e({isMobileNavOpen:!0}),closeMobileNav:()=>e({isMobileNavOpen:!1}),toggleMobileNav:()=>e(o=>({isMobileNavOpen:!o.isMobileNavOpen})),toggleSidebar:()=>e(o=>({isSidebarOpen:!o.isSidebarOpen})),setSidebarOpen:o=>e({isSidebarOpen:o}),toggleMobileCurriculum:()=>e(o=>({isMobileCurriculumOpen:!o.isMobileCurriculumOpen})),closeMobileCurriculum:()=>e({isMobileCurriculumOpen:!1}),setStoryMode:o=>{try{localStorage.setItem("bytelab_story_mode",String(o))}catch{}e({isStoryMode:o})},toggleStoryMode:()=>e(o=>{const t=!o.isStoryMode;try{localStorage.setItem("bytelab_story_mode",String(t))}catch{}return{isStoryMode:t}})}));function a1(e){var o,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(o=0;o<s;o++)e[o]&&(t=a1(e[o]))&&(n&&(n+=" "),n+=t)}else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function _5(){for(var e,o,t=0,n="",s=arguments.length;t<s;t++)(e=arguments[t])&&(o=a1(e))&&(n&&(n+=" "),n+=o);return n}const x5=(e,o)=>{const t=new Array(e.length+o.length);for(let n=0;n<e.length;n++)t[n]=e[n];for(let n=0;n<o.length;n++)t[e.length+n]=o[n];return t},v5=(e,o)=>({classGroupId:e,validator:o}),l1=(e=new Map,o=null,t)=>({nextPart:e,validators:o,classGroupId:t}),ge="-",Ze=[],w5="arbitrary..",S5=e=>{const o=T5(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:n}=e;return{getClassGroupId:a=>{if(a.startsWith("[")&&a.endsWith("]"))return C5(a);const l=a.split(ge),g=l[0]===""&&l.length>1?1:0;return c1(l,g,o)},getConflictingClassGroupIds:(a,l)=>{if(l){const g=n[a],c=t[a];return g?c?x5(c,g):g:c||Ze}return t[a]||Ze}}},c1=(e,o,t)=>{if(e.length-o===0)return t.classGroupId;const s=e[o],i=t.nextPart.get(s);if(i){const c=c1(e,o+1,i);if(c)return c}const a=t.validators;if(a===null)return;const l=o===0?e.join(ge):e.slice(o).join(ge),g=a.length;for(let c=0;c<g;c++){const m=a[c];if(m.validator(l))return m.classGroupId}},C5=e=>e.slice(1,-1).indexOf(":")===-1?void 0:(()=>{const o=e.slice(1,-1),t=o.indexOf(":"),n=o.slice(0,t);return n?w5+n:void 0})(),T5=e=>{const{theme:o,classGroups:t}=e;return P5(t,o)},P5=(e,o)=>{const t=l1();for(const n in e){const s=e[n];Fe(s,t,n,o)}return t},Fe=(e,o,t,n)=>{const s=e.length;for(let i=0;i<s;i++){const a=e[i];I5(a,o,t,n)}},I5=(e,o,t,n)=>{if(typeof e=="string"){$5(e,o,t);return}if(typeof e=="function"){k5(e,o,t,n);return}E5(e,o,t,n)},$5=(e,o,t)=>{const n=e===""?o:d1(o,e);n.classGroupId=t},k5=(e,o,t,n)=>{if(j5(e)){Fe(e(n),o,t,n);return}o.validators===null&&(o.validators=[]),o.validators.push(v5(t,e))},E5=(e,o,t,n)=>{const s=Object.entries(e),i=s.length;for(let a=0;a<i;a++){const[l,g]=s[a];Fe(g,d1(o,l),t,n)}},d1=(e,o)=>{let t=e;const n=o.split(ge),s=n.length;for(let i=0;i<s;i++){const a=n[i];let l=t.nextPart.get(a);l||(l=l1(),t.nextPart.set(a,l)),t=l}return t},j5=e=>"isThemeGetter"in e&&e.isThemeGetter===!0,O5=e=>{if(e<1)return{get:()=>{},set:()=>{}};let o=0,t=Object.create(null),n=Object.create(null);const s=(i,a)=>{t[i]=a,o++,o>e&&(o=0,n=t,t=Object.create(null))};return{get(i){let a=t[i];if(a!==void 0)return a;if((a=n[i])!==void 0)return s(i,a),a},set(i,a){i in t?t[i]=a:s(i,a)}}},Me="!",et=":",M5=[],tt=(e,o,t,n,s)=>({modifiers:e,hasImportantModifier:o,baseClassName:t,maybePostfixModifierPosition:n,isExternal:s}),z5=e=>{const{prefix:o,experimentalParseClassName:t}=e;let n=s=>{const i=[];let a=0,l=0,g=0,c;const m=s.length;for(let _=0;_<m;_++){const M=s[_];if(a===0&&l===0){if(M===et){i.push(s.slice(g,_)),g=_+1;continue}if(M==="/"){c=_;continue}}M==="["?a++:M==="]"?a--:M==="("?l++:M===")"&&l--}const b=i.length===0?s:s.slice(g);let v=b,x=!1;b.endsWith(Me)?(v=b.slice(0,-1),x=!0):b.startsWith(Me)&&(v=b.slice(1),x=!0);const T=c&&c>g?c-g:void 0;return tt(i,x,v,T)};if(o){const s=o+et,i=n;n=a=>a.startsWith(s)?i(a.slice(s.length)):tt(M5,!1,a,void 0,!0)}if(t){const s=n;n=i=>t({className:i,parseClassName:s})}return n},A5=e=>{const o=new Map;return e.orderSensitiveModifiers.forEach((t,n)=>{o.set(t,1e6+n)}),t=>{const n=[];let s=[];for(let i=0;i<t.length;i++){const a=t[i],l=a[0]==="[",g=o.has(a);l||g?(s.length>0&&(s.sort(),n.push(...s),s=[]),n.push(a)):s.push(a)}return s.length>0&&(s.sort(),n.push(...s)),n}},F5=e=>({cache:O5(e.cacheSize),parseClassName:z5(e),sortModifiers:A5(e),postfixLookupClassGroupIds:D5(e),...S5(e)}),D5=e=>{const o=Object.create(null),t=e.postfixLookupClassGroups;if(t)for(let n=0;n<t.length;n++)o[t[n]]=!0;return o},q5=/\s+/,W5=(e,o)=>{const{parseClassName:t,getClassGroupId:n,getConflictingClassGroupIds:s,sortModifiers:i,postfixLookupClassGroupIds:a}=o,l=[],g=e.trim().split(q5);let c="";for(let m=g.length-1;m>=0;m-=1){const b=g[m],{isExternal:v,modifiers:x,hasImportantModifier:T,baseClassName:_,maybePostfixModifierPosition:M}=t(b);if(v){c=b+(c.length>0?" "+c:c);continue}let U=!!M,k;if(U){const q=_.substring(0,M);k=n(q);const p=k&&a[k]?n(_):void 0;p&&p!==k&&(k=p,U=!1)}else k=n(_);if(!k){if(!U){c=b+(c.length>0?" "+c:c);continue}if(k=n(_),!k){c=b+(c.length>0?" "+c:c);continue}U=!1}const Z=x.length===0?"":x.length===1?x[0]:i(x).join(":"),J=T?Z+Me:Z,Q=J+k;if(l.indexOf(Q)>-1)continue;l.push(Q);const K=s(k,U);for(let q=0;q<K.length;++q){const p=K[q];l.push(J+p)}c=b+(c.length>0?" "+c:c)}return c},R5=(...e)=>{let o=0,t,n,s="";for(;o<e.length;)(t=e[o++])&&(n=u1(t))&&(s&&(s+=" "),s+=n);return s},u1=e=>{if(typeof e=="string")return e;let o,t="";for(let n=0;n<e.length;n++)e[n]&&(o=u1(e[n]))&&(t&&(t+=" "),t+=o);return t},L5=(e,...o)=>{let t,n,s,i;const a=g=>{const c=o.reduce((m,b)=>b(m),e());return t=F5(c),n=t.cache.get,s=t.cache.set,i=l,l(g)},l=g=>{const c=n(g);if(c)return c;const m=W5(g,t);return s(g,m),m};return i=a,(...g)=>i(R5(...g))},N5=[],S=e=>{const o=t=>t[e]||N5;return o.isThemeGetter=!0,o},p1=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,m1=/^\((?:(\w[\w-]*):)?(.+)\)$/i,U5=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,B5=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,V5=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,G5=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,H5=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Y5=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,L=e=>U5.test(e),h=e=>!!e&&!Number.isNaN(Number(e)),F=e=>!!e&&Number.isInteger(Number(e)),$e=e=>e.endsWith("%")&&h(e.slice(0,-1)),W=e=>B5.test(e),y1=()=>!0,J5=e=>V5.test(e)&&!G5.test(e),De=()=>!1,Q5=e=>H5.test(e),K5=e=>Y5.test(e),X5=e=>!d(e)&&!u(e),Z5=e=>e.startsWith("@container")&&(e[10]==="/"&&e[11]!==void 0||e[11]==="s"&&e[16]!==void 0&&e.startsWith("-size/",10)||e[11]==="n"&&e[18]!==void 0&&e.startsWith("-normal/",10)),e4=e=>N(e,b1,De),d=e=>p1.test(e),V=e=>N(e,f1,J5),nt=e=>N(e,l4,h),t4=e=>N(e,x1,y1),n4=e=>N(e,_1,De),ot=e=>N(e,g1,De),o4=e=>N(e,h1,K5),ue=e=>N(e,v1,Q5),u=e=>m1.test(e),ne=e=>Y(e,f1),r4=e=>Y(e,_1),rt=e=>Y(e,g1),i4=e=>Y(e,b1),s4=e=>Y(e,h1),pe=e=>Y(e,v1,!0),a4=e=>Y(e,x1,!0),N=(e,o,t)=>{const n=p1.exec(e);return n?n[1]?o(n[1]):t(n[2]):!1},Y=(e,o,t=!1)=>{const n=m1.exec(e);return n?n[1]?o(n[1]):t:!1},g1=e=>e==="position"||e==="percentage",h1=e=>e==="image"||e==="url",b1=e=>e==="length"||e==="size"||e==="bg-size",f1=e=>e==="length",l4=e=>e==="number",_1=e=>e==="family-name",x1=e=>e==="number"||e==="weight",v1=e=>e==="shadow",c4=()=>{const e=S("color"),o=S("font"),t=S("text"),n=S("font-weight"),s=S("tracking"),i=S("leading"),a=S("breakpoint"),l=S("container"),g=S("spacing"),c=S("radius"),m=S("shadow"),b=S("inset-shadow"),v=S("text-shadow"),x=S("drop-shadow"),T=S("blur"),_=S("perspective"),M=S("aspect"),U=S("ease"),k=S("animate"),Z=()=>["auto","avoid","all","avoid-page","page","left","right","column"],J=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],Q=()=>[...J(),u,d],K=()=>["auto","hidden","clip","visible","scroll"],q=()=>["auto","contain","none"],p=()=>[u,d,g],E=()=>[L,"full","auto",...p()],qe=()=>[F,"none","subgrid",u,d],We=()=>["auto",{span:["full",F,u,d]},F,u,d],oe=()=>[F,"auto",u,d],Re=()=>["auto","min","max","fr",u,d],be=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],X=()=>["start","end","center","stretch","center-safe","end-safe"],z=()=>["auto",...p()],B=()=>[L,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...p()],fe=()=>[L,"screen","full","dvw","lvw","svw","min","max","fit",...p()],_e=()=>[L,"screen","full","lh","dvh","lvh","svh","min","max","fit",...p()],y=()=>[e,u,d],Le=()=>[...J(),rt,ot,{position:[u,d]}],Ne=()=>["no-repeat",{repeat:["","x","y","space","round"]}],Ue=()=>["auto","cover","contain",i4,e4,{size:[u,d]}],xe=()=>[$e,ne,V],P=()=>["","none","full",c,u,d],I=()=>["",h,ne,V],re=()=>["solid","dashed","dotted","double"],Be=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],C=()=>[h,$e,rt,ot],Ve=()=>["","none",T,u,d],ie=()=>["none",h,u,d],se=()=>["none",h,u,d],ve=()=>[h,u,d],ae=()=>[L,"full",...p()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[W],breakpoint:[W],color:[y1],container:[W],"drop-shadow":[W],ease:["in","out","in-out"],font:[X5],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[W],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[W],shadow:[W],spacing:["px",h],text:[W],"text-shadow":[W],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",L,d,u,M]}],container:["container"],"container-type":[{"@container":["","normal","size",u,d]}],"container-named":[Z5],columns:[{columns:[h,d,u,l]}],"break-after":[{"break-after":Z()}],"break-before":[{"break-before":Z()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:Q()}],overflow:[{overflow:K()}],"overflow-x":[{"overflow-x":K()}],"overflow-y":[{"overflow-y":K()}],overscroll:[{overscroll:q()}],"overscroll-x":[{"overscroll-x":q()}],"overscroll-y":[{"overscroll-y":q()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:E()}],"inset-x":[{"inset-x":E()}],"inset-y":[{"inset-y":E()}],start:[{"inset-s":E(),start:E()}],end:[{"inset-e":E(),end:E()}],"inset-bs":[{"inset-bs":E()}],"inset-be":[{"inset-be":E()}],top:[{top:E()}],right:[{right:E()}],bottom:[{bottom:E()}],left:[{left:E()}],visibility:["visible","invisible","collapse"],z:[{z:[F,"auto",u,d]}],basis:[{basis:[L,"full","auto",l,...p()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[h,L,"auto","initial","none",d]}],grow:[{grow:["",h,u,d]}],shrink:[{shrink:["",h,u,d]}],order:[{order:[F,"first","last","none",u,d]}],"grid-cols":[{"grid-cols":qe()}],"col-start-end":[{col:We()}],"col-start":[{"col-start":oe()}],"col-end":[{"col-end":oe()}],"grid-rows":[{"grid-rows":qe()}],"row-start-end":[{row:We()}],"row-start":[{"row-start":oe()}],"row-end":[{"row-end":oe()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":Re()}],"auto-rows":[{"auto-rows":Re()}],gap:[{gap:p()}],"gap-x":[{"gap-x":p()}],"gap-y":[{"gap-y":p()}],"justify-content":[{justify:[...be(),"normal"]}],"justify-items":[{"justify-items":[...X(),"normal"]}],"justify-self":[{"justify-self":["auto",...X()]}],"align-content":[{content:["normal",...be()]}],"align-items":[{items:[...X(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...X(),{baseline:["","last"]}]}],"place-content":[{"place-content":be()}],"place-items":[{"place-items":[...X(),"baseline"]}],"place-self":[{"place-self":["auto",...X()]}],p:[{p:p()}],px:[{px:p()}],py:[{py:p()}],ps:[{ps:p()}],pe:[{pe:p()}],pbs:[{pbs:p()}],pbe:[{pbe:p()}],pt:[{pt:p()}],pr:[{pr:p()}],pb:[{pb:p()}],pl:[{pl:p()}],m:[{m:z()}],mx:[{mx:z()}],my:[{my:z()}],ms:[{ms:z()}],me:[{me:z()}],mbs:[{mbs:z()}],mbe:[{mbe:z()}],mt:[{mt:z()}],mr:[{mr:z()}],mb:[{mb:z()}],ml:[{ml:z()}],"space-x":[{"space-x":p()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":p()}],"space-y-reverse":["space-y-reverse"],size:[{size:B()}],"inline-size":[{inline:["auto",...fe()]}],"min-inline-size":[{"min-inline":["auto",...fe()]}],"max-inline-size":[{"max-inline":["none",...fe()]}],"block-size":[{block:["auto",..._e()]}],"min-block-size":[{"min-block":["auto",..._e()]}],"max-block-size":[{"max-block":["none",..._e()]}],w:[{w:[l,"screen",...B()]}],"min-w":[{"min-w":[l,"screen","none",...B()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[a]},...B()]}],h:[{h:["screen","lh",...B()]}],"min-h":[{"min-h":["screen","lh","none",...B()]}],"max-h":[{"max-h":["screen","lh",...B()]}],"font-size":[{text:["base",t,ne,V]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[n,a4,t4]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",$e,d]}],"font-family":[{font:[r4,n4,o]}],"font-features":[{"font-features":[d]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[s,u,d]}],"line-clamp":[{"line-clamp":[h,"none",u,nt]}],leading:[{leading:[i,...p()]}],"list-image":[{"list-image":["none",u,d]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",u,d]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:y()}],"text-color":[{text:y()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...re(),"wavy"]}],"text-decoration-thickness":[{decoration:[h,"from-font","auto",u,V]}],"text-decoration-color":[{decoration:y()}],"underline-offset":[{"underline-offset":[h,"auto",u,d]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:p()}],"tab-size":[{tab:[F,u,d]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",u,d]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",u,d]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:Le()}],"bg-repeat":[{bg:Ne()}],"bg-size":[{bg:Ue()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},F,u,d],radial:["",u,d],conic:[F,u,d]},s4,o4]}],"bg-color":[{bg:y()}],"gradient-from-pos":[{from:xe()}],"gradient-via-pos":[{via:xe()}],"gradient-to-pos":[{to:xe()}],"gradient-from":[{from:y()}],"gradient-via":[{via:y()}],"gradient-to":[{to:y()}],rounded:[{rounded:P()}],"rounded-s":[{"rounded-s":P()}],"rounded-e":[{"rounded-e":P()}],"rounded-t":[{"rounded-t":P()}],"rounded-r":[{"rounded-r":P()}],"rounded-b":[{"rounded-b":P()}],"rounded-l":[{"rounded-l":P()}],"rounded-ss":[{"rounded-ss":P()}],"rounded-se":[{"rounded-se":P()}],"rounded-ee":[{"rounded-ee":P()}],"rounded-es":[{"rounded-es":P()}],"rounded-tl":[{"rounded-tl":P()}],"rounded-tr":[{"rounded-tr":P()}],"rounded-br":[{"rounded-br":P()}],"rounded-bl":[{"rounded-bl":P()}],"border-w":[{border:I()}],"border-w-x":[{"border-x":I()}],"border-w-y":[{"border-y":I()}],"border-w-s":[{"border-s":I()}],"border-w-e":[{"border-e":I()}],"border-w-bs":[{"border-bs":I()}],"border-w-be":[{"border-be":I()}],"border-w-t":[{"border-t":I()}],"border-w-r":[{"border-r":I()}],"border-w-b":[{"border-b":I()}],"border-w-l":[{"border-l":I()}],"divide-x":[{"divide-x":I()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":I()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...re(),"hidden","none"]}],"divide-style":[{divide:[...re(),"hidden","none"]}],"border-color":[{border:y()}],"border-color-x":[{"border-x":y()}],"border-color-y":[{"border-y":y()}],"border-color-s":[{"border-s":y()}],"border-color-e":[{"border-e":y()}],"border-color-bs":[{"border-bs":y()}],"border-color-be":[{"border-be":y()}],"border-color-t":[{"border-t":y()}],"border-color-r":[{"border-r":y()}],"border-color-b":[{"border-b":y()}],"border-color-l":[{"border-l":y()}],"divide-color":[{divide:y()}],"outline-style":[{outline:[...re(),"none","hidden"]}],"outline-offset":[{"outline-offset":[h,u,d]}],"outline-w":[{outline:["",h,ne,V]}],"outline-color":[{outline:y()}],shadow:[{shadow:["","none",m,pe,ue]}],"shadow-color":[{shadow:y()}],"inset-shadow":[{"inset-shadow":["none",b,pe,ue]}],"inset-shadow-color":[{"inset-shadow":y()}],"ring-w":[{ring:I()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:y()}],"ring-offset-w":[{"ring-offset":[h,V]}],"ring-offset-color":[{"ring-offset":y()}],"inset-ring-w":[{"inset-ring":I()}],"inset-ring-color":[{"inset-ring":y()}],"text-shadow":[{"text-shadow":["none",v,pe,ue]}],"text-shadow-color":[{"text-shadow":y()}],opacity:[{opacity:[h,u,d]}],"mix-blend":[{"mix-blend":[...Be(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Be()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[h]}],"mask-image-linear-from-pos":[{"mask-linear-from":C()}],"mask-image-linear-to-pos":[{"mask-linear-to":C()}],"mask-image-linear-from-color":[{"mask-linear-from":y()}],"mask-image-linear-to-color":[{"mask-linear-to":y()}],"mask-image-t-from-pos":[{"mask-t-from":C()}],"mask-image-t-to-pos":[{"mask-t-to":C()}],"mask-image-t-from-color":[{"mask-t-from":y()}],"mask-image-t-to-color":[{"mask-t-to":y()}],"mask-image-r-from-pos":[{"mask-r-from":C()}],"mask-image-r-to-pos":[{"mask-r-to":C()}],"mask-image-r-from-color":[{"mask-r-from":y()}],"mask-image-r-to-color":[{"mask-r-to":y()}],"mask-image-b-from-pos":[{"mask-b-from":C()}],"mask-image-b-to-pos":[{"mask-b-to":C()}],"mask-image-b-from-color":[{"mask-b-from":y()}],"mask-image-b-to-color":[{"mask-b-to":y()}],"mask-image-l-from-pos":[{"mask-l-from":C()}],"mask-image-l-to-pos":[{"mask-l-to":C()}],"mask-image-l-from-color":[{"mask-l-from":y()}],"mask-image-l-to-color":[{"mask-l-to":y()}],"mask-image-x-from-pos":[{"mask-x-from":C()}],"mask-image-x-to-pos":[{"mask-x-to":C()}],"mask-image-x-from-color":[{"mask-x-from":y()}],"mask-image-x-to-color":[{"mask-x-to":y()}],"mask-image-y-from-pos":[{"mask-y-from":C()}],"mask-image-y-to-pos":[{"mask-y-to":C()}],"mask-image-y-from-color":[{"mask-y-from":y()}],"mask-image-y-to-color":[{"mask-y-to":y()}],"mask-image-radial":[{"mask-radial":[u,d]}],"mask-image-radial-from-pos":[{"mask-radial-from":C()}],"mask-image-radial-to-pos":[{"mask-radial-to":C()}],"mask-image-radial-from-color":[{"mask-radial-from":y()}],"mask-image-radial-to-color":[{"mask-radial-to":y()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":J()}],"mask-image-conic-pos":[{"mask-conic":[h]}],"mask-image-conic-from-pos":[{"mask-conic-from":C()}],"mask-image-conic-to-pos":[{"mask-conic-to":C()}],"mask-image-conic-from-color":[{"mask-conic-from":y()}],"mask-image-conic-to-color":[{"mask-conic-to":y()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:Le()}],"mask-repeat":[{mask:Ne()}],"mask-size":[{mask:Ue()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",u,d]}],filter:[{filter:["","none",u,d]}],blur:[{blur:Ve()}],brightness:[{brightness:[h,u,d]}],contrast:[{contrast:[h,u,d]}],"drop-shadow":[{"drop-shadow":["","none",x,pe,ue]}],"drop-shadow-color":[{"drop-shadow":y()}],grayscale:[{grayscale:["",h,u,d]}],"hue-rotate":[{"hue-rotate":[h,u,d]}],invert:[{invert:["",h,u,d]}],saturate:[{saturate:[h,u,d]}],sepia:[{sepia:["",h,u,d]}],"backdrop-filter":[{"backdrop-filter":["","none",u,d]}],"backdrop-blur":[{"backdrop-blur":Ve()}],"backdrop-brightness":[{"backdrop-brightness":[h,u,d]}],"backdrop-contrast":[{"backdrop-contrast":[h,u,d]}],"backdrop-grayscale":[{"backdrop-grayscale":["",h,u,d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[h,u,d]}],"backdrop-invert":[{"backdrop-invert":["",h,u,d]}],"backdrop-opacity":[{"backdrop-opacity":[h,u,d]}],"backdrop-saturate":[{"backdrop-saturate":[h,u,d]}],"backdrop-sepia":[{"backdrop-sepia":["",h,u,d]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":p()}],"border-spacing-x":[{"border-spacing-x":p()}],"border-spacing-y":[{"border-spacing-y":p()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",u,d]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[h,"initial",u,d]}],ease:[{ease:["linear","initial",U,u,d]}],delay:[{delay:[h,u,d]}],animate:[{animate:["none",k,u,d]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[_,u,d]}],"perspective-origin":[{"perspective-origin":Q()}],rotate:[{rotate:ie()}],"rotate-x":[{"rotate-x":ie()}],"rotate-y":[{"rotate-y":ie()}],"rotate-z":[{"rotate-z":ie()}],scale:[{scale:se()}],"scale-x":[{"scale-x":se()}],"scale-y":[{"scale-y":se()}],"scale-z":[{"scale-z":se()}],"scale-3d":["scale-3d"],skew:[{skew:ve()}],"skew-x":[{"skew-x":ve()}],"skew-y":[{"skew-y":ve()}],transform:[{transform:[u,d,"","none","gpu","cpu"]}],"transform-origin":[{origin:Q()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:ae()}],"translate-x":[{"translate-x":ae()}],"translate-y":[{"translate-y":ae()}],"translate-z":[{"translate-z":ae()}],"translate-none":["translate-none"],zoom:[{zoom:[F,u,d]}],accent:[{accent:y()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:y()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",u,d]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scrollbar-thumb-color":[{"scrollbar-thumb":y()}],"scrollbar-track-color":[{"scrollbar-track":y()}],"scrollbar-gutter":[{"scrollbar-gutter":["auto","stable","both"]}],"scrollbar-w":[{scrollbar:["auto","thin","none"]}],"scroll-m":[{"scroll-m":p()}],"scroll-mx":[{"scroll-mx":p()}],"scroll-my":[{"scroll-my":p()}],"scroll-ms":[{"scroll-ms":p()}],"scroll-me":[{"scroll-me":p()}],"scroll-mbs":[{"scroll-mbs":p()}],"scroll-mbe":[{"scroll-mbe":p()}],"scroll-mt":[{"scroll-mt":p()}],"scroll-mr":[{"scroll-mr":p()}],"scroll-mb":[{"scroll-mb":p()}],"scroll-ml":[{"scroll-ml":p()}],"scroll-p":[{"scroll-p":p()}],"scroll-px":[{"scroll-px":p()}],"scroll-py":[{"scroll-py":p()}],"scroll-ps":[{"scroll-ps":p()}],"scroll-pe":[{"scroll-pe":p()}],"scroll-pbs":[{"scroll-pbs":p()}],"scroll-pbe":[{"scroll-pbe":p()}],"scroll-pt":[{"scroll-pt":p()}],"scroll-pr":[{"scroll-pr":p()}],"scroll-pb":[{"scroll-pb":p()}],"scroll-pl":[{"scroll-pl":p()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",u,d]}],fill:[{fill:["none",...y()]}],"stroke-w":[{stroke:[h,ne,V,nt]}],stroke:[{stroke:["none",...y()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{"container-named":["container-type"],overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},postfixLookupClassGroups:["container-type"],orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},d4=L5(c4);function ze({children:e,variant:o="primary",size:t="md",className:n="",disabled:s=!1,onClick:i,type:a="button",icon:l,...g}){const c="inline-flex items-center justify-center select-none font-medium transition-all duration-150 btn-press cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none rounded-full",m={sm:"text-[13px] px-3.5 py-1.5 gap-1.5 min-h-[32px]",md:"text-[14px] px-5 py-2 gap-2 min-h-[36px]",lg:"text-[15px] px-6 py-2.5 gap-2.5 min-h-[44px]"},b={primary:"bg-[#000000] hover:bg-[#171717] active:bg-[#090909] text-white shadow-xs",secondary:"bg-white hover:bg-[#fafafa] text-[#000000] border border-[#d4d4d4] active:bg-[#f0f0f0]","pill-on-dark":"bg-white hover:bg-[#f5f5f5] text-[#000000] active:bg-[#e5e5e5]",ghost:"bg-transparent hover:bg-black/5 text-[#000000] border-0",danger:"bg-red-600 hover:bg-red-700 active:bg-red-800 text-white"};return r.jsxs("button",{type:a,disabled:s,onClick:i,className:d4(_5(c,m[t],b[o],n)),...g,children:[l&&r.jsx(l,{className:"w-4 h-4 shrink-0"}),e]})}function w1(){var x,T;const e=st(),{user:o,isAuthenticated:t,isGuest:n,logout:s}=s1(),{streakDays:i,totalPoints:a}=G(),{openCmdK:l,isMobileNavOpen:g,toggleMobileNav:c,closeMobileNav:m}=Oe(),b=[{label:"Curriculum",path:"/courses/python-programming"},{label:"Courses",path:"/courses"},{label:"Playground",path:"/practice"},{label:"Assessments",path:"/tests"},{label:"Analytics",path:"/progress"},{label:"Rankings",path:"/leaderboard"}],v=_=>_==="/courses"?e.pathname==="/courses":e.pathname.startsWith(_);return r.jsxs(r.Fragment,{children:[r.jsx("header",{className:"sticky top-0 z-40 w-full h-[56px] bg-white border-b border-[#e5e5e5] select-none",children:r.jsxs("div",{className:"max-w-[1440px] h-full mx-auto px-4 md:px-8 flex items-center justify-between text-[14px]",children:[r.jsxs("div",{className:"flex items-center gap-8",children:[r.jsxs($,{to:"/",onClick:m,className:"flex items-center gap-2.5 text-[#000000] font-semibold text-[17px] tracking-tight",children:[r.jsx("div",{className:"w-7 h-7 rounded-[8px] bg-[#000000] flex items-center justify-center text-white shadow-xs",children:r.jsx(at,{className:"w-4 h-4"})}),r.jsx("span",{className:"font-display",children:"ByteLab"})]}),r.jsx("nav",{className:"hidden lg:flex items-center gap-6 text-[14px] text-[#525252]",children:b.map(_=>r.jsx($,{to:_.path,className:`transition-colors py-1 ${v(_.path)?"text-[#000000] font-semibold":"hover:text-[#000000]"}`,children:_.label},_.path))})]}),r.jsx("div",{className:"hidden md:flex items-center justify-center",children:r.jsxs("button",{onClick:l,className:"flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fafafa] hover:bg-white border border-[#e5e5e5] text-[#737373] hover:text-[#000000] transition-colors cursor-pointer text-[13px] w-[240px] lg:w-[320px] justify-between focus:ring-2 focus:ring-[#3b82f6]/50",title:"Search curriculum & concepts (Ctrl+K)",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(ke,{className:"w-3.5 h-3.5 text-[#a3a3a3]"}),r.jsx("span",{children:"Search topics & concepts..."})]}),r.jsx("kbd",{className:"bg-[#e5e5e5] text-[#525252] px-1.5 py-0.5 rounded text-[10px] font-mono",children:"⌘K"})]})}),r.jsxs("div",{className:"flex items-center gap-3",children:[t&&r.jsxs("div",{className:"hidden sm:flex items-center gap-3 px-3 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[12px]",children:[r.jsxs("div",{className:"flex items-center gap-1 text-amber-500 font-semibold",title:"Active Learning Streak",children:[r.jsx(O1,{className:"w-3.5 h-3.5 fill-current"}),r.jsxs("span",{children:[i,"d"]})]}),r.jsx("div",{className:"w-[1px] h-3 bg-[#e5e5e5]"}),r.jsxs("div",{className:"flex items-center gap-1 text-[#000000] font-semibold",title:"Verified Points",children:[r.jsx(M1,{className:"w-3.5 h-3.5"}),r.jsxs("span",{children:[a," pts"]})]})]}),t?r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs($,{to:"/profile",className:"flex items-center gap-2 text-[#000000] hover:opacity-80 transition-opacity",children:[r.jsx("div",{className:"w-7 h-7 rounded-full bg-[#171717] text-white flex items-center justify-center text-[12px] font-semibold",children:((T=(x=o==null?void 0:o.displayName)==null?void 0:x[0])==null?void 0:T.toUpperCase())||"S"}),r.jsx("span",{className:"hidden sm:inline font-medium text-[13px] truncate max-w-[100px]",children:(o==null?void 0:o.displayName)||"Student"})]}),r.jsx("button",{onClick:s,className:"p-1.5 text-[#737373] hover:text-[#000000] rounded-full transition-colors",title:"Sign Out",children:r.jsx(Ge,{className:"w-4 h-4"})})]}):r.jsxs("div",{className:"flex items-center gap-1.5 sm:gap-2",children:[r.jsx($,{to:"/login",className:"hidden sm:inline-block text-[13px] font-medium text-[#000000] hover:text-[#525252] px-3 py-1.5",children:"Sign in"}),r.jsx($,{to:"/courses/python-programming",children:r.jsxs(ze,{variant:"primary",size:"sm",children:[r.jsx("span",{className:"hidden sm:inline",children:"Start Learning"}),r.jsx("span",{className:"sm:hidden",children:"Start"})]})})]}),r.jsx("button",{onClick:c,className:"lg:hidden p-1.5 text-[#000000] hover:bg-[#fafafa] rounded-full","aria-label":"Toggle Navigation",children:g?r.jsx(lt,{className:"w-5 h-5"}):r.jsx(z1,{className:"w-5 h-5"})})]})]})}),g&&r.jsx("div",{className:"fixed inset-0 top-[56px] z-30 bg-white border-b border-[#e5e5e5] p-6 lg:hidden animate-in slide-in-from-top-2 duration-150",children:r.jsxs("div",{className:"flex flex-col gap-4 text-[16px]",children:[r.jsxs("button",{onClick:()=>{m(),l()},className:"flex items-center justify-between px-4 py-2.5 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[14px] text-[#737373]",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(ke,{className:"w-4 h-4"}),r.jsx("span",{children:"Search curriculum..."})]}),r.jsx("span",{className:"font-mono text-[11px]",children:"⌘K"})]}),b.map(_=>r.jsx($,{to:_.path,onClick:m,className:`py-2 border-b border-[#e5e5e5] ${v(_.path)?"text-[#000000] font-bold":"text-[#525252]"}`,children:_.label},_.path)),r.jsx("div",{className:"pt-4 flex flex-col gap-3",children:t?r.jsxs(r.Fragment,{children:[r.jsxs($,{to:"/profile",onClick:m,className:"py-2 flex items-center gap-2 text-[#000000] font-medium",children:[r.jsx(A1,{className:"w-4 h-4"}),r.jsx("span",{children:"My Account & Progress"})]}),r.jsxs("button",{onClick:()=>{s(),m()},className:"py-2 flex items-center gap-2 text-red-600 font-medium text-left",children:[r.jsx(Ge,{className:"w-4 h-4"}),r.jsx("span",{children:"Sign Out"})]})]}):r.jsx($,{to:"/login",onClick:m,className:"w-full text-center bg-[#000000] text-white py-2.5 rounded-full font-medium",children:"Sign In / Create Account"})})]})})]})}function u4(){return r.jsx("footer",{className:"w-full bg-white border-t border-[#e5e5e5] text-[#737373] py-10 select-none text-[13px]",children:r.jsxs("div",{className:"max-w-[1440px] mx-auto px-4 md:px-8 space-y-6",children:[r.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4",children:[r.jsxs("div",{className:"flex items-center gap-2 text-[#000000] font-semibold text-[15px]",children:[r.jsx("div",{className:"w-6 h-6 rounded-[6px] bg-[#000000] flex items-center justify-center text-white",children:r.jsx(at,{className:"w-3.5 h-3.5"})}),r.jsx("span",{children:"ByteLab LMS"}),r.jsx("span",{className:"text-[12px] font-normal text-[#737373] ml-2",children:"19AI301 / CS3301 Python Programming"})]}),r.jsxs("div",{className:"flex flex-wrap items-center gap-6 text-[#525252]",children:[r.jsx($,{to:"/courses/python-programming",className:"hover:text-[#000000] transition-colors",children:"Curriculum"}),r.jsx($,{to:"/courses",className:"hover:text-[#000000] transition-colors",children:"Courses"}),r.jsx($,{to:"/practice",className:"hover:text-[#000000] transition-colors",children:"Playground"}),r.jsx($,{to:"/tests",className:"hover:text-[#000000] transition-colors",children:"Assessments"}),r.jsx($,{to:"/progress",className:"hover:text-[#000000] transition-colors",children:"Outcome Analytics"}),r.jsx($,{to:"/leaderboard",className:"hover:text-[#000000] transition-colors",children:"Leaderboard"})]})]}),r.jsxs("div",{className:"pt-4 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#a3a3a3]",children:[r.jsxs("div",{children:["© ",new Date().getFullYear()," ByteLab LMS. Autonomous client-side Python execution engine with Pyodide WebAssembly."]}),r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsxs("span",{className:"flex items-center gap-1 text-[#525252]",children:[r.jsx(F1,{className:"w-3.5 h-3.5 text-emerald-600"}),r.jsx("span",{children:"Zero-Backend Client Sandbox"})]}),r.jsx("span",{children:"•"}),r.jsx("span",{children:"Free & Open Learning Resources"})]})]})]})})}function p4(){const e=T1(),{isCmdKOpen:o,closeCmdK:t}=Oe(),[n,s]=f.useState(""),i=f.useMemo(()=>b5("python-programming"),[]),a=f.useMemo(()=>new iC(i,{keys:["title","description","tags","type"],threshold:.35,ignoreLocation:!0}),[i]),l=f.useMemo(()=>n.trim()?a.search(n).map(m=>m.item).slice(0,10):i.slice(0,8),[n,a,i]);if(f.useEffect(()=>{const m=b=>{(b.ctrlKey||b.metaKey)&&b.key==="k"&&(b.preventDefault(),Oe.getState().toggleCmdK()),b.key==="Escape"&&o&&t()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[o,t]),!o)return null;const g=m=>{t(),s(""),e(m)},c=m=>{switch(m){case"Unit":return r.jsx(L1,{className:"w-4 h-4 text-blue-500"});case"Chapter":return r.jsx(R1,{className:"w-4 h-4 text-emerald-500"});case"Practice Problem":return r.jsx(W1,{className:"w-4 h-4 text-purple-500"});default:return r.jsx(q1,{className:"w-4 h-4 text-gray-500"})}};return r.jsxs("div",{className:"fixed inset-0 z-50 flex items-start justify-center pt-20 px-4",children:[r.jsx("div",{className:"fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",onClick:t}),r.jsxs("div",{className:"relative w-full max-w-2xl bg-white rounded-[18px] shadow-2xl border border-[#e0e0e0] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150",children:[r.jsxs("div",{className:"flex items-center px-4 border-b border-[#e0e0e0] bg-[#fafafc]",children:[r.jsx(ke,{className:"w-5 h-5 text-[#7a7a7a] mr-3 shrink-0"}),r.jsx("input",{type:"text",autoFocus:!0,placeholder:"Search lessons, concepts, exercises (e.g. 'recursion', 'numpy', 'matrix')...",value:n,onChange:m=>s(m.target.value),className:"w-full py-4 text-[16px] text-[#1d1d1f] bg-transparent outline-none placeholder-[#a1a1a6]"}),r.jsx("button",{onClick:t,className:"p-1 text-[#7a7a7a] hover:text-[#1d1d1f] rounded-full",children:r.jsx(lt,{className:"w-5 h-5"})})]}),r.jsx("div",{className:"max-h-[380px] overflow-y-auto p-2",children:l.length>0?r.jsx("div",{className:"space-y-1",children:l.map(m=>r.jsxs("button",{onClick:()=>g(m.url),className:"w-full flex items-center justify-between p-3 rounded-[10px] text-left hover:bg-[#f5f5f7] transition-colors group cursor-pointer",children:[r.jsxs("div",{className:"flex items-start gap-3 overflow-hidden",children:[r.jsx("div",{className:"mt-0.5 p-1.5 rounded-[6px] bg-white border border-[#e0e0e0] shrink-0",children:c(m.type)}),r.jsxs("div",{className:"truncate",children:[r.jsxs("div",{className:"text-[14px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] flex items-center gap-2",children:[r.jsx("span",{className:"truncate",children:m.title}),r.jsx("span",{className:"text-[11px] font-normal text-[#7a7a7a] bg-[#f0f0f0] px-1.5 py-0.2 rounded shrink-0",children:m.type})]}),r.jsx("p",{className:"text-[12px] text-[#7a7a7a] truncate mt-0.5",children:m.description})]})]}),r.jsx(D1,{className:"w-4 h-4 text-[#a1a1a6] opacity-0 group-hover:opacity-100 group-hover:text-[#0066cc] transition-all shrink-0 ml-2"})]},m.id))}):r.jsxs("div",{className:"py-12 text-center text-[#7a7a7a]",children:[r.jsx("p",{className:"text-[15px] font-medium text-[#1d1d1f]",children:"No matching results"}),r.jsx("p",{className:"text-[13px] mt-1",children:'Try searching for keywords like "recursion", "list", "lambda", "gcd", or "pandas"'})]})}),r.jsxs("div",{className:"px-4 py-2.5 bg-[#f5f5f7] border-t border-[#e0e0e0] flex items-center justify-between text-[11px] text-[#7a7a7a]",children:[r.jsxs("span",{children:["Use ",r.jsx("b",{children:"↑ ↓"})," to navigate, ",r.jsx("b",{children:"ESC"})," to close"]}),r.jsxs("span",{children:[r.jsx("b",{children:"27"})," Chapters • ",r.jsx("b",{children:"60"})," Periods Curriculum"]})]})]})]})}function m4(){const{initAuth:e}=s1(),o=st();f.useEffect(()=>{const n=e();return()=>{typeof n=="function"&&n()}},[e]);const t=o.pathname.startsWith("/practice")||o.pathname.startsWith("/tests");return r.jsxs("div",{className:"min-h-screen flex flex-col bg-white text-[#1d1d1f] font-sans antialiased",children:[r.jsx(w1,{}),r.jsx("div",{className:"flex-1 flex flex-col",children:r.jsx(P1,{})}),!t&&r.jsx(u4,{}),r.jsx(p4,{}),r.jsx(N1,{position:"top-center",toastOptions:{style:{borderRadius:"12px",background:"#1d1d1f",color:"#ffffff",border:"1px solid rgba(255,255,255,0.1)"}}})]})}function y4(){const e=I1();return console.error("Router Boundary Caught:",e),r.jsxs("div",{className:"min-h-screen flex flex-col bg-white font-sans text-[#1d1d1f]",children:[r.jsx(w1,{}),r.jsx("div",{className:"flex-1 flex items-center justify-center p-6",children:r.jsxs("div",{className:"max-w-md w-full bg-[#fafafa] rounded-[16px] border border-[#e5e5e5] p-8 text-center space-y-6 shadow-sm",children:[r.jsx("div",{className:"w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600",children:r.jsx(U1,{className:"w-8 h-8"})}),r.jsxs("div",{className:"space-y-2",children:[r.jsx("h1",{className:"text-xl font-semibold text-black",children:"Application Error"}),r.jsx("p",{className:"text-sm text-[#737373]",children:"Something unexpected happened. We've logged this issue."})]}),r.jsx("div",{className:"bg-[#171717] text-[#a3a3a3] p-4 rounded-[8px] text-[12px] font-mono text-left overflow-x-auto whitespace-pre",children:(e==null?void 0:e.statusText)||(e==null?void 0:e.message)||"Unknown error occurred"}),r.jsxs("div",{className:"flex items-center justify-center gap-3 pt-4 border-t border-[#e5e5e5]",children:[r.jsxs(ze,{variant:"secondary",onClick:()=>window.location.reload(),children:[r.jsx(B1,{className:"w-4 h-4 mr-2"}),"Reload Page"]}),r.jsx($,{to:"/",children:r.jsxs(ze,{variant:"primary",children:[r.jsx(V1,{className:"w-4 h-4 mr-2"}),"Go Home"]})})]})]})})]})}const g4=f.lazy(()=>O(()=>import("./HomePage-CqKVB-4n.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])).then(e=>({default:e.HomePage}))),h4=f.lazy(()=>O(()=>import("./CourseCatalogPage-DPrPgjJb.js"),__vite__mapDeps([9,1,2,3,10,11,12,5,6,7,8])).then(e=>({default:e.CourseCatalogPage}))),b4=f.lazy(()=>O(()=>import("./CourseOverviewPage-BwWiaSG3.js"),__vite__mapDeps([13,1,2,3,11,12,5,6,7,8])).then(e=>({default:e.CourseOverviewPage}))),f4=f.lazy(()=>O(()=>import("./UnitOverviewPage-DE9-KC3n.js"),__vite__mapDeps([14,1,2,3,10,12,5,6,7,8])).then(e=>({default:e.UnitOverviewPage}))),_4=f.lazy(()=>O(()=>import("./LessonPage-BFPSz-0I.js"),__vite__mapDeps([15,1,2,5,3,11,12,4,6,7,8])).then(e=>({default:e.LessonPage}))),it=f.lazy(()=>O(()=>import("./PracticePage-BXFTuUV7.js"),__vite__mapDeps([16,1,2,5,3,17,18,6,7,8,12,4])).then(e=>({default:e.PracticePage}))),x4=f.lazy(()=>O(()=>import("./TestSessionPage-BE92Fmqr.js"),__vite__mapDeps([19,1,2,5,3,11,12,7,6,8])).then(e=>({default:e.TestSessionPage}))),v4=f.lazy(()=>O(()=>import("./ProgressDashboardPage-dQJOlVkw.js"),__vite__mapDeps([20,1,2,3,11,12,5,6,7,8])).then(e=>({default:e.ProgressDashboardPage}))),w4=f.lazy(()=>O(()=>import("./LeaderboardPage-xo2qvm3X.js"),__vite__mapDeps([21,1,2,12,5,6,7,8])).then(e=>({default:e.LeaderboardPage}))),S4=f.lazy(()=>O(()=>import("./ProfilePage-CIrVdMN6.js"),__vite__mapDeps([22,1,2,3,12,5,6,7,8])).then(e=>({default:e.ProfilePage}))),C4=f.lazy(()=>O(()=>import("./LoginPage-LcJsdH2V.js"),__vite__mapDeps([23,1,2,5,6,7,8])).then(e=>({default:e.LoginPage}))),T4=f.lazy(()=>O(()=>import("./RegisterPage-B7xwQUQF.js"),__vite__mapDeps([24,1,2,5,6,7,8])).then(e=>({default:e.RegisterPage}))),j=()=>r.jsx("div",{className:"flex-1 flex items-center justify-center min-h-[50vh]",children:r.jsx("div",{className:"w-8 h-8 rounded-full border-2 border-[#e5e5e5] border-t-black animate-spin"})}),P4=$1([{path:"/",element:r.jsx(m4,{}),errorElement:r.jsx(y4,{}),children:[{index:!0,element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(g4,{})})},{path:"courses",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(h4,{})})},{path:"courses/:courseId",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(b4,{})})},{path:"courses/:courseId/unit/:unitId",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(f4,{})})},{path:"courses/:courseId/chapter/:chapterId",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(_4,{})})},{path:"practice",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(it,{})})},{path:"practice/:problemId",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(it,{})})},{path:"tests",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(x4,{})})},{path:"progress",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(v4,{})})},{path:"leaderboard",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(w4,{})})},{path:"profile",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(S4,{})})},{path:"login",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(C4,{})})},{path:"register",element:r.jsx(f.Suspense,{fallback:r.jsx(j,{}),children:r.jsx(T4,{})})},{path:"*",element:r.jsx(k1,{to:"/",replace:!0})}]}],{basename:"/bytelab/",future:{v7_startTransition:!0,v7_relativeSplatPath:!0,v7_fetcherPersist:!0,v7_normalizeFormMethod:!0,v7_partialHydration:!0,v7_skipActionErrorRevalidation:!0}});lC.createRoot(document.getElementById("root")).render(r.jsx(E1.StrictMode,{children:r.jsx(j1,{router:P4,future:{v7_startTransition:!0}})}));export{ze as B,O as _,G as a,z4 as b,je as c,A4 as d,F4 as e,i1 as f,he as g,_5 as h,D4 as i,q4 as j,W4 as k,R4 as l,g5 as m,L4 as n,Oe as o,B4 as p,M4 as q,h5 as r,N4 as s,d4 as t,s1 as u,U4 as v,w};
