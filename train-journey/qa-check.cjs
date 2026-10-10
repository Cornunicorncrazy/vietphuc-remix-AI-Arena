const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('dist/orientation.js','utf8');
function detect(ua,touch,width,height,platform='Win32',uaMobile=false){
 const classes=new Set(),vars={};
 const root={style:{setProperty:(k,v)=>vars[k]=v},classList:{toggle:(k,on)=>on?classes.add(k):classes.delete(k)}};
 const window={innerWidth:width,innerHeight:height,addEventListener(){},visualViewport:null};
 const context={window,navigator:{userAgent:ua,maxTouchPoints:touch,platform,userAgentData:{mobile:uaMobile}},document:{documentElement:root},requestAnimationFrame:fn=>fn()};
 vm.runInNewContext(code,context);return {state:window.trainViewport,classes,vars};
}
for(const width of [1280,700,390])assert.equal(detect('Mozilla/5.0 Windows NT Chrome',0,width,844).state.rotated,false);
assert.equal(detect('Mozilla/5.0 Windows NT Chrome',5,390,844).state.rotated,false);
let phone=detect('Mozilla/5.0 iPhone Mobile',5,390,844,'iPhone');assert.equal(phone.state.rotated,true);assert.equal(phone.state.width,844);assert.equal(phone.state.height,390);
assert.equal(detect('Mozilla/5.0 Android Mobile',5,390,844,'Linux',true).state.rotated,true);
assert.equal(detect('Mozilla/5.0 Macintosh Safari',5,390,844,'MacIntel').state.rotated,true);
assert.equal(detect('Mozilla/5.0 iPhone Mobile',5,844,390,'iPhone').state.rotated,false);
let html=fs.readFileSync('dist/index.html','utf8');html=html.replace('<script src="orientation.js">',`<script>Object.defineProperty(navigator,'userAgent',{get:()=> 'Mozilla/5.0 iPhone Mobile'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});Object.defineProperty(navigator,'platform',{get:()=> 'iPhone'});</script><script src="orientation.js">`);fs.writeFileSync('dist/qa-mobile.html',html);
console.log('PASS: small desktop windows (including touch desktop), iPhone, Android, iPad desktop mode, phone landscape. Mobile visual QA fixture prepared.');
