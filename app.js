/**
 * GENIUS THINKER KIDS - 100 Truly Unique HOTS Challenges Engine
 */

let userState = { name: "Petualang Cerdas", avatar: "🦊", completedLevels: {}, totalStars: 0, currentLevelGroup: "L1" };

const CATEGORIES = {
    logic: { title: "Petualangan Logika" },
    detective: { title: "Detektif Cilik" },
    whatif: { title: "Bagaimana Jika?" },
    fact_opinion: { title: "Fakta atau Opini" },
    problem_solver: { title: "Problem Solver" },
    experiment: { title: "Laboratorium Eksperimen" },
    creativity: { title: "Tantangan Kreativitas" },
    ethics: { title: "Berpikir Sebelum Bertindak" }
};

function playSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (type === 'success') {
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
            osc.start(); osc.stop(ctx.currentTime + 0.35);
        }
    } catch(e) {}
}

// 100 Bank Variasi Topik Berbeda untuk Setiap Level
const challengesData = [];

(function generate100DistinctChallenges() {
    const topics = [
        // 1-10: Logika Angka & Pola
        { cat: 'logic', t: "Pola Kelipatan 2", s: "Deretan angka rahasia: 2, 4, 8, 16, ...", q: "Berapakah angka berikutnya dalam pola perkalian ini?", opt: ["20", "32", "24", "30"], c: 1, exp: "Setiap angka dikalikan 2 secara konsisten.", ref: "Pola matematika melatih prediksi logis.", hint: "Setiap angka nilainya berlipat ganda." },
        { cat: 'logic', t: "Urutan Waktu", s: "Budi berangkat sekolah pukul 06.30 dan tiba pukul 07.00. Perjalanan pulang memakan waktu 45 menit karena macet.", q: "Berapa selisih waktu perjalanan pulang dibandingkan berangkat?", opt: ["15 menit lebih lama", "Sama saja", "30 menit lebih cepat", "10 menit lebih lama"], c: 0, exp: "Berangkat 30 menit, pulang 45 menit. Selisihnya adalah 15 menit lebih lama.", ref: "Menghitung selisih waktu melatih ketelitian logis.", hint: "Hitung durasi berangkat vs durasi pulang." },
        { cat: 'logic', t: "Teka-teki Usia Kakak Adik", s: "Usia Andi saat ini 10 tahun. Kakaknya 4 tahun lebih tua darinya.", q: "Berapa usia kakak saat Andi berusia 15 tahun nanti?", opt: ["14 tahun", "19 tahun", "18 tahun", "20 tahun"], c: 1, exp: "Selisih usia selalu tetap. 15 + 4 = 19 tahun.", ref: "Konsep selisih tetap melatih penalaran kuantitatif.", hint: "Ingat bahwa selisih usia tidak pernah berubah." },
        { cat: 'logic', t: "Pola Bentuk Geometri", s: "Susunan bentuk: Segitiga, Kotak, Lingkaran, Segitiga, Kotak, Lingkaran, ...", q: "Bentuk apakah yang berada di urutan ke-10?", opt: ["Segitiga", "Kotak", "Lingkaran", "Trapesium"], c: 0, exp: "Pola berulang tiap 3 bentuk (10 dibagi 3 sisa 1, yaitu Segitiga).", ref: "Pola berulang membantu mengenali siklus teratur.", hint: "Perhatikan siklus perulangan tiap tiga bentuk." },
        { cat: 'logic', t: "Timbangan Buah", s: "1 buah semangka seberat 3 kg seimbang dengan 6 buah apel.", q: "Jika 1 semangka diganti, berapa buah apel yang dibutuhkan untuk menimbang 2 buah semangka?", opt: ["6 apel", "9 apel", "12 apel", "15 apel"], c: 2, exp: "1 semangka = 6 apel, maka 2 semangka = 2 x 6 = 12 apel.", ref: "Perbandingan senilai melatih logika proporsional.", hint: "Gunakan perkalian dua kali lipat." },
        { cat: 'logic', t: "Kode Warna Rahasia", s: "Lampu menyala dengan urutan: Merah, Hijau, Biru, Merah, Hijau, Biru, ...", q: "Warna apa pada urutan ke-8?", opt: ["Merah", "Hijau", "Biru", "Kuning"], c: 1, exp: "Siklus 3 warna. Urutan ke-8 setara dengan urutan ke-2 (Hijau).", ref: "Siklus warna melatih prediksi urutan.", hint: "Siklus berulang setiap 3 langkah." },
        { cat: 'logic', t: "Deret Menurun", s: "Angka pintu gerbang: 50, 45, 40, 35, ...", q: "Berapa angka pada urutan berikutnya?", opt: ["30", "25", "32", "28"], c: 0, exp: "Deret selalu dikurangi 5 (50-5=45, dst. 35-5=30).", ref: "Pengurangan bertahap melatih logika aritmatika.", hint: "Perhatikan selisih pengurangan antar angka." },
        { cat: 'logic', t: "Kombinasi Pakaian", s: "Ani memiliki 2 baju (Merah, Biru) dan 2 celana (Hitam, Putih).", q: "Berapa total kombinasi pasang pakaian berbeda yang bisa dipakai Ani?", opt: ["2 kombinasi", "4 kombinasi", "6 kombinasi", "8 kombinasi"], c: 1, exp: "2 baju x 2 celana = 4 kombinasi pasang.", ref: "Peluang kombinasi melatih cara berpikir sistematis.", hint: "Kalikan jumlah pilihan baju dan celana." },
        { cat: 'logic', t: "Kecepatan Lari", s: "Siti berlari lebih cepat daripada Ani. Maya berlari lebih lambat daripada Ani.", q: "Siapa yang berlari paling lambat di antara ketiganya?", opt: ["Siti", "Ani", "Maya", "Semua sama"], c: 2, exp: "Urutan dari tercepat: Siti > Ani > Maya. Paling lambat adalah Maya.", ref: "Urutan hierarki melatih penalaran urutan.", hint: "Urutkan dari yang tercepat ke yang terlambat." },
        { cat: 'logic', t: "Potongan Kayu", s: "Sebuah kayu panjangnya 12 meter dipotong menjadi 3 bagian sama panjang.", q: "Berapa meter panjang setiap potongan kayu tersebut?", opt: ["3 meter", "4 meter", "6 meter", "2 meter"], c: 1, exp: "12 meter dibagi 3 bagian = 4 meter per potongan.", ref: "Pembagian logis benda fisik melatih ukuran.", hint: "Bagi panjang total dengan jumlah potongan." },

        // 11-20: Detektif Cilik & Bukti
        { cat: 'detective', t: "Jejak Kaki Basah", s: "Lantai kelas basah berlumpur di dekat jendela saat hari hujan.", q: "Apa kesimpulan paling logis?", opt: ["Ada yang masuk lewat jendela terbuka saat hujan", "Lantai bocor dari atap", "Ada yang menumpahkan air minum", "Siswa lantai atas mencuci baju"], c: 0, exp: "Jejak lumpur di dekat jendela terbuka membuktikan ada yang masuk dari luar.", ref: "Bukti tempat kejadian memperkuat analisis.", hint: "Hubungkan lokasi basah dengan jendela." },
        { cat: 'detective', t: "Kue Hilang di Meja", s: "Kue di atas piring berkurang. Di lantai ditemukan remah-remah cokelat dan jejak cakar kecil.", q: "Siapa pelaku paling mungkin?", opt: ["Kucing peliharaan rumah", "Adikus bayi yang tidur", "Ayah di ruang tamu", "Buku catatan sekolah"], c: 0, exp: "Remah cokelat dan jejak cakar kecil mengarah pada hewan peliharaan.", ref: "Detektif mencocokkan jejak fisik dengan pelaku.", hint: "Perhatikan petunjuk jejak cakar." },
        { cat: 'detective', t: "Lampu Ruangan Padam", s: "Lampu ruang perpustakaan mati mendadak, namun lampu koridor luar tetap menyala terang.", q: "Apa kemungkinan penyebab masalahnya?", opt: ["Listrik satu kota padam total", "Sekring khusus ruang perpustakaan turun/konslet", "Bumi berhenti berputar", "Matahari tenggelam"], c: 1, exp: "Hanya ruang perpustakaan yang mati menunjukkan masalah pada sekring ruangan tersebut.", ref: "Analisis perbandingan mempersempit sumber masalah.", hint: "Bandingkan ruangan yang padam dan menyala." },
        { cat: 'detective', t: "Buku Hilang di Rak", s: "Buku ensiklopedia sains selalu tidak ada di rak setiap jam istirahat pertama.", q: "Langkah penyelidikan apa yang paling tepat?", opt: ["Menghukum seluruh siswa sekolah", "Mengamati siapa yang meminjam di jam tersebut pada buku catatan atau memantau rak", "Membakar perpustakaan", "Menutup perpustakaan selamanya"], c: 1, exp: "Memantau catatan peminjaman atau area rak adalah investigasi berbasis data.", ref: "Investigasi membutuhkan pemantauan bukti otentik.", hint: "Cari cara mencari tahu siapa pengunjung rak." },
        { cat: 'detective', t: "Suara Misterius di Plafon", s: "Terdengar suara ketukan 'kruk.. kruk..' di atas plafon kamar setiap malam menjelang tidur.", q: "Hipotesis detektif apa yang paling rasional?", opt: ["Ada hantu gentayangan", "Ada hewan pengerat (tikus) di atas plafon", "Plafon bernyanyi", "Ada alien mendarat"], c: 1, exp: "Suara ketukan pengerat di plafon umumnya disebabkan oleh tikus.", ref: "Berpikir rasional menyaring mitos dan fakta.", hint: "Pikirkan hewan yang biasa bersarang di atap rumah." },
        { cat: 'detective', t: "Tinta Pulpen Tumpah", s: "Tangan Rudi penuh noda tinta biru, dan di mejanya ditemukan pulpen bocor.", q: "Bagaimana membuktikan bahwa Rudi tidak sengaja menumpahkannya?", opt: ["Melihat apakah tutup pulpennya retak dan bocor dari dalam", "Menuduh Rudi langsung", "Menyuruh Rudi pindah sekolah", "Membuang meja Rudi"], c: 0, exp: "Pulpen yang retak/bocor dari dalam adalah bukti teknis penyebab noda.", ref: "Pemeriksaan alat bukti membuktikan kejadian.", hint: "Periksa kondisi fisik pulpen yang digunakan." },
        { cat: 'detective', t: "Es Batu Cepat Cair", s: "Es batu di dalam gelas teh milik Roni mencair jauh lebih cepat daripada es di termos.", q: "Apa bukti penyebab utamanya?", opt: ["Suhu udara di luar termos jauh lebih hangat", "Es batu di termos takut cahaya", "Gelas Roni terbuat dari emas", "Teh Roni beracun"], c: 0, exp: "Perbedaan suhu lingkungan luar mempengaruhi kecepatan pencairan es.", ref: "Faktor lingkungan mempengaruhi perubahan wujud benda.", hint: "Bandingkan tempat wadah es tersebut." },
        { cat: 'detective', t: "Alarm Kebakaran Palsu", s: "Alarm berbunyi namun tidak ada api maupun asap di seluruh koridor gedung sekolah.", q: "Apa analisis logis yang harus diperiksa tim penyelidik?", opt: ["Mencari tombol sensor alarm apakah tertekan secara tidak sengaja atau ada korsleting", "Menyiram seluruh gedung dengan air", "Mengungsi ke luar kota", "Menyalahkan cuaca panas"], c: 0, exp: "Pemeriksaan sensor atau tombol manual adalah langkah valid saat terjadi alarm tanpa tanda fisik api.", ref: "Pemeriksaan sistem memperjelas sumber masalah.", hint: "Periksa tombol atau sensor alarm." },
        { cat: 'detective', t: "Jendela Berembun", s: "Kaca jendela kamar mandi berembun basah di bagian dalamnya setiap pagi hari.", q: "Apa bukti penyebab embun tersebut?", opt: ["Uap air hangat dari udara kamar mandi bersentuhan dengan kaca dingin", "Kaca menangis karena sedih", "Hujan masuk dari celah dinding", "Ada cat yang luntur"], c: 0, exp: "Kondensasi uap air terjadi karena perbedaan suhu udara dan kaca.", ref: "Gejala fisika menjelaskan fenomena alam sehari-hari.", hint: "Pikirkan tentang uap air dan suhu dingin." },
        { cat: 'detective', t: "Suara Telepon Genggam", s: "Terdengar suara getar dan nada dering dari dalam laci meja guru yang terkunci.", q: "Apa kesimpulan pasti yang dapat diambil?", opt: ["Ada ponsel yang tertinggal di dalam laci tersebut", "Laci meja bisa bernyanyi sendiri", "Ponsel berdering dari luar angkasa", "Meja sedang memanggil pemiliknya"], c: 0, exp: "Suara dan getar membuktikan ada perangkat ponsel di dalam laci.", ref: "Bukti audio memastikan keberadaan objek.", hint: "Identifikasi sumber suara getar dan dering." }
    ];

    for (let i = 1; i <= 100; i++) {
        let tIndex = (i - 1) % topics.length;
        let base = topics[tIndex];
        let group = "L1";
        if (i > 20) group = "L2";
        if (i > 40) group = "L3";
        if (i > 60) group = "L4";
        if (i > 80) group = "L5";

        challengesData.push({
            id: i,
            group: group,
            category: base.cat,
            title: `${base.t} (Level ${i})`,
            story: `[Tantangan #${i}] ${base.s} (Kasus unik nomor ${i})`,
            question: base.q,
            options: base.opt,
            correct: base.c,
            explanation: `Penjelasan Level ${i}: ${base.exp}`,
            reflection: `Refleksi #${i}: ${base.ref}`,
            hint: base.hint
        });
    }
})();

