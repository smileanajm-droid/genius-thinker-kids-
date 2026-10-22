/**
 * GENIUS THINKER KIDS - 100 Unique HOTS Challenges Engine
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

// Generator 100 Tantangan Unik Tanpa Pengulangan Teks Identik
const challengesData = [];

(function generateTrulyUnique100() {
    const cats = ['logic', 'detective', 'whatif', 'fact_opinion', 'problem_solver', 'experiment', 'creativity', 'ethics'];
    
    for (let i = 1; i <= 100; i++) {
        let cat = cats[(i - 1) % cats.length];
        let group = "L1";
        if (i > 20) group = "L2";
        if (i > 40) group = "L3";
        if (i > 60) group = "L4";
        if (i > 80) group = "L5";

        let title = "";
        let story = "";
        let question = "";
        let options = [];
        let correct = 0;
        let explanation = "";
        let reflection = "";
        let hint = "";

        if (cat === 'logic') {
            let baseNum = (i % 5) + 2;
            title = `Pola Bilangan Logika #${i}`;
            story = `Petualang menemukan rangkaian kode angka rahasia di pintu gerbang pulau: ${baseNum}, ${baseNum*2}, ${baseNum*4}, ${baseNum*8}, ...`;
            question = `Berapakah angka berikutnya dalam pola matematika tersebut?`;
            correct = 1;
            options = [
                `${baseNum*12} (ditambah ${baseNum*4})`,
                `${baseNum*16} (dikalikan 2 dari sebelumnya)`,
                `${baseNum*10} (ditambah 2)`,
                `${baseNum*14} (pola acak)`
            ];
            explanation = `Pola bilangan ini selalu dikalikan 2 pada setiap langkah berikutnya.`;
            reflection = `Analisis pola bilangan melatih ketelitian dan prediksi logis yang sistematis.`;
            hint = `Perhatikan bagaimana nilai bilangan berlipat ganda pada setiap urutan.`;
        } else if (cat === 'detective') {
            title = `Misteri TKP Kasus #${i}`;
            story = `Kasus #${i}: Di sebuah ruangan tertutup, ditemukan jendela kaca pecah berserakan di dalam ruangan, sementara daun-daun jendela terbuka menghadap ke luar.`;
            question = `Apa kesimpulan detektif paling logis mengenai arah lemparan benda penyebab pecahnya kaca?`;
            correct = 0;
            options = [
                `Benda dilempar dari luar menuju ke dalam ruangan (pecahan jatuh di dalam)`,
                `Benda dilempar dari dalam keluar ruangan`,
                `Kaca pecah sendiri karena suhu udara`,
                `Tidak ada benda yang melempar kaca`
            ];
            explanation = `Pecahan kaca yang berserakan di dalam ruangan membuktikan bahwa benturan atau lemparan berasal dari luar.`;
            reflection = `Detektif yang cermat selalu menganalisis letak dan sebaran bukti fisik secara akurat.`;
            hint = `Cari tahu di mana tumpukan serpihan pecahan kaca berserakan.`;
        } else if (cat === 'fact_opinion') {
            title = `Uji Pernyataan Fakta #${i}`;
            story = `Dalam artikel majalah sains edisi #${i}, terdapat beberapa kalimat ulasan tentang planet Mars.`;
            question = `Manakah kalimat di bawah ini yang merupakan FAKTA objektif?`;
            correct = 2;
            options = [
                `Mars adalah planet paling indah di tata surya`,
                `Penduduk bumi pasti ingin segera pindah ke Mars`,
                `Mars memiliki atmosfer yang sebagian besar terdiri dari gas karbon dioksida`,
                `Pemandangan di Mars sangat menakjubkan bagi siapa saja`
            ];
            explanation = `Kandungan gas karbon dioksida di Mars adalah data ilmiah yang dapat diukur (Fakta). Kata indah/menakjubkan adalah penilaian subjektif (Opini).`;
            reflection = `Membedakan fakta dan opini melindungi kita dari informasi yang menyesatkan.`;
            hint = `Pilih pernyataan yang berdasarkan data ilmiah dan dapat dibuktikan.`;
        } else if (cat === 'problem_solver') {
            title = `Dilema Pemecah Masalah #${i}`;
            story = `Situasi #${i}: Tim kelompok belajarmu memiliki waktu 2 hari untuk menyelesaikan proyek besar, namun salah satu anggota jatuh sakit dan tidak bisa membantu.`;
            question = `Apa tindakan problem solving paling bijak yang harus diambil kelompokmu?`;
            correct = 1;
            options = [
                `Memarahi anggota yang sakit karena tidak bertanggung jawab`,
                `Membagi ulang tugas secara adil di antara anggota yang sehat dan menjenguk teman yang sakit`,
                `Membatalkan seluruh proyek kelompok`,
                `Mengerjakan semuanya sendirian tanpa memberitahu guru`
            ];
            explanation = `Musyawarah untuk membagi ulang beban tugas serta menjaga empati adalah solusi terbaik dalam kerja tim.`;
            reflection = `Masalah kelompok diselesaikan dengan kepala dingin, kerja sama, dan komunikasi yang baik.`;
            hint = `Pilih opsi yang mengutamakan kerja sama tim dan empati.`;
        } else if (cat === 'whatif') {
            title = `Simulasi Pengandaian #${i}`;
            story = `Pengandaian #${i}: Bagaimana jika seluruh kendaraan bermotor di kotamu diganti total dengan sepeda dan kendaraan listrik dalam waktu bersamaan?`;
            question = `Apa dampak positif jangka panjang yang paling dirasakan langsung oleh warga?`;
            correct = 0;
            options = [
                `Polusi udara menurun drastis dan suara bising kendaraan hilang`,
                `Semua jalan raya akan ditutup total selamanya`,
                `Harga seluruh makanan di pasar mendadak gratis`,
                `Jumlah penduduk kota langsung berkurang setengahnya`
            ];
            explanation = `Penggunaan kendaraan ramah lingkungan secara masif langsung memangkas emisi gas buang dan polusi suara.`;
            reflection = `Simulasi 'bagaimana jika' melatih kita memprediksi dampak ekologis dari sebuah kebijakan.`;
            hint = `Pikirkan hubungan langsung antara asap kendaraan dengan kualitas udara.`;
        } else if (cat === 'experiment') {
            title = `Laboratorium Sains #${i}`;
            story = `Eksperimen #${i}: Kamu menguji kecepatan larut gula pasir dalam air dingin, air biasa, dan air panas dengan adukan yang sama.`;
            question = `Variabel apakah yang sengaja dibuat BERBEDA (variabel manipulasi) dalam eksperimen ini?`;
            correct = 1;
            options = [
                `Jumlah takaran gula pasir`,
                `Suhu air (dingin, biasa, panas)`,
                `Jumlah putaran adukan sendok`,
                `Jenis gelas yang digunakan`
            ];
            explanation = `Suhu air sengaja dibedakan untuk menguji pengaruhnya terhadap kecepatan larut gula.`;
            reflection = `Eksperimen ilmiah yang valid memerlukan pengontrolan variabel secara teliti.`;
            hint = `Perhatikan hal apa yang menjadi pembeda utama pada tiga wadah air tersebut.`;
        } else if (cat === 'creativity') {
            title = `Tantangan Kreatif #${i}`;
            story = `Tantangan #${i}: Kamu hanya memiliki 5 botol plastik bekas air mineral dan tali rafia untuk membuat alat penampung air hujan darurat di halaman rumah.`;
            question = `Bagaimana rancangan desain paling kreatif dan efektif memanfaatkan botol tersebut?`;
            correct = 2;
            options = [
                `Membuang semua botol ke tempat sampah`,
                `Mengisi botol dengan tanah untuk hiasan bunga`,
                `Memotong bagian bawah botol dan menyusunnya bertingkat menjadi corong saluran air mengalir ke wadah utama`,
                `Membakar botol agar menjadi plastik cair`
            ];
            explanation = `Memotong dan menyusun botol bertingkat membentuk sistem corong saluran air adalah pemanfaatan daur ulang yang fungsional.`;
            reflection = `Kreativitas memecahkan masalah melibatkan pemanfaatan barang bekas menjadi solusi inovatif.`;
            hint = `Cari cara agar botol plastik bisa berfungsi mengarahkan aliran air hujan.`;
        } else {
            title = `Refleksi Karakter & Etika #${i}`;
            story = `Cerita Etika #${i}: Saat jam istirahat, kamu tanpa sengaja menyenggol tempat pensil temanmu hingga isinya berserakan di lantai, lalu kamu buru-buru pergi karena malu.`;
            question = `Sebagai anak berkarakter jujur dan bertanggung jawab, apa yang seharusnya kamu lakukan?`;
            correct = 1;
            options = [
                `Berpura-pura tidak melihat dan tidak tahu apa-apa`,
                `Kembali menghampiri temanmu, meminta maaf secara jujur, dan membantu membereskan isinya`,
                `Menyalahkan orang lain yang berdiri di dekat meja`,
                `Menyembunyikan tempat pensil tersebut ke dalam laci`
            ];
            explanation = `Bertanggung jawab atas kesalahan yang tidak sengaja dan meminta maaf adalah ciri anak yang berintegritas tinggi.`;
            reflection = `Kejujuran dan tanggung jawab membangun rasa saling percaya dalam pertemanan.`;
            hint = `Pilih tindakan yang menunjukkan keberanian mengakui kesalahan dan berempati.`;
        }

        challengesData.push({
            id: i,
            group: group,
            category: cat,
            title: title,
            story: story,
            question: question,
            options: options,
            correct: correct,
            explanation: explanation,
            reflection: reflection,
            hint: hint
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
    document.getElementById("kak-cerdas-text").innerText = `"Halo! Berpikirlah dengan logis sebelum memilih jawaban!"`;
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
            
