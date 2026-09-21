export type Question = {
  question: string;
  options: string[];
  answer: number;
};

export type PasakExercise = {
  number: number;
  question: string;
  answer: {
    pelaku: string;
    aksi: string;
    sebab: string;
    akibat: string;
    kesan: string;
  };
};

export type Chapter = {
  number: number;
  title: string;
  subtopics: string[];
  points: string[];
  interactiveNotes?: {
    title: string;
    description: string;
    href: string;
    activities: string;
    cta?: string;
  }[];
  mindMaps?: {
    src: string;
    alt: string;
    caption: string;
  }[];
  questions: Question[];
};

export const formOneChapters: Chapter[] = [
  {
    number: 1,
    title: "Mengenali Sejarah",
    subtopics: ["Pengertian sejarah", "Masa silam dan ruang", "Sumber sejarah", "Kaedah penyelidikan", "Tafsiran dan kepentingan sejarah"],
    points: [
      "Sejarah ialah peristiwa yang berlaku pada masa lalu dan dikaji berdasarkan bukti yang sahih.",
      "Sumber primer belum diolah seperti fosil, artifak, manuskrip dan batu bersurat; sumber sekunder telah dikaji atau diterbitkan.",
      "Penyelidikan sejarah menggunakan kaedah bertulis, lisan dan arkeologi.",
      "Tafsiran membantu memahami sesuatu peristiwa daripada pelbagai sudut, manakala ilmu sejarah membina jati diri dan patriotisme.",
    ],
    mindMaps: [
      { src: "/infografik/t1-bab1-mengenali-sejarah.webp", alt: "Nota infografik bergambar pengenalan kepada sejarah", caption: "1.1 Mengenali Sejarah" },
      { src: "/infografik/t1-bab1-sumber-sejarah.webp", alt: "Nota infografik sumber primer dan sumber sekunder", caption: "Sumber Sejarah" },
      { src: "/infografik/t1-bab1-kaedah-sejarah.webp", alt: "Nota infografik kaedah mempelajari sejarah", caption: "Kaedah Mempelajari Sejarah" },
      { src: "/infografik/t1-bab1-ruang-masa.webp", alt: "Nota infografik ruang dan masa dalam sejarah", caption: "Ruang dan Masa dalam Sejarah" },
      { src: "/infografik/t1-bab1-warisan-sejarah.webp", alt: "Nota infografik tafsiran, kepentingan dan warisan sejarah", caption: "Warisan dan Kepentingan Sejarah" },
    ],
    questions: [
      { question: "Apakah yang dimaksudkan dengan sejarah?", options: ["Ramalan masa hadapan", "Peristiwa masa lalu", "Cerita rekaan", "Catatan sains"], answer: 1 },
      { question: "Yang manakah merupakan sumber primer?", options: ["Buku teks", "Ensiklopedia", "Batu bersurat", "Majalah sejarah"], answer: 2 },
      { question: "Temu bual dengan saksi sesuatu peristiwa menggunakan kaedah apa?", options: ["Lisan", "Bertulis", "Saintifik", "Geografi"], answer: 0 },
      { question: "Apakah tujuan tafsiran dalam sejarah?", options: ["Mereka fakta", "Menghapuskan bukti", "Memahami peristiwa dari pelbagai sudut", "Menentukan masa hadapan"], answer: 2 },
      { question: "Mengapakah kita perlu mempelajari sejarah?", options: ["Membina jati diri", "Melupakan asal usul", "Menolak warisan", "Mengelakkan penyelidikan"], answer: 0 },
    ],
  },
  {
    number: 2,
    title: "Zaman Air Batu",
    interactiveNotes: [{
      title: "2.3 Garis Masa Zaman Air Batu",
      description: "Ikuti perjalanan bumi daripada Miosen hingga Holosen melalui garis masa visual. Klik setiap tahap untuk melihat tempoh, perubahan iklim, kehidupan dan kesannya.",
      href: "/interaktif/t1-bab2/timeline-zaman-air-batu.html",
      activities: "4 tahap boleh diklik • Garis masa visual • Semak pantas",
    }],
    mindMaps: [
      { src: "/infografik/t1-bab2-garis-masa.webp", alt: "Infografik garis masa empat tahap Zaman Air Batu", caption: "2.3 Garis Masa Zaman Air Batu" },
      { src: "/infografik/t1-bab2-perjalanan-tamadun.webp", alt: "Nota perjalanan daripada Zaman Air Batu menuju kehidupan bertamadun", caption: "2.4 Ciri-ciri Zaman Air Batu Akhir" },
      { src: "/infografik/t1-bab2-perubahan-akhir.webp", alt: "Nota infografik perubahan pada akhir Zaman Air Batu", caption: "2.5 Perubahan Zaman Air Batu Akhir" },
      { src: "/infografik/t1-bab2-kesan-asia-tenggara.webp", alt: "Nota infografik kesan perubahan Zaman Air Batu di Asia Tenggara", caption: "2.6 Kesan di Asia Tenggara" },
    ],
    subtopics: ["Dunia kita", "Tahap Zaman Air Batu", "Garis masa", "Ciri dan perubahan", "Kesan di Asia Tenggara"],
    points: [
      "Zaman Air Batu berlaku apabila suhu bumi menurun sehingga kawasan luas dilitupi lapisan ais.",
      "Empat tahap utama ialah Miosen, Pliosen, Pleistosen dan Holosen.",
      "Peningkatan suhu menyebabkan pengglasieran, kenaikan paras laut serta pembentukan tasik dan pulau.",
      "Di Asia Tenggara, kenaikan paras laut menenggelamkan Pentas Sunda dan membentuk rupa bumi seperti hari ini.",
    ],
    questions: [
      { question: "Apakah tahap Zaman Air Batu yang paling terkini?", options: ["Miosen", "Pliosen", "Pleistosen", "Holosen"], answer: 3 },
      { question: "Apakah maksud pengglasieran?", options: ["Pembentukan gunung", "Kecairan air batu", "Penurunan aras laut", "Pergerakan benua"], answer: 1 },
      { question: "Apakah kesan kecairan air batu terhadap aras laut?", options: ["Aras laut meningkat", "Aras laut kekal", "Laut membeku", "Laut menjadi kering"], answer: 0 },
      { question: "Apakah daratan luas yang tenggelam di Asia Tenggara?", options: ["Pentas Sahul", "Dataran Giza", "Pentas Sunda", "Lembah Indus"], answer: 2 },
      { question: "Mengapakah manusia dan haiwan mudah bermigrasi ketika aras laut rendah?", options: ["Wujud jambatan darat", "Wujud kapal besar", "Cuaca sentiasa panas", "Tiada gunung"], answer: 0 },
    ],
  },
  {
    number: 3,
    title: "Zaman Prasejarah",
    subtopics: ["Maksud prasejarah", "Lokasi di dunia", "Ciri kehidupan", "Kesinambungan sumbangan", "Prasejarah di Malaysia"],
    points: [
      "Zaman Prasejarah ialah zaman sebelum manusia mengenali sistem tulisan.",
      "Zaman ini merangkumi Paleolitik, Mesolitik, Neolitik dan Zaman Logam.",
      "Kehidupan berkembang daripada nomad dan memburu kepada petempatan kekal, pertanian, penternakan serta perdagangan.",
      "Tapak penting di Malaysia termasuk Lenggong, Gua Niah, Lembah Mansuli dan Gua Cha.",
    ],
    mindMaps: [{
      src: "/infografik/t1-bab3-prasejarah.webp",
      alt: "Nota infografik maksud, tahap dan ciri kehidupan Zaman Prasejarah",
      caption: "3.1 Maksud dan Tahap Zaman Prasejarah",
    }],
    questions: [
      { question: "Apakah ciri utama Zaman Prasejarah?", options: ["Belum mengenali tulisan", "Mempunyai internet", "Menggunakan wang kertas", "Membina kilang"], answer: 0 },
      { question: "Pada zaman manakah manusia mula hidup menetap dan bercucuk tanam?", options: ["Paleolitik", "Mesolitik", "Neolitik", "Miosen"], answer: 2 },
      { question: "Di manakah Perak Man ditemukan?", options: ["Gua Niah", "Lenggong", "Gua Cha", "Lembah Mansuli"], answer: 1 },
      { question: "Apakah kegiatan utama masyarakat Paleolitik?", options: ["Perdagangan antarabangsa", "Memburu dan mengumpul makanan", "Perindustrian", "Perbankan"], answer: 1 },
      { question: "Apakah bahan utama peralatan pada Zaman Logam?", options: ["Plastik", "Gangsa dan besi", "Kaca", "Kertas"], answer: 1 },
    ],
  },
  {
    number: 4,
    title: "Mengenali Tamadun",
    subtopics: ["Maksud tamadun", "Konsep tamadun Islam dan Barat", "Ciri-ciri tamadun awal dunia"],
    points: [
      "Tamadun merujuk pencapaian tinggi masyarakat dalam pelbagai bidang kehidupan.",
      "Konsep Islam menekankan pembangunan lahiriah dan rohaniah, manakala pandangan Barat lebih menumpukan kemajuan lahiriah.",
      "Tamadun awal berkembang di lembah sungai yang subur dan mempunyai petempatan kekal.",
      "Ciri tamadun termasuk pemerintahan, bandar, pengkhususan pekerjaan, organisasi sosial, agama, tulisan, teknologi dan kesenian.",
    ],
    mindMaps: [{
      src: "/infografik/t1-bab4-pengenalan-tamadun.webp",
      alt: "Nota infografik pengenalan, konsep dan ciri tamadun",
      caption: "Pengenalan Tamadun dan Ciri Tamadun Awal Dunia",
    }],
    questions: [
      { question: "Apakah maksud tamadun?", options: ["Kemerosotan masyarakat", "Pencapaian tinggi masyarakat", "Kehidupan nomad", "Peperangan sahaja"], answer: 1 },
      { question: "Apakah yang ditekankan dalam konsep tamadun Islam?", options: ["Kemajuan fizikal sahaja", "Pembangunan lahiriah dan rohaniah", "Kekayaan raja sahaja", "Penguasaan tentera sahaja"], answer: 1 },
      { question: "Di manakah kebanyakan tamadun awal berkembang?", options: ["Lembah sungai", "Puncak gunung", "Kawasan kutub", "Gurun tandus"], answer: 0 },
      { question: "Yang manakah ciri sebuah tamadun?", options: ["Tiada pentadbiran", "Sistem tulisan", "Hidup bersendirian", "Tiada pekerjaan"], answer: 1 },
      { question: "Apakah kesan pengkhususan pekerjaan?", options: ["Kemahiran masyarakat berkembang", "Tulisan hilang", "Bandar merosot", "Pertanian terhenti"], answer: 0 },
    ],
  },
  {
    number: 5,
    title: "Tamadun Awal Dunia",
    interactiveNotes: [{
      title: "Peta Interaktif 4 Tamadun Awal Dunia",
      description: "Jelajah lokasi Mesopotamia, Mesir Purba, Indus dan Huang He pada peta dunia sebenar. Zum atau seret peta, tekan penanda tamadun dan buka kisah sungai, kehidupan serta sumbangannya.",
      href: "/interaktif/t1-bab5/peta-4-tamadun-awal/index.html",
      activities: "Peta dunia boleh zum & seret • 4 penanda tamadun • Foto tinggalan • Misi 0/4",
      cta: "Jelajah peta interaktif",
    }],
    mindMaps: [{
      src: "/infografik/t1-bab5-peta-interaktif.png",
      alt: "Peta bergambar empat tamadun awal dunia: Mesopotamia, Mesir Purba, Indus dan Huang He",
      caption: "Peta 4 Tamadun Awal Dunia — Lembah Sungai, Lahirnya Peradaban",
    }],
    subtopics: ["Mesopotamia", "Mesir Purba", "Indus", "Huang He", "Perbandingan sumbangan"],
    points: [
      "Empat tamadun awal ialah Mesopotamia di Sungai Tigris-Euphrates, Mesir Purba di Sungai Nil, Indus di Sungai Indus dan Huang He di Sungai Huang He.",
      "Mesopotamia terkenal dengan tulisan kuneiform dan Kod Undang-undang Hammurabi.",
      "Mesir Purba menyumbang piramid, hieroglif dan pengetahuan perubatan; Indus pula terkenal dengan bandar terancang serta sistem perparitan.",
      "Huang He menyumbang pemerintahan dinasti, pertanian, gangsa, tulisan dan penciptaan sutera.",
    ],
    questions: [
      { question: "Tamadun Mesopotamia berkembang di lembah sungai apa?", options: ["Nil", "Indus", "Tigris dan Euphrates", "Huang He"], answer: 2 },
      { question: "Apakah sistem tulisan Mesopotamia?", options: ["Hieroglif", "Kuneiform", "Piktograf Cina", "Jawi"], answer: 1 },
      { question: "Apakah keistimewaan bandar Tamadun Indus?", options: ["Tidak mempunyai jalan", "Bandar terancang dan sistem perparitan", "Dibina di puncak gunung", "Tiada petempatan"], answer: 1 },
      { question: "Piramid merupakan sumbangan tamadun apa?", options: ["Mesir Purba", "Indus", "Huang He", "Yunani"], answer: 0 },
      { question: "Apakah hasil penting Tamadun Huang He?", options: ["Sutera", "Papirus", "Kapal wap", "Kompas moden"], answer: 0 },
    ],
  },
  {
    number: 6,
    title: "Peningkatan Tamadun Yunani dan Rom",
    subtopics: ["Tamadun Yunani", "Pemerintahan Athens", "Tamadun Rom", "Seni bina Rom"],
    points: [
      "Tamadun Yunani berkembang melalui negara kota atau polis seperti Athens, Sparta dan Corinth.",
      "Athens melalui pemerintahan monarki, oligarki, aristokrasi, tirani dan akhirnya demokrasi.",
      "Rom berkembang daripada pemerintahan beraja kepada republik dan empayar yang luas.",
      "Seni bina Rom menonjol melalui Colosseum, Pantheon, amfiteater, akueduk, jalan raya dan tempat mandi awam.",
    ],
    mindMaps: [{
      src: "/peta-minda/pentadbiran-yunani.webp",
      alt: "Peta minda bergaya clay tentang pemerintahan dan pentadbiran Tamadun Yunani",
      caption: "6.2 Pemerintahan dan Pentadbiran Tamadun Yunani",
    }],
    questions: [
      { question: "Apakah maksud polis dalam Tamadun Yunani?", options: ["Pelabuhan", "Negara kota", "Kawasan pertanian", "Pasukan tentera"], answer: 1 },
      { question: "Polis manakah terkenal dengan sistem demokrasi?", options: ["Sparta", "Corinth", "Athens", "Rom"], answer: 2 },
      { question: "Polis manakah menekankan kekuatan ketenteraan?", options: ["Sparta", "Athens", "Mesir", "Indus"], answer: 0 },
      { question: "Apakah fungsi akueduk Rom?", options: ["Menyalurkan air", "Menyimpan senjata", "Mencetak buku", "Mengawal sempadan"], answer: 0 },
      { question: "Bangunan Rom yang digunakan untuk pertandingan gladiator ialah...", options: ["Pantheon", "Colosseum", "Agora", "Piramid"], answer: 1 },
    ],
  },
  {
    number: 7,
    title: "Peningkatan Tamadun India dan China",
    subtopics: ["Tamadun India", "Perluasan kuasa", "Tamadun China", "Pendidikan dan peperiksaan"],
    points: [
      "Peningkatan Tamadun India terserlah pada zaman Dinasti Maurya dan Gupta.",
      "Chandragupta Maurya membentuk empayar yang luas, manakala Asoka menekankan keamanan selepas Perang Kalinga.",
      "Tamadun China meningkat pada zaman Dinasti Qin dan Han melalui pentadbiran, pertanian, perdagangan serta teknologi.",
      "Sistem pendidikan dan peperiksaan perkhidmatan awam China bertujuan memilih pegawai kerajaan yang berkebolehan.",
    ],
    mindMaps: [{
      src: "/peta-minda/tamadun-india.webp",
      alt: "Nota peta minda tulisan tangan tentang perluasan kuasa Tamadun India",
      caption: "7.2 Peningkatan Tamadun India: Perluasan Kuasa",
    }],
    questions: [
      { question: "Apakah dinasti yang diasaskan oleh Chandragupta Maurya?", options: ["Maurya", "Han", "Qin", "Gupta"], answer: 0 },
      { question: "Mengapakah Asoka berubah menekankan keamanan?", options: ["Selepas Perang Kalinga", "Selepas melawat Rom", "Selepas membina piramid", "Selepas menjadi pedagang"], answer: 0 },
      { question: "Siapakah pengasas Dinasti Qin?", options: ["Asoka", "Shi Huangdi", "Pericles", "Hammurabi"], answer: 1 },
      { question: "Apakah tujuan peperiksaan perkhidmatan awam China?", options: ["Memilih tentera", "Memilih pegawai kerajaan", "Memilih petani", "Memilih pedagang"], answer: 1 },
      { question: "Dinasti China manakah mengembangkan Jalan Sutera?", options: ["Han", "Maurya", "Gupta", "Ptolemy"], answer: 0 },
    ],
  },
  {
    number: 8,
    title: "Tamadun Islam dan Sumbangannya",
    subtopics: ["Masyarakat Arab Jahiliah", "Kemunculan dan perkembangan Islam", "Ketokohan Nabi Muhammad SAW", "Sumbangan kepada dunia", "Seni bina Islam"],
    points: [
      "Masyarakat Arab sebelum Islam hidup berkabilah dan terikat dengan semangat assabiyah; sebahagiannya mengamalkan nilai negatif Jahiliah.",
      "Nabi Muhammad SAW menerima wahyu pertama pada 610 M dan berhijrah ke Madinah pada 622 M.",
      "Baginda unggul sebagai pemimpin negara, masyarakat, ekonomi dan tentera serta membentuk masyarakat melalui Piagam Madinah.",
      "Tamadun Islam menyumbang dalam politik, ekonomi, sosial, ilmu dan seni bina seperti masjid, menara, mihrab, mimbar, kubah dan kaligrafi.",
    ],
    interactiveNotes: [{
      title: "8.2 Kemunculan dan Perkembangan Tamadun Islam",
      description: "Teroka lapan nota bergambar tentang wahyu, dakwah, hijrah, sifat terpuji Nabi Muhammad SAW, faktor penyebaran Islam serta perkembangan zaman Khulafa al-Rasyidin, Umaiyah, Abbasiyah dan Turki Uthmaniyah.",
      href: "/interaktif/t1-bab8/index.html",
      activities: "8 nota bergambar • 8 aktiviti semak terus",
    }, {
      title: "8.3 Ketokohan Nabi Muhammad SAW",
      description: "Buka Manuskrip Madinah untuk meneroka ketokohan Nabi Muhammad SAW sebagai pemimpin negara, masyarakat, ekonomi dan tentera melalui nota visual serta aktiviti interaktif.",
      href: "https://nota-interaktif.hatchable.site",
      activities: "Nota visual • aktiviti interaktif",
    }, {
      title: "8.4 Sumbangan Tamadun Islam kepada Dunia",
      description: "Ikuti Ekspedisi Kota Ilmu untuk meneroka sumbangan Tamadun Islam dalam politik, ekonomi dan sosial—daripada syura dan baitulmal hingga kemudahan awam, pusat pendidikan serta tokoh ilmuan.",
      href: "https://ekspedisi-kota-ilmu-84.zam79.chatgpt.site",
      activities: "8 nota infografik • 12 cabaran ilmu",
    }],
    mindMaps: [
      {
        src: "/infografik/t1-bab8-ketokohan-nabi.webp",
        alt: "Nota infografik ketokohan Nabi Muhammad SAW sebagai pemimpin",
        caption: "8.3 Ketokohan Nabi Muhammad SAW sebagai Pemimpin",
      },
      {
        src: "/infografik/t1-bab8-sumbangan-tamadun-islam.webp",
        alt: "Nota infografik sumbangan Tamadun Islam kepada dunia",
        caption: "8.4 Sumbangan Tamadun Islam kepada Dunia",
      },
    ],
    questions: [
      { question: "Apakah maksud assabiyah?", options: ["Semangat kekabilahan", "Sistem pertanian", "Tulisan Arab", "Undang-undang laut"], answer: 0 },
      { question: "Bilakah Nabi Muhammad SAW menerima wahyu pertama?", options: ["570 M", "610 M", "622 M", "632 M"], answer: 1 },
      { question: "Apakah peristiwa penting pada tahun 622 M?", options: ["Pembukaan Makkah", "Hijrah ke Madinah", "Perang Kalinga", "Pembinaan Colosseum"], answer: 1 },
      { question: "Apakah dokumen yang mengatur kehidupan masyarakat Madinah?", options: ["Piagam Madinah", "Kod Hammurabi", "Hukum Kanun Melaka", "Undang-undang Rom"], answer: 0 },
      { question: "Apakah fungsi mihrab di masjid?", options: ["Menanda arah kiblat", "Tempat menyimpan makanan", "Menara kawalan", "Pintu kota"], answer: 0 },
    ],
  },
];

