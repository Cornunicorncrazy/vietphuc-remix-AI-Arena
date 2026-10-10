const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={};vm.createContext(ctx);
for(const f of ['locomotive.js','carriages-heritage.js','carriage-tet.js','carriages-classic.js','train-art.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),ctx);
const svg=vm.runInContext('renderTrain()',ctx);
assert.match(svg,/viewBox="0 0 11000 360"/);
assert.equal((svg.match(/data-car-name=/g)||[]).length,10);
for(const title of ['HÀNH TRÌNH DI SẢN','THE HANOI TRAIN','SJourney','DALAT PLATEAU RAIL ROAD'])assert.ok(svg.includes(title),title);
const gallery=`<!doctype html><html lang="vi"><meta charset="utf-8"><title>Năm toa tàu mới</title><style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#eeede3;color:#253c35;font-family:Arial}h1{margin:0 0 20px;font:32px Georgia}main{display:grid;grid-template-columns:1fr 1fr;gap:18px}article{border:1px solid #b4bbae;border-radius:12px;padding:14px;background:#f7f6ed}h2{font-size:15px;margin:0 0 7px;font-weight:500}svg{width:100%;height:auto;display:block}</style><h1>Năm toa tàu mới</h1><main id="gallery"></main><script src="locomotive.js"></script><script src="carriages-heritage.js"></script><script src="carriage-tet.js"></script><script src="carriages-classic.js"></script><script src="train-art.js"></script><script>const drawing=renderTrain();const shared=drawing.slice(drawing.indexOf('<defs>'),drawing.indexOf('</defs>')+7);const types=[['Hành trình Di sản',renderHeritageCar],['Hà Nội hai tầng',renderHanoiCar],['Tranh Tết',renderTetCar],['SJourney',renderJourneyCar],['Toa cổ Đà Lạt',renderDalatCar]];document.querySelector('#gallery').innerHTML=types.map(([name,render])=>'<article><h2>'+name+'</h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 360">'+shared+render()+'</svg></article>').join('');</script></html>`;
fs.writeFileSync('dist/qa-new-cars.html',gallery);
console.log('PASS: ten train positions and all five new carriage variants render.');

