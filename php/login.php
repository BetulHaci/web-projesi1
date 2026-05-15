<?php
// POST metodu ile gelen kullanıcı bilgilerini al
$studentNo = isset($_POST['studentNo']) ? trim($_POST['studentNo']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

// 1. Boş alan kontrolü: Kullanıcı adı veya şifre boşsa geri gönder

if (empty($studentNo) || empty($password)) {
    header("Location: ../login.html?error=empty");
    exit();
}

// 2. Mail formatı kontrolü: Girilen değer geçerli bir e-posta mı?
if (!filter_var($studentNo, FILTER_VALIDATE_EMAIL)) {
    header("Location: ../login.html?error=invalid_format");
    exit();
}

// 3. E-posta adresinden öğrenci numarasını ayıkla
// Örn: b2412100001@sakarya.edu.tr adresinden 'b2412100001' kısmını alır
$studentPrefix = explode('@', $studentNo)[0];

// 4. Şifre doğrulaması: Şifre, öğrenci numarası ile aynı mı?
if ($studentPrefix === $password) {
    // Giriş başarılıysa hoşgeldin ekranını göster
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoşgeldiniz</title>
  <link rel="stylesheet" href="../css/style.css">
  <style>
    /* Google Fontları */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
    
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Outfit', sans-serif;
    }

    /* Karşılama Ekranı Arka Planı */
    .welcome-bg {
      background: linear-gradient(135deg, #e8d8c0 0%, #d4b572 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    /* Karşılama Kartı Tasarımı */
    .welcome-card {
      background: rgba(253, 246, 236, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      padding: 60px 40px;
      text-align: center;
      max-width: 550px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(61, 61, 42, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .welcome-card h1 {
      font-family: 'Playfair Display', serif;
      font-size: 44px;
      color: #3d3d2a;
      margin-bottom: 20px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    .welcome-card p {
      font-size: 18px;
      color: #555;
      margin-bottom: 40px;
    }

    /* Buton Tasarımları */
    .btn-welcome {
      background-color: #4a4a35;
      color: white;
      padding: 14px 35px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 1px;
      display: inline-block;
      transition: all 0.3s ease;
      border: none;
    }

    .btn-welcome:hover {
      background-color: #2b2b1d;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(43, 43, 29, 0.2);
    }

    .btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    /* İkincil Buton (Çerçeveli) */
    .btn-secondary {
      background-color: transparent;
      color: #4a4a35;
      border: 2px solid #4a4a35;
    }

    .btn-secondary:hover {
      background-color: #4a4a35;
      color: white;
    }
  </style>
</head>
<body>
  <div class="welcome-bg">
    <div class="welcome-card">
      <!-- Kullanıcı ismini ekrana yazdır -->
      <h1>Hoşgeldiniz <?php echo htmlspecialchars($studentPrefix); ?></h1>
      <p>Giriş işleminiz başarıyla tamamlandı.</p>
      
      <div class="btn-container">
        <a href="../index.html" class="btn-welcome">Ana Sayfaya Dön</a>
        <a href="../login.html" class="btn-welcome btn-secondary">Giriş Sayfasına Dön</a>
      </div>
    </div>
  </div>
</body>
</html>
<?php
} else {
    // Şifre veya kullanıcı adı hatalı ise error parametresiyle geri yönlendir
    header("Location: ../login.html?error=failed");
    exit();
}
?>