export const formTwoChapters: Chapter[] = [
  {
    number: 1,
    title: "Kerajaan Alam Melayu",
    interactiveNotes: [{
      title: "1.3 Kerajaan Alam Melayu yang Masyhur — Peta Interaktif",
      description: "Jelajah peta sebenar Asia Tenggara. Klik tujuh kerajaan untuk mengenali lokasi dan kemasyhurannya, bersama kapal dagang dan ilustrasi laluan perdagangan.",
      href: "/interaktif/t2-bab1/peta-alam-melayu.html",
      activities: "7 kerajaan boleh diklik • Peta geografi • Fakta ringkas",
    }],
    mindMaps: [
      { src: "/infografik/t2-bab1-konsep-alam-melayu.webp", alt: "Nota infografik konsep Alam Melayu dari aspek geografi, bahasa dan budaya", caption: "1.1 Konsep Alam Melayu" },
      { src: "/infografik/t2-bab1-peta-warisan.webp", alt: "Peta visual konsep Alam Melayu dan pandangan tokoh", caption: "1.1 Peta Warisan Alam Melayu" },
      { src: "/infografik/t2-bab1-ciri-alam-melayu.webp", alt: "Nota infografik ciri-ciri Alam Melayu", caption: "1.2 Ciri-ciri Alam Melayu" },
      { src: "/infografik/t2-bab1-kerajaan-sezaman.webp", alt: "Garis masa kerajaan Alam Melayu dan kerajaan luar yang sezaman", caption: "1.4 Kerajaan Alam Melayu dan Kerajaan Luar yang Sezaman" },
    ],
    subtopics: ["Konsep Alam Melayu", "Kewujudan kerajaan", "Kerajaan masyhur", "Hubungan dengan kerajaan luar"],
    points: [
      "Alam Melayu merangkumi gugusan kepulauan dan tanah besar Asia Tenggara yang berkongsi bahasa serta budaya serumpun.",
      "Kerajaan penting termasuk Funan, Champa, Srivijaya, Angkor, Majapahit, Kedah Tua dan Gangga Nagara.",
      "Kerajaan Alam Melayu berkembang kerana kedudukan strategik, pertanian, perdagangan dan kebijaksanaan pemerintah.",
      "Hubungan dengan China, India, Arab dan Parsi terjalin melalui perdagangan, agama dan diplomatik.",
    ],
    questions: [
      { question: "Apakah asas persamaan masyarakat Alam Melayu?", options: ["Bahasa dan budaya", "Cuaca sejuk", "Tulisan Latin sahaja", "Satu bentuk muka bumi"], answer: 0 },
      { question: "Yang manakah kerajaan Alam Melayu?", options: ["Srivijaya", "Rom", "Mesir Purba", "Athens"], answer: 0 },
      { question: "Kerajaan Angkor berpusat di negara mana hari ini?", options: ["Kemboja", "Malaysia", "Filipina", "Brunei"], answer: 0 },
      { question: "Apakah kerajaan yang terkenal sebagai pusat perdagangan maritim?", options: ["Srivijaya", "Sparta", "Gupta", "Qin"], answer: 0 },
      { question: "Bagaimanakah hubungan dengan kerajaan luar dijalinkan?", options: ["Perdagangan dan diplomatik", "Peperangan sahaja", "Pertanian sahaja", "Pengasingan"], answer: 0 },
    ],
  },
  {
    number: 2,
    title: "Sistem Pemerintahan dan Kegiatan Ekonomi Masyarakat Kerajaan Alam Melayu",
    interactiveNotes: [{
      title: "2.2 Atlas Laluan Perdagangan Alam Melayu",
      description: "Kemudi kapal antara China, Champa, Funan, Kedah Tua, Srivijaya, Majapahit dan India. Teroka pelabuhan, kenali barangan dagangan dan lengkapkan misi pelayaran.",
      href: "/interaktif/t2-bab2/atlas-perdagangan.html",
      activities: "7 pelabuhan • 3 mod interaktif • Cabaran pedagang",
    }],
    mindMaps: [
      { src: "/infografik/t2-bab2-sistem-pemerintahan.webp", alt: "Nota infografik sistem pemerintahan pusat dan wilayah kerajaan Alam Melayu", caption: "2.1 Sistem Pemerintahan Kerajaan Alam Melayu" },
      { src: "/infografik/t2-bab2-kegiatan-ekonomi.webp", alt: "Nota infografik kegiatan ekonomi masyarakat kerajaan Alam Melayu", caption: "2.2 Kegiatan Ekonomi Masyarakat Kerajaan Alam Melayu" },
    ],
    subtopics: ["Sistem pemerintahan", "Pentadbiran pusat dan wilayah", "Pertanian dan perdagangan", "Hasil hutan, laut, perlombongan dan pembuatan"],
    points: [
      "Raja menjadi tonggak pemerintahan dan dibantu pembesar dalam pentadbiran pusat serta wilayah.",
      "Kesetiaan rakyat, undang-undang dan pentadbiran teratur mengukuhkan kerajaan.",
      "Ekonomi berasaskan pertanian padi, rempah, perdagangan, hasil hutan dan laut, perlombongan serta pembuatan.",
      "Pelabuhan berkembang sebagai tempat pertukaran barangan tempatan dan luar serta persinggahan pedagang.",
    ],
    questions: [
      { question: "Siapakah tonggak utama pemerintahan kerajaan Alam Melayu?", options: ["Raja", "Petani", "Pedagang asing", "Ketua tentera luar"], answer: 0 },
      { question: "Siapakah yang membantu raja mentadbir kerajaan?", options: ["Pembesar", "Pengembara", "Hamba sahaja", "Pedagang China"], answer: 0 },
      { question: "Apakah tanaman utama masyarakat Angkor?", options: ["Padi", "Gandum", "Zaitun", "Anggur"], answer: 0 },
      { question: "Yang manakah hasil hutan Alam Melayu?", options: ["Gaharu", "Kapas Mesir", "Zaitun", "Papirus"], answer: 0 },
      { question: "Mengapakah pelabuhan penting?", options: ["Pusat pertukaran barangan", "Tempat pertanian padi", "Pusat penternakan", "Tempat pengebumian"], answer: 0 },
    ],
  },
  {
    number: 3,
    title: "Sosiobudaya Masyarakat Kerajaan Alam Melayu",
    subtopics: ["Bahasa dan tulisan", "Persuratan", "Seni bina", "Struktur sosial"],
    points: [
      "Bahasa Melayu menjadi bahasa perhubungan, manakala tulisan Pallava, Kawi dan Jawi digunakan mengikut perkembangan zaman.",
      "Persuratan berkembang melalui batu bersurat, manuskrip, hikayat dan karya keagamaan.",
      "Seni bina seperti candi, binaan pengairan, kapal dan monumen membuktikan kemahiran tinggi masyarakat.",
      "Struktur sosial terdiri daripada golongan pemerintah dan golongan diperintah dengan peranan masing-masing.",
    ],
    questions: [
      { question: "Apakah bahasa utama perhubungan di Alam Melayu?", options: ["Bahasa Melayu", "Bahasa Latin", "Bahasa Yunani", "Bahasa Perancis"], answer: 0 },
      { question: "Yang manakah tulisan yang digunakan di Alam Melayu?", options: ["Pallava", "Kuneiform", "Hieroglif", "Rumi Rom"], answer: 0 },
      { question: "Apakah bukti perkembangan persuratan?", options: ["Batu bersurat", "Akueduk", "Piramid", "Senjata api"], answer: 0 },
      { question: "Candi Borobudur merupakan contoh apa?", options: ["Seni bina", "Kegiatan pertanian", "Sistem tulisan", "Struktur tentera"], answer: 0 },
      { question: "Siapakah yang termasuk dalam golongan pemerintah?", options: ["Raja dan pembesar", "Petani dan nelayan", "Hamba", "Pedagang kecil"], answer: 0 },
    ],
  },
  {
    number: 4,
    title: "Agama, Kepercayaan dan Keunikan Warisan Masyarakat Kerajaan Alam Melayu",
    subtopics: ["Animisme dan dinamisme", "Hindu dan Buddha", "Kedatangan Islam", "Keunikan warisan"],
    points: [
      "Kepercayaan awal masyarakat ialah animisme dan dinamisme sebelum menerima pengaruh Hindu, Buddha dan Islam.",
      "Pemerintah berperanan menyebarkan agama melalui pembinaan tempat ibadat dan hubungan dengan kerajaan luar.",
      "Warisan unik dapat dilihat pada sistem pemerintahan beraja, adat istiadat, bahasa, persuratan dan seni bina.",
      "Keupayaan menyesuaikan pengaruh luar dengan budaya tempatan membentuk identiti tersendiri Alam Melayu.",
    ],
    mindMaps: [
      {
        src: "/peta-minda/agama-kepercayaan-alam-melayu.webp",
        alt: "Nota grafik berwarna tentang agama dan kepercayaan masyarakat kerajaan Alam Melayu",
        caption: "4.1 Agama dan Kepercayaan Masyarakat Alam Melayu",
      },
      {
        src: "/peta-minda/warisan-alam-melayu.webp",
        alt: "Nota grafik bergaya clay tentang keunikan warisan masyarakat kerajaan Alam Melayu",
        caption: "4.2 Keunikan Warisan Masyarakat Kerajaan Alam Melayu",
      },
    ],
    questions: [
      { question: "Apakah kepercayaan terhadap roh pada benda dan alam?", options: ["Animisme", "Demokrasi", "Monarki", "Nasionalisme"], answer: 0 },
      { question: "Apakah maksud dinamisme?", options: ["Kepercayaan terhadap kekuatan ghaib", "Sistem perdagangan", "Tulisan batu", "Pemerintahan rakyat"], answer: 0 },
      { question: "Agama apakah yang tersebar melalui pedagang Arab dan India?", options: ["Islam", "Shinto", "Taoisme", "Judaisme"], answer: 0 },
      { question: "Apakah peranan pemerintah dalam perkembangan agama?", options: ["Membina tempat ibadat", "Menghapuskan persuratan", "Menutup pelabuhan", "Melarang seni bina"], answer: 0 },
      { question: "Mengapakah warisan Alam Melayu unik?", options: ["Pengaruh luar disesuaikan dengan budaya tempatan", "Menolak semua budaya", "Tiada perubahan", "Berasal dari satu kerajaan sahaja"], answer: 0 },
    ],
  },
  {
    number: 5,
    title: "Kesultanan Melayu Melaka",
    interactiveNotes: [{
      title: "Melaka Maritime Quest",
      description: "Kemudi kapal dagang melalui laluan India, China, Champa dan Kepulauan Melayu. Singgah di pelabuhan, kumpul kargo serta jawab cabaran perdagangan Kesultanan Melayu Melaka.",
      href: "/interaktif/t2-bab5/melaka-maritime-quest/index.html",
      activities: "Kapal boleh dikemudi • 9 lokasi perdagangan • 3 nyawa • Kargo, Dinar & markah",
      cta: "Mulakan pelayaran Melaka",
    }],
    subtopics: ["Pengasasan", "Kegemilangan", "Pentadbiran", "Perdagangan dan Islam", "Pengakhiran di Melaka"],
    points: [
      "Parameswara mengasaskan Melaka sekitar tahun 1400 dan memilih lokasi strategik di Selat Melaka.",
      "Sistem Pembesar Empat Lipatan, Hukum Kanun Melaka dan Undang-Undang Laut Melaka mengukuhkan pentadbiran.",
      "Melaka menjadi pusat perdagangan, penyebaran Islam dan pertemuan pedagang antarabangsa.",
      "Portugis menawan Melaka pada 1511, tetapi warisan kesultanan diteruskan oleh kerajaan lain.",
    ],
    mindMaps: [{
      src: "/peta-minda/pengasasan-melaka.webp",
      alt: "Peta minda bergaya clay tentang pengasasan Kesultanan Melayu Melaka oleh Parameswara",
      caption: "5.1 Pengasasan Kesultanan Melayu Melaka",
    }],
    questions: [
      { question: "Siapakah pengasas Kesultanan Melayu Melaka?", options: ["Parameswara", "Sultan Alauddin", "Raja Ali", "Asoka"], answer: 0 },
      { question: "Mengapakah lokasi Melaka strategik?", options: ["Terletak di Selat Melaka", "Berada di puncak gunung", "Tiada pedagang", "Jauh dari laut"], answer: 0 },
      { question: "Apakah sistem pentadbiran Melaka?", options: ["Pembesar Empat Lipatan", "Demokrasi Athens", "Sistem kabilah", "Republik"], answer: 0 },
      { question: "Undang-undang manakah berkaitan peraturan pelayaran?", options: ["Undang-Undang Laut Melaka", "Piagam Madinah", "Kod Hammurabi", "Hukum Rom"], answer: 0 },
      { question: "Siapakah yang menawan Melaka pada 1511?", options: ["Portugis", "Belanda", "British", "Siam"], answer: 0 },
    ],
  },
  {
    number: 6,
    title: "Kesultanan Johor Riau",
    subtopics: ["Pengasasan", "Cabaran", "Strategi menghadapi cabaran", "Kegemilangan perdagangan", "Persuratan"],
    points: [
      "Raja Ali, putera Sultan Mahmud Shah, mengasaskan Kesultanan Johor Riau pada 1528 dengan gelaran Sultan Alauddin Riayat Shah I.",
      "Johor Riau menghadapi cabaran Portugis, Acheh, Jambi dan konflik dalaman tetapi menggunakan strategi pertahanan serta diplomasi.",
      "Kedudukan strategik dan kecekapan pelabuhan menjadikan Johor Riau pusat perdagangan unggul.",
      "Karya seperti Sulalatus Salatin dan Hikayat Hang Tuah menyerlahkan kegemilangan persuratan Melayu.",
    ],
    mindMaps: [{
      src: "/peta-minda/perdagangan-johor-riau.webp",
      alt: "Nota peta minda tulisan tangan tentang perdagangan dan pelabuhan Johor Riau",
      caption: "6.3 Kegemilangan Kesultanan Johor Riau: Pusat Perdagangan",
    }],
    questions: [
      { question: "Siapakah pengasas Kesultanan Johor Riau?", options: ["Raja Ali", "Parameswara", "Raja Melewar", "Sultan Muzaffar Shah"], answer: 0 },
      { question: "Apakah gelaran Raja Ali selepas menjadi sultan?", options: ["Sultan Alauddin Riayat Shah I", "Sultan Mansur Shah", "Sultan Zainal Abidin", "Sultan Muhammad Jiwa"], answer: 0 },
      { question: "Apakah kuasa Eropah yang menjadi cabaran utama Johor Riau?", options: ["Portugis", "British", "Perancis", "Sepanyol"], answer: 0 },
      { question: "Mengapakah Johor Riau menjadi pusat perdagangan?", options: ["Pelabuhan strategik dan cekap", "Tiada cukai langsung", "Tiada pesaing", "Terletak di pedalaman"], answer: 0 },
      { question: "Siapakah yang menyusun Sulalatus Salatin?", options: ["Tun Sri Lanang", "Bendahara Tun Perak", "Hang Nadim", "Munshi Abdullah"], answer: 0 },
    ],
  },
  {
    number: 7,
    title: "Kesultanan Melayu Pahang, Perak, Terengganu dan Selangor",
    subtopics: ["Pengasasan empat kesultanan", "Hubungan dengan Melaka dan Johor Riau", "Sistem pemerintahan", "Agama, adat dan persuratan"],
    points: [
      "Kesultanan Pahang, Perak, Terengganu dan Selangor mempunyai hubungan pewarisan dengan Kesultanan Melayu Melaka atau Johor Riau.",
      "Pahang diasaskan oleh Raja Muhammad, manakala Perak diasaskan oleh Raja Muzaffar.",
      "Terengganu dan Selangor berkembang sebagai kesultanan berdaulat melalui sokongan kerabat dan pembesar tempatan.",
      "Warisan Melaka diteruskan melalui pemerintahan beraja, agama Islam, adat istiadat, perundangan dan persuratan.",
    ],
    mindMaps: [
      {
        src: "/peta-minda/pengasasan-empat-kesultanan.webp",
        alt: "Nota bergambar tentang pengasasan Kesultanan Pahang, Perak, Terengganu dan Selangor",
        caption: "7.1 Pengasasan Empat Kesultanan Melayu",
      },
      {
        src: "/peta-minda/t2-7-1-pengasasan-kesultanan-lengkap.webp",
        alt: "Peta minda lengkap pengasasan Kesultanan Pahang, Perak, Terengganu dan Selangor",
        caption: "7.1 Pengasasan Kesultanan Pahang, Perak, Terengganu dan Selangor",
      },
      {
        src: "/peta-minda/t2-7-2-warisan-kesultanan.webp",
        alt: "Peta minda warisan Kesultanan Melayu Melaka di Pahang, Perak, Terengganu dan Selangor",
        caption: "7.2 Warisan Kesultanan Melayu Melaka",
      },
    ],
    questions: [
      { question: "Siapakah pengasas Kesultanan Pahang?", options: ["Raja Muhammad", "Raja Ali", "Raja Melewar", "Raja Syed Hussin"], answer: 0 },
      { question: "Siapakah pengasas Kesultanan Perak?", options: ["Raja Muzaffar", "Raja Muhammad", "Parameswara", "Sultan Zainal Abidin"], answer: 0 },
      { question: "Apakah warisan utama Kesultanan Melayu Melaka?", options: ["Pemerintahan beraja", "Republik", "Sistem polis Yunani", "Pemerintahan kabilah"], answer: 0 },
      { question: "Apakah agama yang menjadi asas kesultanan Melayu?", options: ["Islam", "Shinto", "Taoisme", "Judaisme"], answer: 0 },
      { question: "Bagaimanakah warisan kesultanan dipelihara?", options: ["Melalui adat, undang-undang dan persuratan", "Dengan menolak tradisi", "Menghapuskan institusi raja", "Menutup hubungan luar"], answer: 0 },
    ],
  },
  {
    number: 8,
    title: "Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
    subtopics: ["Pengasasan empat kerajaan", "Hubungan diplomatik", "Perkahwinan diraja", "Perdagangan dan bantuan pertahanan"],
    points: [
      "Kedah, Kelantan, Negeri Sembilan dan Perlis berkembang melalui pengasasan dinasti serta kepimpinan tempatan.",
      "Negeri Sembilan menerima Raja Melewar dari Pagar Ruyung sebagai pemerintah pada abad ke-18.",
      "Perlis pada asalnya sebahagian daripada Kedah sebelum menjadi kerajaan berasingan di bawah Raja Syed Hussin Jamalullail.",
      "Hubungan dengan negeri Melayu lain dijalin melalui diplomatik, perkahwinan diraja, perdagangan dan bantuan pertahanan.",
    ],
    mindMaps: [{
      src: "/peta-minda/t2-8-1-pengasasan-kerajaan.webp",
      alt: "Peta minda pengasasan kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
      caption: "8.1 Pengasasan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
    }],
    questions: [
      { question: "Siapakah pemerintah awal Negeri Sembilan dari Pagar Ruyung?", options: ["Raja Melewar", "Raja Ali", "Parameswara", "Sultan Muzaffar"], answer: 0 },
      { question: "Perlis pada asalnya sebahagian daripada negeri apa?", options: ["Kedah", "Kelantan", "Pahang", "Selangor"], answer: 0 },
      { question: "Siapakah pemerintah Perlis yang menggunakan gelaran Raja?", options: ["Raja Syed Hussin Jamalullail", "Raja Muhammad", "Raja Ali", "Raja Melewar"], answer: 0 },
      { question: "Bagaimanakah hubungan antara negeri diperkukuh?", options: ["Perkahwinan diraja", "Pengasingan", "Larangan perdagangan", "Memutuskan diplomatik"], answer: 0 },
      { question: "Apakah manfaat hubungan perdagangan?", options: ["Meningkatkan kemakmuran", "Melemahkan ekonomi", "Menghapuskan pelabuhan", "Mengurangkan barangan"], answer: 0 },
    ],
  },
  {
    number: 9,
    title: "Warisan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
    subtopics: ["Warisan Kedah, Kelantan dan Perlis", "Sistem pemerintahan", "Adat dan perundangan", "Keunikan Adat Perpatih"],
    points: [
      "Kedah, Kelantan dan Perlis mewariskan sistem beraja, adat istiadat, perundangan, persuratan serta kesenian.",
      "Alat kebesaran, nobat, adat pertabalan dan gelaran diraja menjadi lambang kedaulatan.",
      "Adat Perpatih di Negeri Sembilan berasaskan keturunan sebelah ibu dan pembahagian masyarakat kepada suku.",
      "Yang di-Pertuan Besar dipilih oleh Undang Yang Empat melalui amalan permuafakatan.",
    ],
    mindMaps: [
      {
        src: "/peta-minda/warisan-kedah-kelantan-perlis.webp",
        alt: "Nota grafik bergaya clay tentang warisan kerajaan Kedah, Kelantan dan Perlis",
        caption: "9.1 Warisan Kerajaan Kedah, Kelantan dan Perlis",
      },
      {
        src: "/peta-minda/t2-9-2-keunikan-adat-negeri-sembilan.webp",
        alt: "Peta minda keunikan Adat Perpatih dan pemerintahan Negeri Sembilan",
        caption: "9.2 Keunikan Adat dan Pemerintahan Negeri Sembilan",
      },
    ],
    interactiveNotes: [
      {
        title: "9.1 Warisan Kerajaan Kedah, Kelantan dan Perlis",
        description: "Jelajah galeri warisan untuk memahami sistem pemerintahan beraja, adat istiadat, perundangan, persuratan dan kesenian melalui paparan visual mesra murid.",
        href: "https://galeri-warisan-91.hatchable.site",
        activities: "Nota bergambar • galeri interaktif",
      },
      {
        title: "9.2 Keunikan Adat dan Pemerintahan Negeri Sembilan",
        description: "Ikuti Kembara Negeri Sembilan untuk menguasai Adat Perpatih, susunan masyarakat dan pemilihan pemimpin melalui nota serta cabaran interaktif.",
        href: "https://kembara-negeri.hatchable.site",
        activities: "Nota interaktif • cabaran penguasaan",
      },
    ],
    questions: [
      { question: "Apakah alat muzik diraja yang menjadi warisan Kedah?", options: ["Nobat", "Gamelan Jawa", "Piano", "Biola"], answer: 0 },
      { question: "Adat Perpatih berasaskan keturunan sebelah siapa?", options: ["Ibu", "Bapa", "Raja", "Pembesar"], answer: 0 },
      { question: "Siapakah yang memilih Yang di-Pertuan Besar?", options: ["Undang Yang Empat", "Pedagang", "Tentera", "Rakyat asing"], answer: 0 },
      { question: "Apakah unit kekeluargaan penting dalam Adat Perpatih?", options: ["Suku", "Polis", "Dinasti", "Legion"], answer: 0 },
      { question: "Apakah asas membuat keputusan dalam Adat Perpatih?", options: ["Permuafakatan", "Paksaan", "Peperangan", "Undian pedagang"], answer: 0 },
    ],
  },
  {
    number: 10,
    title: "Sarawak dan Sabah",
    interactiveNotes: [{
      title: "Ekspedisi Borneo — Misi Bab 10",
      description: "Belayar dari satu destinasi ke destinasi seterusnya untuk menguasai kepimpinan kesukuan, kepimpinan lembah sungai, kegiatan ekonomi, keunikan masyarakat serta kesenian dan seni bina Sarawak dan Sabah.",
      href: "https://teacherziela.github.io/misi-borneo/",
      activities: "5 destinasi • 4 soalan peperiksaan setiap stesen • 3 nyawa • serangan lanun • 5 artifak",
      cta: "Mulakan Ekspedisi Borneo",
    }],
    subtopics: ["Sarawak dan Sabah dalam Alam Melayu", "Pemerintahan tempatan", "Kegiatan ekonomi", "Keunikan masyarakat bumiputera"],
    points: [
      "Sarawak dan Sabah merupakan sebahagian Alam Melayu serta mempunyai hubungan dengan kerajaan seperti Brunei dan Sulu.",
      "Pemerintahan tempatan dipimpin oleh tokoh seperti Datu, Orang Kaya, ketua bebas dan ketua kaum mengikut kawasan.",
      "Ekonomi meliputi pertanian, hasil hutan, hasil laut, perlombongan serta perdagangan di sungai dan pesisir.",
      "Keunikan masyarakat bumiputera terserlah melalui rumah panjang, adat, perayaan, tarian, muzik dan kraftangan pelbagai kaum.",
    ],
    mindMaps: [
      {
        src: "/peta-minda/t2-10-1-kerajaan-sarawak-sabah.webp",
        alt: "Peta minda kerajaan, warisan, pentadbiran dan kehidupan masyarakat Sarawak dan Sabah",
        caption: "10.1 Kerajaan Sarawak dan Sabah",
      },
      {
        src: "/peta-minda/t2-10-2-budaya-ekonomi-sarawak-sabah.webp",
        alt: "Peta minda keunikan budaya dan ekonomi masyarakat Sarawak dan Sabah",
        caption: "10.2 Keunikan Budaya dan Ekonomi Masyarakat Sarawak dan Sabah",
      },
      {
        src: "/peta-minda/ekonomi-sarawak-sabah.webp",
        alt: "Peta minda berwarna tentang kegiatan ekonomi masyarakat Sarawak dan Sabah",
        caption: "10.3 Kegiatan Ekonomi Masyarakat Sarawak dan Sabah",
      },
      {
        src: "/infografik/t2-bab10-sabah-sarawak-alam-melayu-correct.webp",
        alt: "Nota infografik kedudukan dan hubungan Sarawak serta Sabah dalam Alam Melayu",
        caption: "10.1 Sarawak dan Sabah dalam Alam Melayu",
      },
      {
        src: "/infografik/t2-bab10-keunikan-masyarakat.webp",
        alt: "Nota infografik kemunculan pemerintahan tempatan dan keunikan masyarakat Sarawak serta Sabah",
        caption: "10.2 Kemunculan Pemerintahan Tempatan di Sarawak dan Sabah",
      },
    ],
    questions: [
      { question: "Sarawak pernah dipengaruhi oleh kesultanan apa?", options: ["Brunei", "Melaka sahaja", "Pahang", "Perak"], answer: 0 },
      { question: "Sabah mempunyai hubungan dengan kesultanan apa?", options: ["Sulu dan Brunei", "Rom dan Yunani", "Qin dan Han", "Maurya dan Gupta"], answer: 0 },
      { question: "Siapakah pemimpin utama sesebuah rumah panjang?", options: ["Tuai Rumah", "Laksamana", "Syahbandar", "Bendahara"], answer: 0 },
      { question: "Yang manakah kegiatan ekonomi masyarakat Sarawak dan Sabah?", options: ["Mengutip hasil hutan", "Membina piramid", "Menghasilkan papirus", "Menanam zaitun"], answer: 0 },
      { question: "Apakah yang menunjukkan keunikan masyarakat bumiputera?", options: ["Adat, tarian dan kraftangan", "Satu bahasa sahaja", "Tiada perayaan", "Tiada rumah tradisional"], answer: 0 },
    ],
  },
];