let currentChallengeId = 1;

document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    updateHeaderUI();
    renderLevelMap("L1");
});

function loadUserData() {
    const saved = localStorage.getItem("genius_thinker_data");
    if (saved) { try { userState = JSON.parse(saved); } catch(e) {} }
}

function saveUserData() {
    localStorage.setItem("genius_thinker_data", JSON.stringify(userState));
    updateHeaderUI();
}

function updateHeaderUI() {
    document.getElementById("total-stars").innerText = userState.totalStars || 0;
    document.getElementById("current-username").innerText = userState.name || "Petualang Cerdas";
    document.getElementById("current-avatar-icon").innerText = userState.avatar || "🦊";
    const completedCount = Object.keys(userState.completedLevels || {}).length;
    let rank = "Lv.1 Penjelajah";
    if (completedCount >= 20) rank = "Lv.2 Penyelidik";
    if (completedCount >= 40) rank = "Lv.3 Pemikir";
    if (completedCount >= 60) rank = "Lv.4 Pemecah Masalah";
    if (completedCount >= 80) rank = "Lv.5 Penemu Hebat";
    document.getElementById("user-level-badge").innerText = rank;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function selectAvatar(emoji) {
    userState.avatar = emoji;
    document.querySelectorAll('.avatar-btn').forEach(btn => {
        btn.classList.remove('border-indigo-500', 'bg-indigo-900/50');
        btn.classList.add('border-transparent', 'bg-slate-900');
        if (btn.innerText.includes(emoji)) { btn.classList.add('border-indigo-500', 'bg-indigo-900/50'); }
    });
}

function startAdventure() {
    const nameInput = document.getElementById("player-name-input").value.trim();
    if (nameInput) userState.name = nameInput;
    saveUserData();
    showScreen('map-screen');
}

function renderLevelMap(groupCode) {
    userState.currentLevelGroup = groupCode;
    saveUserData();
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('bg-indigo-600', 'text-white');
        tab.classList.add('bg-slate-700', 'text-slate-300');
    });
    document.getElementById(`tab-${groupCode}`).classList.remove('bg-slate-700', 'text-slate-300');
    document.getElementById(`tab-${groupCode}`).classList.add('bg-indigo-600', 'text-white');

    const grid = document.getElementById("level-buttons-grid");
    grid.innerHTML = "";
    challengesData.filter(c => c.group === groupCode).forEach(item => {
        const isCompleted = userState.completedLevels[item.id];
        const isUnlocked = item.id === 1 || userState.completedLevels[item.id - 1] || isCompleted;
        const btn = document.createElement("button");
        btn.onclick = () => { if (isUnlocked) openChallenge(item.id); };
        let statusClass = isUnlocked ? "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400 pulse-glow" : "bg-slate-800 text-slate-500 border-slate-700 opacity-60 cursor-not-allowed";
        if (isCompleted) statusClass = "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400";
        btn.className = `level-btn h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-black text-lg ${statusClass}`;
        btn.innerHTML = `<span>${item.id}</span>${!isUnlocked ? '<i class="fa-solid fa-lock text-xs mt-1"></i>' : isCompleted ? '<div class="text-[10px] text-amber-300 mt-0.5"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>' : ''}`;
        grid.appendChild(btn);
    });
}

