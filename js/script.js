/* ==========================================================================
   HAMBURGER MENÜ (Tüm Sayfalar)
   - Mobil cihazlarda menünün açılıp kapanmasını sağlar.
   ========================================================================== */
const hamburgerBtn = document.getElementById('hamburgerBtn'); // Hamburger butonunu seç
const mainNav = document.getElementById('mainNav'); // Ana navigasyon menüsünü seç

if (hamburgerBtn && mainNav) {
    // Butona tıklandığında menüyü aç/kapat
    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('active'); // Butona 'active' sınıfını ekle/çıkar (animasyon için)
        mainNav.classList.toggle('open'); // Menüye 'open' sınıfını ekle/çıkar (görünürlük için)
    });

    // Menüdeki bir linke tıklandığında menüyü otomatik kapat
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            mainNav.classList.remove('open');
        });
    });
}

/* ==========================================================================
   İLGİ ALANLARIM (Kitap Galerisi - ilgi.html)
   - Google Books API kullanarak kitap bilgilerini çeker ve listeler.
   ========================================================================== */
const booksGrid = document.getElementById('booksGrid');

if (booksGrid) {
    // Sergilenecek favori kitapların listesi
    const myFavoriteBooks = [
        "Melekler ve Şeytanlar Dan Brown",
        "Bülbülü Öldürmek Harper Lee",
        "1984 George Orwell",
        "Sevdalinka Ayşe Kulin",
        "Nefes Nefese Ayşe Kulin",
        "Da Vinci Şifresi Dan Brown",
        "Gurur ve Önyargı Jane Austen",
        "Kürk Mantolu Madonna Sabahattin Ali",
        "Uğultulu Tepeler Emily Brontë",
        "Jane Eyre Charlotte Brontë",
        "Muhteşem Gatsby F. Scott Fitzgerald",
        "Küçük Prens Antoine de Saint-Exupéry"
    ];

    // API'den kitap verilerini çeken asenkron fonksiyon
    async function fetchBooks() {
        try {
            // Her kitap ismi için API isteği oluştur
            const fetchPromises = myFavoriteBooks.map(async (title) => {
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=1`);
                    const data = await response.json();
                    return data.items ? data.items[0].volumeInfo : null; // Veri varsa döndür
                } catch (err) {
                    return null; // Hata durumunda null döndür
                }
            });

            // Tüm isteklerin tamamlanmasını bekle
            const results = await Promise.all(fetchPromises);
            const validBooks = results.filter(book => book !== null); // Sadece başarılı sonuçları filtrele
            renderBooks(validBooks); // Kitapları ekrana bas

        } catch (error) {
            booksGrid.innerHTML = '<p class="error-msg-books">Bir hata oluştu.</p>';
        }
    }

    // Kitap kartlarını HTML içine yerleştiren fonksiyon
    function renderBooks(books) {
        booksGrid.innerHTML = ''; // Önce temizle

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';

            // Kitap resmi, yazarı ve puanı için varsayılan değerler ata
            const coverImg = book.imageLinks ? book.imageLinks.thumbnail.replace('http:', 'https:') : 'https://via.placeholder.com/300x450?text=Kapak+Yok';
            const author = book.authors ? book.authors[0] : 'Bilinmeyen Yazar';
            const rating = book.averageRating ? `⭐ ${book.averageRating}` : '⭐ 4.8';

            // Kart içeriğini oluştur
            card.innerHTML = `
                <button class="close-btn" onclick="this.parentElement.remove()">✕</button>
                <div class="book-poster">
                    <img src="${coverImg}" alt="${book.title}">
                </div>
                <div class="book-title">${book.title}</div>
                <div class="book-meta">
                    Edebiyat | <span>${rating}</span>
                </div>
                <p class="book-author">${author}</p>
                <a href="${book.infoLink}" target="_blank" class="btn-incele">İncele</a>
            `;
            booksGrid.appendChild(card); // Kartı ızgaraya ekle
        });
    }

    // Sayfa yüklendiğinde API isteğini başlat
    window.addEventListener('load', fetchBooks);
}

/* ==========================================================================
   İLETİŞİM FORMU DOĞRULAMALARI (iletisim.html)
   - Form verilerinin doğruluğunu kontrol eder.
   ========================================================================== */
const contactForm = document.getElementById('contactForm');
const nativeSubmit = document.getElementById('nativeSubmit');
const vueSubmit = document.getElementById('vueSubmit');

if (contactForm && nativeSubmit) {
    // 1. NATIVE JAVASCRIPT DOĞRULAMASI
    nativeSubmit.addEventListener('click', function() {
        let valid = true; // Formun geçerli olup olmadığını tutan değişken

        // Ad kontrolü: En az 2 karakter olmalı
        const name = document.getElementById('name').value.trim();
        const nameErr = document.getElementById('nameErr');
        if (name.length < 2) {
            nameErr.classList.add('show');
            valid = false;
        } else {
            nameErr.classList.remove('show');
        }

        // E-posta kontrolü: Regex ile format kontrolü
        const email = document.getElementById('email').value.trim();
        const emailErr = document.getElementById('emailErr');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailErr.classList.add('show');
            valid = false;
        } else {
            emailErr.classList.remove('show');
        }

        // Telefon kontrolü: Sayı ve belirli format kontrolü
        const phone = document.getElementById('phone').value.trim();
        const phoneErr = document.getElementById('phoneErr');
        if (phone && !/^[0-9\s\+\-]{10,15}$/.test(phone)) {
            phoneErr.classList.add('show');
            valid = false;
        } else {
            phoneErr.classList.remove('show');
        }

        // Cinsiyet kontrolü: Seçim yapılmış mı?
        const gender = document.querySelector('input[name="gender"]:checked');
        const genderErr = document.getElementById('genderErr');
        if (!gender) {
            genderErr.classList.add('show');
            valid = false;
        } else {
            genderErr.classList.remove('show');
        }

        // Şehir kontrolü: Boş bırakılmamalı
        const city = document.getElementById('city').value.trim();
        const cityErr = document.getElementById('cityErr');
        if (city.length < 2) {
            cityErr.classList.add('show');
            valid = false;
        } else {
            cityErr.classList.remove('show');
        }

        // Mesaj kontrolü: En az 10 karakter olmalı
        const message = document.getElementById('message').value.trim();
        const messageErr = document.getElementById('messageErr');
        if (message.length < 10) {
            messageErr.classList.add('show');
            valid = false;
        } else {
            messageErr.classList.remove('show');
        }

        // KVKK onay kontrolü: Checkbox işaretli mi?
        const consent = document.getElementById('consent').checked;
        const consentErr = document.getElementById('consentErr');
        if (!consent) {
            consentErr.classList.add('show');
            valid = false;
        } else {
            consentErr.classList.remove('show');
        }

        // Tüm kontroller geçerliyse formu gönder
        if (valid) {
            contactForm.submit();
        }
    });
}

// 2. VUE.JS / LIBRARY DOĞRULAMASI
// Eğer Vue kütüphanesi yüklüyse alternatif bir doğrulama yöntemi sunar
if (typeof Vue !== 'undefined' && document.getElementById('vueApp')) {
    const { createApp } = Vue;

    createApp({
        methods: {
            validateWithVue() {
                let valid = true;

                // Verileri formdan al
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const gender = document.querySelector('input[name="gender"]:checked');
                const message = document.getElementById('message').value.trim();
                const consent = document.getElementById('consent').checked;

                // Benzer kontrolleri Vue metodu içinde yap
                if (name.length < 2) {
                    document.getElementById('nameErr').classList.add('show');
                    valid = false;
                } else {
                    document.getElementById('nameErr').classList.remove('show');
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    document.getElementById('emailErr').classList.add('show');
                    valid = false;
                } else {
                    document.getElementById('emailErr').classList.remove('show');
                }

                if (phone && !/^[0-9\s\+\-]{10,15}$/.test(phone)) {
                    document.getElementById('phoneErr').classList.add('show');
                    valid = false;
                } else {
                    document.getElementById('phoneErr').classList.remove('show');
                }

                if (!gender) {
                    document.getElementById('genderErr').classList.add('show');
                    valid = false;
                } else {
                    document.getElementById('genderErr').classList.remove('show');
                }

                const city = document.getElementById('city').value.trim();
                if (!city || city === "") {
                    document.getElementById('cityErr').classList.add('show');
                    valid = false;
                } else {
                    document.getElementById('cityErr').classList.remove('show');
                }

                if (message.length < 10) {
                    document.getElementById('messageErr').classList.add('show');
                    valid = false;
                } else {
                    document.getElementById('messageErr').classList.remove('show');
                }

                if (!consent) {
                    document.getElementById('consentErr').classList.add('show');
                    valid = false;
                } else {
                    document.getElementById('consentErr').classList.remove('show');
                }

                if (valid) {
                    document.getElementById('contactForm').submit();
                }
            }
        }
    }).mount('#vueApp');
}

/* ==========================================================================
   GİRİŞ YAP (login.html)
   - Login işleminin istemci tarafı kontrolleri ve hata gösterimi.
   ========================================================================== */
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    // Sayfa yüklendiğinde URL'de hata parametresi var mı kontrol et (PHP'den yönlendirme geldiyse)
    window.addEventListener('load', function() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('error')) {
            const loginError = document.getElementById('loginError');
            if (loginError) {
                loginError.classList.add('show');
                // Hata tipine göre mesajı güncelle
                if (urlParams.get('error') === 'empty') {
                    loginError.innerHTML = '❌ Lütfen tüm alanları doldurun!';
                } else {
                    loginError.innerHTML = '❌ Hatalı kullanıcı adı veya şifre!';
                }
            }
        }
    });

    // Form gönderilmeden önce istemci tarafında son kontrolü yap
    loginForm.addEventListener('submit', function(e) {
        // İstemci tarafı temel doğrulama
        const studentNo = document.getElementById('studentNo').value.trim();
        const password = document.getElementById('password').value.trim();

        const studentNoErr = document.getElementById('studentNoErr');
        const passwordErr = document.getElementById('passwordErr');
        
        let valid = true;

        // Öğrenci no (e-posta) format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(studentNo)) {
            studentNoErr.classList.add('show');
            valid = false;
        } else {
            studentNoErr.classList.remove('show');
        }

        // Şifre boş mu kontrolü
        if (password === "") {
            passwordErr.classList.add('show');
            valid = false;
        } else {
            passwordErr.classList.remove('show');
        }

        // Geçersizse formun gönderilmesini engelle
        if (!valid) {
            e.preventDefault();
            return;
        }
        
        // Eğer her şey normalse, form normal şekilde PHP'ye POST edilir (e.preventDefault() çağrılmadığı için)
    });
}

/* ==========================================================================
   SLIDER (sehir.html)
   - Görseller arasında geçiş yapılmasını sağlayan slider mantığı.
   ========================================================================== */
const sliderSection = document.querySelector('.slider');
if (sliderSection) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0; // Aktif olan slaytın indeksi

    // Belirli bir slaytı gösteren fonksiyon
    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0; // Sona gelindiyse başa dön
        else if (index < 0) currentSlide = slides.length - 1; // Baştaysak sona git
        else currentSlide = index;

        // Tüm slaytlardan ve noktalardan 'active' sınıfını kaldır
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Aktif olan slaytı ve noktayı işaretle
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.add('active');
        }
    }

    // 'Sonraki' butonu tıklama olayı
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    // 'Önceki' butonu tıklama olayı
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    // Navigasyon noktalarına tıklama olayı
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Otomatik geçiş (Her 5 saniyede bir sonraki slayta geç)
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}