export const formOnePasakExercises: PasakExercise[] = [
  {
    number: 1,
    question: "Bagaimanakah murid dapat memanfaatkan pembelajaran sejarah dalam kehidupan?",
    answer: {
      pelaku: "Murid",
      aksi: "mempelajari dan meneliti sumber sejarah dengan bersungguh-sungguh",
      sebab: "kerana mereka dapat memahami peristiwa yang berlaku pada masa lalu",
      akibat: "Akibatnya, murid dapat mengenali asal usul negara",
      kesan: "Kesannya, jati diri dan semangat patriotisme dapat dipupuk",
    },
  },
  {
    number: 2,
    question: "Bagaimanakah masyarakat dapat mengurangkan kesan perubahan iklim terhadap bumi?",
    answer: {
      pelaku: "Masyarakat",
      aksi: "mengamalkan gaya hidup mesra alam dan mengurangkan pencemaran",
      sebab: "kerana peningkatan suhu boleh menyebabkan pencairan ais dan kenaikan aras laut",
      akibat: "Akibatnya, kadar pemanasan bumi dapat dikurangkan",
      kesan: "Kesannya, alam sekitar dan kehidupan manusia dapat dipelihara",
    },
  },
  {
    number: 3,
    question: "Bagaimanakah generasi muda dapat membantu memelihara tapak Zaman Prasejarah?",
    answer: {
      pelaku: "Generasi muda",
      aksi: "menjaga kebersihan tapak dan tidak merosakkan artifak sejarah",
      sebab: "kerana tapak tersebut menjadi bukti kehidupan manusia awal",
      akibat: "Akibatnya, tinggalan prasejarah tidak musnah",
      kesan: "Kesannya, warisan tersebut dapat dikaji oleh generasi akan datang",
    },
  },
  {
    number: 4,
    question: "Bagaimanakah pemerintah dapat membina sebuah masyarakat yang bertamadun?",
    answer: {
      pelaku: "Pemerintah",
      aksi: "menyediakan pentadbiran teratur, pendidikan dan kemudahan yang baik",
      sebab: "kerana kemajuan lahiriah perlu disertai pembangunan rohaniah",
      akibat: "Akibatnya, rakyat dapat hidup secara tersusun dan berilmu",
      kesan: "Kesannya, sebuah masyarakat yang maju dan berakhlak dapat dibentuk",
    },
  },
  {
    number: 5,
    question: "Bagaimanakah sekolah dapat menghargai sumbangan tamadun awal dunia?",
    answer: {
      pelaku: "Pihak sekolah",
      aksi: "menganjurkan pameran dan projek tentang sumbangan tamadun awal",
      sebab: "kerana banyak pencapaian tamadun tersebut masih digunakan pada hari ini",
      akibat: "Akibatnya, murid dapat memahami perkembangan ilmu dan teknologi manusia",
      kesan: "Kesannya, murid lebih menghargai kebijaksanaan masyarakat dahulu",
    },
  },
  {
    number: 6,
    question: "Bagaimanakah rakyat dapat mengamalkan prinsip demokrasi secara bertanggungjawab?",
    answer: {
      pelaku: "Rakyat",
      aksi: "mengundi dan menyuarakan pandangan melalui saluran yang betul",
      sebab: "kerana rakyat mempunyai peranan dalam menentukan pemerintahan negara",
      akibat: "Akibatnya, pemimpin yang berkebolehan dapat dipilih",
      kesan: "Kesannya, pentadbiran negara menjadi stabil dan adil",
    },
  },
  {
    number: 7,
    question: "Bagaimanakah kerajaan dapat meningkatkan mutu perkhidmatan awam negara?",
    answer: {
      pelaku: "Kerajaan",
      aksi: "memilih pegawai berdasarkan ilmu, kemahiran dan kelayakan",
      sebab: "kerana pegawai yang berkebolehan mampu menjalankan tugas dengan cekap",
      akibat: "Akibatnya, urusan pentadbiran dapat dilaksanakan dengan teratur",
      kesan: "Kesannya, keyakinan rakyat terhadap kerajaan akan meningkat",
    },
  },
  {
    number: 8,
    question: "Bagaimanakah pemimpin hari ini dapat mencontohi kepimpinan Nabi Muhammad SAW?",
    answer: {
      pelaku: "Pemimpin",
      aksi: "bersikap amanah, adil dan bijaksana ketika membuat keputusan",
      sebab: "kerana setiap rakyat perlu dilayan tanpa pilih kasih",
      akibat: "Akibatnya, rakyat akan mempercayai dan menghormati pemimpin",
      kesan: "Kesannya, keamanan serta kesejahteraan negara dapat dikekalkan",
    },
  },
];

