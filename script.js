// --- ANIMASI HITUNG MUNDUR (Counter Animation) ---

// Function untuk Animasi Hitung Mundur
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        // Menambahkan simbol + atau ton sesuai kebutuhan
        let displayValue = currentValue;
        if (obj.id === 'impact1') displayValue = `${currentValue}+`;
        if (obj.id === 'impact2') displayValue = `${currentValue}%`;
        if (obj.id === 'impact3') displayValue = `${currentValue} ton`;

        obj.innerHTML = displayValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer untuk memicu animasi saat elemen terlihat
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Memicu saat 50% elemen terlihat
};

const impactObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Memanggil animasi untuk setiap kartu dampak
            animateValue(document.getElementById('impact1'), 0, 450, 2000); // Pohon Ditanam (2 detik)
            animateValue(document.getElementById('impact2'), 0, 80, 2500); // Pengurangan Sampah (2.5 detik)
            animateValue(document.getElementById('impact3'), 0, 15, 3000); // Emisi CO2 (3 detik)
            
            observer.unobserve(entry.target); // Hentikan observasi setelah sekali jalan
        }
    });
}, observerOptions);

// Target elemen: Container Dampak
const targetSection = document.getElementById('dampak');
if (targetSection) {
    impactObserver.observe(targetSection);
}


// --- FUNGSI FAQ TOGGLE ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const span = item.querySelector('.faq-question span');
        const isVisible = answer.style.display === 'block';

        // Tutup semua jawaban
        document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
        document.querySelectorAll('.faq-question span').forEach(s => s.innerHTML = '&darr;');
        
        // Tampilkan/Sembunyikan jawaban yang diklik
        if (!isVisible) {
            answer.style.display = 'block';
            span.innerHTML = '&uarr;';
        }
    });
});

// --- FUNGSI KUIS ---
function cekQuiz(){
    let skor = 0;
    let totalSoal = 2;

    // Soal 1
    const jawaban1 = document.querySelector('input[name="q1"]:checked');
    if(jawaban1 && jawaban1.value === 'benar') skor += 50;

    // Soal 2
    const jawaban2 = document.querySelector('input[name="q2"]:checked');
    if(jawaban2 && jawaban2.value === 'benar') skor += 50;

    const hasilQuizElement = document.getElementById('hasilQuiz');
    if (hasilQuizElement) {
        hasilQuizElement.innerText = `Nilai kamu: ${skor}/${totalSoal*50}. Jawaban yang benar adalah Fosil dan Menggunakan Kembali.`;
    }
}
// Karena cekQuiz dipanggil dari onclick di HTML, ia harus ada di scope global.
// Dalam konteks file eksternal, kita memastikan ia tersedia di window.
window.cekQuiz = cekQuiz;


// --- DARK MODE TOGGLE & LOCAL STORAGE ---
const toggle = document.getElementById('darkToggle');

if (toggle) {
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        toggle.innerHTML = isDark ? '☀️ Mode Terang' : '🌙 Mode Gelap';
        // Simpan preferensi mode di localStorage
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
}

// Load Dark Mode Preference
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        const toggleBtn = document.getElementById('darkToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = '☀️ Mode Terang';
        }
    }
});