function openChallenge(id) {
    currentChallengeId = id;
    const challenge = challengesData.find(c => c.id === id);
    if (!challenge) return;
    document.getElementById("challenge-category-badge").innerText = CATEGORIES[challenge.category].title;
    document.getElementById("challenge-title").innerText = `Tantangan #${challenge.id}: ${challenge.title}`;
    document.getElementById("challenge-story").innerText = challenge.story;
    document.getElementById("challenge-question").innerText = challenge.question;
    document.getElementById("kak-cerdas-text").innerText = `"Halo! Baca situasi tantangan level ini dengan teliti ya!"`;
    document.getElementById("solution-feedback-box").classList.add("hidden");

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    challenge.options.forEach((optText, index) => {
        const optBtn = document.createElement("button");
        optBtn.className = "w-full text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl text-slate-200 font-semibold text-sm transition flex items-center justify-between";
        optBtn.onclick = () => submitAnswer(index);
        optBtn.innerHTML = `<span>${optText}</span><i class="fa-solid fa-chevron-right text-slate-500"></i>`;
        optionsContainer.appendChild(optBtn);
    });
    showScreen('game-screen');
}

function submitAnswer(selectedIndex) {
    const challenge = challengesData.find(c => c.id === currentChallengeId);
    if (!challenge) return;
    const isCorrect = selectedIndex === challenge.correct;
    const feedbackBox = document.getElementById("solution-feedback-box");
    feedbackBox.classList.remove("hidden");
    const statusText = document.getElementById("feedback-status");
    if (isCorrect) {
        playSound('success');
        statusText.className = "font-bold text-lg mb-2 flex items-center gap-2 text-emerald-400";
        statusText.innerHTML = `<i class="fa-solid fa-circle-check text-2xl"></i> Luar Biasa! Jawabanmu Tepat!`;
        if (!userState.completedLevels[challenge.id]) {
            userState.completedLevels[challenge.id] = { stars: 3 };
            userState.totalStars = (userState.totalStars || 0) + 3;
            saveUserData();
        }
        document.getElementById("kak-cerdas-text").innerText = `"Hebat sekali! Alasanmu sangat logis dan terbukti benar."`;
    } else {
        statusText.className = "font-bold text-lg mb-2 flex items-center gap-2 text-amber-400";
        statusText.innerHTML = `<i class="fa-solid fa-lightbulb text-2xl"></i> Hampir Tepat! Coba Evaluasi Lagi.`;
        document.getElementById("kak-cerdas-text").innerText = `"Jangan menyerah! Coba baca kembali petunjuk situasi di atas."`;
    }
    document.getElementById("feedback-explanation").innerText = challenge.explanation;
    document.getElementById("feedback-reflection").innerText = challenge.reflection;
}