export const formTwoPasakExercises: PasakExercise[] = [
  {
    number: 1,
    question: "Bagaimanakah generasi muda dapat mengekalkan identiti Alam Melayu?",
    answer: {
      pelaku: "Generasi muda",
      aksi: "mempelajari sejarah, bahasa dan budaya masyarakat Alam Melayu",
      sebab: "kerana unsur tersebut membuktikan persamaan dan asal usul serumpun",
      akibat: "Akibatnya, warisan Alam Melayu tidak dilupakan",
      kesan: "Kesannya, jati diri dan rasa bangga terhadap rantau ini dapat diperkukuh",
    },
  },
  {
    number: 2,
    question: "Bagaimanakah kerajaan dapat memajukan kegiatan perdagangan maritim negara?",
    answer: {
      pelaku: "Kerajaan",
      aksi: "menaik taraf pelabuhan dan menyediakan kemudahan perdagangan yang cekap",
      sebab: "kerana pelabuhan yang strategik dapat menarik kedatangan pedagang",
      akibat: "Akibatnya, urusan pertukaran barangan menjadi lebih lancar",
      kesan: "Kesannya, pendapatan dan kemakmuran negara akan meningkat",
    },
  },
  {
    number: 3,
    question: "Bagaimanakah murid dapat memelihara warisan bahasa dan persuratan Alam Melayu?",
    answer: {
      pelaku: "Murid",
      aksi: "membaca, mengkaji dan mempromosikan karya persuratan Melayu",
      sebab: "kerana karya tersebut mengandungi ilmu dan pemikiran masyarakat dahulu",
      akibat: "Akibatnya, bahasa serta persuratan Melayu terus digunakan",
      kesan: "Kesannya, warisan ilmu dapat diwariskan kepada generasi seterusnya",
    },
  },
  {
    number: 4,
    question: "Bagaimanakah masyarakat dapat mengekalkan keharmonian agama dan budaya?",
    answer: {
      pelaku: "Masyarakat",
      aksi: "menghormati kepercayaan dan amalan budaya kaum lain",
      sebab: "kerana sikap toleransi dapat mengelakkan perselisihan",
      akibat: "Akibatnya, hubungan antara anggota masyarakat menjadi lebih erat",
      kesan: "Kesannya, keamanan dan perpaduan negara dapat dikekalkan",
    },
  },
  {
    number: 5,
    question: "Bagaimanakah pemimpin dapat membina sebuah kerajaan yang gemilang seperti Kesultanan Melayu Melaka?",
    answer: {
      pelaku: "Pemimpin",
      aksi: "mewujudkan pentadbiran teratur, undang-undang adil dan perdagangan yang cekap",
      sebab: "kerana sistem yang tersusun dapat menjamin keamanan kerajaan",
      akibat: "Akibatnya, pedagang dan rakyat yakin terhadap pemerintah",
      kesan: "Kesannya, kerajaan menjadi makmur serta dihormati oleh negara luar",
    },
  },
  {
    number: 6,
    question: "Bagaimanakah sesebuah kerajaan dapat menghadapi ancaman luar dengan berkesan?",
    answer: {
      pelaku: "Pemerintah dan rakyat",
      aksi: "mengukuhkan pertahanan serta menjalinkan hubungan diplomatik",
      sebab: "kerana kerjasama dan strategi yang bijak dapat mengurangkan ancaman musuh",
      akibat: "Akibatnya, kedaulatan kerajaan dapat dipertahankan",
      kesan: "Kesannya, keamanan dan kemakmuran negara dapat diteruskan",
    },
  },
  {
    number: 7,
    question: "Bagaimanakah rakyat dapat memelihara warisan Kesultanan Melayu?",
    answer: {
      pelaku: "Rakyat",
      aksi: "menghormati institusi raja, adat istiadat dan undang-undang negeri",
      sebab: "kerana warisan tersebut menjadi lambang identiti dan kedaulatan negeri",
      akibat: "Akibatnya, tradisi kesultanan terus terpelihara",
      kesan: "Kesannya, kestabilan serta jati diri masyarakat dapat diperkukuh",
    },
  },
  {
    number: 8,
    question: "Bagaimanakah kerajaan negeri dapat mengukuhkan hubungan antara satu sama lain?",
    answer: {
      pelaku: "Kerajaan negeri",
      aksi: "menjalinkan kerjasama melalui diplomatik, perdagangan dan bantuan pertahanan",
      sebab: "kerana hubungan yang baik membawa manfaat kepada semua pihak",
      akibat: "Akibatnya, perselisihan antara negeri dapat dielakkan",
      kesan: "Kesannya, keamanan dan kemakmuran bersama dapat diwujudkan",
    },
  },
  {
    number: 9,
    question: "Bagaimanakah amalan muafakat dapat mewujudkan masyarakat yang harmoni?",
    answer: {
      pelaku: "Anggota masyarakat",
      aksi: "berbincang dan membuat keputusan secara bersama",
      sebab: "kerana setiap pihak berpeluang menyampaikan pandangan",
      akibat: "Akibatnya, perselisihan faham dapat diselesaikan dengan baik",
      kesan: "Kesannya, hubungan masyarakat menjadi lebih erat dan aman",
    },
  },
  {
    number: 10,
    question: "Bagaimanakah masyarakat Sarawak dan Sabah dapat menggunakan sumber alam secara bijaksana?",
    answer: {
      pelaku: "Masyarakat Sarawak dan Sabah",
      aksi: "mengusahakan sumber hutan, sungai dan laut secara terkawal",
      sebab: "kerana sumber alam menjadi asas kehidupan dan kegiatan ekonomi",
      akibat: "Akibatnya, sumber tersebut tidak cepat pupus atau rosak",
      kesan: "Kesannya, ekonomi dapat berkembang tanpa menjejaskan alam sekitar",
    },
  },
];
