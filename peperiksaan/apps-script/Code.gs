/* HISTORYVERSE UASA. Bind this project to a PRIVATE Google Sheet. */
const TABLES_ = {config:'Tetapan',questions:'Soalan',attempts:'Jawapan',marks:'Markah'};
function onOpen(){SpreadsheetApp.getUi().createMenu('Peperiksaan').addItem('Sediakan sistem','setup_').addItem('Panel guru','openTeacher_').addToUi();}
function setup_(){
 const ss=SpreadsheetApp.getActiveSpreadsheet(),p=PropertiesService.getScriptProperties();
 if(p.getProperty('SHEET_ID') && p.getProperty('SHEET_ID')!==ss.getId())throw Error('Projek sudah terikat kepada helaian lain.');
 p.setProperty('SHEET_ID',ss.getId());p.setProperty('TEACHER_EMAIL',Session.getEffectiveUser().getEmail());
 const specs={Tetapan:['Kunci','Nilai'],Soalan:['ID','Bahagian','Nombor','Pengenalan','Soalan','Pilihan JSON','Markah','Jawapan betul'],Jawapan:['ID','Token hash','Nama','Kelas','Pilihan esei','Jawapan JSON','Semakan versi','Dihantar','Dikemas kini'],Markah:['ID','Nama','Kelas','Objektif /20','Struktur /40','Esei /20','Jumlah /80','Peratus','Status','Markah JSON','Catatan']};
 Object.keys(specs).forEach(n=>{let s=ss.getSheetByName(n);if(!s){s=ss.insertSheet(n);s.appendRow(specs[n]);s.setFrozenRows(1);s.getRange(1,1,1,specs[n].length).setBackground('#513080').setFontColor('#ffffff').setFontWeight('bold');}});
 if(ss.getSheetByName('Tetapan').getLastRow()===1)ss.getSheetByName('Tetapan').getRange(2,1,6,2).setValues([['tajuk','UASA Sejarah Tingkatan 1'],['mula',''],['aktif','TIDAK'],['kod_masuk',''],['markah_disahkan','TIDAK'],['kertas_disemak','TIDAK']]);
 ss.setSpreadsheetTimeZone('Asia/Kuala_Lumpur');
 SpreadsheetApp.getUi().alert('Sistem disediakan. Buka Peperiksaan → Panel guru. Import soalan, masukkan skema, sahkan markah C dan tetapkan jadual sebelum mengaktifkan. Jangan kongsi helaian ini dengan murid.');
}
function openTeacher_(){teacherAuth_();SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile('Teacher').setWidth(1100).setHeight(760),'HISTORYVERSE • Panel guru');}
function teacherAuth_(){const e=Session.getActiveUser().getEmail(),allowed=PropertiesService.getScriptProperties().getProperty('TEACHER_EMAIL');if(!e||!allowed||e.toLowerCase()!==allowed.toLowerCase())throw Error('Akses guru sahaja. Buka panel daripada Google Sheets menggunakan akaun pemilik.');}
function book_(){const id=PropertiesService.getScriptProperties().getProperty('SHEET_ID');if(!id)throw Error('Sistem belum disediakan oleh guru.');return SpreadsheetApp.openById(id);}
function rows_(name){return book_().getSheetByName(name).getDataRange().getValues().slice(1);}
function config_(){const c={};rows_('Tetapan').forEach(r=>c[r[0]]=r[1] instanceof Date?r[1].toISOString():String(r[1]));return c;}
function questions_(){return rows_('Soalan').filter(r=>r[0]).map(r=>({id:String(r[0]),section:r[1],number:Number(r[2]),intro:String(r[3]),text:String(r[4]),options:r[5]?JSON.parse(r[5]):[],max:Number(r[6]),key:String(r[7]||'')}));}
function phase_(c,now){if(c.aktif!=='YA'||!Number.isFinite(Date.parse(c.mula)))return 'closed';const m=(now-Date.parse(c.mula))/60000;return m<0?'waiting':m<15?'A':m<55?'B':m<85?'C':'done';}
function publicState_(c,now){const phase=phase_(c,now),start=Date.parse(c.mula);return {title:c.tajuk,phase,serverTime:now,start:Number.isFinite(start)?start:null,end:Number.isFinite(start)?start+85*60000:null,phaseEnd:phase==='A'?start+15*60000:phase==='B'?start+55*60000:phase==='C'?start+85*60000:start};}
function hash_(v){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,v).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join('');}
function clean_(v,max){if(typeof v!=='string'||v.length>max)throw Error('Maklumat terlalu panjang atau tidak sah.');return v.trim();}
function locked_(fn){const l=LockService.getScriptLock();if(!l.tryLock(10000))throw Error('Sistem sibuk. Cuba lagi sebentar.');try{return fn();}finally{l.releaseLock();}}
function getAttempt_(token){if(typeof token!=='string'||!/^[a-zA-Z0-9-]{32,100}$/.test(token))throw Error('Sesi tidak sah.');const h=hash_(token),r=rows_('Jawapan'),i=r.findIndex(x=>x[1]===h);if(i<0)throw Error('Sesi tidak ditemui.');return {row:i+2,data:r[i]};}
function clientAttempt_(r){return {id:r[0],name:r[2],className:r[3],choice:r[4]||'',answers:JSON.parse(r[5]),version:Number(r[6]),submitted:!!r[7]};}
function doGet(){return HtmlService.createHtmlOutputFromFile('Student').setTitle('HISTORYVERSE • Peperiksaan UASA').addMetaTag('viewport','width=device-width, initial-scale=1');}
function examRpc(action,payload){
 const p=payload||{},c=config_(),now=Date.now(),state=publicState_(c,now);
 if(action==='status')return state;
 if(action==='join')return locked_(()=>{
   if(state.phase==='closed'||state.phase==='done')throw Error('Pendaftaran peperiksaan belum dibuka atau sudah tamat.');
   if(clean_(p.code,60)!==c.kod_masuk||!c.kod_masuk)throw Error('Kod peperiksaan tidak betul.');
   const name=clean_(p.name,100),cls=clean_(p.className,40);if(!name||!cls)throw Error('Isi nama dan kelas.');
   if(typeof p.token!=='string'||!/^[a-zA-Z0-9-]{32,100}$/.test(p.token))throw Error('Token tidak sah.');
   const all=rows_('Jawapan'),h=hash_(p.token),existing=all.find(r=>r[1]===h);
   if(existing){if(existing[2]!==name||existing[3]!==cls)throw Error('Sesi ini milik murid lain.');return {state,attempt:clientAttempt_(existing)};}
   if(all.some(r=>String(r[2]).trim().toLowerCase()===name.toLowerCase()&&String(r[3]).trim().toLowerCase()===cls.toLowerCase()))throw Error('Nama dan kelas sudah didaftarkan. Gunakan peranti asal atau minta bantuan guru.');
   const row=[Utilities.getUuid(),h,name,cls,'','{}',0,'',new Date(now).toISOString()];
   const sh=book_().getSheetByName('Jawapan');sh.getRange(sh.getLastRow()+1,1,1,row.length).setNumberFormat('@').setValues([row.map(safeCell_)]);
   return {state,attempt:clientAttempt_(row)};
 });
 if(action==='load'){
   const a=getAttempt_(p.token);return {state,attempt:clientAttempt_(a.data),questions:state.phase==='A'||state.phase==='B'||state.phase==='C'?questions_().filter(q=>q.section===state.phase).map(q=>{const {key,...v}=q;return v;}):[]};
 }
 if(action==='save'||action==='submit')return locked_(()=>{
   const fresh=config_(),time=Date.now(),ph=phase_(fresh,time),a=getAttempt_(p.token),r=a.data;
   if(r[7])return {state:publicState_(fresh,time),attempt:clientAttempt_(r)};
   if(action==='save'){
     if(!['A','B','C'].includes(ph))throw Error('Masa menjawab sudah tamat atau belum bermula.');
     if(Number(p.version)!==Number(r[6]))throw Error('Jawapan berubah dalam tab lain. Muat semula untuk menyambung.');
     const qs=questions_(),ans=JSON.parse(r[5]);
     if(p.choice!==undefined){if(ph!=='C'||!['5','6'].includes(String(p.choice)))throw Error('Pilihan esei tidak sah.');r[4]=String(p.choice);}
     const updates=p.answers;if(!updates||typeof updates!=='object'||Array.isArray(updates))throw Error('Jawapan tidak sah.');
     Object.keys(updates).forEach(id=>{const q=qs.find(q=>q.id===id);if(!q||q.section!==ph||(ph==='C'&&String(q.number)!==String(r[4])))throw Error('Bahagian ini tidak dibuka.');const v=clean_(updates[id],2000);if(ph==='A'&&v&&!['A','B','C','D'].includes(v))throw Error('Pilihan objektif tidak sah.');ans[id]=v;});
     r[5]=JSON.stringify(ans);r[6]=Number(r[6])+1;
   }else{
     if(!['C','done'].includes(ph))throw Error('Hantar selepas Bahagian C dibuka.');
     if(ph==='C'&&!['5','6'].includes(String(r[4])))throw Error('Pilih satu soalan esei dahulu.');
     r[7]=new Date(time).toISOString();
   }
   r[8]=new Date(time).toISOString();book_().getSheetByName('Jawapan').getRange(a.row,1,1,r.length).setNumberFormat('@').setValues([r.map(safeCell_)]);
   return {state:publicState_(fresh,time),attempt:clientAttempt_(r)};
 });
 throw Error('Tindakan tidak dibenarkan.');
}
function safeCell_(v){return typeof v==='string'&&/^[=+@\-]/.test(v)?"'"+v:v;}
function validateQuestions_(qs){
 if(!Array.isArray(qs)||qs.length!==38)throw Error('Perlu 20 objektif, 12 pecahan struktur dan 6 pecahan esei.');
 const ids=new Set();qs.forEach(q=>{if(ids.has(q.id))throw Error('ID soalan berulang.');ids.add(q.id);if(!q.text||q.text.length>8000||!Number.isInteger(q.max)||q.max<1||q.max>20)throw Error('Soalan atau markah tidak sah.');
 if(q.section==='A'){if(!/^A([1-9]|1\d|20)$/.test(q.id)||q.max!==1||!Array.isArray(q.options)||q.options.length!==4||q.number!==Number(q.id.slice(1)))throw Error('Objektif tidak lengkap.');}
 else if(q.section==='B'){if(!/^B[1-4][abc]$/.test(q.id)||q.number!==Number(q.id[1])||q.max!==(q.id.endsWith('c')?4:3))throw Error('Struktur tidak lengkap.');}
 else if(q.section==='C'){if(!/^C[56][abc]$/.test(q.id)||q.number!==Number(q.id[1]))throw Error('Esei tidak lengkap.');}else throw Error('Bahagian tidak sah.');
 });
 if(qs.filter(q=>q.section==='A').length!==20||qs.filter(q=>q.section==='B').length!==12||qs.filter(q=>q.section==='C').length!==6)throw Error('Bilangan soalan tidak sah.');
}
function teacherRpc(action,payload){
 teacherAuth_();const p=payload||{};
 if(action==='load')return {config:config_(),questions:questions_(),students:teacherStudents_()};
 if(action==='import')return locked_(()=>{if(rows_('Jawapan').length)throw Error('Soalan tidak boleh diganti selepas pendaftaran bermula.');validateQuestions_(p.questions);const sh=book_().getSheetByName('Soalan');if(sh.getLastRow()>1)sh.getRange(2,1,sh.getLastRow()-1,8).clearContent();sh.getRange(2,1,p.questions.length,8).setNumberFormat('@').setValues(p.questions.map(q=>[q.id,q.section,q.number,q.intro||'',q.text,JSON.stringify(q.options||[]),q.max,''].map(safeCell_)));return {ok:true};});
 if(action==='configure')return locked_(()=>{
   if(rows_('Jawapan').length)throw Error('Tetapan dikunci selepas murid mendaftar. Untuk sesi baharu, gunakan salinan helaian dan projek baharu.');
   const qs=questions_();validateQuestions_(qs);
   if(!Array.isArray(p.key)||p.key.length!==20||p.key.some(v=>!['A','B','C','D'].includes(v)))throw Error('Lengkapkan 20 jawapan skema rasmi.');
   if(![4,6].includes(Number(p.c6)))throw Error('Markah 6(a) tidak sah.');
   qs.forEach(q=>{if(q.section==='A')q.key=p.key[q.number-1];if(q.id==='C6a')q.max=Number(p.c6);});
   const sum=n=>qs.filter(q=>q.section==='C'&&q.number===n).reduce((s,q)=>s+q.max,0);
   if(p.active&&(sum(5)!==20||sum(6)!==20||!p.reviewed))throw Error('Sahkan kertas dan selaraskan kedua-dua pilihan esei kepada 20 markah sebelum aktifkan.');
   if(!Number.isFinite(Date.parse(p.start))||!/[zZ]|[+-]\d\d:\d\d$/.test(p.start))throw Error('Tarikh mula mesti lengkap dengan zon waktu.');
   const code=clean_(p.code,60);if(code.length<6)throw Error('Kod masuk sekurang-kurangnya 6 aksara.');
   book_().getSheetByName('Soalan').getRange(2,1,qs.length,8).setValues(qs.map(q=>[q.id,q.section,q.number,q.intro,q.text,JSON.stringify(q.options),q.max,q.key].map(safeCell_)));
   book_().getSheetByName('Tetapan').getRange(2,1,6,2).setNumberFormat('@').setValues([['tajuk','UASA Sejarah Tingkatan 1'],['mula',p.start],['aktif',p.active?'YA':'TIDAK'],['kod_masuk',code],['markah_disahkan',sum(5)===sum(6)?'YA':'TIDAK'],['kertas_disemak',p.reviewed?'YA':'TIDAK']]);return {ok:true};
 });
 if(action==='mark')return locked_(()=>{
   if(phase_(config_(),Date.now())!=='done')throw Error('Penandaan dibuka selepas peperiksaan tamat.');
   const row=rows_('Jawapan').find(r=>r[0]===p.id);if(!row)throw Error('Murid tidak ditemui.');
   const qs=questions_().filter(q=>q.section==='B'||q.section==='C'&&String(q.number)===String(row[4]));
   const grades={};qs.forEach(q=>{const v=p.marks[q.id];if(v===''||v===null||v===undefined)return;const n=Number(v);if(!Number.isInteger(n)||n<0||n>q.max)throw Error('Markah '+q.id+' mesti antara 0 dan '+q.max);grades[q.id]=n;});
   const ans=JSON.parse(row[5]),a=questions_().filter(q=>q.section==='A').reduce((s,q)=>s+(ans[q.id]===q.key&&q.key?1:0),0),b=qs.filter(q=>q.section==='B').reduce((s,q)=>s+(grades[q.id]||0),0),c=qs.filter(q=>q.section==='C').reduce((s,q)=>s+(grades[q.id]||0),0),complete=Object.keys(grades).length===qs.length&&(qs.length===15||(!row[4]&&qs.length===12));
   const sh=book_().getSheetByName('Markah'),rs=rows_('Markah'),i=rs.findIndex(r=>r[0]===p.id),out=[p.id,row[2],row[3],a,b,c,complete?a+b+c:'',complete?Math.round((a+b+c)/80*10000)/100:'',complete?'Selesai':'Belum lengkap',JSON.stringify(grades),clean_(p.feedback||'',2000)];sh.getRange(i<0?sh.getLastRow()+1:i+2,1,1,out.length).setValues([out.map(safeCell_)]);return {ok:true};
 });
 throw Error('Tindakan tidak dibenarkan.');
}
function teacherStudents_(){const marks=rows_('Markah'),qs=questions_();return rows_('Jawapan').map(r=>{const a=clientAttempt_(r),m=marks.find(x=>x[0]===r[0]);return {...a,updated:r[8],auto:qs.filter(q=>q.section==='A').reduce((s,q)=>s+(a.answers[q.id]===q.key&&q.key?1:0),0),marks:m?JSON.parse(m[9]):{},feedback:m?m[10]:'',complete:m?m[8]==='Selesai':false,total:m?m[6]:''};});}
