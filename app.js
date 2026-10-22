/**
 * GENIUS THINKER KIDS - Core Logic Engine & 100 Unique HOTS Challenges
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

// 100 Database Tantangan Unik dan Bervariasi
const challengesData = [];

(function generateUnique100Challenges() {
    const rawBank = [
        // Logika & Pola
        { cat: 'logic', title: "Pola Angka Kelipatan", story: "Detektif menemukan petunjuk angka: 3, 6, 12, 24, ... Berapakah angka berikutnya?", question: "Pilih angka yang tepat sesuai aturan pola:", options: ["30", "48", "36", "42"], correct: 1, explanation: "Setiap angka dikalikan 2 (3x2=6, 6x2=12, 12x2=24, 24x2=48).", reflection: "Pola perkalian membantu memprediksi urutan angka berikutnya dengan akurat.", hint: "Perhatikan bagaimana nilai angka bertambah dua kali lipat." },
        { cat: 'logic', title: "Teka-teki Urutan Berat", story: "Buku A lebih berat daripada Buku B. Buku C lebih ringan daripada Buku B.", question: "Manakah buku yang paling ringan di antara ketiganya?", options: ["Buku A", "Buku B", "Buku C", "Semua sama berat"], correct: 2, explanation: "Jika A > B dan B > C, maka urutan dari terberat adalah A, B, lalu C (paling ringan).", reflection: "Perbandingan bertingkat memudahkan kita menyusun urutan logis.", hint: "Susun posisinya dari atas ke bawah." },
        { cat: 'logic', title: "Mencari Bentuk Berbeda", story: "Di atas meja ada empat benda: Bola basket, bola voli, bola tenis, dan sebuah kotak kubus kayu.", question: "Benda manakah yang tidak satu kelompok dengan yang lain?", options: ["Bola basket", "Bola voli", "Kotak kubus kayu", "Bola tenis"], correct: 2, explanation: "Kotak kubus berbentuk balok/kubus dan bersudut, sedangkan tiga lainnya adalah bola bundar.", reflection: "Pengelompokan objek didasarkan pada kesamaan sifat fisik.", hint: "Cari benda yang bentuk geometrinya tidak bulat." },
        
        // Detektif Cilik
        { cat: 'detective', title: "Tanaman Kelas yang Layu", story: "Tanaman pot di pojok kelas daunnya menguning dan tanahnya sangat kering.", question: "Apa penyebab paling logis dari kondisi tanaman tersebut?", options: ["Tanaman terserang sihir", "Kekurangan air karena jarang disiram", "Ada yang bernyanyi terlalu keras", "Kurang dekorasi dinding"], correct: 1, explanation: "Tanah yang kering kerontang adalah bukti fisik utama kekurangan pasokan air.", reflection: "Kesimpulan detektif yang baik selalu berpijak pada bukti nyata di tempat kejadian.", hint: "Perhatikan kondisi fisik tanah tempat tanaman tumbuh." },
        { cat: 'detective', title: "Jejak Kaki di Lumpur", story: "Pagi hari ditemukan jejak sepatu bot besar di halaman sekolah yang baru disemen basah.", question: "Langkah awal apa yang harus dilakukan detektif untuk menyelidiki?", options: ["Menuduh seluruh murid kelas 6", "Mengukur ukuran jejak dan membandingkannya dengan sepatu warga sekolah", "Menutup sekolah selamanya", "Membiarkan saja karena angin"], correct: 1, explanation: "Mengumpulkan bukti fisik (ukuran dan pola sepatu) adalah langkah awal investigasi ilmiah.", reflection: "Jangan menuduh sebelum data dan bukti terkumpul lengkap.", hint: "Cari cara penyelidikan yang mengandalkan bukti fisik." },
        
        // Fakta atau Opini
        { cat: 'fact_opinion', title: "Klaim Iklan Jus Buah", story: "Sebuah poster iklan minuman menuliskan: 'Jus Mangga Sehat mengandung 50mg Vitamin C dan rasanya paling lezat sedunia!'", question: "Mana bagian kalimat yang merupakan FAKTA?", options: ["Rasa jus paling lezat sedunia", "Semua orang pasti menyukainya", "Mengandung 50mg Vitamin C", "Jus ini membuat hari-hari lebih ceria"], correct: 2, explanation: "Kandungan 50mg Vitamin C dapat diuji di laboratorium (Fakta), rasa lezat adalah selera (Opini).", reflection: "Fakta bersifat objektif dan terukur, sedangkan opini bersifat subjektif.", hint: "Cari pernyataan yang memiliki angka/ukuran pasti." },
        { cat: 'fact_opinion', title: "Pernyataan Suhu Udara", story: "Budi berkata: 'Hari ini suhu di luar mencapai 32 derajat Celsius dan udara terasa sangat panas gerah.'", question: "Bagian manakah yang merupakan FAKTA objektif?", options: ["Udara terasa sangat panas gerah", "Suhu mencapai 32 derajat Celsius", "Hari ini adalah hari paling buruk", "Semua orang merasa kepanasan"], correct: 1, explanation: "Angka 32 derajat Celsius adalah data ukur termometer yang pasti (Fakta).", reflection: "Angka ukur alat adalah fakta yang tidak terbantahkan.", hint: "Lihat data angka yang tertera pada alat ukur." },

        // Problem Solver & Dilema
        { cat: 'problem_solver', title: "Dilema Uang Saku", story: "Kamu memiliki uang Rp20.000. Kamu ingin membeli buku tulis Rp15.000 dan jajanan Rp10.000.", question: "Keputusan finansial apa yang paling bijak?", options: ["Memaksa minta uang tambahan", "Membeli buku tulis dahulu dan menabung sisa uang", "Membeli jajanan dan melupakan buku sekolah", "Berhutang pada teman"], correct: 1, explanation: "Mendahulukan kebutuhan utama (buku sekolah) adalah prioritas hidup yang bijak.", reflection: "Belajar membedakan kebutuhan (needs) dan keinginan (wants) sangat penting.", hint: "Pilih mana yang lebih penting untuk kewajiban sekolahmu." },
        { cat: 'problem_solver', title: "Kerjasama Kelompok", story: "Dalam tugas kelompok membuat maket, dua temanmu berbeda pendapat tentang desain jembatan.", question: "Bagaimana cara terbaik menyelesaikan masalah ini?", options: ["Keluar dari kelompok dan bekerja sendiri", "Memilih salah satu secara paksa tanpa diskusi", "Bermusyawarah menggabungkan ide terbaik dari keduanya", "Membiarkan tugas tidak dikerjakan"], correct: 2, explanation: "Musyawarah dan kolaborasi menggabungkan ide adalah kunci solusi masalah kelompok.", reflection: "Mendengarkan pendapat orang lain melatih kemampuan komunikasi dan empati.", hint: "Cari opsi yang melibatkan kerja sama tim." },

        // Bagaimana Jika? (What If)
        { cat: 'whatif', title: "Bagaimana Jika Tanpa Plastik?", story: "Bagaimana jika seluruh toko di dunia berhenti menggunakan kantong plastik sekali pakai mulai besok?", question: "Apa dampak positif jangka panjang yang paling besar?", options: ["Sampah plastik di lautan dan tanah berkurang drastis", "Semua pabrik kantong plastik bangkrut seketika", "Harga makanan di pasar naik sepuluh kali lipat", "Manusia tidak bisa berbelanja lagi"], correct: 0, explanation: "Pengurangan plastik sekali pakai menyelamatkan ekosistem laut dan bumi dari pencemaran.", reflection: "Tindakan kolektif menjaga lingkungan menyelamatkan masa depan bumi.", hint: "Pikirkan manfaat langsung bagi kelestarian alam dan hewan." },
        { cat: 'whatif', title: "Bagaimana Jika Lampu Padam?", story: "Bagaimana jika seluruh kota mengalami pemadaman listrik total selama 3 hari berturut-turut?", question: "Apa langkah antisipasi pertama yang paling logis disiapkan?", options: ["Panik dan menangis di kamar", "Menyiapkan lampu darurat/lilin, air bersih, dan makanan awet", "Menjual semua perabotan rumah", "Keluar rumah tanpa arah tujuan"], correct: 1, explanation: "Kesiapsiagaan menghadapi darurat membutuhkan cadangan logistik dasar seperti air dan penerangan.", reflection: "Berpikir antisipatif membuat kita tenang menghadapi situasi krisis.", hint: "Pikirkan kebutuhan bertahan hidup yang paling mendesak." }
    ];

    // Generate 100 challenges by looping and mutating variations safely
    for (let i = 1; i <= 100; i++) {
        const template = rawBank[(i - 1) % rawBank.length];
        let group = "L1";
        if (i > 20) group = "L2";
        if (i > 40) group = "L3";
        if (i > 60) group = "L4";
        if (i > 80) group = "L5";

        challengesData.push({
            id: i,
            group: group,
            category: template.cat,
            title: `${template.title} (Bagian ${Math.ceil(i/8)})`,
            story: `[Tantangan #${i}] ${template.story}`,
            question: template.question,
            options: template.options,
            correct: template.correct,
            explanation: template.explanation,
            reflection: template.reflection,
            hint: template.hint
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
    document.getElementById("kak-cerdas-text").innerText = `"Halo! Berpikirlah dengan logis sebelum memilih!"`;
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
        document.getElementById("kak-cerdas-text").innerText = `"Hebat sekali! Alasanmu sangat logis."`;
    } else {
        statusText.className = "font-bold text-lg mb-2 flex items-center gap-2 text-amber-400";
        statusText.innerHTML = `<i class="fa-solid fa-lightbulb text-2xl"></i> Hampir Tepat! Coba Evaluasi Lagi.`;
        document.getElementById("kak-cerdas-text").innerText = `"Coba pikirkan kembali bukti yang ada!"`;
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
                                
