export const storyScript = [
  // --- SCENE 1: PROLOG (Gerbang Sekolah) ---
  {
    id: 1,
    bg: "/img/latar/generic_school_gate.webp",
    char: null,
    name: "",
    text: "Pagi itu di SMA Nusa Bangsa, cuaca lagi cerah banget. Pas di gerbang sekolah, Ando nggak sengaja papasan sama Hana. Entah kenapa, hari ini Hana kelihatan lebih manis dari biasanya.",
    musicId: 201, // BGM: School Theme
    choices: [
      { text: "Sapa Hana: 'Eh Hana, pagi!'", nextId: 2, sfxId: 1 },
      { text: "Cuma senyum tipis (Gengsi dikit)", nextId: 3, sfxId: 1 }
    ]
  },

  // --- SCENE 2: INTERAKSI AWAL ---
  {
    id: 2,
    bg: "/img/latar/generic_school_gate.webp",
    char: "/img/Sumi/Open.webp", 
    name: "Hana",
    voiceId: 1, 
    text: "Eh, Ando! Tumben banget udah sampai jam segini. Biasanya kan kamu datengnya mepet bel masuk?",
    musicId: 201, // Tetep School Theme (Gate)
    choices: [
      { text: "Iya nih, biar bisa ketemu kamu duluan.", nextId: 4, sfxId: 1 },
      { text: "Lagi pengen rajin aja sih, hehe.", nextId: 4, sfxId: 1 }
    ]
  },

  {
    id: 3,
    bg: "img/latar/generic_school_gate.webp",
    char: "img/Sumi/ClosedFrown.webp",
    name: "Hana",
    voiceId: 2, 
    text: "Ando? Kok nunduk aja, lagi nggak enak badan ya? Atau masih ngantuk gara-gara begadang?",
    musicId: 201,
    choices: [
      { text: "Eh nggak kok Han, cuma lagi kepikiran tugas aja.", nextId: 4, sfxId: 1 }
    ]
  },

  // --- SCENE 3: PILIHAN RUTE (BRANCHING) ---
  {
    id: 4,
    bg: "img/latar/school-corridor.webp",
    char: "img/Sumi/EyesClosed_Smile.webp",
    name: "Hana",
    voiceId: 3, 
    text: "Bentar lagi bel masuk nih. Eh Do, nanti istirahat temenin aku yuk? Biar nggak jenuh banget sama pelajaran hari ini.",
    musicId: 202, // BGM: Corridor/Daily Life
    choices: [
      { text: "Ke kantin aja yuk? Laper nih.", nextId: 10, sfxId: 1 },
      { text: "Ke perpus aja gimana? Biar adem dikit.", nextId: 20, sfxId: 1 },
      { text: "Taman belakang sekolah oke juga tuh.", nextId: 30, sfxId: 1 }
    ]
  },

  // ==========================================
  // RUTE A: KANTIN
  // ==========================================
  {
    id: 10,
    bg: "img/latar/canteen.webp",
    char: "img/Sumi/Open.webp",
    name: "Hana",
    voiceId: 4, 
    text: "Waduh, kantinnya rame banget ya kalau jam segini. Kita tetep mau makan di sini atau gimana?",
    musicId: 203, // BGM: Canteen (Lively)
    choices: [
      { text: "Bentar ya, aku coba cari celah buat pesen.", nextId: 11, sfxId: 1 },
      { text: "Rame banget ya, kita beli roti di koperasi aja yuk?", nextId: 12, sfxId: 1 }
    ]
  },
  {
    id: 11,
    bg: "img/latar/canteen.webp",
    char: "img/Sumi/Smile_Blush.webp",
    name: "Hana",
    voiceId: 5, 
    text: "Wah, hebat juga kamu bisa dapet makanannya cepet! Makasih ya Ando udah mau repot-repot ngantre.",
    musicId: 203, // Tetep Canteen Theme
    choices: [
      { text: "Tenang aja Han, buat kamu mah apa sih yang nggak.", nextId: 40, sfxId: 2 }
    ]
  },
  {
    id: 12,
    bg: "img/latar/canteen.webp",
    char: "img/Sumi/Frown.webp",
    name: "Hana",
    voiceId: 6, 
    text: "Nggak apa-apa deh roti juga, yang penting bisa sambil ngobrol sama kamu. Makasih ya udah mau nemenin.",
    musicId: 203,
    choices: [
      { text: "Sama-sama, santai aja kali Han.", nextId: 40, sfxId: 1 }
    ]
  },

  // ==========================================
  // RUTE B: PERPUSTAKAAN
  // ==========================================
  {
    id: 20,
    bg: "img/latar/library.webp",
    char: "img/Sumi/ClosedFrown.webp",
    name: "Hana",
    voiceId: 7, 
    text: "Sshh... Ando, jangan berisik ya. Di sini tenang banget, enak buat baca-baca sebentar.",
    musicId: 204, // BGM: Library (Quiet/Piano)
    choices: [
      { text: "Siap, mode tenang aktif.", nextId: 21, sfxId: 1 },
      { text: "Kamu kalau lagi serius gini cantik juga ya.", nextId: 22, sfxId: 2 }
    ]
  },
  {
    id: 21,
    bg: "img/latar/library.webp",
    char: "img/Sumi/Open_Blush.webp",
    name: "",
    text: "(Pas lagi ambil buku yang sama, tangan Ando nggak sengaja nyentuh tangan Hana. Hana langsung nunduk malu-malu.)",
    musicId: 204,
    choices: [
      { text: "Eh, maaf ya Han... nggak sengaja.", nextId: 22, sfxId: 1 }
    ]
  },
  {
    id: 22,
    bg: "img/latar/library.webp",
    char: "img/Sumi/ClosedFrown_Blush.webp",
    name: "Hana",
    voiceId: 8, 
    text: "A-Ando... kok tiba-tiba suasananya jadi beda gini ya?",
    musicId: 204,
    choices: [
      { text: "(Tersenyum sambil natap Hana)", nextId: 40, sfxId: 2 }
    ]
  },

  // ==========================================
  // RUTE C: TAMAN BELAKANG
  // ==========================================
  {
    id: 30,
    bg: "img/latar/garden.webp",
    char: "img/Sumi/EyesClosed_Smile.webp",
    name: "Hana",
    voiceId: 9, 
    text: "Anginnya seger ya di sini. Do, kamu pernah kepikiran nggak sih nanti setelah lulus kita bakal tetep sering ngobrol kayak gini?",
    musicId: 202, // Pake BGM Corridor (Suasana Santai/Sekolah)
    choices: [
      { text: "Pasti dong, aku bakal selalu ada buat kamu.", nextId: 31, sfxId: 2 },
      { text: "Gimana nanti aja, yang penting sekarang kita bareng.", nextId: 32, sfxId: 1 }
    ]
  },
  {
    id: 31,
    bg: "img/latar/garden.webp",
    char: "img/Sumi/EyesClosed_Open.webp",
    name: "Hana",
    voiceId: 10, 
    text: "Hahaha, kamu bisa aja jawabnya. Tapi aku seneng denger kamu ngomong gitu.",
    musicId: 202,
    choices: [
      { text: "Beneran kok, aku nggak bohong.", nextId: 40, sfxId: 1 }
    ]
  },
  {
    id: 32,
    bg: "img/latar/garden.webp",
    char: "img/Smile_Blush.webp",
    name: "Hana",
    voiceId: 11, 
    text: "Kamu pinter banget ya bikin orang baper. Tapi makasih ya, aku jadi ngerasa tenang.",
    musicId: 202,
    choices: [
      { text: "Hehe, syukurlah kalau gitu.", nextId: 40, sfxId: 1 }
    ]
  },

  // ==========================================
  // SCENE 4: PULANG SEKOLAH (KONVERGENSI)
  // ==========================================
  {
    id: 40,
    bg: "img/latar/street.webp",
    char: "img/Sumi/Open.webp",
    name: "Hana",
    voiceId: 12, 
    text: "Udah sore aja ya ternyata. Makasih banyak ya Ando buat hari ini, aku seneng banget.",
    musicId: 205, // BGM: Evening/Sunset Theme
    choices: [
      { text: "Han, tunggu sebentar. Ada yang mau aku omongin.", nextId: 41, sfxId: 1 }
    ]
  },
  {
    id: 41,
    bg: "img/latar/street.webp",
    char: "img/Sumi/ClosedFrown.webp",
    name: "Hana",
    voiceId: 13, 
    text: "Kenapa Do? Kok mukanya serius banget? Ada yang ketinggalan ya?",
    musicId: 205,
    choices: [
      { text: "Sebenernya... aku sayang sama kamu. Mau nggak jadi pacarku?", nextId: 50, sfxId: 2 }, 
      { text: "Eh, itu... nggak jadi deng. Hati-hati di jalan ya!", nextId: 60, sfxId: 1 } 
    ]
  },

  // ==========================================
  // ENDINGS
  // ==========================================

  // --- HAPPY ENDING ---
  {
    id: 50,
    bg: "img/latar/street.webp",
    char: "img/Sumi/Open_Blush.webp",
    name: "Hana",
    voiceId: 14, 
    text: "Ando... kamu serius? Jujur, aku juga udah nungguin momen ini dari lama. Aku mau!",
    musicId: 206, // BGM: Happy/Love Ending
    choices: [
      { text: "Beneran? Makasih ya, Hana!", nextId: 51, sfxId: 2 }
    ]
  },
  {
    id: 51,
    bg: "img/latar/street.webp",
    char: "img/Sumi/Open_Blush.webp",
    name: "Hana",
    voiceId: 15, 
    text: "Iya beneran. Mulai sekarang jangan panggil aku 'Han' aja ya, harus lebih spesial. *Hana tersenyum bahagia*",
    musicId: 206,
    choices: [
      { text: "TAMAT - (Ando & Hana Bersatu)", nextId: 100, sfxId: 2 }
    ]
  },

  // --- FRIENDZONE ENDING ---
  {
    id: 60,
    bg: "img/latar/street.webp",
    char: "img/Sumi/ClosedFrown.webp",
    name: "Hana",
    voiceId: 16, 
    text: "Ih kamu mah, bikin panik aja. Yaudah deh aku pulang duluan ya, bye Ando!",
    musicId: 207, // BGM: Sad/Melancholy Ending
    choices: [
      { text: "Dah Hana... (Yah, gagal deh).", nextId: 101, sfxId: 1 }
    ]
  },

  // --- FINAL SCREENS ---
  { 
    id: 100, 
    bg: "img/latar/generic_school_gate.webp", 
    char: null, 
    name: "System", 
    text: "CONGRATULATIONS! Perasaan Ando tersampaikan dengan baik ke Hana.", 
    musicId: null, 
    choices: [] 
  },
  { 
    id: 101, 
    bg: "img/latar/generic_school_gate.webp", 
    char: null, 
    name: "System", 
    text: "GAME OVER. Kamu terjebak di friendzone.", 
    musicId: null, 
    choices: [] 
  }
];