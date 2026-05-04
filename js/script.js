/* ==========================================================================
   İLGİ ALANLARIM (Kitap Galerisi - ilgi.html)
   ========================================================================== */
const booksGrid = document.getElementById('booksGrid');

if (booksGrid) {
    const myFavoriteBooks = [
        "Melekler ve Şeytanlar Dan Brown",
        "Aynı Yıldızın Altında John Green",
        "Bülbülü Öldürmek Harper Lee",
        "Unutulmaz Aşk Nicholas Sparks",
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
   İLETİŞİM FORMU (iletisim.html)
   ========================================================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

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

        // Konu kontrolü
        const subject = document.getElementById('subject').value;
        const subjectErr = document.getElementById('subjectErr');
        if (!subject) {
            subjectErr.classList.add('show');
            valid = false;
        } else {
            subjectErr.classList.remove('show');
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

        // Başarı mesajı
        if (valid) {
            document.getElementById('successMsg').classList.add('show');
            this.reset();
        }
    });
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

        // Giriş kontrolü (Demo bilgiler: b241210060@sakarya.edu.tr / 123456)
        if (studentNo === 'b241210060@sakarya.edu.tr' && password === '123456') {
            loginError.classList.remove('show');
            loginSuccess.classList.add('show');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            loginSuccess.classList.remove('show');
            loginError.classList.add('show');
        }
    });
}
