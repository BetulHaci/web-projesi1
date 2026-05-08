<?php
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
$gender = isset($_POST['gender']) ? htmlspecialchars($_POST['gender']) : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

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
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body, html {
      height: 100%;
      font-family: 'Outfit', sans-serif;
    }
    
    .bg-image {
      /* Görseldeki açık mavi - bej/pembe degrade arka plan */
      background: linear-gradient(180deg, #e8d8c0 0%, #b5934a 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .message-card {
      background-color: #fdf6ec;
      border-radius: 20px;
      padding: 50px 40px;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 15px 40px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .message-card h1 {
      font-family: 'Playfair Display', serif;
      font-size: 52px;
      color: #3d3d2a; /* Görseldeki zeytin yeşili */
      margin-bottom: 30px;
      font-weight: 600;
      letter-spacing: -1px;
    }
    
    .data-box {
      background-color: #eee5e5;
      border-radius: 10px;
      padding: 25px;
      text-align: left;
      border: 1px solid #dcd1d1;
      margin-bottom: 40px;
    }
    
    .data-box h3 {
      font-size: 15px;
      color: #555;
      font-weight: 500;
      margin-bottom: 15px;
    }
    
    .data-divider {
      height: 1px;
      background-color: #dcd1d1;
      margin-bottom: 20px;
    }
    
    .data-item {
      font-size: 15px;
      color: #444;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    
    .data-item strong {
      font-weight: 600;
      color: #796e1a;
    }
    
    .btn-back {
      background-color: #3d3d2a;
      color: white;
      text-decoration: none;
      padding: 14px 40px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 1px;
      display: inline-block;
      transition: background 0.3s;
      text-transform: uppercase;
    }
    
    .btn-back:hover {
      background-color: #3d3d2a;
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
