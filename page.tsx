"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { AlertCircle, ArrowLeft, BarChart3, BookOpenText, CheckCircle2, ChevronRight, ClipboardCheck, Download, DoorOpen, Eye, FlaskConical, Gamepad2, GraduationCap, Headphones, Home, Layers3, MapPinned, Maximize2, Music2, Play, RefreshCw, RotateCcw, School, SkipForward, Sparkles, Square, Swords, Trophy, Volume2, VolumeX } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formOneChapters, formOnePasakExercises, formTwoChapters, formTwoPasakExercises, type Chapter, type PasakExercise } from "./content";

type Game = { title: string; topic: string; description: string; href: string; icon: "sword" | "tower" | "runner" };

const formOneGames: Game[] = [
  { title: "Penjejak Masa Bab 1", topic: "Tingkatan 1 • Bab 1", description: "Teroka dunia Mengenali Sejarah, jawab cabaran fakta dan lengkapkan misi penjejak masa.", href: "https://penjejak-masa-sejarah-bab-1.zam79.chatgpt.site", icon: "runner" },
  { title: "Time Traveller: Tamadun Islam", topic: "Tingkatan 1 • Bab 8", description: "Kembara masa, jawab soalan dan kuatkan senjata untuk menewaskan musuh.", href: "https://time-traveller-tamadun-islam.zam79.chatgpt.site", icon: "runner" },
  { title: "Kembara Tamadun Islam 8.2", topic: "Tingkatan 1 • Bab 8.2", description: "Game platformer tentang kemunculan dan perkembangan Tamadun Islam dengan cabaran fakta.", href: "https://kembara-tamadun-islam-82.zam79.chatgpt.site", icon: "runner" },
  { title: "Pahlawan Dinasti Han", topic: "Tingkatan 1 • Bab 7", description: "Kuasai peningkatan Tamadun China dan fakta Dinasti Han dalam arena pertempuran Sejarah.", href: "https://pahlawan-dinasti-han.zam79.chatgpt.site", icon: "sword" },
];

const formTwoGames: Game[] = [
  { title: "Pelayaran Sejarah Bab 10", topic: "Tingkatan 2 • Bab 10", description: "Belayar merentas Sarawak dan Sabah, kuasai pemerintahan tempatan, kegiatan ekonomi serta keunikan masyarakat sambil mempertahankan kapal daripada lanun.", href: "https://game-bab10-sejarah.zam79.chatgpt.site/", icon: "runner" },
  { title: "Pendekar Adat Perpatih", topic: "Tingkatan 2 • Bab 9", description: "Lompat halangan, kuasai fakta Adat Perpatih dan hadapi pertarungan akhir.", href: "https://pendekar-adat-perpatih.zam79.chatgpt.site", icon: "sword" },
  { title: "History Tower Defense", topic: "Tingkatan 2 • Kesultanan Melayu", description: "Pertahankan kubu dengan strategi dan jawapan Sejarah yang tepat.", href: "https://history-tower-defense-kesultanan-melayu.zam79.chatgpt.site", icon: "tower" },
  { title: "Misi Empat Kerajaan", topic: "Tingkatan 2 • Bab 8", description: "Selesaikan misi hubungan Kedah, Kelantan, Negeri Sembilan dan Perlis dengan negeri Melayu lain.", href: "https://misi-empat-kerajaan.zam79.chatgpt.site", icon: "runner" },
];

const voiceStyles = [
  { id: "cikgu", label: "Bahasa Melayu — Cikgu (lembut)", rate: 0.86, pitch: 1.08 },
  { id: "pencerita", label: "Bahasa Melayu — Pencerita (jelas)", rate: 0.92, pitch: 1 },
  { id: "wira", label: "Bahasa Melayu — Wira (tegas)", rate: 0.88, pitch: 0.86 },
] as const;

function WelcomeIntro() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopIntro = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const closeIntro = () => {
    stopIntro();
    setOpen(false);
  };

  const playIntro = () => {
    stopIntro();
    setPlayKey((current) => current + 1);
    setPlaying(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => setPlaying(false));
  };

  return <Dialog open={open} onOpenChange={(nextOpen) => { if (nextOpen) setOpen(true); else closeIntro(); }}>
    <DialogTrigger asChild><button className="intro-trigger" type="button"><Play aria-hidden="true" /> Mainkan intro</button></DialogTrigger>
    <DialogContent className="intro-dialog" showCloseButton={false} onEscapeKeyDown={closeIntro}>
      <DialogTitle className="sr-only">Hai semua, Cikgu Zamzila di sini</DialogTitle>
      <DialogDescription className="sr-only">Pembukaan animasi selama sembilan saat dengan rakaman suara Cikgu Zamzila dan sari kata Bahasa Melayu.</DialogDescription>
      <div className={`intro-stage ${playing ? "is-playing" : ""}`} key={playKey}>
        <span className="intro-ornament ornament-one" aria-hidden="true">✦</span>
        <span className="intro-ornament ornament-two" aria-hidden="true">✧</span>
        <span className="intro-ornament ornament-three" aria-hidden="true">✦</span>
        <div className="intro-ribbon"><GraduationCap aria-hidden="true" /> Portal Sejarah</div>
        <div className="intro-copy">
          <span className="intro-kicker">Hai semua!</span>
          <h2>Portal Cikgu<br /><em>Zamzila</em></h2>
          <p>Cikgu Sejarah anda</p>
          <div className="intro-caption" aria-live="polite"><Volume2 aria-hidden="true" /> “Nak ikut kelas Sejarah? Jom!”</div>
        </div>
        <div className="intro-teacher">
          <span className="intro-halo" aria-hidden="true" />
          <img src="/puteri-cikgu-zamzila.png" alt="Kartun Cikgu Zamzila sebagai puteri Melayu" />
        </div>
        <div className="intro-floor" aria-hidden="true" />
        {playing && <div className="intro-progress" aria-hidden="true"><span /></div>}
      </div>
      <div className="intro-controls">
        <audio ref={audioRef} preload="auto" onEnded={() => { setPlaying(false); setOpen(false); }}>
          <source src="/audio/suara-cikgu-zamzila.m4a" type="audio/mp4" />
          <source src="/audio/suara-cikgu-zamzila.mp3" type="audio/mpeg" />
        </audio>
        <button className="intro-play" type="button" onClick={playIntro} disabled={playing}><Play aria-hidden="true" />{playing ? "Suara cikgu sedang dimainkan..." : "Dengar suara Cikgu Zamzila"}</button>
        <button className="intro-skip" type="button" onClick={closeIntro}><SkipForward aria-hidden="true" /> {playing ? "Masuk portal" : "Langkau"}</button>
      </div>
    </DialogContent>
  </Dialog>;
}

