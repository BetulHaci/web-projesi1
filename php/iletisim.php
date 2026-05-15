<?php
// Formdan gelen POST verilerini al ve güvenlik için htmlspecialchars kullan
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
$gender = isset($_POST['gender']) ? htmlspecialchars($_POST['gender']) : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

// Eğer bazı alanlar boşsa varsayılan metin ata
if (empty($name)) $name = "Belirtilmedi";
if (empty($email)) $email = "Belirtilmedi";
if (empty($city)) $city = "Belirtilmedi";
if (empty($message)) $message = "Belirtilmedi";
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mesajınız Alındı</title>
  <style>
    /* Google Fontları İçe Aktar */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
    
    /* Temel Reset Ayarları */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body, html {
      height: 100%;
      font-family: 'Outfit', sans-serif;
    }
    
    /* Arka Plan Görseli / Gradiyent */
    .bg-image {
      background: linear-gradient(135deg, #e8d8c0 0%, #d4b572 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    /* Mesaj Kartı Tasarımı */
    .message-card {
      background-color: rgba(253, 246, 236, 0.95);
      backdrop-filter: blur(10px); /* Arka plan bulanıklığı */
      border-radius: 24px;
      padding: 50px 40px;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(61, 61, 42, 0.15);
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    
    .message-card h1 {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      color: #3d3d2a;
      margin-bottom: 30px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    
    /* Verilerin Listelendiği Kutu */
    .data-box {
      background-color: rgba(238, 229, 229, 0.7);
      border-radius: 12px;
      padding: 25px;
      text-align: left;
      border: 1px solid rgba(220, 209, 209, 0.8);
      margin-bottom: 40px;
    }
    
    .data-box h3 {
      font-size: 16px;
      color: #555;
      font-weight: 500;
      margin-bottom: 15px;
    }
    
    .data-divider {
      height: 1px;
      background-color: rgba(220, 209, 209, 0.8);
      margin-bottom: 20px;
    }
    
    .data-item {
      font-size: 15px;
      color: #444;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    
    .data-item strong {
      font-weight: 600;
      color: #6a6015;
    }
    
    /* Geri Dön Butonu */
    .btn-back {
      background-color: #4a4a35;
      color: white;
      text-decoration: none;
      padding: 14px 40px;
      border-radius: 30px;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 1px;
      display: inline-block;
      transition: all 0.3s ease;
    }
    
    .btn-back:hover {
      background-color: #2b2b1d;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(43, 43, 29, 0.2);
    }
  </style>
</head>
<body>
  <div class="bg-image">
    <div class="message-card">
      <h1>Mesajınız Alındı</h1>
      
      <div class="data-box">
        <h3>Sunucuya (PHP) ulaşan bilgileriniz aşağıdadır:</h3>
        <div class="data-divider"></div>
        
        <!-- PHP ile gelen verileri ekrana yazdır -->
        <div class="data-item"><strong>Ad Soyad:</strong> <?php echo $name; ?></div>
        <div class="data-item"><strong>E-posta:</strong> <?php echo $email; ?></div>
        
        <?php if($phone): ?>
        <div class="data-item"><strong>Telefon:</strong> <?php echo $phone; ?></div>
        <?php endif; ?>
        
        <?php if($city): ?>
        <div class="data-item"><strong>Şehir:</strong> <?php echo $city; ?></div>
        <?php endif; ?>

        <?php if($gender): ?>
        <div class="data-item"><strong>Cinsiyet:</strong> <?php echo $gender; ?></div>
        <?php endif; ?>
        
        <div class="data-item"><strong>Mesaj:</strong> <?php echo nl2br($message); ?></div>
      </div>
      
      <a href="../iletisim.html" class="btn-back">Geri Dön</a>
    </div>
  </div>
</body>
</html>