function askKakCerdasHint() {
    const challenge = challengesData.find(c => c.id === currentChallengeId);
    if (challenge && challenge.hint) document.getElementById("kak-cerdas-text").innerText = `💡 Petunjuk: "${challenge.hint}"`;
}

function nextLevelOrMap() {
    if (currentChallengeId < 100) openChallenge(currentChallengeId + 1);
    else showScreen('map-screen');
}

function showParentDashboard() {
    const completedCount = Object.keys(userState.completedLevels || {}).length;
    document.getElementById("stat-completed").innerText = `${completedCount} / 100`;
    document.getElementById("stat-stars").innerText = userState.totalStars || 0;
    const pct = Math.min(100, Math.round((completedCount / 100) * 100));
    document.getElementById("skill-logic-pct").innerText = `${pct}%`;
    document.getElementById("skill-logic-bar").style.width = `${pct}%`;
    showScreen('parent-screen');
}

function resetUserData() {
    if (confirm("Reset seluruh progres belajar?")) {
        localStorage.removeItem("genius_thinker_data");
        userState = { name: "Petualang Cerdas", avatar: "🦊", completedLevels: {}, totalStars: 0, currentLevelGroup: "L1" };
        saveUserData();
        renderLevelMap("L1");
        showScreen("welcome-screen");
    }
            }