function QuizCard({ chapter, form }: { chapter: Chapter; form: string }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => chapter.questions.reduce((total, item, index) => total + (answers[index] === item.options[item.answer] ? 1 : 0), 0), [answers, chapter]);
  const reset = () => { setAnswers({}); setSubmitted(false); };

  return <article className="quiz-shell">
    <div className="quiz-heading">
      <div><span className="eyebrow">Latihan Bab {chapter.number}</span><h3>{chapter.title}</h3><small>{form}</small></div>
      <div className="question-count">{chapter.questions.length} soalan</div>
    </div>
    {submitted ? <div className="result-panel" role="status">
      <Trophy size={42} aria-hidden="true" /><p>Markah anda</p><strong>{score}/{chapter.questions.length}</strong>
      <span>{score === chapter.questions.length ? "Hebat! Semua jawapan tepat." : score >= 3 ? "Bagus! Cuba sekali lagi untuk markah penuh." : "Jangan mengalah—baca nota bab ini dan cuba semula."}</span>
      <button className="secondary-button" onClick={reset} type="button"><RotateCcw size={17} /> Cuba semula</button>
    </div> : <div className="question-list">
      {chapter.questions.map((item, questionIndex) => {
        const shift = (chapter.number + questionIndex * 2) % item.options.length;
        const displayedOptions = [...item.options.slice(shift), ...item.options.slice(0, shift)];
        return <fieldset key={item.question} className="question-card">
          <legend><span>{questionIndex + 1}</span>{item.question}</legend>
          <div className="option-grid">{displayedOptions.map((option, optionIndex) => <button
            key={option}
            className={answers[questionIndex] === option ? "option selected" : "option"}
            onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: option }))}
            type="button" aria-pressed={answers[questionIndex] === option}
          ><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>
        </fieldset>;
      })}
      <button className="primary-button submit-button" disabled={Object.keys(answers).length !== chapter.questions.length} onClick={() => setSubmitted(true)} type="button"><CheckCircle2 size={19} /> Semak markah</button>
    </div>}
  </article>;
}

const pasakSteps = [
  { key: "pelaku", letter: "P", title: "Pelaku", guide: "Siapa yang bertindak?" },
  { key: "aksi", letter: "A", title: "Aksi", guide: "Apakah tindakan yang dilakukan?" },
  { key: "sebab", letter: "S", title: "Sebab", guide: "Mengapakah tindakan itu dilakukan?" },
  { key: "akibat", letter: "A", title: "Akibat", guide: "Apakah yang berlaku selepas itu?" },
  { key: "kesan", letter: "K", title: "Kesan", guide: "Apakah kesan akhirnya?" },
] as const;

type PasakKey = (typeof pasakSteps)[number]["key"];

const pasakSuggestions: Record<PasakKey, string> = {
  pelaku: "Nyatakan individu atau kumpulan yang melakukan tindakan.",
  aksi: "Jelaskan tindakan yang dilakukan oleh pelaku.",
  sebab: "Terangkan sebab tindakan itu dilakukan. Gunakan kata seperti kerana, supaya atau bagi.",
  akibat: "Nyatakan perkara yang berlaku selepas tindakan tersebut.",
  kesan: "Jelaskan kesan akhir kepada masyarakat, kerajaan atau negara.",
};

const pasakStopWords = new Set(["yang", "dan", "atau", "dengan", "oleh", "dalam", "pada", "kepada", "untuk", "bagi", "serta", "ini", "itu", "dapat", "akan", "telah", "secara", "sebuah", "setiap", "tersebut", "menjadi", "lebih", "kerana", "akibatnya", "kesannya"]);

