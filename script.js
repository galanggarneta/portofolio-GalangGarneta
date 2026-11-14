/* =========================================================================
   1. ANIMASI BINTANG & BULAN BERTERBANGAN DI LATAR BELAKANG
   ========================================================================= */
function createSkyAnimations() {
    const sky = document.getElementById('sky-canvas');
    if (!sky) return;

    // Simbol bintang, kilau, dan bulan sabit yang ceria
    const symbols = ['✦', '★', '✧', '🌙', '✨', '⋆'];
    const colors = ['#1D4ED8', '#38BDF8', '#880E27', '#F59E0B', '#A4133C'];
    const totalItems = 30; // Jumlah bintang & bulan di latar belakang

    for (let i = 0; i < totalItems; i++) {
        const item = document.createElement('span');
        item.classList.add('sky-item');
        item.textContent = symbols[i % symbols.length];

        // Posisi acak di seluruh area layar
        item.style.left = `${Math.random() * 98}%`;
        item.style.top = `${Math.random() * 98}%`;

        // Ukuran, warna, dan arah terbang acak
        const size = 12 + Math.random() * 16;
        item.style.fontSize = `${size}px`;
        item.style.color = colors[i % colors.length];
        item.style.setProperty('--dur', `${8 + Math.random() * 12}s`);
        item.style.setProperty('--dx', `${(Math.random() - 0.5) * 90}px`);
        item.style.setProperty('--dy', `${(Math.random() - 0.5) * 90}px`);
        item.style.animationDelay = `${Math.random() * 5}s`;

        sky.appendChild(item);
    }

    // Efek interaktif halus mengikuti gerakan kursor mouse
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
        sky.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

/* =========================================================================
   2. ANIMASI KOTAK MINAT BERGANTI SEPERTI DI-SCROLL
      (Cisco -> Network -> Web -> Hardware -> Software)
   ========================================================================= */
function startInterestScroll() {
    const track = document.getElementById('interest-track');
    if (!track) return;

    const items = track.querySelectorAll('.interest-item');
    const itemHeight = 42; // Harus sama dengan height .interest-item di CSS
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        track.style.transform = `translateY(-${currentIndex * itemHeight}px)`;
    }, 2000); // Berganti otomatis setiap 2 detik
}

/* =========================================================================
   3. ANIMASI POP-UP KECIL SAAT HALAMAN DI-SCROLL
   ========================================================================= */
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.pop-anim').forEach((section) => {
    scrollObserver.observe(section);
});

/* =========================================================================
   4. BUKA & TUTUP FOTO / SERTIFIKAT UKURAN PENUH SAAT GAMBAR DIPENCET
   ========================================================================= */
function openModal(imgElement) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    // Ambil foto asli dan keterangan gambar
    modalImg.src = imgElement.src;
    modalCaption.textContent = imgElement.getAttribute('data-caption') || imgElement.alt || '';

    modal.style.display = 'flex';
}

function closeModal(event) {
    const modal = document.getElementById('image-modal');
    if (event.target === modal || event.target.classList.contains('close-modal')) {
        modal.style.display = 'none';
    }
}

// Tutup foto penuh jika menekan tombol ESC di keyboard
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.getElementById('image-modal').style.display = 'none';
    }
});

/* =========================================================================
   5. SALIN EMAIL OTOMATIS SAAT TOMBOL KONTAK DIPENCET
   ========================================================================= */
function copyEmail(emailAddress) {
    navigator.clipboard.writeText(emailAddress).then(() => {
        const toast = document.getElementById('copy-toast');
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }).catch(() => {
        alert('Silakan salin email secara manual: ' + emailAddress);
    });
}

/* =========================================================================
   6. PENGATUR 2 BAHASA (INDONESIA & INGGRIS)
   ========================================================================= */
let currentLang = 'id';

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';

    // Ubah semua teks dengan class .lang-text
    document.querySelectorAll('.lang-text').forEach((el) => {
        const translated = el.getAttribute(`data-${currentLang}`);
        if (translated) {
            el.textContent = translated;
        }
    });

    // Ubah isi kotak scroll minat (Cisco, Network, Web, Hardware, Software)
    document.querySelectorAll('.interest-item').forEach((item) => {
        const translatedInterest = item.getAttribute(`data-${currentLang}`);
        if (translatedInterest) {
            item.textContent = translatedInterest;
        }
    });
}

// Jalankan animasi latar belakang dan kotak scroll minat saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    createSkyAnimations();
    startInterestScroll();
});
