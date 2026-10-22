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

const challengesData = [];
(function generate100Challenges() {
    const categoryKeys = ['logic', 'detective', 'whatif', 'fact_opinion', 'problem_solver', 'experiment', 'creativity', 'ethics'];
    const levelTemplates = [
        { cat: 'logic', title: "Pola Angka Rahasia", story: "Detektif menemukan petunjuk berupa deretan angka: 2, 4, 8, 16, ... Berapakah angka berikutnya?", question: "Pilih angka yang tepat sesuai pola kelipatannya:", options: ["20 (ditambah 4)", "32 (dikali 2)", "24 (ditambah 8)", "18 (ditambah 2)"], correct: 1, explanation: "Pola angka ini selalu dikalikan 2.", reflection: "Pola matematika membantu kita memprediksi kejadian.", hint: "Perhatikan hubungan antar angka." },
        { cat: 'detective', title: "Tanaman Kelas yang Layu", story: "Di pojok kelas ditemukan tanaman pot daunnya layu dan tanah sangat kering.", question: "Apa penyebab paling logis?", options: ["Tanaman terkena penyakit", "Tanaman kekurangan air karena kurang disiram", "Ada yang merusak", "Terlalu banyak musik"], correct: 1, explanation: "Tanah kering menunjukkan kurang air.", reflection: "Kesimpulan didasarkan bukti fisik.", hint: "Perhatikan kondisi tanah." }
    ];
    for (let i = 1; i <= 100; i++) {
        const catKey = categoryKeys[(i - 1) % categoryKeys.length];
        const template = levelTemplates[(i - 1) % levelTemplates.length];
        let group = "L1";
        if (i > 20) group = "L2";
        if (i > 40) group = "L3";
        if (i > 60) group = "L4";
        if (i > 80) group = "L5";
        challengesData.push({
            id: i, group: group, category: catKey,
            title: `${template.title} #${i}`,
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
document.addEventListener("DOMContentLoaded", () => { loadUserData(); updateHeaderUI(); renderLevelMap("L1"); });

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