function pasakTokens(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function gradePasakPart(key: PasakKey, response: string, model: string) {
  const words = pasakTokens(response);
  const responseKeywords = new Set(words.filter((word) => word.length > 2 && !pasakStopWords.has(word)));
  const modelKeywords = pasakTokens(model).filter((word) => word.length > 2 && !pasakStopWords.has(word));
  const matched = modelKeywords.filter((word) => responseKeywords.has(word)).length;
  const cues: Record<PasakKey, RegExp> = {
    pelaku: /\b(murid|masyarakat|rakyat|pemimpin|pemerintah|kerajaan|generasi|sekolah|anggota|pihak|tokoh|individu|kumpulan)\b/i,
    aksi: /\b(me|mem|men|meng|meny|ber)[a-z]+/i,
    sebab: /\b(kerana|sebab|supaya|agar|untuk|bagi|demi)\b/i,
    akibat: /\b(akibat|akibatnya|hasilnya|maka|kemudian|seterusnya|menyebabkan)\b/i,
    kesan: /\b(kesan|kesannya|akhirnya|akan|dapat|mewujudkan|meningkatkan|mengekalkan)\b/i,
  };
  const minimumWords = key === "pelaku" ? 1 : 3;
  const hasStructure = cues[key].test(response);
  const relevant = key === "pelaku" ? matched >= 1 || hasStructure : matched >= 1 || (hasStructure && words.length >= 5);
  const passed = words.length >= minimumWords && relevant;
  return { key, passed, missing: words.length === 0 };
}

function PasakTrainer({ exercise, chapter, form }: { exercise: PasakExercise; chapter: Chapter; form: string }) {
  const [responses, setResponses] = useState<Partial<Record<PasakKey, string>>>({});
  const [showModel, setShowModel] = useState(false);
  const [checked, setChecked] = useState(false);
  const filledCount = pasakSteps.filter((step) => responses[step.key]?.trim()).length;
  const grading = useMemo(() => pasakSteps.map((step) => gradePasakPart(step.key, responses[step.key] ?? "", exercise.answer[step.key])), [exercise, responses]);
  const pasakScore = grading.filter((result) => result.passed).length;
  const reset = () => { setResponses({}); setShowModel(false); setChecked(false); };
  const completeAnswer = `${exercise.answer.pelaku} ${exercise.answer.aksi} ${exercise.answer.sebab}. ${exercise.answer.akibat}. ${exercise.answer.kesan}.`;

  return <article className="pasak-shell">
    <div className="pasak-heading">
      <div><span className="eyebrow">Latihan KBAT • Teknik PASAK</span><h3>Susun jawapan lengkap</h3><small>{form} • Bab {chapter.number}: {chapter.title}</small></div>
      <span className="pasak-mark">5 markah</span>
    </div>
    <div className="pasak-question"><Sparkles aria-hidden="true" /><div><small>Soalan KBAT</small><strong>{exercise.question}</strong></div></div>
    <div className="pasak-formula" aria-label="Formula Teknik PASAK">
      {pasakSteps.map((step) => <div className="pasak-chip" key={step.key}><span>{step.letter}</span><strong>{step.title}</strong></div>)}
    </div>
    <div className="pasak-input-grid">
      {pasakSteps.map((step) => <label className="pasak-field" key={step.key}>
        <span><b>{step.letter}</b><strong>{step.title}</strong><small>{step.guide}</small></span>
        <textarea value={responses[step.key] ?? ""} onChange={(event) => { setResponses((current) => ({ ...current, [step.key]: event.target.value })); setChecked(false); }} placeholder={`Tulis ${step.title.toLowerCase()} di sini...`} rows={3} />
      </label>)}
    </div>
    <div className="pasak-progress-row">
      <div><span>{filledCount}/5 bahagian diisi</span><div className="pasak-progress" aria-label={`${filledCount} daripada 5 bahagian diisi`}><i style={{ width: `${filledCount * 20}%` }} /></div></div>
      <div className="pasak-actions">
        {(filledCount > 0 || showModel || checked) && <button className="pasak-reset" type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Kosongkan</button>}
        <button className="pasak-model-button" type="button" onClick={() => setShowModel((current) => !current)}><CheckCircle2 aria-hidden="true" /> {showModel ? "Sembunyikan jawapan" : "Lihat contoh jawapan"}</button>
        <button className="pasak-check-button" type="button" disabled={filledCount === 0} onClick={() => setChecked(true)}><Sparkles aria-hidden="true" /> Semak jawapan</button>
      </div>
    </div>
    {checked && <div className={`pasak-grade score-${pasakScore}`} role="status" aria-live="polite">
      <div className="pasak-grade-score"><Trophy aria-hidden="true" /><div><span>Markah latihan</span><strong>{pasakScore}/5</strong><small>{pasakScore === 5 ? "Cemerlang! Semua unsur PASAK lengkap." : pasakScore >= 3 ? "Bagus! Baiki bahagian yang masih kurang." : "Jangan mengalah—lengkapkan semula jawapan anda."}</small></div></div>
      <div className="pasak-grade-list">{pasakSteps.map((step, index) => {
        const result = grading[index];
        return <div className={result.passed ? "is-pass" : "needs-work"} key={step.key}>
          {result.passed ? <CheckCircle2 aria-hidden="true" /> : <AlertCircle aria-hidden="true" />}
          <p><strong>{step.letter} — {step.title}</strong><small>{result.passed ? "Isi relevan dan cukup jelas." : result.missing ? "Bahagian ini belum diisi." : pasakSuggestions[step.key]}</small></p>
          <span>{result.passed ? "1/1" : "0/1"}</span>
        </div>;
      })}</div>
      <p className="pasak-disclaimer">Semakan ini ialah panduan latihan berdasarkan struktur dan kata kunci PASAK. Guru boleh menerima jawapan lain yang munasabah.</p>
    </div>}
    {showModel && <div className="pasak-model" aria-live="polite">
      <div className="pasak-model-title"><Sparkles aria-hidden="true" /><div><strong>Contoh jawapan PASAK</strong><small>Bandingkan isi anda dengan panduan ini.</small></div></div>
      <div className="pasak-model-grid">{pasakSteps.map((step) => <div key={step.key}><span>{step.letter}</span><p><strong>{step.title}</strong>{exercise.answer[step.key]}</p></div>)}</div>
      <div className="pasak-complete"><span>Jawapan lengkap</span><p>{completeAnswer}</p></div>
      <small className="pasak-note">Jawapan murid tidak semestinya sama bulat-bulat. Pastikan isi tepat dan mempunyai kelima-lima unsur PASAK.</small>
    </div>}
  </article>;
}

function FlashCards({ chapter }: { chapter: Chapter }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const nextCard = () => {
    setIndex((current) => (current + 1) % chapter.points.length);
    setRevealed(false);
  };

  return <div className={`flashcard ${revealed ? "is-revealed" : ""}`}>
    <div className="flashcard-top"><span><Layers3 aria-hidden="true" /> Kad imbas interaktif</span><strong>{index + 1}/{chapter.points.length}</strong></div>
    <div className="flashcard-body" aria-live="polite">
      <small>{revealed ? "Huraian ringkas" : "Kata kunci"}</small>
      <p>{revealed ? chapter.points[index] : chapter.subtopics[index % chapter.subtopics.length]}</p>
    </div>
    <div className="flashcard-actions">
      <button type="button" onClick={() => setRevealed((current) => !current)}>{revealed ? "Sembunyikan huraian" : "Lihat huraian"}</button>
      <button type="button" className="next-card" onClick={nextCard}>Kad seterusnya <ChevronRight aria-hidden="true" /></button>
    </div>
  </div>;
}

function NotesSection({ chapters }: { chapters: Chapter[] }) {
  const accents = ["coral", "gold", "teal", "purple"];
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceStyle, setVoiceStyle] = useState<(typeof voiceStyles)[number]["id"]>("cikgu");
  const [speakingChapter, setSpeakingChapter] = useState<number | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSpeechSupported(false);
      return;
    }
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stopReading = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeakingChapter(null);
  };

  const readChapter = (chapter: Chapter) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const selectedVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("ms")) ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("id"));
    const selectedStyle = voiceStyles.find((style) => style.id === voiceStyle) ?? voiceStyles[0];
    const text = `Bab ${chapter.number}. ${chapter.title}. Topik pembelajaran: ${chapter.subtopics.join(", ")}. Isi penting. ${chapter.points.join(" ")}`;
    const reading = new SpeechSynthesisUtterance(text);
    if (selectedVoice) reading.voice = selectedVoice;
    reading.lang = selectedVoice?.lang || "ms-MY";
    reading.rate = selectedStyle.rate;
    reading.pitch = selectedStyle.pitch;
    reading.onend = () => setSpeakingChapter(null);
    reading.onerror = () => setSpeakingChapter(null);
    setSpeakingChapter(chapter.number);
    window.speechSynthesis.speak(reading);
  };

  return <section id="nota" className="content-section">
    <div className="section-heading"><div className="section-icon notes-icon"><BookOpenText /></div><div><span className="eyebrow">Semua bab KSSM</span><h2>Nota interaktif</h2></div></div>
    <div className="section-intro">Buka bab untuk membaca nota, melihat peta minda, bermain kad imbas dan mendengar bacaan Bahasa Melayu.</div>
    <div className="read-toolbar">
      <div className="read-title"><Headphones aria-hidden="true" /><span><strong>Read Along</strong><small>Dengar sambil membaca</small></span></div>
      {speechSupported ? <div className="voice-controls"><label><span>Pilih suara</span><select value={voiceStyle} onChange={(event) => { stopReading(); setVoiceStyle(event.target.value as (typeof voiceStyles)[number]["id"]); }} aria-label="Pilih gaya suara Bahasa Melayu">
        {voiceStyles.map((style) => <option value={style.id} key={style.id}>{style.label}</option>)}
      </select></label><small className="voice-note">{voices.some((voice) => voice.lang.toLowerCase().startsWith("ms")) ? "Suara Melayu tersedia pada peranti ini." : voices.some((voice) => voice.lang.toLowerCase().startsWith("id")) ? "Menggunakan suara Indonesia yang paling serasi dengan Bahasa Melayu." : "Bacaan ditetapkan kepada Bahasa Melayu melalui enjin suara telefon."}</small></div> : <p>Peranti ini tidak menyokong bacaan suara.</p>}
    </div>
    <div className="notes-grid all-chapters">{chapters.map((chapter) => <details className={`note-card ${accents[(chapter.number - 1) % accents.length]}`} key={chapter.number}>
      <summary><div className="chapter-badge">BAB {chapter.number}</div>{chapter.mindMaps && <div className="map-count"><Sparkles aria-hidden="true" /> {chapter.mindMaps.length} nota visual</div>}<h3>{chapter.title}</h3><div className="open-note">Buka nota <ChevronRight size={18} /></div></summary>
      <div className="note-content">
        <div className="subtopic-list">{chapter.subtopics.map((topic) => <span key={topic}>{topic}</span>)}</div>
        <ul>{chapter.points.map((point) => <li key={point}>{point}</li>)}</ul>
        {chapter.interactiveNotes && <div className="interactive-note-list" aria-label={`Nota interaktif Bab ${chapter.number}`}>
          {chapter.interactiveNotes.map((note) => <article className="interactive-note-feature" key={note.href}>
            <div className="interactive-note-visual" aria-hidden="true"><span>NOTA</span><strong>{chapter.number}</strong><small>bab</small></div>
            <div className="interactive-note-copy"><span className="eyebrow"><Sparkles aria-hidden="true" /> Nota interaktif baharu</span><h4>{note.title}</h4><p>{note.description}</p><div><small>{note.activities}</small><a href={note.href} target="_blank" rel="noreferrer"><Play aria-hidden="true" /> {note.cta ?? "Mula nota interaktif"}</a></div></div>
          </article>)}
        </div>}
        <FlashCards chapter={chapter} />
        {chapter.mindMaps && <div className="mind-map-gallery" aria-label={`Koleksi nota visual Bab ${chapter.number}`}>
          {chapter.mindMaps.map((mindMap) => <figure className="mind-map-card" key={mindMap.src}>
            <a className="mind-map-image" href={mindMap.src} target="_blank" rel="noreferrer" aria-label={`Buka besar ${mindMap.caption}`}>
              <img src={mindMap.src} alt={mindMap.alt} loading="lazy" />
              <span><Maximize2 aria-hidden="true" /> Buka besar</span>
            </a>
            <figcaption><span>Infografik &amp; peta minda</span><strong>{mindMap.caption}</strong></figcaption>
          </figure>)}
        </div>}
        {speechSupported && <div className="read-actions">
          <button className={speakingChapter === chapter.number ? "reading" : ""} type="button" onClick={() => readChapter(chapter)}><Volume2 aria-hidden="true" />{speakingChapter === chapter.number ? "Sedang dibaca..." : "Dengar nota"}</button>
          {speakingChapter === chapter.number && <button className="stop-reading" type="button" onClick={stopReading}><Square aria-hidden="true" /> Berhenti</button>}
        </div>}
      </div>
    </details>)}</div>
  </section>;
}

