const ports={
 gujerat:{name:"Gujerat",region:"India Barat",x:9,y:25,fact:"Pedagang Gujerat membawa kain dan barangan dagangan dari India ke Melaka.",cargo:{icon:"🧵",name:"Kain"},q:"Mengapakah pedagang asing tertarik ke pelabuhan Melaka?",a:["Lokasinya strategik dan urusan perdagangan cekap","Melaka tidak mengenakan peraturan","Pelabuhannya jauh dari laluan laut"],ok:0},
 coromandel:{name:"Coromandel",region:"India Selatan",x:18,y:34,fact:"Pantai Coromandel mempunyai hubungan perdagangan aktif dengan Melaka.",cargo:{icon:"🪡",name:"Tekstil"},q:"Siapakah pegawai yang mengurus pedagang di pelabuhan Melaka?",a:["Laksamana","Syahbandar","Temenggung"],ok:1},
 china:{name:"China",region:"Asia Timur",x:56,y:27,fact:"Pedagang China membawa sutera dan tembikar serta mendapatkan hasil Alam Melayu.",cargo:{icon:"🏺",name:"Tembikar"},q:"Apakah bahasa perantaraan utama di pelabuhan Melaka?",a:["Bahasa Melayu","Bahasa Latin","Bahasa Yunani"],ok:0},
 champa:{name:"Champa",region:"Tanah Besar Asia Tenggara",x:47,y:37,fact:"Champa menjadi salah satu persinggahan penting dalam jaringan perdagangan serantau.",cargo:{icon:"🌾",name:"Beras"},q:"Apakah peranan utama pelabuhan Melaka?",a:["Pelabuhan entrepot","Pusat pertanian pedalaman","Kubu Portugis"],ok:0},
 melaka:{name:"Melaka",region:"Selat Melaka",x:42,y:53,fact:"Melaka berkembang sebagai pelabuhan entrepot yang dikunjungi pedagang pelbagai bangsa.",cargo:{icon:"⚓",name:"Bekalan Melaka"},q:"Apakah nama cukai import rasmi di Melaka?",a:["Panduan","Calains","Ufti"],ok:0},
 sumatera:{name:"Sumatera",region:"Kepulauan Melayu",x:34,y:58,fact:"Sumatera membekalkan hasil hutan, emas dan barangan tempatan kepada jaringan perdagangan Melaka.",cargo:{icon:"🪙",name:"Emas"},q:"Mengapakah Selat Melaka penting?",a:["Menghubungkan Timur dan Barat","Terletak jauh dari perdagangan","Tidak boleh dilalui kapal"],ok:0},
 borneo:{name:"Borneo",region:"Kepulauan Melayu",x:58,y:50,fact:"Borneo membekalkan hasil hutan dan sumber tempatan kepada pedagang di rantau ini.",cargo:{icon:"🪵",name:"Hasil hutan"},q:"Apakah tugas Syahbandar?",a:["Mengurus pedagang dan pelabuhan","Mengetuai angkatan darat","Menggubal hukum agama"],ok:0},
 jawa:{name:"Jawa",region:"Kepulauan Melayu",x:50,y:65,fact:"Jawa terlibat dalam perdagangan beras, makanan dan barangan keperluan serantau.",cargo:{icon:"🌾",name:"Beras Jawa"},q:"Sistem timbang yang digunakan dalam perdagangan Melaka termasuk...",a:["Tahil dan kati","Meter dan kilometer","Liter dan hektar"],ok:0},
 maluku:{name:"Maluku",region:"Kepulauan Rempah",x:70,y:61,fact:"Maluku terkenal sebagai sumber rempah-ratus yang sangat bernilai dalam perdagangan dunia.",cargo:{icon:"🌿",name:"Rempah-ratus"},q:"Barangan utama dari Maluku ialah...",a:["Rempah-ratus","Sutera","Tembikar"],ok:0}
};

const pickups=[
 {id:"coin-melaka",type:"coin",x:42,y:53,value:20,label:"20 Dinar"},
 {id:"cargo-sumatera",type:"cargo",x:34,y:58,item:{icon:"▰",name:"Timah"}},
 {id:"coin-jawa",type:"coin",x:50,y:65,value:10,label:"10 Dinar"},
 {id:"cargo-maluku",type:"cargo",x:70,y:61,item:{icon:"🌿",name:"Rempah-ratus"}},
 {id:"coin-borneo",type:"coin",x:58,y:50,value:10,label:"10 Dinar"},
 {id:"cargo-china",type:"cargo",x:56,y:27,item:{icon:"🏺",name:"Tembikar"}},
 {id:"coin-champa",type:"coin",x:47,y:37,value:10,label:"10 Dinar"},
 {id:"cargo-gujerat",type:"cargo",x:9,y:25,item:{icon:"🧵",name:"Kain"}}
];

