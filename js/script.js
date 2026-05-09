/* ==========================================================================
   HAMBURGER MENÜ (Tüm Sayfalar)
   ========================================================================== */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('open');
    });

    // Menü linkine tıklayınca menüyü kapat
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
   ========================================================================== */
const booksGrid = document.getElementById('booksGrid');

if (booksGrid) {
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

    async function fetchBooks() {
        try {
            const fetchPromises = myFavoriteBooks.map(async (title) => {
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=1`);
                    const data = await response.json();
                    return data.items ? data.items[0].volumeInfo : null;
                } catch (err) {
                    return null;
                }
            });

            const results = await Promise.all(fetchPromises);
            const validBooks = results.filter(book => book !== null);
            renderBooks(validBooks);

        } catch (error) {
            booksGrid.innerHTML = '<p class="error-msg-books">Bir hata oluştu.</p>';
        }
    }

    function renderBooks(books) {
        booksGrid.innerHTML = '';

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';

            const coverImg = book.imageLinks ? book.imageLinks.thumbnail.replace('http:', 'https:') : 'https://via.placeholder.com/300x450?text=Kapak+Yok';
            const author = book.authors ? book.authors[0] : 'Bilinmeyen Yazar';
            const rating = book.averageRating ? `⭐ ${book.averageRating}` : '⭐ 4.8';

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
            booksGrid.appendChild(card);
        });
    }

    window.addEventListener('load', fetchBooks);
}

/* ==========================================================================
   İLETİŞİM FORMU DOĞRULAMALARI (iletisim.html)
   ========================================================================== */
const contactForm = document.getElementById('contactForm');
const nativeSubmit = document.getElementById('nativeSubmit');
const vueSubmit = document.getElementById('vueSubmit');

if (contactForm && nativeSubmit) {
    // 1. NATIVE JAVASCRIPT DOĞRULAMASI
    nativeSubmit.addEventListener('click', function() {
        let valid = true;

        // Ad kontrolü
        const name = document.getElementById('name').value.trim();
        const nameErr = document.getElementById('nameErr');
        if (name.length < 2) {
            nameErr.classList.add('show');
            valid = false;
        } else {
            nameErr.classList.remove('show');
        }

        // E-posta kontrolü
        const email = document.getElementById('email').value.trim();
        const emailErr = document.getElementById('emailErr');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailErr.classList.add('show');
            valid = false;
        } else {
            emailErr.classList.remove('show');
        }

        // Telefon kontrolü
        const phone = document.getElementById('phone').value.trim();
        const phoneErr = document.getElementById('phoneErr');
        if (phone && !/^[0-9\s\+\-]{10,15}$/.test(phone)) {
            phoneErr.classList.add('show');
            valid = false;
        } else {
            phoneErr.classList.remove('show');
        }

        // Cinsiyet kontrolü
        const gender = document.querySelector('input[name="gender"]:checked');
        const genderErr = document.getElementById('genderErr');
        if (!gender) {
            genderErr.classList.add('show');
            valid = false;
        } else {
            genderErr.classList.remove('show');
        }

        // Şehir kontrolü
        const city = document.getElementById('city').value.trim();
        const cityErr = document.getElementById('cityErr');
        if (city.length < 2) {
            cityErr.classList.add('show');
            valid = false;
        } else {
            cityErr.classList.remove('show');
        }



        // Mesaj kontrolü
        const message = document.getElementById('message').value.trim();
        const messageErr = document.getElementById('messageErr');
        if (message.length < 10) {
            messageErr.classList.add('show');
            valid = false;
        } else {
            messageErr.classList.remove('show');
        }

        // KVKK onay kontrolü
        const consent = document.getElementById('consent').checked;
        const consentErr = document.getElementById('consentErr');
        if (!consent) {
            consentErr.classList.add('show');
            valid = false;
        } else {
            consentErr.classList.remove('show');
        }

        if (valid) {
            alert("Native JS: Doğrulama başarılı! Form gönderiliyor...");
            contactForm.submit();
        }
    });
}

// 2. VUE.JS / LIBRARY DOĞRULAMASI
if (typeof Vue !== 'undefined' && document.getElementById('vueApp')) {
    const { createApp } = Vue;

    createApp({
        methods: {
            validateWithVue() {
                let valid = true;

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const gender = document.querySelector('input[name="gender"]:checked');
                const message = document.getElementById('message').value.trim();
                const consent = document.getElementById('consent').checked;

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
                    alert("Vue.js Library: Doğrulama başarılı! Form gönderiliyor...");
                    document.getElementById('contactForm').submit();
                }
            }
        }
    }).mount('#vueApp');
}

/* ==========================================================================
   GİRİŞ YAP (login.html)
   ========================================================================== */
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const studentNo = document.getElementById('studentNo').value.trim();
        const password = document.getElementById('password').value.trim();

        const studentNoErr = document.getElementById('studentNoErr');
        const passwordErr = document.getElementById('passwordErr');
        const loginError = document.getElementById('loginError');
        const loginSuccess = document.getElementById('loginSuccess');

        let valid = true;

        // Öğrenci no (e-posta) kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(studentNo)) {
            studentNoErr.classList.add('show');
            valid = false;
        } else {
            studentNoErr.classList.remove('show');
        }

        // Şifre kontrolü
        if (password.length < 6) {
            passwordErr.classList.add('show');
            valid = false;
        } else {
            passwordErr.classList.remove('show');
        }

        if (!valid) return;

        const studentPrefix = studentNo.split('@')[0];

        // Giriş kontrolü (Öğrenci numarası ve şifre aynı olmalı)
        if (studentPrefix === password && studentPrefix !== '') {
            loginError.classList.remove('show');
            loginSuccess.classList.add('show');
            setTimeout(() => {
                loginForm.submit();
            }, 1000);
        } else {
            loginSuccess.classList.remove('show');
            loginError.classList.add('show');
        }
    });
}

/* ==========================================================================
   SLIDER (sehir.html)
   ========================================================================== */
const sliderSection = document.querySelector('.slider');
if (sliderSection) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.add('active');
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Otomatik geçiş
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}