function ExercisesSection({ chapters, exercises, form }: { chapters: Chapter[]; exercises: PasakExercise[]; form: string }) {
  const [selected, setSelected] = useState(chapters[0].number);
  useEffect(() => setSelected(chapters[0].number), [chapters[0].number]);
  const chapter = chapters.find((item) => item.number === selected) ?? chapters[0];
  const exercise = exercises.find((item) => item.number === selected) ?? exercises[0];
  return <section id="latihan" className="content-section">
    <div className="section-heading"><div className="section-icon quiz-icon"><ClipboardCheck /></div><div><span className="eyebrow">5 objektif + 1 KBAT setiap bab</span><h2>Latihan interaktif</h2></div></div>
    <p className="section-intro">Pilih bab, kemudian pilih latihan objektif atau bina jawapan KBAT menggunakan Teknik PASAK.</p>
    <div className="exercise-summary" aria-label="Ringkasan latihan">
      <div><span><ClipboardCheck aria-hidden="true" /></span><p><strong>90 soalan objektif</strong><small>5 soalan bagi setiap bab</small></p></div>
      <div><span><Sparkles aria-hidden="true" /></span><p><strong>18 latihan KBAT PASAK</strong><small>Pelaku • Aksi • Sebab • Akibat • Kesan</small></p></div>
    </div>
    {chapters.length > 1 && <div className="chapter-picker" aria-label="Pilih bab latihan">
      {chapters.map((item) => <button key={item.number} type="button" className={selected === item.number ? "active" : ""} aria-pressed={selected === item.number} onClick={() => setSelected(item.number)}><span>Bab</span><strong>{item.number}</strong></button>)}
    </div>}
    <Tabs defaultValue="kbat" className="exercise-tabs">
      <TabsList aria-label="Pilih jenis latihan">
        <TabsTrigger value="kbat"><Sparkles aria-hidden="true" /><span><strong>KBAT Teknik PASAK</strong><small>1 soalan berstruktur</small></span></TabsTrigger>
        <TabsTrigger value="objektif"><ClipboardCheck aria-hidden="true" /><span><strong>Soalan Objektif</strong><small>5 soalan pilihan</small></span></TabsTrigger>
      </TabsList>
      <TabsContent value="kbat"><PasakTrainer key={`pasak-${form}-${selected}`} exercise={exercise} chapter={chapter} form={form} /></TabsContent>
      <TabsContent value="objektif"><QuizCard key={`${form}-${selected}`} chapter={chapter} form={form} /></TabsContent>
    </Tabs>
  </section>;
}

function GamesSection({ games }: { games: Game[] }) {
  return <section id="game" className="content-section">
    <div className="section-heading"><div className="section-icon games-icon"><Gamepad2 /></div><div><span className="eyebrow">Belajar sambil bermain</span><h2>Game Sejarah</h2></div></div>
    <div className="games-grid">{games.map((game, index) => <article className={`game-card game-${index + 1}`} key={game.title}>
      <div className="game-art" aria-hidden="true">{game.icon === "tower" ? <GraduationCap /> : <Swords />}</div>
      <div className="game-copy"><span>{game.topic}</span><h3>{game.title}</h3><p>{game.description}</p><a href={game.href} target="_blank" rel="noreferrer">Main sekarang <ChevronRight size={18} /></a></div>
    </article>)}</div>
  </section>;
}

type PortalStats = {
  total: number;
  today: number;
  yesterday: number;
  thisMonth: number;
  activeDays: number;
  firstRecordedDate: string | null;
  monthly: { month: string; count: number }[];
};

const TEACHER_MODE_KEY = "historyverse-teacher-mode";