const $=id=>document.getElementById(id),ship=$("playerShip");
let state;

function freshState(){
 return {x:39,y:68,lives:3,coins:0,score:0,cargoItems:[],visited:new Set(),mastered:new Set(),collected:new Set(),auto:false,timer:null,current:null,melakaOpened:false};
}

function cargoCount(){return Math.min(5,state.cargoItems.length)}
function addCargo(item){
 if(cargoCount()>=5 || state.cargoItems.some(x=>x.name===item.name)) return false;
 state.cargoItems.push(item);return true;
}

function renderCargo(){
 $("cargoLiveCount").textContent=`${cargoCount()}/5`;
 const slots=$("cargoSlots");
 slots.innerHTML=Array.from({length:5},(_,i)=>{
   const item=state.cargoItems[i];
   return item?`<div class="cargo-slot filled"><span>${item.icon}</span><small>${item.name}</small></div>`:`<div class="cargo-slot empty" aria-hidden="true">—</div>`;
 }).join("");
}

function missionState(){
 if(!state.melakaOpened) return {n:1,title:"CARI PELABUHAN MELAKA",instruction:"Kawal kapal dan cari Selat Melaka. Singgah di Melaka untuk memulakan urusan perdagangan.",progress:0};
 if(!state.mastered.has("melaka")) return {n:2,title:"URUS PERDAGANGAN DI MELAKA",instruction:"Jawab cabaran pelabuhan Melaka dengan tepat untuk meneruskan misi.",progress:20};
 if(cargoCount()<3) return {n:3,title:"KUMPUL KARGO DAGANGAN",instruction:`Kumpulkan sekurang-kurangnya 3 kargo. Sekarang ${cargoCount()}/3.`,progress:40};
 if(state.mastered.size<5) return {n:4,title:"KUASAI 5 DESTINASI",instruction:`Jawab cabaran dengan betul di 5 destinasi. Sekarang ${state.mastered.size}/5.`,progress:60};
 if(state.score<120) return {n:5,title:"SAUDAGAR UNGGUL",instruction:`Capai sekurang-kurangnya 120 markah. Sekarang ${state.score}/120.`,progress:80};
 return {n:6,title:"MISI PERDAGANGAN SELESAI",instruction:"Tahniah! Anda berjaya menguasai laluan, kargo dan cabaran perdagangan Melaka.",progress:100};
}

function updateMission(){
 const m=missionState();
 $("missionTitle").textContent=`${m.n}. ${m.title}`;
 $("missionInstruction").textContent=m.instruction;
 $("progressBar").style.width=m.progress+"%";
 $("visitedText").textContent=`${Math.min(state.mastered.size,5)}/5 destinasi dikuasai`;
}

function hud(){
 $("hud").textContent=`❤️ ${state.lives}   🪙 ${state.coins}   📦 ${cargoCount()}/5   ⭐ ${state.score}`;
 $("lifeLive").textContent=state.lives;
 $("coinLive").textContent=state.coins;
 $("cargoHudLive").textContent=`${cargoCount()}/5`;
 $("scoreLive").textContent=state.score;
 renderCargo();updateMission();
}

function setChallengePlaceholder(title="Pilih sebuah pelabuhan",text="Tekan penanda pelabuhan pada peta. Soalan cabaran akan muncul di sini."){
 $("challengePort").textContent=title;
 $("questionText").textContent=text;
 $("answers").innerHTML="";
 $("feedback").textContent="";
}

function showChallenge(key){
 const p=ports[key];
 $("challengePort").textContent=`${p.name} · ${p.region}`;
 $("questionText").textContent=p.q;
 $("feedback").textContent=p.fact;
 $("answers").innerHTML=p.a.map((a,i)=>`<button data-answer="${i}"><b>${String.fromCharCode(65+i)}</b><span>${a}</span></button>`).join("");
}

function move(x,y,label,onArrive){
 state.x=Math.max(4,Math.min(82,x));state.y=Math.max(12,Math.min(82,y));
 ship.classList.add("sailing");ship.style.left=state.x+"%";ship.style.top=state.y+"%";
 $("status").textContent=`Belayar menuju ${label||"destinasi"}...`;
 setTimeout(()=>{
   ship.classList.remove("sailing");
   $("status").textContent=`Tiba di ${label||"perairan baharu"}.`;
   collectNearby();
   if(typeof onArrive==="function")onArrive();
 },1850);
}

