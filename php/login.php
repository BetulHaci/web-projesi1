<?php
$studentNo = isset($_POST['studentNo']) ? $_POST['studentNo'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$studentPrefix = explode('@', $studentNo)[0];

if ($studentPrefix === $password && $studentPrefix !== '') {
    // Giriş başarılı
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoşgeldiniz</title>
  <link rel="stylesheet" href="../css/style.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    .welcome-bg {
      /* Kullanıcının referans görseline uygun bir arka plan degrade (Açık mavi - bej/pembe) */
      background: linear-gradient(180deg, #e8d8c0 0%, #b5934a 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .welcome-card {
      background: #fdf6ec; 
      border-radius: 20px;
      padding: 60px 40px;
      text-align: center;
      max-width: 550px;
      width: 100%;
      box-shadow: 0 15px 40px rgba(0,0,0,0.1);
    }
    .welcome-card h1 {
      font-family: 'Playfair Display', serif;
      font-size: 46px;
      color: #3d3d2a; /* Görseldeki zeytin yeşili tonu */
      margin-bottom: 20px;
    }
    .welcome-card p {
      font-size: 18px;
      color: #555;
      margin-bottom: 40px;
    }
    .btn-welcome {
      background-color: #3d3d2a; /* Görseldeki zeytin yeşili tonu */
      color: white;
      padding: 14px 35px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      display: inline-block;
      transition: background 0.3s;
      border: none;
    }
    .btn-welcome:hover {
      background-color: #655b14;
    }
  </style>
</head>
<body>
  <div class="welcome-bg">
    <div class="welcome-card">
      <h1>Hoşgeldiniz <?php echo htmlspecialchars($studentPrefix); ?></h1>
      <p>Giriş işleminiz başarıyla tamamlandı.</p>
      <a href="../index.html" class="btn-welcome">Ana Sayfaya Dön</a>
    </div>
  </div>
</body>
</html>
<?php
} else {
    // Başarısız ise login sayfasına geri dön
    header("Location: ../login.html");
    exit();
}
?>