function StatisticsDialog({ mobile = false, teacherMode, onTeacherModeChange }: { mobile?: boolean; teacherMode: boolean; onTeacherModeChange: (enabled: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<PortalStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch("/api/stats", { cache: "no-store" });
      if (!response.ok) throw new Error("Statistik tidak tersedia");
      setStats(await response.json() as PortalStats);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) void loadStats();
  }, [open]);

  const maximum = Math.max(1, ...(stats?.monthly.map((item) => item.count) ?? [1]));
  const monthLabel = (month: string) => new Intl.DateTimeFormat("ms-MY", { month: "short", year: "2-digit", timeZone: "Asia/Kuala_Lumpur" }).format(new Date(`${month}-01T12:00:00+08:00`));
  const dateLabel = (date: string) => new Intl.DateTimeFormat("ms-MY", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kuala_Lumpur" }).format(new Date(`${date}T12:00:00+08:00`));

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <button className={mobile ? "statistics-mobile-trigger" : "statistics-trigger"} type="button" aria-label="Buka statistik portal"><BarChart3 aria-hidden="true" /> <span>Statistik</span></button>
    </DialogTrigger>
    <DialogContent className="statistics-dialog">
      <div className="statistics-title-row">
        <div className="statistics-title-icon"><BarChart3 aria-hidden="true" /></div>
        <div><DialogTitle>Statistik Pelawat</DialogTitle><DialogDescription>Kiraan bukaan murid dan pelawat lain. Peranti yang menggunakan Mod Cikgu tidak dimasukkan.</DialogDescription></div>
      </div>
      <div className={teacherMode ? "teacher-mode-card is-active" : "teacher-mode-card"}>
        <div><CheckCircle2 aria-hidden="true" /><p><strong>{teacherMode ? "Mod Cikgu aktif" : "Peranti ini masih dikira"}</strong><span>{teacherMode ? "Bukaan daripada peranti ini tidak masuk statistik." : "Aktifkan pada telefon atau laptop milik Cikgu Zamzila."}</span></p></div>
        <button type="button" onClick={() => onTeacherModeChange(!teacherMode)}>{teacherMode ? "Matikan" : "Aktifkan Mod Cikgu"}</button>
      </div>
      {loading && !stats && <div className="statistics-loading"><RefreshCw aria-hidden="true" /> Mengira jumlah kunjungan...</div>}
      {failed && !stats && <div className="statistics-error"><AlertCircle aria-hidden="true" /><p><strong>Statistik belum dapat dibuka.</strong><span>Cuba tekan muat semula sebentar lagi.</span></p></div>}
      {stats && <>
        <div className="statistics-cards">
          <article className="statistics-card main"><Eye aria-hidden="true" /><span>Jumlah sepanjang masa</span><strong>{stats.total.toLocaleString("ms-MY")}</strong><small>{stats.firstRecordedDate ? `Sejak ${dateLabel(stats.firstRecordedDate)}` : "Sejak rekod diaktifkan"}</small></article>
          <article className="statistics-card"><span>Hari ini</span><strong>{stats.today.toLocaleString("ms-MY")}</strong><small>kali portal dibuka</small></article>
          <article className="statistics-card"><span>Semalam</span><strong>{stats.yesterday.toLocaleString("ms-MY")}</strong><small>kali portal dibuka</small></article>
          <article className="statistics-card"><span>Bulan ini</span><strong>{stats.thisMonth.toLocaleString("ms-MY")}</strong><small>{stats.activeDays.toLocaleString("ms-MY")} hari portal dilawati</small></article>
        </div>
        <div className="statistics-chart">
          <div className="statistics-chart-heading"><div><strong>Rekod sejak mula</strong><span>Jumlah bukaan mengikut bulan—tiada rekod lama dipadam</span></div><button type="button" onClick={() => void loadStats()} disabled={loading}><RefreshCw className={loading ? "is-spinning" : ""} aria-hidden="true" /> Muat semula</button></div>
          <div className="statistics-bars" aria-label="Carta semua bukaan portal mengikut bulan sejak rekod bermula">
            {stats.monthly.map((item) => <div className="statistics-bar-column" key={item.month}><span className="statistics-bar-value">{item.count}</span><div className="statistics-bar-track"><span style={{ height: `${Math.max(6, (item.count / maximum) * 100)}%` }} /></div><small>{monthLabel(item.month)}</small></div>)}
          </div>
        </div>
        <p className="statistics-note"><strong>Rekod kekal selamanya.</strong> Kiraan tidak dibuang selepas 7 hari. Bukaan daripada peranti Cikgu yang sudah mengaktifkan Mod Cikgu tidak ditambah.</p>
      </>}
    </DialogContent>
  </Dialog>;
}

type CampusDestination = "campus" | "tingkatan-1" | "tingkatan-2" | "makmal";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function InstallAppButton({ mobile = false }: { mobile?: boolean }) {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const capture = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);

  const install = async () => {
    if (!prompt) {
      setShowGuide(true);
      return;
    }
    await prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
  };

  return <Dialog open={showGuide} onOpenChange={setShowGuide}>
    <button className={mobile ? "install-mobile-trigger" : "install-trigger"} type="button" onClick={install} aria-label="Pasang HISTORYVERSE 360 pada telefon"><Download aria-hidden="true" /><span>{mobile ? "Pasang" : "Pasang App"}</span></button>
    <DialogContent className="install-dialog">
      <DialogTitle>Pasang HISTORYVERSE 360</DialogTitle>
      <DialogDescription>Gunakan Chrome pada Android, tekan menu tiga titik, kemudian pilih <strong>Tambah pada skrin utama</strong> atau <strong>Pasang aplikasi</strong>.</DialogDescription>
      <div className="install-steps"><span>1</span><p><strong>Buka dalam Chrome</strong><small>Pastikan portal dibuka terus dalam pelayar Chrome.</small></p><span>2</span><p><strong>Tekan menu ⋮</strong><small>Menu berada di penjuru kanan atas telefon.</small></p><span>3</span><p><strong>Pilih Pasang aplikasi</strong><small>Ikon HISTORYVERSE 360 akan muncul pada skrin utama.</small></p></div>
    </DialogContent>
  </Dialog>;
}

type CampusPosition = { x: number; y: number };
type CampusBuilding = Exclude<CampusDestination, "campus">;

const campusEntrances: Record<CampusBuilding, CampusPosition> = {
  "tingkatan-1": { x: 25, y: 61 },
  "tingkatan-2": { x: 50, y: 56 },
  makmal: { x: 75, y: 61 },
};

const campusPaths: Record<CampusBuilding, CampusPosition[]> = {
  "tingkatan-1": [{ x: 38, y: 82 }, campusEntrances["tingkatan-1"]],
  "tingkatan-2": [{ x: 50, y: 77 }, campusEntrances["tingkatan-2"]],
  makmal: [{ x: 65, y: 82 }, campusEntrances.makmal],
};

const campusBuildingCopy: Record<CampusBuilding, { title: string; detail: string }> = {
  "tingkatan-1": { title: "Kelas Tingkatan 1", detail: "Bab 1 hingga Bab 8 menanti di dalam kelas." },
  "tingkatan-2": { title: "Balai Ilmu Tingkatan 2", detail: "Bab 1 hingga Bab 10 menanti di dalam balai ilmu." },
  makmal: { title: "Makmal Game", detail: "Tujuh pengembaraan Sejarah sedia untuk dimainkan." },
};

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

