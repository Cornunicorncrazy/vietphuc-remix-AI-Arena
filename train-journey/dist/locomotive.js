// D19E diesel locomotive, drawn side-on with the driving cab facing left.
function renderLocomotive(){
  const spring=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-10" y="-3" width="20" height="37" rx="5" fill="#172024"/>${Array.from({length:7},(_,i)=>`<path d="M-11 ${i*4}h22" stroke="#7b8075" stroke-width="2.5"/>`).join('')}<path d="M-14-4h28m-28 36h28" stroke="#424e4e" stroke-width="4"/></g>`;
  const bogie=x=>`<g transform="translate(${x} 288)"><path d="M-125-9h250v12H-125z" fill="#172127"/>${[-79,0,79].map(p=>`<g transform="translate(${p} 21)"><circle r="24" fill="#151b20" stroke="#53605e" stroke-width="3"/><circle r="19" fill="url(#steel)" stroke="#8a9185" stroke-width="1.5"/><circle r="12" fill="#263237"/><circle r="6" fill="#969b8b"/><path d="M-13 13q13 8 26 0" stroke="#afb3a1" fill="none" stroke-width="1.2"/></g>`).join('')}<path d="M-115 1h230l9 12-12 9h-33l-17-10H-62l-17 10h-33l-12-9z" fill="#465352" stroke="#798075" stroke-width="1.5"/>${[-40,40].map(p=>spring(p,-9)).join('')}${[-79,0,79].map(p=>`<rect x="${p-10}" y="12" width="20" height="15" rx="3" fill="#677169" stroke="#adb19b"/><circle cx="${p}" cy="19" r="4" fill="#343f3d"/>`).join('')}<path d="M-117 30h234m-215-34h196" stroke="#273336" stroke-width="4"/><path d="M-106 7h42m128 0h42" stroke="#a2a595" stroke-width="2"/></g>`;
  const vent=(x,w,y=86,h=144)=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#1a2b38" stroke="#315872" stroke-width="3"/>${Array.from({length:Math.floor(h/9)},(_,i)=>`<path d="M${x+3} ${y+5+i*9}h${w-6}" stroke="${y+5+i*9<151?'#3c7396':'#855570'}" stroke-width="4"/><path d="M${x+3} ${y+8+i*9}h${w-6}" stroke="#101e28" stroke-width="2"/>`).join('')}<path d="M${x+2} ${y+2}v${h-4}" stroke="#9ca4a2" opacity=".3"/></g>`;
  const window=(x,y,w,h)=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#172631" stroke="#62797f" stroke-width="2"/><rect x="${x+5}" y="${y+5}" width="${w-10}" height="${h-10}" rx="5" fill="url(#glass)"/><path d="M${x+9} ${y+7}h${w-21}l-18 ${h-15}h-${w-27}z" fill="#abc8ca" opacity=".12"/></g>`;
  return `<defs><linearGradient id="locoBlue" x2="0" y2="1"><stop stop-color="#236895"/><stop offset=".55" stop-color="#185680"/><stop offset="1" stop-color="#12426d"/></linearGradient><linearGradient id="locoPurple" x2="0" y2="1"><stop stop-color="#a1688c"/><stop offset=".5" stop-color="#895278"/><stop offset="1" stop-color="#734365"/></linearGradient><linearGradient id="locoNose" x2="1" y2=".2"><stop stop-color="#c1c8bb"/><stop offset=".5" stop-color="#f0eee0"/><stop offset="1" stop-color="#ced0c5"/></linearGradient></defs>
  <path d="M63 281h987v14H69z" fill="#1a272d"/>
  <rect x="377" y="291" width="225" height="30" rx="4" fill="#29383c" stroke="#586560"/><path d="M389 299h199m-199 8h199" stroke="#65716a"/><rect x="630" y="289" width="83" height="29" rx="2" fill="#26363b"/><path d="M638 293v20m12-20v20m12-20v20m12-20v20m12-20v20m12-20v20" stroke="#465651"/>
  ${bogie(237)}${bogie(865)}
  <path d="M24 199l45-117q16-38 51-39h886q44 0 63 35l9 196q0 10-13 12H69q-23 0-32-19z" fill="url(#locoBlue)" stroke="#233e52" stroke-width="2"/>
  <path d="M39 151l49-58q20-18 36-17l69 77h883v76H32z" fill="url(#locoPurple)"/>
  <path d="M42 144l50-51q18-16 32-13l53 65 39-23 28 32h831v7H213l-29-27-30 16H38z" fill="#d9d7c6"/>
  <path d="M31 228h1045v8H33z" fill="#dfdbbc"/><path d="M33 237h1043v7H35z" fill="#c8a632"/>
  <path d="M45 257h75l-17 28H68q-14 0-23-28z" fill="#173f61"/>
  <path d="M79 70q21-27 49-27h877q37 0 53 26H99z" fill="url(#metalRoof)" stroke="#536776"/>
  <path d="M131 48h861m-868 14h911" stroke="#eef0e2" opacity=".4"/><path d="M153 41h124l9 8H145z" fill="#4f6067"/><path d="M342 34h129l9 12H334z" fill="#788486" stroke="#485e65"/><path d="M350 38h113m-113 4h113" stroke="#b9c3bf"/>
  ${[528,681,824,955].map(x=>`<path d="M${x} 47v-10h43v10" fill="none" stroke="#465b64" stroke-width="3"/>`).join('')}
  <path d="M107 71q-15 1-23 20L43 192l25 27h67l57-67-52-73z" fill="url(#locoNose)"/>
  <path d="M93 88l-34 76 32 1 31-79z" fill="url(#glass)" stroke="#536269" stroke-width="4"/><path d="M128 86l-28 80h50l22-25-35-55z" fill="url(#glass)" stroke="#536269" stroke-width="4"/>
  <path d="M67 157l16-17m29 18 27-27" stroke="#1d2f38" stroke-width="3"/><path d="M60 176h86" stroke="#7d8a82" stroke-width="3"/><circle cx="63" cy="177" r="3" fill="#c7cbb8"/>
  ${window(160,81,67,64)}
  <path d="M244 78h69v151h-69z" fill="#396080" stroke="#698190"/><path d="M244 151h69v77h-69z" fill="#8c567c"/><path d="M244 152h69" stroke="#e2ddc5" stroke-width="6"/>
  ${window(259,91,39,43)}<path d="M302 165h-13m8-4v8" stroke="#c4c5b7" stroke-width="3"/><path d="M233 85v150m89-150v150" stroke="#b1b5a6" stroke-width="3"/><path d="M233 90v142m89-142v142" stroke="#43515a" stroke-width="1"/>
  <path d="M242 249h69m-68 9h66m-62 9h60m-56 9h49" stroke="#849185" stroke-width="4"/>
  ${vent(343,84)}${vent(446,84)}${vent(785,81)}${vent(881,79)}
  ${window(557,86,48,44)}${window(678,87,44,42)}${window(989,88,47,57)}
  <path d="M973 77v151h78V77m-78 80h78" fill="none" stroke="#56758b"/><path d="M1038 163h-14m6-4v9" stroke="#b6c0b4" stroke-width="3"/>
  <text x="650" y="147" text-anchor="middle" fill="#e9e7d7" font-family="Georgia,serif" font-size="19" letter-spacing=".7">ĐƯỜNG SẮT VIỆT NAM</text>
  ${[573,694].map(x=>vent(x,24,187,33)).join('')}<ellipse cx="650" cy="207" rx="8" ry="13" fill="#132735"/>
  <rect x="160" y="161" width="65" height="20" rx="2" fill="#243a4a" stroke="#c5a84d"/><text x="192" y="176" font-family="Arial" font-weight="bold" font-size="12" text-anchor="middle" fill="#dbc46c">D19E-946</text><text x="274" y="199" fill="#dfc76d" font-family="Arial" font-size="12">2</text>
  <text x="531" y="268" fill="#b5c1bc" font-family="Arial" font-size="7">Vmax 120 km/h</text><text x="706" y="268" fill="#b5c1bc" font-family="Arial" font-size="7">CẤP NƯỚC</text>
  <g><circle cx="96" cy="61" r="14" fill="#54636a" stroke="#a4ada3" stroke-width="4"/><circle cx="96" cy="61" r="9" fill="#ece7c2"/><circle cx="68" cy="75" r="6" fill="#bc8f44" stroke="#647574" stroke-width="2"/><path d="M121 52l13-7 11 8-13 6z" fill="#3b4f57"/><path d="M139 42l-3 21" stroke="#263c44" stroke-width="3"/></g>
  <ellipse cx="51" cy="204" rx="6" ry="10" fill="#eee7bb" stroke="#53605b" stroke-width="3"/><ellipse cx="113" cy="203" rx="7" ry="10" fill="#eee7bb" stroke="#53605b" stroke-width="3"/><circle cx="72" cy="215" r="5" fill="#8f333e" stroke="#646e66" stroke-width="2"/>
  <path d="M33 247h76m-70 0v24m64-24v18" stroke="#989780" stroke-width="3"/><path d="M15 267h44v18H15z" fill="#333c3c" stroke="#768076" stroke-width="2"/><path d="M9 271h16v12H9z" fill="#19252a"/><path d="M24 285q-2 30 24 26l15-27" fill="none" stroke="#273b3b" stroke-width="5"/>
  <path d="M1074 288h26" stroke="#293634" stroke-width="7"/><path d="M1073 273q8 24 18 19" fill="none" stroke="#273b3b" stroke-width="3"/>
  <path d="M108 276h13m912 0h16" stroke="#c7c0a0" stroke-width="2"/><path d="M329 78v153m214-153v153m214-153v153m218-153v153" stroke="#95a6ad" opacity=".18"/>
  <path d="M123 72h907" stroke="#d7dfd2" opacity=".24"/>
  `;
}