function renderPickups(){
 const layer=$("pickupLayer");
 layer.innerHTML=pickups.map(p=>`<span id="pickup-${p.id}" class="pickup ${p.type}" style="left:${p.x}%;top:${p.y}%" title="${p.type==='coin'?p.label:p.item.name}">${p.type==='coin'?'◉':'▣'}</span>`).join("");
}

function collectNearby(){
 let found=[];
 for(const p of pickups){
   if(state.collected.has(p.id))continue;
   const d=Math.hypot(state.x-p.x,state.y-p.y);
   if(d>2.8)continue;
   state.collected.add(p.id);
   const el=$("pickup-"+p.id);if(el)el.classList.add("collected");
   if(p.type==="coin"){
     state.coins+=p.value;found.push(`+${p.value} Dinar`);
   }else if(addCargo(p.item)){
     found.push(`Kargo ${p.item.name}`);
   }
 }
 if(found.length){toast(`✓ Kutipan: ${found.join(" · ")}`);hud();}
}

function openPort(key){
 const p=ports[key];state.current=key;
 if(key==="melaka")state.melakaOpened=true;
 updateMission();showChallenge(key);
 move(p.x,p.y,p.name,()=>{
   state.visited.add(key);
   if(key==="melaka")state.melakaOpened=true;
   updateMission();
 });
}

document.querySelectorAll("[data-port]").forEach(b=>b.addEventListener("click",()=>openPort(b.dataset.port)));

$("answers").addEventListener("click",e=>{
 const b=e.target.closest("[data-answer]");if(!b||!state.current)return;
 const p=ports[state.current],correct=Number(b.dataset.answer)===p.ok;
 document.querySelectorAll("#answers [data-answer]").forEach(x=>x.disabled=true);
 if(correct){
   b.classList.add("correct");
   const first=!state.mastered.has(state.current);
   if(first){
     state.mastered.add(state.current);state.coins+=30;state.score+=20;
     // Pelabuhan juga boleh memuatkan kargo; tetapi tidak melebihi 5 dan tidak berganda.
     addCargo(p.cargo);
     $("feedback").textContent=`Betul! ${p.fact} +30 Dinar, +20 markah.`;
     toast("✓ Cabaran berjaya — ganjaran dikemas kini!");
   }else{
     $("feedback").textContent=`Betul! Cabaran ${p.name} sudah dikuasai; tiada ganjaran berganda.`;
     toast("✓ Jawapan betul.");
   }
 }else{
   b.classList.add("wrong");
   const correctButton=document.querySelector(`#answers [data-answer="${p.ok}"]`);if(correctButton)correctButton.classList.add("correct");
   state.lives=Math.max(0,state.lives-1);
   $("feedback").textContent=`Belum tepat. Jawapan yang betul: ${p.a[p.ok]}. Kapal terkena serangan lanun — satu nyawa berkurang.`;
   toast("💥 Serangan lanun!");
   if(state.lives===0)setTimeout(reset,1700);
 }
 hud();
});

document.querySelectorAll("[data-move]").forEach(b=>b.addEventListener("click",()=>{
 const d=b.dataset.move,step=4;
 move(state.x+(d==="right"?step:d==="left"?-step:0),state.y+(d==="down"?step:d==="up"?-step:0),"perairan baharu");
}));

const autoOrder=["melaka","sumatera","jawa","maluku","borneo","champa","china","coromandel","gujerat"];
function toggleAuto(){
 state.auto=!state.auto;$("autoSail").setAttribute("aria-pressed",state.auto);$("autoLabel").textContent=state.auto?"Ⅱ Hentikan Auto":"↻ Layar Automatik";
 clearInterval(state.timer);
 if(state.auto){let i=0;openPort(autoOrder[i]);state.timer=setInterval(()=>openPort(autoOrder[++i%autoOrder.length]),5200)}
}
$("autoSail").onclick=toggleAuto;$("autoLabel").onclick=toggleAuto;

function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1600)}
function reset(){
 if(state?.timer)clearInterval(state.timer);
 state=freshState();
 ship.style.left=state.x+"%";ship.style.top=state.y+"%";
 document.querySelectorAll(".pickup").forEach(x=>x.classList.remove("collected"));
 setChallengePlaceholder();hud();toast("Kapal dibaiki. Misi bermula semula!");
}

$("fullscreen").onclick=()=>document.fullscreenElement?document.exitFullscreen():$("stage").requestFullscreen?.();
document.addEventListener("keydown",e=>{const map={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};if(map[e.key]){e.preventDefault();document.querySelector(`[data-move="${map[e.key]}"]`).click()}});

renderPickups();state=freshState();setChallengePlaceholder();hud();