function GhazalMusic() {
  const [playing, setPlaying] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const musicTimer = useRef<number | null>(null);
  const nextBar = useRef(0);

  const stopMusic = () => {
    if (musicTimer.current) window.clearInterval(musicTimer.current);
    musicTimer.current = null;
    const context = contextRef.current;
    const master = masterRef.current;
    if (context && master) {
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setValueAtTime(master.gain.value, context.currentTime);
      master.gain.linearRampToValueAtTime(0, context.currentTime + .18);
    }
    setPlaying(false);
  };

  useEffect(() => () => {
    if (musicTimer.current) window.clearInterval(musicTimer.current);
    if (contextRef.current) void contextRef.current.close();
  }, []);

  const scheduleBar = (context: AudioContext, master: GainNode, start: number) => {
    const beat = .65;
    const melody = [293.66, 349.23, 392, 440, 466.16, 440, 392, 349.23];

    melody.forEach((frequency, index) => {
      const time = start + index * beat / 2;
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      oscillator.type = index % 3 === 0 ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequency * .985, time);
      oscillator.frequency.exponentialRampToValueAtTime(frequency, time + .07);
      noteGain.gain.setValueAtTime(.0001, time);
      noteGain.gain.exponentialRampToValueAtTime(.16, time + .035);
      noteGain.gain.exponentialRampToValueAtTime(.0001, time + beat * .46);
      oscillator.connect(noteGain).connect(master);
      oscillator.start(time);
      oscillator.stop(time + beat * .5);
    });

    [0, 1, 2, 3].forEach((count) => {
      const time = start + count * beat;
      const drum = context.createOscillator();
      const drumGain = context.createGain();
      drum.type = "sine";
      drum.frequency.setValueAtTime(count % 2 === 0 ? 118 : 165, time);
      drum.frequency.exponentialRampToValueAtTime(58, time + .14);
      drumGain.gain.setValueAtTime(count === 0 ? .2 : .12, time);
      drumGain.gain.exponentialRampToValueAtTime(.0001, time + .18);
      drum.connect(drumGain).connect(master);
      drum.start(time);
      drum.stop(time + .2);
    });
  };

  const startMusic = async () => {
    const context = contextRef.current ?? new AudioContext();
    contextRef.current = context;
    await context.resume();

    const master = context.createGain();
    master.gain.setValueAtTime(.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(.22, context.currentTime + .35);
    master.connect(context.destination);
    masterRef.current = master;

    const droneGain = context.createGain();
    droneGain.gain.value = .055;
    droneGain.connect(master);
    [146.83, 220].forEach((frequency) => {
      const drone = context.createOscillator();
      drone.type = "sine";
      drone.frequency.value = frequency;
      drone.connect(droneGain);
      drone.start();
    });

    nextBar.current = context.currentTime + .08;
    const playBar = () => {
      const start = Math.max(context.currentTime + .04, nextBar.current);
      scheduleBar(context, master, start);
      nextBar.current = start + 2.6;
    };
    playBar();
    musicTimer.current = window.setInterval(playBar, 2500);
    setPlaying(true);
  };

  return <button className={playing ? "ghazal-toggle is-playing" : "ghazal-toggle"} type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => playing ? stopMusic() : void startMusic()} aria-pressed={playing}>
    {playing ? <VolumeX aria-hidden="true" /> : <Music2 aria-hidden="true" />}
    <span>{playing ? "Tutup muzik" : "Main muzik ghazal"}<small>{playing ? "Irama sedang dimainkan" : "Irama Melayu lembut"}</small></span>
  </button>;
}

function MagicPortalDialog({ destination, onStay, onEnter }: { destination: CampusBuilding | null; onStay: () => void; onEnter: (destination: CampusBuilding) => void }) {
  const [opening, setOpening] = useState(false);
  const openingTimer = useRef<number | null>(null);

  useEffect(() => {
    setOpening(false);
    return () => {
      if (openingTimer.current) window.clearTimeout(openingTimer.current);
    };
  }, [destination]);

  if (!destination) return null;
  const copy = campusBuildingCopy[destination];

  const enterPortal = () => {
    if (opening) return;
    setOpening(true);
    openingTimer.current = window.setTimeout(() => onEnter(destination), 720);
  };

  return <Dialog open onOpenChange={(nextOpen) => { if (!nextOpen && !opening) onStay(); }}>
    <DialogContent className={`magic-entry-dialog ${opening ? "is-opening" : ""}`} showCloseButton={!opening} onEscapeKeyDown={(event) => { if (opening) event.preventDefault(); }}>
      <DialogTitle className="sr-only">Pintu portal ke {copy.title}</DialogTitle>
      <DialogDescription className="sr-only">Pilih sama ada mahu masuk melalui portal magik atau sambung berjalan di kawasan akademi.</DialogDescription>
      <div className="magic-entry-scene" aria-hidden="true">
        <span className="magic-star star-one">✦</span>
        <span className="magic-star star-two">✧</span>
        <span className="magic-star star-three">✦</span>
        <div className="magic-ring ring-three" />
        <div className="magic-ring ring-two" />
        <div className="magic-ring ring-one"><DoorOpen /></div>
      </div>
      <div className="magic-entry-copy">
        <span><Sparkles aria-hidden="true" /> Cikgu sudah sampai!</span>
        <h2>{copy.title}</h2>
        <p>{opening ? "Portal sedang dibuka… ikut cahaya magik masuk ke dalam!" : copy.detail}</p>
      </div>
      <div className="magic-entry-actions">
        <button className="magic-enter-button" type="button" onClick={enterPortal} disabled={opening}><Sparkles aria-hidden="true" /> {opening ? "Membuka portal…" : "Masuk melalui portal magik"}</button>
        <button className="magic-stay-button" type="button" onClick={onStay} disabled={opening}>Terus berjalan-jalan</button>
      </div>
    </DialogContent>
  </Dialog>;
}

function CampusMap({ onEnter }: { onEnter: (destination: CampusDestination) => void }) {
  const [walkingTo, setWalkingTo] = useState<CampusDestination | null>(null);
  const [portalDestination, setPortalDestination] = useState<CampusBuilding | null>(null);
  const [player, setPlayer] = useState<CampusPosition>({ x: 50, y: 94 });
  const [isWalking, setIsWalking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [showTeacherMessage, setShowTeacherMessage] = useState(false);
  const [walkDuration, setWalkDuration] = useState(1100);
  const [facingLeft, setFacingLeft] = useState(false);
  const motionTimer = useRef<number | null>(null);
  const waveTimer = useRef<number | null>(null);
  const teacherVoiceRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef(player);

  useEffect(() => {
    return () => {
      if (motionTimer.current) window.clearTimeout(motionTimer.current);
      if (waveTimer.current) window.clearTimeout(waveTimer.current);
      if (teacherVoiceRef.current) teacherVoiceRef.current.pause();
    };
  }, []);

  const stopTeacherVoice = () => {
    if (waveTimer.current) window.clearTimeout(waveTimer.current);
    if (teacherVoiceRef.current) {
      teacherVoiceRef.current.pause();
      teacherVoiceRef.current.currentTime = 0;
    }
    setIsWaving(false);
    setShowTeacherMessage(false);
  };

  const wave = () => {
    if (isWalking || walkingTo) return;
    if (waveTimer.current) window.clearTimeout(waveTimer.current);
    setShowTeacherMessage(true);
    setIsWaving(true);
    if (teacherVoiceRef.current) {
      teacherVoiceRef.current.currentTime = 0;
      void teacherVoiceRef.current.play().catch(() => undefined);
    }
    waveTimer.current = window.setTimeout(() => setIsWaving(false), 1700);
  };

  const movePlayer = (next: CampusPosition, duration = 1700, onDone?: () => void) => {
    if (motionTimer.current) window.clearTimeout(motionTimer.current);
    if (waveTimer.current) window.clearTimeout(waveTimer.current);
    const current = playerRef.current;
    const distance = Math.hypot(next.x - current.x, next.y - current.y);
    const walkDuration = Math.max(480, Math.min(duration, distance * 46));
    stopTeacherVoice();
    setFacingLeft(next.x < current.x);
    setIsWaving(false);
    setWalkDuration(walkDuration);
    playerRef.current = next;
    setPlayer(next);
    setIsWalking(true);
    motionTimer.current = window.setTimeout(() => {
      setIsWalking(false);
      if (onDone) onDone();
    }, walkDuration);
  };

  const moveAlongPath = (points: CampusPosition[], onDone: () => void) => {
    let index = 0;
    const moveNext = () => {
      const point = points[index];
      if (!point) {
        onDone();
        return;
      }
      index += 1;
      movePlayer(point, index === points.length ? 1400 : 1050, moveNext);
    };
    moveNext();
  };

  const travel = (destination: CampusBuilding) => {
    if (walkingTo) return;
    setPortalDestination(null);
    setWalkingTo(destination);
    moveAlongPath(campusPaths[destination], () => {
      setWalkingTo(null);
      setPortalDestination(destination);
    });
  };

  const wander = (event: ReactPointerEvent<HTMLElement>) => {
    if (walkingTo || (event.target as HTMLElement).closest("button,a")) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = clamp(((event.clientX - bounds.left) / bounds.width) * 100, 7, 93);
    const y = clamp(((event.clientY - bounds.top) / bounds.height) * 100, 55, 94);
    movePlayer({ x, y });
  };

  const walkWithKeys = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (walkingTo || (event.target as HTMLElement).closest("button,a")) return;
    const steps: Partial<Record<string, CampusPosition>> = {
      ArrowLeft: { x: -6, y: 0 }, ArrowRight: { x: 6, y: 0 }, ArrowUp: { x: 0, y: -5 }, ArrowDown: { x: 0, y: 5 },
    };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    movePlayer({ x: clamp(player.x + step.x, 7, 93), y: clamp(player.y + step.y, 55, 94) }, 560);
  };

  const playerScale = 0.58 + ((player.y - 55) / 39) * 0.42;
  const playerStyle = {
    "--player-x": `${player.x}%`,
    "--player-y": `${player.y}%`,
    "--player-scale": playerScale.toFixed(2),
    "--player-face": facingLeft ? -1 : 1,
    "--walk-duration": `${walkDuration}ms`,
  } as CSSProperties;

  return <section className="campus-world" aria-labelledby="campus-title" aria-label="Peta permainan Akademi Sejarah. Sentuh jalan untuk menggerakkan Cikgu Zamzila." onPointerDown={wander} onKeyDown={walkWithKeys} tabIndex={0}>
    <img className="campus-background" src="/historyverse-palace.png" alt="Peta HISTORYVERSE 360 dengan istana Melayu-Islam, bangunan Tingkatan 1, Tingkatan 2 dan Makmal Game" />
    <div className="campus-shade" aria-hidden="true" />
    <GhazalMusic />
    <div className="campus-title-card">
      <span><MapPinned aria-hidden="true" /> Jelajah • Bermain • Kuasai Sejarah</span>
      <h1 id="campus-title">HISTORYVERSE 360<br /><em>Cikgu Zamzila</em></h1>
      <p>Pilih bangunan, ikut cikgu berjalan, kemudian buka portal magik.</p>
    </div>
    <button className={`campus-hotspot hotspot-one ${walkingTo === "tingkatan-1" ? "is-target" : ""}`} type="button" onClick={() => travel("tingkatan-1")} disabled={walkingTo !== null}>
      <span className="hotspot-icon"><School aria-hidden="true" /></span>
      <span><small>Bangunan kelas</small><strong>Tingkatan 1</strong><em>Pilih Bab 1 hingga Bab 8 di dalam kelas</em></span>
      <DoorOpen className="hotspot-arrow" aria-hidden="true" />
    </button>
    <button className={`campus-hotspot hotspot-two ${walkingTo === "tingkatan-2" ? "is-target" : ""}`} type="button" onClick={() => travel("tingkatan-2")} disabled={walkingTo !== null}>
      <span className="hotspot-icon"><GraduationCap aria-hidden="true" /></span>
      <span><small>Bangunan kelas</small><strong>Tingkatan 2</strong><em>Pilih Bab 1 hingga Bab 10 di dalam kelas</em></span>
      <DoorOpen className="hotspot-arrow" aria-hidden="true" />
    </button>
    <button className={`campus-hotspot hotspot-lab ${walkingTo === "makmal" ? "is-target" : ""}`} type="button" onClick={() => travel("makmal")} disabled={walkingTo !== null}>
      <span className="hotspot-icon"><FlaskConical aria-hidden="true" /></span>
      <span><small>Bangunan permainan</small><strong>Makmal Game</strong><em>7 pengembaraan Sejarah</em></span>
      <Gamepad2 className="hotspot-arrow" aria-hidden="true" />
    </button>
    <div className={`campus-character ${isWalking ? "is-walking" : ""} ${isWaving ? "is-waving" : ""}`} style={playerStyle}>
      <button className="campus-avatar" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={wave} aria-label="Cikgu Zamzila. Sentuh untuk mendengar suara cikgu.">
        <span className="character-spark spark-a" aria-hidden="true">✦</span><span className="character-spark spark-b" aria-hidden="true">✧</span>
        <span className="campus-sprite" aria-hidden="true" />
        <span className="character-shadow" aria-hidden="true" />
        <span className="step-dust dust-a" aria-hidden="true" /><span className="step-dust dust-b" aria-hidden="true" />
      </button>
    </div>
    {showTeacherMessage && <div className="campus-guide teacher-popover" aria-live="polite" onPointerDown={(event) => event.stopPropagation()}>
      <button className="teacher-popover-close" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={stopTeacherVoice} aria-label="Tutup dialog Cikgu Zamzila">×</button>
      <div><span>Cikgu Zamzila</span><p>Hai semua! Jom kita menelusuri sejarah bersama. Pilih bangunan untuk mulakan pengembaraan.</p><small><Volume2 aria-hidden="true" /> Suara Cikgu Zamzila</small></div>
    </div>}
    <audio ref={teacherVoiceRef} preload="auto" onEnded={() => setShowTeacherMessage(false)}>
      <source src="/audio/suara-cikgu-zamzila.m4a" type="audio/mp4" />
      <source src="/audio/suara-cikgu-zamzila.mp3" type="audio/mpeg" />
    </audio>
    <div className="campus-walk-hint" aria-hidden="true"><span>👆</span> Sentuh jalan untuk berjalan · sentuh cikgu untuk dengar suara <small>Komputer: guna kekunci anak panah</small></div>
    <MagicPortalDialog destination={portalDestination} onStay={() => setPortalDestination(null)} onEnter={onEnter} />
  </section>;
}

function ClassroomView({ form, chapters, exercises, onBack }: { form: string; chapters: Chapter[]; exercises: PasakExercise[]; onBack: () => void }) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const chapter = selectedChapter === null ? null : chapters.find((item) => item.number === selectedChapter) ?? null;
  const exercise = selectedChapter === null ? null : exercises.find((item) => item.number === selectedChapter) ?? null;

  const chooseChapter = (number: number) => {
    setSelectedChapter(number);
    window.setTimeout(() => document.querySelector("#kelas-isi")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return <div className="destination-view classroom-view">
    <div className="destination-header">
      <button type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /> Kembali ke peta</button>
      <div><span className="eyebrow">Selamat masuk ke kelas</span><h1>Kelas {form}</h1><p>Sekarang pilih bab yang ingin dipelajari. Nota, peta minda dan latihan hanya dibuka selepas bab dipilih.</p></div>
      <div className="destination-seal"><School aria-hidden="true" /><span>{chapters.length}<small>bab</small></span></div>
    </div>
    <div className="topic-door-grid" aria-label={`Topik ${form}`}>
      {chapters.map((item) => <button className={selectedChapter === item.number ? "topic-door active" : "topic-door"} type="button" key={item.number} onClick={() => chooseChapter(item.number)} aria-pressed={selectedChapter === item.number}>
        <span className="door-number">Bab {item.number}</span>
        <strong>{item.title}</strong>
        <small>{item.subtopics.slice(0, 2).join(" • ")}</small>
        <span className="door-enter">Masuk kelas <ChevronRight aria-hidden="true" /></span>
      </button>)}
    </div>
    {!chapter && <div className="chapter-welcome"><BookOpenText aria-hidden="true" /><div><strong>Pilih bab dahulu</strong><p>Cikgu Zamzila sedang menunggu pilihan kamu di pintu kelas.</p></div></div>}
    {chapter && exercise && <div id="kelas-isi" className="classroom-content">
      <div className="blackboard"><span>Anda berada di</span><strong>{form} • Bab {chapter.number}</strong><p>{chapter.title}</p></div>
      <NotesSection chapters={[chapter]} />
      <ExercisesSection chapters={[chapter]} exercises={[exercise]} form={form} />
    </div>}
  </div>;
}

function GameLab({ onBack }: { onBack: () => void }) {
  return <div className="destination-view lab-view">
    <div className="destination-header lab-header">
      <button type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /> Kembali ke peta</button>
      <div><span className="eyebrow">Eksperimen ilmu bermula</span><h1>Makmal Game Sejarah</h1><p>Pilih permainan, masuk ke dunia sejarah dan buktikan penguasaan anda.</p></div>
      <div className="destination-seal"><Gamepad2 aria-hidden="true" /><span>7<small>game</small></span></div>
    </div>
    <div className="lab-console"><span className="lab-light" aria-hidden="true" /><FlaskConical aria-hidden="true" /><p><strong>Makmal sedia!</strong> Setiap game dibuka dalam portalnya sendiri. Pilih misi di bawah untuk bermain.</p></div>
    <Tabs defaultValue="game-t1" className="lab-tabs">
      <TabsList><TabsTrigger value="game-t1">Game Tingkatan 1</TabsTrigger><TabsTrigger value="game-t2">Game Tingkatan 2</TabsTrigger></TabsList>
      <TabsContent value="game-t1"><GamesSection games={formOneGames} /></TabsContent>
      <TabsContent value="game-t2"><GamesSection games={formTwoGames} /></TabsContent>
    </Tabs>
  </div>;
}

export default function HomePage() {
  const [destination, setDestination] = useState<CampusDestination>("campus");
  const [teacherMode, setTeacherMode] = useState(false);
  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    const activateTeacherMode = parameters.get("cikgu") === "1";
    const savedTeacherMode = window.localStorage.getItem(TEACHER_MODE_KEY) === "1";
    const shouldExcludeVisit = activateTeacherMode || savedTeacherMode;

    if (activateTeacherMode) {
      window.localStorage.setItem(TEACHER_MODE_KEY, "1");
      parameters.delete("cikgu");
      const cleanedQuery = parameters.toString();
      window.history.replaceState({}, "", `${window.location.pathname}${cleanedQuery ? `?${cleanedQuery}` : ""}${window.location.hash}`);
    }

    setTeacherMode(shouldExcludeVisit);
    if (!shouldExcludeVisit) void fetch("/api/stats/open", { method: "POST", keepalive: true }).catch(() => undefined);
    if ("serviceWorker" in navigator) void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);

  const changeTeacherMode = (enabled: boolean) => {
    if (enabled) window.localStorage.setItem(TEACHER_MODE_KEY, "1");
    else window.localStorage.removeItem(TEACHER_MODE_KEY);
    setTeacherMode(enabled);
  };
  const enter = (next: CampusDestination) => {
    setDestination(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <main>
    <header className="topbar"><button className="brand brand-button" type="button" onClick={() => enter("campus")} aria-label="Kembali ke peta HISTORYVERSE 360"><span className="brand-mark"><GraduationCap /></span><span><strong>HISTORYVERSE 360</strong><small>Ekosistem Sejarah Cikgu Zamzila</small></span></button><nav aria-label="Navigasi utama"><button type="button" onClick={() => enter("campus")}><MapPinned size={17} /> Peta</button><button type="button" onClick={() => enter("tingkatan-1")}><BookOpenText size={17} /> Tingkatan 1</button><button type="button" onClick={() => enter("tingkatan-2")}><GraduationCap size={17} /> Tingkatan 2</button><button type="button" onClick={() => enter("makmal")}><Gamepad2 size={17} /> Makmal Game</button><InstallAppButton /><StatisticsDialog teacherMode={teacherMode} onTeacherModeChange={changeTeacherMode} /></nav></header>
    <div id="atas" className="page-shell">
      {destination === "campus" && <CampusMap onEnter={enter} />}
      {destination === "tingkatan-1" && <ClassroomView form="Tingkatan 1" chapters={formOneChapters} exercises={formOnePasakExercises} onBack={() => enter("campus")} />}
      {destination === "tingkatan-2" && <ClassroomView form="Tingkatan 2" chapters={formTwoChapters} exercises={formTwoPasakExercises} onBack={() => enter("campus")} />}
      {destination === "makmal" && <GameLab onBack={() => enter("campus")} />}
    </div>
    <footer><div><span className="brand-mark small"><GraduationCap /></span><p><strong>HISTORYVERSE 360 • Cikgu Zamzila</strong><br />Jelajah • Bermain • Kuasai Sejarah</p></div><p>18 bab • 90 objektif • 18 KBAT PASAK • 7 game</p></footer>
    <nav className="mobile-nav" aria-label="Navigasi telefon"><button type="button" onClick={() => enter("campus")}><Home /><span>Peta</span></button><button type="button" onClick={() => enter("tingkatan-1")}><BookOpenText /><span>Ting. 1</span></button><button type="button" onClick={() => enter("tingkatan-2")}><GraduationCap /><span>Ting. 2</span></button><button type="button" onClick={() => enter("makmal")}><Gamepad2 /><span>Makmal</span></button><InstallAppButton mobile /><StatisticsDialog mobile teacherMode={teacherMode} onTeacherModeChange={changeTeacherMode} /></nav>
  </main>;
}
